import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import 'react-toastify/dist/ReactToastify.css';
import localStore from 'local-storage';
import { useHistory, useParams } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getMotelList } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectManagerBuildingHost from './selectors';

import './style.scss';

import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid từ Material-UI
import { head, set } from 'lodash';

export function ManageMonthlyAdmin(props) {
  useInjectReducer({ key: 'motelListByOwner', reducer });
  useInjectSaga({ key: 'motelListByOwner', saga });

  const [loading, setLoading] = useState(false);
  const { id, name } = useParams();
  const currentUser = useMemo(() => localStore.get('user') || {}, []);
  const { role = [] } = currentUser;
  const history = useHistory();
  // const [motelList, setMotelList] = useState([]);

  // const [revenue, setRevenue] = useState(props.profile.buildingRevenue || 0);


  useEffect(() => {
    props.getMotelList(id);
    // setMotelList(props.profile.buildingRevenue || []);
    // setLoading(false);
  }, [id]);

  const { motelList = [] } = props.motelListByOwner;
  console.log("motelListuuuu", motelList);

  // console.log('check props: ', motelList);
  const columns = [
    { field: 'index', headerName: 'STT', headerAlign: 'center', width: 150, headerClassName: 'header-bold', align: 'center' },
    { field: 'name', headerName: 'Tên tòa nhà', width: 250, headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'address', headerName: 'Địa chỉ', width: 700, headerAlign: 'center', headerClassName: 'header-bold' },
    {
      field: 'action-1',
      headerName: 'Quản lý duyệt thanh toán',
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
      renderCell: params =>
      // eslint-disable-next-line no-unused-expressions
      (
        <>
          <a
            className="btn-detail"
            onClick={() => {
              history.push(
                `/manage-monthly-order/manage-accept-order/${params.row._id}`,
              );
            }}
          >
            Xem chi tiết
          </a>
        </>
      )
    },
    {
      field: 'action-2',
      headerName: 'Hóa đơn chờ thanh toán',
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        return (
          <>
            <a
              className='btn-detail'
              onClick={() => {
                history.push(`/manage-monthly-order/manage-order-pending-payment/${params.row._id}/${params.row.name}`);
              }}
            >
              Xem chi tiết
            </a>
          </>
        );
      },
    },
    {
      field: 'action-3',
      headerName: 'Lịch sử thanh toán',
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
      renderCell: params =>
      // eslint-disable-next-line no-unused-expressions
      (
        <>
          <a
            className='btn-detail'
            onClick={() => {
              history.push(`/manage-monthly-order/history-monthly/motel/${params.row._id}/${params.row.name}`);
            }}
          >
            Xem chi tiết
          </a>
        </>
      )
    },
  ];

  // Xây dựng cấu trúc dữ liệu cho DataGrid từ buildingRevenue
  let rows = [];
  // if(motelList) {
    if(motelList.length > 0) {
      rows = motelList.map((motel, index) => ({
        index: index + 1,
        name: motel.name,
        address: motel.address.address,
        _id: motel._id,
        key: motel._id,
        file: motel.file,
        totalRoom: motel.totalRoom,
        depositedRoom: motel.depositedRoom,
        availableRoom: motel.availableRoom,
        rentedRoom: motel.rentedRoom,
      }));
    }
  // }

  console.log({motelList});

  const handleButtonClick = useCallback((row) => {
    // history.push(`/hostMotelRoom/${row._id}`);
    // history.push(`/room-detail/${row._id}`);
    history.push(`/historyRoomHost/room/${row._id}`);
  })

  const handleOpenModal = useCallback((id, motelname) => {
    setMotelName(motelname);
    setMotelId(id);
    setModal(true);
  }, []);


  return (
    <div id='motelList' className="user-profile-wrapper container">
      <Helmet>
        <title>Manage Monthly</title>
        <meta name="description" content="Description of Manage Monthly" />
      </Helmet>
      <div className="title-abc">
        <span>Quản lý thanh toán hàng tháng</span>
        {/* <span>Người quản lý: <strong>{name}</strong></span> */}
      </div>

      {role.length === 2 && role.includes('master') && (
        <div className="card-wrap">
          {loading && <div className="loading-overlay" />}
          <DataGrid
            getRowId={row => row._id}
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            autoHeight
          />
          {/* {props.profile.buildingRevenue && (
            
          )} */}
        </div>
      )}
    </div>
  );
}

ManageMonthlyAdmin.propTypes = {
  getMotelList: PropTypes.func.isRequired,
  // getBuildingRevenue: PropTypes.func.isRequired,
  // motelListByOwner: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  motelListByOwner: makeSelectManagerBuildingHost(),
  // buildingRevenue: makeSelectBuildingRevenue(),

});

function mapDispatchToProps(dispatch) {
  return {
    getMotelList: id => dispatch(getMotelList(id)),
    // getBuildingRevenue: id => dispatch(getBuildingRevenue(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ManageMonthlyAdmin);
