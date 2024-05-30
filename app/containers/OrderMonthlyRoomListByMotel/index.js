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
export function OrderMonthlyRoomListByMotel(props) {
  useInjectReducer({ key: 'orderMonthlyRoomListByMotel', reducer });
  useInjectSaga({ key: 'orderMonthlyRoomListByMotel', saga });
  const history = useHistory();
  const { MotelRoom = [], MotelRoomNone } = props.orderMonthlyRoomListByMotel;
  const { idMotel = '', nameMotel = '' } = useParams();
  console.log({MotelRoom})
  // const currentUser = localStore.get('user') || {};
  // const { _id } = currentUser;
  useEffect(() => {
    props.getGetMotelRoom(idMotel);
  }, []);

  const columns = [
    { field: 'stt', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'name',
      headerName: 'Tên Phòng',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'roomName',
      headerName: 'Mã phòng',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'status',
      headerName: 'Trạng Thái',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'action',
      headerName: 'Chi Tiết',
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
                  // eslint-disable-next-line no-underscore-dangle
                  // `/historyRoomHost/room/${params.row.motelRoomId}/roomdetail/${params.row._id}`,
                  `/manage-monthly-order/history-monthly/motel/${idMotel}/${nameMotel}/room/${params.row._id}/${params.row.name}`
                );
              }}
            >
              Lịch sử thanh toán
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
      <div className="title">Danh sách phòng tòa {nameMotel}</div>
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

OrderMonthlyRoomListByMotel.propTypes = {
  getGetMotelRoom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  orderMonthlyRoomListByMotel: makeSelectHistoryFloorsRoomHost(),
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

export default compose(withConnect)(OrderMonthlyRoomListByMotel);
