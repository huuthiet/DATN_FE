/**
 *
 * JobDetail
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectJobDetail from './selectors';
import reducer from './reducer';
import saga from './saga';
import { useParams, useHistory } from 'react-router-dom';
import { getJobDetail, deleteJobDetail, changeStoreData } from './actions';
import { Button } from 'reactstrap';
import Money from '../App/format';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';

export function JobDetail(props) {
  const { id = '' } = useParams();
  const history = useHistory();
  useInjectReducer({ key: 'jobDetail', reducer });
  useInjectSaga({ key: 'jobDetail', saga });
  useEffect(() => {
    props.getJobDetail(id);
  }, []);
  const {
    job,
    showSuccessPopup,
    showErrorPopup,
    showWarningPopup,
  } = props.jobDetail;
  const {
    fullName = '',
    phoneNumber = '',
    price = '',
    bail = '',
    deposit = '',
    total = '',
    afterCheckInCost = '',
    roomPassword = '',
  } = job;
  return (
    <div>
      <Helmet>
        <title>JobDetail</title>
        <meta name="description" content="Description of JobDetail" />
      </Helmet>
      <div className="job-detail-wrapper container">
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">Tên người thuê</th>
              <td>{fullName}</td>
            </tr>
            <tr>
              <th scope="row">Số điện thoại</th>
              <td>{phoneNumber}</td>
            </tr>
            <tr>
              <th scope="row">Giá phòng</th>
              <td>{Money(price)} đ</td>
            </tr>
            <tr>
              <th scope="row">Tiền thế chân</th>
              <td>{Money(bail)} đ</td>
            </tr>
            <tr>
              <th scope="row">Tiền đặt cọc</th>
              <td>{Money(deposit)} đ</td>
            </tr>
            <tr>
              <th scope="row">Tổng tiền</th>
              <td>{Money(total)} đ</td>
            </tr>
            <tr>
              <th scope="row">Số dư</th>
              <td>{Money(afterCheckInCost)} đ</td>
            </tr>
            <tr>
              <th scope="row">Mật khẩu phòng</th>
              <td>{roomPassword}</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex">
          <Button
            className="ml-auto"
            color="primary"
            onClick={() => {
              history.push(`/room-detail/${job.room._id}`);
            }}
          >
            Chi tiết phòng
          </Button>
          <Button
            className="ml-2"
            style={{ color: 'white', backgroundColor: 'orange' }}
            color="warning"
            onClick={() => {
              props.changeStoreData('showWarningPopup', true);
            }}
          >
            Xóa job
          </Button>
        </div>
      </div>
      <SuccessPopup
        visible={showSuccessPopup}
        content="Xóa thành công"
        toggle={() => {
          props.changeStoreData('showSuccessPopup', !showSuccessPopup);
        }}
      />
      <WarningPopup
        visible={showWarningPopup}
        content="Bạn thực sự muốn xóa?"
        callBack={() => props.deleteJobDetail(id)}
        toggle={() => {
          props.changeStoreData('showWarningPopup', false);
        }}
      />
    </div>
  );
}

JobDetail.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  jobDetail: makeSelectJobDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJobDetail: id => {
      dispatch(getJobDetail(id));
    },
    deleteJobDetail: id => {
      dispatch(deleteJobDetail(id));
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(JobDetail);
