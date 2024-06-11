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

// http://localhost:3006/manage-monthly-order
// http://localhost:3006/manage-deposit
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
      field: 'name',
      headerName: 'Họ và tên',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'phoneNumberFull',
      headerName: 'Số điện thoại',
      headerAlign: 'center',
      align: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'profile',
      headerName: 'Thông tin cá nhân',
      headerAlign: 'center',
      align: 'center',

      width: 300,
      headerClassName: 'header-bold',
      align: 'center',
      renderCell: params => (
        <a
          className="btn-detail"
          onClick={() => {
            handleButtonClickProfile(params.row);
          }}
        >
          Xem chi tiết
        </a>
      ),
    },
    {
      field: 'numberBuilding',
      headerName: 'Số tòa',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      align: 'center',
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
      field: 'deposit',
      headerName: 'Thanh toán cọc',
      headerAlign: 'center',
      align: 'center',

      width: 300,
      headerClassName: 'header-bold',
      align: 'center',

      renderCell: params => (
        <a
          className="btn-detail"
          onClick={() => {
            handleButtonClickDeposit(params.row);
          }}
        >
          Xem chi tiết
        </a>
      ),
    },
    {
      field: 'monthly',
      headerName: 'Thanh toán hàng tháng',
      headerAlign: 'center',
      align: 'center',

      width: 300,
      headerClassName: 'header-bold',
      align: 'center',

      renderCell: params => (
        <a
          className="btn-detail"
          onClick={() => {
            handleButtonClickMonthly(params.row);
          }}
        >
          Xem chi tiết
        </a>
      ),
    },
    {
      field: 'revenue',
      headerName: 'Doanh thu',
      headerAlign: 'center',
      align: 'center',

      width: 300,
      headerClassName: 'header-bold',
      align: 'center',

      renderCell: params => (
        <a
          className="btn-detail"
          onClick={() => {
            handleButtonClickRevenue(params.row);
          }}
        >
          Xem chi tiết
        </a>
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

  const { hosts = [] } = props.buildingHost;
  console.log('hosts', hosts);

  let hostData = [];
  if (hosts) {
    if (hosts.length > 0) {
      hostData = hosts.map((host, index) => ({
        index: index + 1,
        name: host.lastName + host.firstName,
        ...host,
      }))
    }
  }

  console.log({ hostData });

  const handleButtonClick = row => {
    history.push(
      `/admin/manage-motel-list/${row._id}/${row.firstName} ${row.lastName}`,
    );
  };
  const handleButtonClickDeposit = row => {
    history.push(
      `/admin/manage-deposit/${row._id}/${row.firstName} ${row.lastName}`,
    );
  };
  const handleButtonClickMonthly = row => {
    history.push(
      `/admin/manage-monthly/${row._id}/${row.firstName} ${row.lastName}`,
    );
  };

  const handleButtonClickRevenue = row => {
    history.push(
      `/admin/hostRevenue/${row._id}`,
    );
  };
  const handleButtonClickProfile = row => {
    history.push(
      `/admin/users/${row._id}`,
    );
  };

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
            rows={hostData}
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
