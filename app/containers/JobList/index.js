/**
 *
 * JobList
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { DataGrid } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getJobList } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectJobList from './selectors';

export function JobList(props) {
  useInjectReducer({ key: 'jobList', reducer });
  useInjectSaga({ key: 'jobList', saga });
  const history = useHistory();
  useEffect(() => {
    props.getJobList();
  }, []);
  const { jobs } = props.jobList;
  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'fullName',
      headerName: 'Họ và Tên',
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
    },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
    },
    {
      field: 'total',
      headerName: 'Tổng tiền',
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
    },
    {
      field: 'action',
      headerName: 'Sự Kiện',
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <Button
          color="primary"
          onClick={() => {
            history.push(`/admin/job/detail/${params.row._id}`);
          }}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>JobList</title>
        <meta name="description" content="Description of JobList" />
      </Helmet>
      <div
        className="job-list-wrapper container-fulid"
        style={{ margin: '15px' }}
      >
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={jobs}
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

JobList.propTypes = {
  getJobList: PropTypes.func,
  jobList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  jobList: makeSelectJobList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJobList: () => {
      dispatch(getJobList());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(JobList);
