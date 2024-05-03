import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'reactstrap';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid từ Material-UI
import localStore from 'local-storage';
import { useHistory } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getMotelList } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectManagerBuildingHost from './selectors';
import './style.scss';
import 'react-toastify/dist/ReactToastify.css';

export function ManagerEnergyHostAdmin(props) {
  const columns = [
    {
      field: 'index',
      headerName: 'STT',
      headerAlign: 'center',
      align: 'center',
      width: 150,
    },
    {
      field: 'firstName',
      headerName: 'Họ và tên',
      headerAlign: 'center',
      width: 320,
      headerClassName: 'header-bold',
    },
    {
      field: 'phoneNumberFull',
      headerName: 'Số điện thoại',
      headerAlign: 'center',
      align: 'center',
      width: 300,
      headerClassName: 'header-bold',
    },
    {
      field: 'Danh sách các tòa',
      headerName: 'Danh sách các tòa nhà',
      headerAlign: 'center',
      align: 'center',

      width: 300,
      headerClassName: 'header-bold',
      align: 'center',

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
    },
    {
      field: 'hostBuildingRevenue',
      headerName: 'Doanh thu (VND)',
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
      renderCell: params => (
        <span>
          {params.row.hostBuildingRevenue.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      ),
    },
  ];

  useInjectReducer({ key: 'motelprofileList', reducer });
  useInjectSaga({ key: 'motelprofileList', saga });

  const currentUser = localStore.get('user') || {};
  const { role = [] } = currentUser;
  const history = useHistory();

  useEffect(() => {
    props.getMotelList();
  }, []);

  const { hosts } = props.buildingHost;
  console.log('hosts', hosts);

  const handleButtonClick = row => {
    history.push(
      `/admin/manage-motel-list/${row._id}/${row.firstName} ${row.lastName}`,
    );
  };

  // Tạo mảng arrData với STT là số đếm thứ tự
  const arrData = hosts
    ? hosts.map((host, index) => ({
      ...host,
      index: index + 1,
    }))
    : [];

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Danh sách các chủ trọ</title>
        <meta name="description" content="Description of Manager Energy Host" />
      </Helmet>
      <div className="title-abc">Danh sách các chủ trọ</div>

      <div className="user-profile">
        {hosts && role.length === 2 && role.includes('master') && (
          <DataGrid
            getRowId={row => row._id}
            rows={arrData}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
            autoHeight
          />
        )}
      </div>
    </div>
  );
}

ManagerEnergyHostAdmin.propTypes = {
  getMotelList: PropTypes.func.isRequired,
  buildingHost: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  buildingHost: makeSelectManagerBuildingHost(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotelList: () => {
      dispatch(getMotelList());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ManagerEnergyHostAdmin);
