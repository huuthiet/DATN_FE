/**
 *
 * HostMotelRoom
 *
 */
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import InputForm from '../../components/InputForm';
import { getListBill } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectBillListAdmin from './selectors';
import { urlLink } from '../../helper/route';
import localStoreService from 'local-storage';
import './style.scss';
import axios from 'axios';
import * as fileDownload from 'js-file-download';
import { notificationController } from '../../controller/notificationController';
import Money from '../../helper/format';
export function BillListAdmin(props) {
  useInjectReducer({ key: 'billListAdmin', reducer });
  useInjectSaga({ key: 'billListAdmin', saga });
  const { listBill = [] } = props.billListAdmin;
  const history = useHistory();
  useEffect(() => {
    const data = {
      startDate,
      endDate,
    };
    props.getListBill(data);
  }, []);
  const dateNow = new Date();
  const beforeNow = dateNow.setDate(dateNow.getDate() - 1);
  const [startDate, setStartDate] = useState(new Date(beforeNow));
  const [endDate, setEndDate] = useState(new Date());

  const downloadFile = async id => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStoreService.get('user').token}`,
      },
    };
    const requestUrl =
      urlLink.api.serverUrl + urlLink.api.Adminbill + '/pdf/' + id;
    try {
      const response = await axios.post(
        requestUrl,
        null,
        {
          responseType: 'blob',
        },
        config,
      );
      fileDownload(response.data, 'export.pdf');
      notificationController.success('Xuất Hóa Đơn Thành Công');
    } catch (err) {
      notificationController.error('Xuất Hóa Đơn Không Thành Công');
    }
  };

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'idBill',
      headerName: 'Mã Hóa Đơn',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'dateBill',
      headerName: 'Ngày Lập Hóa Đơn',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameMotel',
      headerName: 'Khu Trọ',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameRoom',
      headerName: 'Tên Phòng',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameUser',
      headerName: 'Khách Thuê',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'phoneUser',
      headerName: 'SĐT Khách',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'totalAll',
      headerName: 'Tổng Hóa Đơn',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
      renderCell: params => {
        return <div>{Money(params.row.totalAll)}</div>;
      },
    },
    {
      field: 'bill',
      headerName: 'Xuất Hóa Đơn',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        return (
          <Button
            onClick={() => {
              // eslint-disable-next-line no-underscore-dangle
              downloadFile(params.row._id);
            }}
            color="primary"
          >
            Xuất Hóa Đơn
          </Button>
        );
      },
    },
  ];

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>Danh sách hóa đơn</title>
        <meta name="description" content="Description of BillListAdmin" />
      </Helmet>
      <div className="title">Danh sách hóa đơn</div>
      <div className="job-list-wrapper container-fluid">
        <Row>
          <Col md={4}>
            <Row>
              <Col md={6}>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  selected={startDate}
                  onChange={date => {
                    setStartDate(date);
                  }}
                  customInput={<InputForm label="Từ" icon="fa fa-calendar" />}
                />
              </Col>
              <Col md={6}>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  selected={endDate}
                  onChange={date => {
                    setEndDate(date);
                  }}
                  customInput={<InputForm label="Đến" icon="fa fa-calendar" />}
                />
              </Col>
            </Row>
          </Col>
          <Col md={2}>
            <Button
              color="primary"
              className="btn-block mt-4"
              onClick={() => {
                const data = {
                  startDate,
                  endDate,
                };
                props.getListBill(data);
              }}
            >
              Tìm
            </Button>
          </Col>
        </Row>
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={listBill}
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

BillListAdmin.propTypes = {
  getListBill: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  billListAdmin: makeSelectBillListAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListBill: payload => {
      dispatch(getListBill(payload));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BillListAdmin);
