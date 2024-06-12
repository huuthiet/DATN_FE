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
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export function ManageDepositAdmin(props) {
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
  }, [id]);

  const { motelList = [] } = props.motelListByOwner;
  const columns = [
    {
      field: 'index',
      headerName: <FormattedMessage {...messages.STT} />,
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
      align: 'center'
    },
    {
      field: 'name',
      headerName: <FormattedMessage {...messages.BuildingName} />,
      width: 250,
      headerAlign: 'center',
      headerClassName: 'header-bold'
    },
    {
      field: 'address',
      headerName: <FormattedMessage {...messages.Address} />,
      width: 700,
      headerAlign: 'center',
      headerClassName: 'header-bold'
    },
    {
      field: 'action-1',
      headerName: <FormattedMessage {...messages.ManageDeposit} />,
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params =>
      // eslint-disable-next-line no-unused-expressions
      (
        <>
          <a
            className="btn-detail"
            onClick={() => {
              history.push(`/manage-deposit/accept-deposit/${params.row._id}`);
            }}
          >
            <FormattedMessage {...messages.Detail} />
          </a>
        </>
      )
    },
    {
      field: 'action-2',
      headerName: <FormattedMessage {...messages.ManageCheckInCost} />,
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
      renderCell: params =>
      // eslint-disable-next-line no-unused-expressions
      (
        <>
          <a
            className="btn-detail"
            onClick={() => {
              history.push(
                `/manage-deposit/accept-after-check-in-cost/${params.row._id}`,
              );
            }}
          >
            <FormattedMessage {...messages.Detail} />
          </a>
        </>
      )
    },
    {
      field: 'action-3',
      headerName: <FormattedMessage {...messages.ManageBill} />,
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
                history.push(`/manage-deposit/order-deposit-pending-payment/${params.row._id}/${params.row.name}`);
              }}
            >
              <FormattedMessage {...messages.Detail} />
            </a>
          </>
        );
      },
    },
    {
      field: 'action-4',
      headerName: <FormattedMessage {...messages.RefundDeposit} />,
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params =>
      // eslint-disable-next-line no-unused-expressions
      (
        <>
          <a
            className="btn-detail"
            onClick={() => {
              history.push(`/manage-deposit/pay-deposit/${params.row._id}`);
            }}
          >
            <FormattedMessage {...messages.Detail} />
          </a>
        </>
      )
    },
    {
      field: 'action-5',
      headerName: <FormattedMessage {...messages.DepositHistory} />,
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      renderCell: params =>
      // eslint-disable-next-line no-unused-expressions
      (
        <>
          <a
            className='btn-detail'
            onClick={() => {
              console.log()
              history.push(`/manage-deposit/history-deposit-aftercheckincost/motel/${params.row._id}/${params.row.name}`);
            }}
          >
            <FormattedMessage {...messages.Detail} />
          </a>
        </>
      )
    },
  ];

  // Xây dựng cấu trúc dữ liệu cho DataGrid từ buildingRevenue
  let rows = [];
  // if(motelList) {
  if (motelList.length > 0) {
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
        <title>Manage Deposit</title>
        <meta name="description" content="Description of Manage Deposit" />
      </Helmet>
      <div className="title-abc">
        <span>
          <FormattedMessage {...messages.Header} />
        </span>
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

ManageDepositAdmin.propTypes = {
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

export default compose(withConnect)(ManageDepositAdmin);
