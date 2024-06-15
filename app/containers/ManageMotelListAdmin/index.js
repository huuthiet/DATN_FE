import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import localStore from 'local-storage';
import { useHistory, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  getMotelList,
  changeStoreData,
  deleteMotel,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import makeSelectManagerBuildingHost from './selectors';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';

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

  useEffect(() => {
    props.getMotelList(id);
    // setMotelList(props.profile.buildingRevenue || []);
    // setLoading(false);
  }, [id]);

  const {
    motelList = [],
    showSuccessPopup,
    showErrorPopup,
    showWarningPopup,
  } = props.motelListByOwner;

  // console.log('check props: ', motelList);
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
      field: 'file',
      headerName: <FormattedMessage {...messages.BuildingImage} />,
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: (params) => {
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
    {
      field: 'address',
      headerName: <FormattedMessage {...messages.Address} />,
      width: 700,
      headerAlign: 'center',
      headerClassName: 'header-bold'
    },
    {
      field: 'totalRoom',
      headerName: <FormattedMessage {...messages.RoomQuantity} />,
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      align: 'center',
    },
    {
      field: 'rentedRoom',
      headerName: <FormattedMessage {...messages.Rented} />,
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
      align: 'center',
    },
    {
      field: 'depositedRoom',
      headerName: <FormattedMessage {...messages.Deposited} />,
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
      align: 'center',
    },
    {
      field: 'listRoom',
      headerAlign: 'center',
      headerName: <FormattedMessage {...messages.RoomList} />,
      width: 300,
      renderCell: params => (
        <a
          className="btn-detail"
          onClick={() => {
            handleButtonClick(params.row);
          }}
        >
          <FormattedMessage {...messages.Detail} />
        </a>
      ),
      headerClassName: 'header-bold',
      align: 'center',
    },
    {
      field: 'delete',
      headerAlign: 'center',
      headerName: <FormattedMessage {...messages.DeleteBuilding} />,
      width: 200,
      renderCell: params => (
        <Button
          onClick={() => {
            handleDeleteMotel(params.row._id);
          }}
          color="danger"
        >
          <FormattedMessage {...messages.Delete} />
        </Button>
      ),
      headerClassName: 'header-bold',
      align: 'center',
    },
  ];

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
      _id: motel._id,
    }));
  }
  // }

  console.log({ rows });

  const handleButtonClick = useCallback((row) => {
    // history.push(`/hostMotelRoom/${row._id}`);
    // history.push(`/room-detail/${row._id}`);
    history.push(`/historyRoomHost/room/${row._id}`);
  })

  const [idMotel, setIdMotel] = useState('');

  const handleDeleteMotel = (idMotel) => {
    props.changeStoreData('showWarningPopup', true);
    setIdMotel(idMotel);
  }

  const handleOpenModal = useCallback((id, motelname) => {
    setMotelName(motelname);
    setMotelId(id);
    setModal(true);
  }, []);

  return (
    <div id='motelList' className="user-profile-wrapper container">
      <Helmet>
        <title>Manage Motels</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <div className="title-abc">
        <span>
          <FormattedMessage {...messages.Header} />
        </span>
        <span>
          <FormattedMessage {...messages.HostName} />
          <strong>{name}</strong>
        </span>
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
      <SuccessPopup
        visible={showSuccessPopup}
        content={<FormattedMessage {...messages.detelesuccess} />}
        toggle={() => {
          props.changeStoreData('showSuccessPopup', !showSuccessPopup);
        }}
      />
      <SuccessPopup
        visible={showErrorPopup}
        content={<FormattedMessage {...messages.errorMessage} />}
        toggle={() => {
          props.changeStoreData('showErrorPopup', !showErrorPopup);
        }}
      />
      <WarningPopup
        visible={showWarningPopup}
        content={<FormattedMessage {...messages.ConfirmDeleteBuilding} />}
        callBack={() => props.deleteMotel(idMotel, id)}
        toggle={() => {
          props.changeStoreData('showWarningPopup', false);
        }}
      />
    </div>
  );
}

ManagerEnergyBuildingsAdmin.propTypes = {
  getMotelList: PropTypes.func.isRequired,
  // getBuildingRevenue: PropTypes.func.isRequired,
  // motelListByOwner: PropTypes.object.isRequired,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  motelListByOwner: makeSelectManagerBuildingHost(),
  // buildingRevenue: makeSelectBuildingRevenue(),

});

function mapDispatchToProps(dispatch) {
  return {
    getMotelList: id => dispatch(getMotelList(id)),
    // getBuildingRevenue: id => dispatch(getBuildingRevenue(id)),
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    deleteMotel: (id, idHost) => {
      dispatch(deleteMotel(id, idHost));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ManagerEnergyBuildingsAdmin);
