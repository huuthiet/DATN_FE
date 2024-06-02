/**
 *
 * HistoryFloorsRoomHost
 *
 */
import { Avatar } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getGetMotelRoom } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectHistoryFloorsRoomHost from './selectors';
import './style.scss';
// import localStore from 'local-storage';
export function HistoryFloorsRoomHost(props) {
  useInjectReducer({ key: 'historyFloorsRoomHost', reducer });
  useInjectSaga({ key: 'historyFloorsRoomHost', saga });
  const history = useHistory();
  const { MotelRoom = [], MotelRoomNone } = props.historyFloorsRoomHost;
  const { id = '' } = useParams();
  console.log({MotelRoom})
  // const currentUser = localStore.get('user') || {};
  // const { _id } = currentUser;
  useEffect(() => {
    props.getGetMotelRoom(id);
  }, []);

  const columns = [
    { field: 'stt', headerName: 'STT', headerAlign: 'center', width: 120, align: 'center' },
    {
      field: 'roomName',
      headerName: 'Tên Phòng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'key',
      headerName: 'Mã phòng',
      headerAlign: 'center',
      width: 150,
      align: 'center',
      headerClassName: 'header-bold',
    },
    // {
    //   field: 'image1',
    //   headerName: 'Ảnh Phòng 1',
    //   headerAlign: 'center',
    //   width: 250,
    //   headerClassName: 'header-bold',
    //   renderCell: (params) => {
    //     return params.value ? (
    //       <a href={params.value} target="_blank" rel="noopener noreferrer">
    //         <Avatar
    //           style={{
    //             width: '250px',
    //           }}
    //           variant="square"
    //           alt="Avatar"
    //           src={params.value}
    //         />
    //       </a>
    //     ) : (
    //       <Avatar
    //         style={{
    //           width: '250px',
    //         }}
    //         variant="square"
    //         alt="Avatar"
    //         src={''}
    //       />
    //     );
    //   },
    // },
    // {
    //   field: 'image2',
    //   headerName: 'Ảnh Phòng 2',
    //   headerAlign: 'center',
    //   width: 250,
    //   headerClassName: 'header-bold',
    //   renderCell: (params) => {
    //     return params.value ? (
    //       <a href={params.value} target="_blank" rel="noopener noreferrer">
    //         <Avatar
    //           style={{
    //             width: '250px',
    //           }}
    //           variant="square"
    //           alt="Avatar"
    //           src={params.value}
    //         />
    //       </a>
    //     ) : (
    //       <Avatar
    //         style={{
    //           width: '250px',
    //         }}
    //         variant="square"
    //         alt="Avatar"
    //         src={''}
    //       />
    //     );
    //   },
    // },
    {
      field: 'status',
      headerName: 'Trạng Thái',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      align: 'center'
    },
    {
      field: 'action-1',
      headerName: 'Chi Tiết Phòng',
      headerAlign: 'center',
      width: 400,
      align: 'center',
      headerClassName: 'header-bold',
      renderCell: params => {
        return (
          <>
            <a className="btn-detail"
              color="primary"
              onClick={() => {
                // history.push(
                //   `/historyRoomHost/room/${params.row.motelRoomId}/roomdetail/${
                //   params.row._id
                //   }`,
                // );
                history.push(`/room-detail/${params.row._id}`)
              }}
            >
              Chi tiết phòng
            </a>
          </>
        );
      },
    },
    {
      field: 'action-2',
      headerName: 'Lịch sử đặt phòng',
      headerAlign: 'center',
      width: 400,
      align: 'center',
      headerClassName: 'header-bold',
      renderCell: params => {
        return (
          <>
            <a className="btn-detail"
              color="primary"
              onClick={() => {
                history.push(
                  `/historyRoomHost/room/${id}/roomdetail/${
                  params.row._id
                  }`,
                );
                // history.push(`/room-detail/${params.row._id}`)
              }}
            >
              Chi tiết phòng
            </a>
          </>
        );
      },
    },
  ];

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>Manage Room</title>
        <meta
          name="description"
          content="Description of ManageRoom"
        />
      </Helmet>
      <div className="title">Quản lý phòng</div>
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

HistoryFloorsRoomHost.propTypes = {
  getGetMotelRoom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  historyFloorsRoomHost: makeSelectHistoryFloorsRoomHost(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGetMotelRoom: id => {
      dispatch(getGetMotelRoom(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HistoryFloorsRoomHost);
