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
  console.log({ MotelRoom })
  // const currentUser = localStore.get('user') || {};
  // const { _id } = currentUser;
  useEffect(() => {
    props.getGetMotelRoom(id);
  }, []);

  const columns = [
    { field: 'stt', headerName: 'STT', headerAlign: 'center', width: 120, align: 'center' },
    {
      field: 'roomName',
      headerName: 'Tên phòng',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'key',
      headerName: 'Mã phòng',
      headerAlign: 'center',
      width: 200,
      align: 'center',
      headerClassName: 'header-bold',
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'action-1',
      headerName: 'Chi tiết phòng',
      headerAlign: 'center',
      width: 250,
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
      headerName: 'Lịch Sử Đặt Phòng',
      headerAlign: 'center',
      width: 250,
      align: 'center',
      headerClassName: 'header-bold',
      renderCell: params => {
        return (
          <>
            <a className="btn-detail"
              color="primary"
              onClick={() => {
                history.push(
                  `/historyRoomHost/room/${id}/roomdetail/${params.row._id
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
    {
      field: 'action-3',
      headerName: 'Tạo Hóa Đơn',
      headerAlign: 'center',
      width: 200,
      align: 'center',
      headerClassName: 'header-bold',
      renderCell: params => {
        if (params.row.rentedBy) {
          return (
            <>
              <a className="btn-detail"
                color="primary"
                onClick={() => {
                  history.push(
                    `/exportBillRoom/motel/${id}/room/${params.row._id}/user/${params.row.rentedBy}`,
                  );
                }}
              >
                Tạo
              </a>
            </>
          );
        }
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
