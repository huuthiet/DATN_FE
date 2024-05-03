/**
 *
 * HistoryRoomHostAdmin
 *
 */
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getGetMotelRoom } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectHistoryRoomHost from './selectors';
import './style.scss';
import { Avatar } from '@material-ui/core';
// import localStore from 'local-storage';

export function HistoryRoomHostAdmin(props) {
  useInjectReducer({ key: 'historyRoomHostAdmin', reducer });
  useInjectSaga({ key: 'historyRoomHostAdmin', saga });
  const history = useHistory();
  const { MotelRoom = [], MotelRoomNone } = props.historyRoomHostAdmin;
  // const currentUser = localStore.get('user') || {};
  // const { _id } = currentUser;
  useEffect(() => {
    props.getGetMotelRoom();
  }, []);

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'name',
      headerName: 'Tên khu trọ',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'images',
      headerName: 'Ảnh khu trọ',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        return (
          <>
            <Avatar
              style={{
                width: '250px',
              }}
              variant="square"
              alt="Avatar"
              src={params.value}
            />
          </>
        );
      },
    },

    {
      field: 'address',
      headerName: 'Địa chỉ',
      headerAlign: 'center',
      width: 550,
      headerClassName: 'header-bold',
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },

    {
      field: 'action',
      headerName: 'Chi tiết',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
      align: 'center',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <a
          className='btn-detail'
          onClick={() => {
            history.push(`/historyRoomHost/room/${params.row._id}`);
          }}
        >
          Xem chi tiết
        </a>
      ),
    },
  ];

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>Lịch sử thuê phòng</title>
        <meta
          name="description"
          content="Description of HistoryRoomHostAdmin"
        />
      </Helmet>
      <div className="title">Lịch sử thuê phòng</div>
      <div className="job-list-wrapper container-fluid">
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={MotelRoom}
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

HistoryRoomHostAdmin.propTypes = {
  getGetMotelRoom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  historyRoomHostAdmin: makeSelectHistoryRoomHost(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGetMotelRoom: () => {
      dispatch(getGetMotelRoom());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HistoryRoomHostAdmin);
