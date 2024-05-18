/**
 *
 * ReportProblemList
 *
 */
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import InputForm from '../../components/InputForm';
import { getListReportProblem } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectReportProblemList from './selectors';
import './style.scss';
import { Avatar } from '@material-ui/core';

export function ReportProblemList(props) {
  useInjectReducer({ key: 'reportProblemList', reducer });
  useInjectSaga({ key: 'reportProblemList', saga });
  const { listReportProblem = [] } = props.reportProblemList;
  useEffect(() => {
    const data = {
      startDate,
      endDate,
    };
    props.getListReportProblem(data);
  }, []);
  const dateNow = new Date();
  const beforeNow = dateNow.setDate(dateNow.getDate() - 1);
  const [startDate, setStartDate] = useState(new Date(beforeNow));
  const [endDate, setEndDate] = useState(new Date());

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'idReportProblem',
      headerName: 'Mã Báo Cáo',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'dateReportProblem',
      headerName: 'Ngày Lập Báo Cáo',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'status',
      headerName: 'Trạng Thái',
      headerAlign: 'center',
      width: 350,
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
      field: 'description',
      headerName: 'Mô Tả',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'image',
      headerName: 'Ảnh MôTả',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
      // renderCell: params => {
      //   // eslint-disable-next-line no-unused-expressions
      //   return (
      //     <Avatar
      //       style={{
      //         width: '250px',
      //       }}
      //       variant="square"
      //       alt="Avatar"
      //       src={params.value}
      //     />
      //   );
      // },
      renderCell: params => (
        <a href={params.row.image} target="bank">
          LINK
        </a>
      ),
    },
  ];

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>Danh sách sự cố</title>
        <meta name="description" content="Description of ReportProblemList" />
      </Helmet>
      <div className="title">Danh sách báo cáo sự cố</div>
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
                props.getListReportProblem(data);
              }}
            >
              Tìm
            </Button>
          </Col>
        </Row>
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={listReportProblem}
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

ReportProblemList.propTypes = {
  getListReportProblem: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  reportProblemList: makeSelectReportProblemList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListReportProblem: payload => {
      dispatch(getListReportProblem(payload));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ReportProblemList);
