import React, { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import localStore from 'local-storage';
import { useHistory, useParams } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getMotelList } from './actions';
import { getBuildingRevenue } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectManagerBuildingHost from './selectors';
import { makeSelectBuildingRevenue } from './selectors';

import './style.scss';
import { GetApp } from '@material-ui/icons';
import ModalComponent from './modal';
import { Button, Input, Label, FormGroup } from 'reactstrap';
import { urlLink } from '../../helper/route';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid từ Material-UI
import { head, set } from 'lodash';

export function ManagerEnergyBuildingsAdmin(props) {
  useInjectReducer({ key: 'profile', reducer });
  useInjectSaga({ key: 'motelprofileList', saga });

  const [loading, setLoading] = useState(false);
  const { id, name } = useParams();
  const currentUser = useMemo(() => localStore.get('user') || {}, []);
  const { role = [] } = currentUser;
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [motelName, setMotelName] = useState('');
  const [motelId, setMotelId] = useState('');
  const [motelList, setMotelList] = useState([]);

  const [revenue, setRevenue] = useState(props.profile.buildingRevenue || 0);

  console.log('revenue', revenue);


  useEffect(() => {
    props.getMotelList(id);
    setMotelList(props.profile.motelList || []);
    setLoading(false);
  }, [id]);

  const columns = [
    { field: 'index', headerName: 'STT', headerAlign: 'center', width: 150, headerClassName: 'header-bold', align: 'center' },
    { field: 'name', headerName: 'Tên tòa nhà', width: 200, headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'phoneUser', headerName: 'Số điện thoại', width: 200, headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'addressUser', headerName: 'Địa chỉ', width: 600, headerAlign: 'center', headerClassName: 'header-bold' },
    {
      field: 'totalAll', headerName: 'Tổng doanh thu', width: 200, headerAlign: 'center', headerClassName: 'header-bold', renderCell: params => (
        <span>{params.row.totalAll.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
      )
    },
    {
      field: 'Danh sách các phòng',
      headerName: 'Danh sách các phòng',
      width: 200,
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
    {
      field: 'Xuất hóa đơn',
      headerName: 'Xuất hóa đơn',
      width: 200,
      renderCell: params => (
        <div className='export-btn' onClick={() => handleOpenModal(params.row._id, params.row.nameUser)}>
          <GetApp />
        </div>
      ),
      headerClassName: 'header-bold',
      align: 'center',
      headerAlign: 'center',
    }
  ];

  // Xây dựng cấu trúc dữ liệu cho DataGrid từ buildingRevenue
  const rows = [];

  for (const motelName in revenue) {
    console.log('motelName', motelName);
    const motelData = revenue[motelName].jsonMotel;
    if (!motelData) continue;

    rows.push({
      _id: motelData.idMotel, // Sử dụng idMotel làm id duy nhất
      index: rows.length + 1,
      name: motelData.name,
      phoneUser: motelData.phone,
      addressUser: motelData.address,
      totalAll: revenue[motelName].totalRevenue
    });
  }
  const handleButtonClick = useCallback((row) => {
    history.push(`/hostMotelRoom/${row._id}`);
  })

  const handleOpenModal = useCallback((id, motelname) => {
    setMotelName(motelname);
    setMotelId(id);
    setModal(true);
  }, []);

  const cancelToggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const getStartDay = useCallback((event) => {
    setStartDate(event.target.value);
  }, []);

  const getEndDay = useCallback((event) => {
    setEndDate(event.target.value);
  }, []);

  const handleExport = useCallback(async () => {
    if (!startDate || !endDate) {
      toast.error('Vui lòng chọn ngày bắt đầu và ngày kết thúc!');
      setModal(false);
    } else {
      if (startDate > endDate) {
        toast.error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc!');
        setModal(false);
      } else {
        try {
          // Đóng modal và reset date
          setModal(!modal);
          setLoading(true);
          const exportApi = urlLink.api.serverUrl + urlLink.api.exportBillBuilding + motelId + '/' + startDate + '/' + endDate;
          const response = await axios.get(exportApi);
          if (response) {
            setLoading(false);
            const status = response.data.data;
            const toastConfig = {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              hideProgressBar: false,
              pauseOnHover: true,
              draggable: true,
            };

            const showToast = (message, isError = true) => {
              toast[isError ? 'error' : 'success'](message, toastConfig);
              setModal(isError);
            };

            if (status === "Motel has no rented rooms") {
              showToast('Không có phòng nào được thuê trong thời gian này!');
            } else if (status === "Motel has no rooms with idMetter") {
              showToast('Không có phòng nào có idMetter!');
            } else if (status === "Motel has no floors") {
              showToast('Không có tầng nào trong tòa nhà!');
            } else if (status === "exportBillAllRoomSuccess") {
              showToast('Xuất hóa đơn thành công!', false);
              setLoading(false);
              setStartDate('');
              setEndDate('');
            } else {
              showToast('Có lỗi xảy ra, vui lòng thử lại!', true);
            }
          }

        } catch (error) {
          // Xử lý lỗi nếu có
          console.error('Error:', error);
        }
      }
    }

  }, [endDate, modal, startDate, motelId]);


  return (
    <div id='motelList' className="user-profile-wrapper container">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <div className="title-abc">
        <span>Quản lý các tòa nhà</span>
        <span>Người quản lý: <strong>{name}</strong></span>
      </div>

      {role.length === 2 && role.includes('master') && (
        <div className="card-wrap">
          {loading && <div className="loading-overlay" />}
          {motelList && motelList.length > 0 ? (
            <>
              <ModalComponent
                modal={modal}
                toggle={cancelToggle}
                modalTitle="Xuất hóa đơn"
                footer={
                  <div>
                    <Button color="secondary" onClick={cancelToggle}>Hủy</Button>{' '}
                    <Button color="primary" onClick={handleExport}>Xác nhận</Button>
                  </div>
                }
              >
                <FormGroup>
                  <Label for="startDateBackup">Từ ngày</Label>
                  <Input
                    id="startDateBackup"
                    name="date"
                    placeholder="Ngày bắt đầu..."
                    type="date"
                    // defaultValue={getFirstDayOfCurrentMonth()}
                    onChange={getStartDay}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="endDateBackup">Đến ngày</Label>
                  <Input
                    id="endDateBackup"
                    name="date"
                    placeholder="Ngày kết thúc..."
                    type="date"
                    // defaultValue={getCurrentDate()}
                    onChange={getEndDay}
                  />
                </FormGroup>
                <div>
                  Hóa đơn các phòng của tòa {motelName} sẽ được gửi vào email của bạn. Xác nhận xuất hóa đơn!
                </div>
              </ModalComponent>

              <div className='table-container'>
                <DataGrid
                  getRowId={row => row._id}
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  autoHeight
                />
              </div>

            </>
          ) : (
            <p className="text-center">Không có phòng</p>
          )}
        </div>
      )}
    </div>
  );
}

ManagerEnergyBuildingsAdmin.propTypes = {
  getMotelList: PropTypes.func.isRequired,
  // getBuildingRevenue: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectManagerBuildingHost(),
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
