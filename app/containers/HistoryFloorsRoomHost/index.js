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
  // const currentUser = localStore.get('user') || {};
  // const { _id } = currentUser;
  useEffect(() => {
    props.getGetMotelRoom(id);
  }, []);

  const columns = [
    { field: 'stt', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'roomName',
      headerName: 'Tên Phòng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'image1',
      headerName: 'Ảnh Phòng 1',
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
      field: 'image2',
      headerName: 'Ảnh Phòng 2',
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
      field: 'status',
      headerName: 'Trạng Thái',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'action',
      headerName: 'Chi Tiết',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
      renderCell: params => {
        return (
          <>
            <Button
              color="primary"
              onClick={() => {
                history.push(
                  // eslint-disable-next-line no-underscore-dangle
                  `/historyRoomHost/room/${params.row.motelRoomId}/roomdetail/${
                    // eslint-disable-next-line no-underscore-dangle
                    params.row._id
                  }`,
                );
              }}
            >
              Chi tiết phòng
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>HistoryFloorsRoomHost</title>
        <meta
          name="description"
          content="Description of HistoryFloorsRoomHost"
        />
      </Helmet>
      <div className="title">Danh sách phòng</div>
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
