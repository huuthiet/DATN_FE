/**
 *
 * Manager Energy
 *
 */

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';

import { Helmet } from 'react-helmet';

import './style.scss';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { DataGrid } from '@mui/x-data-grid';
import reducer from './reducer';
import saga from './saga';

import { getDataEnergyPerMonth } from './actions';
import makeSelectEnergyBilling from './selectors';
import { convertDate } from '../../../helper/format';



const RoomBillingManage = props => {
  useInjectReducer({ key: 'energyBilling', reducer });
  useInjectSaga({ key: 'energyBilling', saga });

  const { roomId } = useParams();

  useEffect(() => {
    props.getEnergyBilling(roomId);
  }, []);

  const { energyBilling } = props.energyBilling;

  console.log('energyBilling', energyBilling);

  const columns = [
    { field: '_id', headerName: 'Id', headerAlign: 'center', width: 150 },
    {
      field: 'IdDevice',
      headerName: 'Mã đồng hồ',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'FromTime',
      headerName: 'Thời gian bắt đầu đo',
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
      renderCell: params => <p style={{}}>{convertDate(params.value)}</p>,
    },
    {
      field: 'ToTime',
      headerName: 'Thời gian đo cuối',
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
      renderCell: params => <p>{convertDate(params.value)}</p>,
    },
    {
      field: 'TotalKWh',
      headerName: 'Số điện tiêu thụ (KwH)',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      renderCell: params => <p>{Math.round(params.value)} (KwH)</p>,
    },
    {
      field: 'Water',
      headerName: 'Số nước tiêu thụ (m3)',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => <p>{params.value} (m3)</p>,
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => <p>{convertDate(params.value)}</p>,
    },
  ];

  return (
    <div className="container">
      <Helmet>
        <title>Quản lý tiền điện nước</title>
        <meta name="description" content="Description of Energy" />
      </Helmet>
      <div className="title-abc">Quản lý tiền điện nước phòng</div>
      <div className="admin-users-wrapper container-fuild">
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row._id}
            rows={energyBilling}
            columns={columns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
          />
        </div>
      </div>
    </div>
  );
};

RoomBillingManage.propTypes = {
  dispatch: PropTypes.func,
  getEnergyBilling: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  energyBilling: makeSelectEnergyBilling(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEnergyBilling: roomId => {
      dispatch(getDataEnergyPerMonth(roomId));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default RoomBillingManage;
export default compose(withConnect)(RoomBillingManage);
