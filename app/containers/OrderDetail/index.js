/**
 *
 * OrderDetail
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import ClassNames from 'classnames';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Button, Row, Col } from 'reactstrap';
import makeSelectOrderDetail from './selectors';
import reducer from './reducer';
import saga from './saga';
import InputForm from '../../components/InputForm';

import './style.scss';
import {
  getOrderDetail,
  putOrderDetail,
  changeStoreData,
  deleteOrderDetail,
} from './actions';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';

export function OrderDetail(props) {
  useInjectReducer({ key: 'orderDetail', reducer });
  useInjectSaga({ key: 'orderDetail', saga });
  const { id = '' } = useParams();
  const [isEdit, setIsEdit] = useState(true);
  useEffect(() => {
    props.getOrderDetail(id);
  }, []);
  const {
    order,
    showSuccessPopup,
    editPopup,
    deletePopup,
    content,
  } = props.orderDetail;
  const {
    vnpayStatus = '',
    paymentMethod = '',
    description = '',
    amount = 0,
  } = order;
  return (
    <div>
      <Helmet>
        <title>OrderDetail</title>
        <meta name="description" content="Description of OrderDetail" />
      </Helmet>
      <div className="order-detail-wrapper container">
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">Nội dung</th>
              <td>{description}</td>
            </tr>
            <tr>
              <th scope="row">Trạng thái</th>
              <td>{vnpayStatus}</td>
            </tr>
            <tr>
              <th scope="row">Loại thanh toán</th>
              <td>{paymentMethod}</td>
            </tr>
            <tr>
              <th scope="row">Số tiền</th>
              <td>
                <form>
                  <Row>
                    <Col>
                      <InputForm
                        readOnly={isEdit}
                        className={ClassNames({ edit: isEdit })}
                        value={amount}
                        onChange={evt => {
                          props.changeStoreData('order', {
                            ...order,
                            amount: evt.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <Button
                            color="primary"
                            onClick={() => {
                              if (!isEdit) {
                                props.changeStoreData('editPopup', true);
                              }
                              setIsEdit(!isEdit);
                            }}
                          >
                            {isEdit ? 'Chỉnh sửa' : 'Cập nhật'}
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            color="warning"
                            onClick={() => {
                              props.changeStoreData('deletePopup', true);
                            }}
                          >
                            <i className="fa fa-trash-o" aria-hidden="true" />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <SuccessPopup
        visible={showSuccessPopup}
        content={content}
        toggle={() => {
          props.changeStoreData('showSuccessPopup', !showSuccessPopup);
        }}
      />
      <WarningPopup
        visible={editPopup}
        content="Bạn thực sự muốn thay đổi?"
        callBack={() => props.putOrderDetail({ id, amount })}
        toggle={() => {
          props.changeStoreData('editPopup', false);
        }}
      />
      <WarningPopup
        visible={deletePopup}
        content="Bạn thực sự muốn xóa?"
        callBack={() => props.deleteOrderDetail({ id })}
        toggle={() => {
          props.changeStoreData('deletePopup', false);
        }}
      />
    </div>
  );
}

OrderDetail.propTypes = {
  getOrderDetail: PropTypes.func,
  putOrderDetail: PropTypes.func,
  deleteOrderDetail: PropTypes.func,
  orderDetail: PropTypes.object,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  orderDetail: makeSelectOrderDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOrderDetail: id => {
      dispatch(getOrderDetail(id));
    },
    putOrderDetail: data => {
      dispatch(putOrderDetail(data));
    },
    deleteOrderDetail: data => {
      dispatch(deleteOrderDetail(data));
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

export default compose(withConnect)(OrderDetail);
