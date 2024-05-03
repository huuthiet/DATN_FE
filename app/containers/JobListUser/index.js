/**
 *
 * JobList
 *
 */

import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getJobListUser } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectJobList from './selectors';
export function JobListUser(props) {
  useInjectReducer({ key: 'jobListUser', reducer });
  useInjectSaga({ key: 'jobListUser', saga });
  const history = useHistory();
  const { id = '' } = useParams();
  useEffect(() => {
    props.getJobListUser(id);
  }, []);
  // eslint-disable-next-line react/prop-types
  const { jobsUser } = props.jobList;

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'amount',
      headerName: 'Số Tiền',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
    {
      field: 'paymentMethod',
      headerName: 'Phương thức thanh toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'description',
      headerName: 'Ghi Chú',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
    },
    {
      field: 'type',
      headerName: 'Hình Thức Thanh Toán',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'action',
      headerName: 'Sự Kiện',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <>
          <Button
            className="ml-auto"
            color="primary"
            onClick={() => {
              history.push(`/order-pay/${params.row._id}`);
            }}
          >
            UNC
          </Button>
          <Button
            className="ml-auto"
            color="primary"
            onClick={() => {
              history.push(`/room-detail/${params.row.room._id}`);
            }}
          >
            Chi tiết phòng
          </Button>
          <Button
            className="ml-auto"
            color="primary"
            onClick={() => {
              history.push(`/room-detail-update-admin/${params.row.room._id}`);
            }}
          >
            Trạng Thái
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>JobListUser</title>
        <meta name="description" content="Description of JobList" />
      </Helmet>
      <div className="job-list-wrapper container-fluid">
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={jobsUser}
            columns={columns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
          />
        </div>
      </div>
    </div>
  );
}

JobListUser.propTypes = {
  getJobListUser: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  jobListUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  jobList: makeSelectJobList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJobListUser: id => {
      dispatch(getJobListUser(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(JobListUser);
