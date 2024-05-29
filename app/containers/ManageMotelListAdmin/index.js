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

export function ManagerEnergyBuildingsAdmin(props) {
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
    {
      field: 'file',
      headerName: 'Ảnh Phòng 1',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: (params) => {
        console.log({params})
        return params.value ? (
          <a href={params.value} target="_blank" rel="noopener noreferrer">
            <Avatar
              style={{
                width: '250px',
              }}
              variant="square"
              alt="Avatar"
              src={params.value}
            />
          </a>
        ) : (
          <Avatar
            style={{
              width: '250px',
            }}
            variant="square"
            alt="Avatar"
            src={''}
          />
        );
      },
    },
    { field: 'address', headerName: 'Địa chỉ', width: 700, headerAlign: 'center', headerClassName: 'header-bold' },
    {
      field: 'totalRoom',
      headerName: 'Số phòng',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
      align: 'center',
    },
    {
      field: 'rentedRoom',
      headerName: 'Đã thuê',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
      align: 'center',
    },
    {
      field: 'depositedRoom',
      headerName: 'Đã cọc',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
      align: 'center',
    },
    // {
    //   field: 'images',
    //   headerName: 'Hình ảnh',
    //   headerAlign: 'center',
    //   width: 150,
    //   headerClassName: 'header-bold',
    //   align: 'center',
    //   renderCell: (params) => (
    //     params.row.file ? (
    //       <a href={params.row.file} target="_blank" rel="noopener noreferrer">
    //         LINK
    //       </a>
    //     ) : null
    //   ),
    // },
    {
      field: 'listRoom',
      headerAlign: 'center',
      headerName: 'Danh sách các phòng',
      width: 300,
      renderCell: params => (
        <a
          className="btn-detail"
          onClick={() => {
            handleButtonClick(params.row);
          }}
        >
          Xem chi tiết
        </a>
      ),
      headerClassName: 'header-bold',
      align: 'center',
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

  // for (const motelName in revenue) {
  //   console.log('motelName', motelName);
  //   const motelData = revenue[motelName].jsonMotel;
  //   console.log('motelData', motelData);
  //   if (!motelData) continue;

  //   rows.push({
  //     id: motelData.idMotel, // Sử dụng idMotel làm id duy nhất cho DataGrid
  //     _id: motelData.idMotel,
  //     index: rows.length + 1,
  //     name: motelData.name,
  //     phoneUser: motelData.phone,
  //     addressUser: motelData.address,
  //     totalAll: revenue[motelName].totalRevenue
  //   });

  //   console.log('rows', rows);
  // }
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

  // const cancelToggle = useCallback(() => {
  //   setModal(!modal);
  // }, [modal]);

  // const getStartDay = useCallback((event) => {
  //   setStartDate(event.target.value);
  // }, []);

  // const getEndDay = useCallback((event) => {
  //   setEndDate(event.target.value);
  // }, []);

  // const handleExport = useCallback(async () => {
  //   if (!startDate || !endDate) {
  //     toast.error('Vui lòng chọn ngày bắt đầu và ngày kết thúc!');
  //     setModal(false);
  //   } else {
  //     if (startDate > endDate) {
  //       toast.error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc!');
  //       setModal(false);
  //     } else {
  //       try {
  //         // Đóng modal và reset date
  //         setModal(!modal);
  //         setLoading(true);
  //         const exportApi = urlLink.api.serverUrl + urlLink.api.exportBillBuilding + motelId + '/' + startDate + '/' + endDate;
  //         const response = await axios.get(exportApi);
  //         if (response) {
  //           setLoading(false);
  //           const status = response.data.data;
  //           const toastConfig = {
  //             position: toast.POSITION.TOP_RIGHT,
  //             autoClose: 3000,
  //             hideProgressBar: false,
  //             pauseOnHover: true,
  //             draggable: true,
  //           };

  //           const showToast = (message, isError = true) => {
  //             toast[isError ? 'error' : 'success'](message, toastConfig);
  //             setModal(isError);
  //           };

  //           if (status === "Motel has no rented rooms") {
  //             showToast('Không có phòng nào được thuê trong thời gian này!');
  //           } else if (status === "Motel has no rooms with idMetter") {
  //             showToast('Không có phòng nào có idMetter!');
  //           } else if (status === "Motel has no floors") {
  //             showToast('Không có tầng nào trong tòa nhà!');
  //           } else if (status === "exportBillAllRoomSuccess") {
  //             showToast('Xuất hóa đơn thành công!', false);
  //             setLoading(false);
  //             setStartDate('');
  //             setEndDate('');
  //           } else {
  //             showToast('Có lỗi xảy ra, vui lòng thử lại!', true);
  //           }
  //         }

  //       } catch (error) {
  //         // Xử lý lỗi nếu có
  //         console.error('Error:', error);
  //       }
  //     }
  //   }

  // }, [endDate, modal, startDate, motelId]);

  // console.log({rows});


  return (
    <div id='motelList' className="user-profile-wrapper container">
      <Helmet>
        <title>Manage Motels</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <div className="title-abc">
        <span>Quản lý các tòa nhà</span>
        <span>Người quản lý: <strong>{name}</strong></span>
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

ManagerEnergyBuildingsAdmin.propTypes = {
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

export default compose(withConnect)(ManagerEnergyBuildingsAdmin);
