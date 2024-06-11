/**
 *
 * HostMotelRoom
 *
 */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as XLSX from 'xlsx-color';
import { getListRoom, getHostRevenue, postWithdraw } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectHostMotelRoomDetailUser, { makeSelectHostRevenue } from './selectors';
import { makeSelectWithdraw } from './selectors';

import './style.scss';
import { toast } from 'react-toastify';
import LineChart from '../../components/LineChartRevenue';
import LineChartElectric from '../../components/LineChartElectric';
import { MonetizationOn, Payment, Power } from '@material-ui/icons';
import ModalComponent from './modal';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import { urlLink } from '../../helper/route';
import axios from 'axios';
import { set } from 'lodash';
import { FormattedMessage } from 'react-intl';
import messages from './messages';



export function HostMotelRoomDetailUser(props) {
  useInjectReducer({ key: 'hostMotelRoomDetailUser', reducer });
  useInjectSaga({ key: 'hostMotelRoomDetailUser', saga });
  const { listRoom = [] } = props.hostMotelRoomDetailUser;
  console.log('check props: ', props);
  const { hostRevenue } = props.hostMotelRoomDetailUser;
  console.log('hostRevenueData', hostRevenue);
  //get user data
  let totalRevenue = 0;
  let totalRoomPrice = 0;
  let totalElectricPrice = 0;

  if (hostRevenue) {
    totalRevenue = hostRevenue.total; //Tổng tất cả tiền
    totalElectricPrice = hostRevenue.totalElectricPrice;
    totalRoomPrice = hostRevenue.totalRevenue; //Tiền phòng (tương đương doanh thu)
  }

  // Define the formatter
  const vndFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  const { id = '' } = useParams();
  useEffect(() => {
    const data = {
      id,
    };
    props.getListRoom(data);
  }, []);
  const roomEntries = Object.entries(listRoom);
  console.log('roomEntries', roomEntries);

  // Extract the motels object from roomEntries
  const motelsEntry = roomEntries.find(([key]) => key === 'motels');
  const motels = motelsEntry ? motelsEntry[1] : {};

  // Convert motels object to array of [key, value] pairs
  const motelsArray = Object.entries(motels);
  const [isOpen, setIsOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedBuilding, setSelectedBuilding] = useState('Chọn tòa nhà');
  const [motelId, setMotelId] = useState('');
  const [modal, setModal] = useState(false);
  const [bankData, setBankData] = useState({});
  const [selectedBank, setSelectedBank] = useState('');

  const years = ["Chọn năm"];
  for (let i = 2000; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }

  const handleSelectBuilding = (value, key) => {
    setMotelId(value);
    setSelectedBuilding(key);
    setIsOpen(false);
  };

  const handleFilter = () => {
    if (selectedBuilding === 'Chọn tòa nhà') {
      toast.error('Vui lòng chọn tòa nhà và tháng cần xem doanh thu');
      return;
    }

    const data = {
      selectedBuilding: motelId,
      selectedYear: selectedYear,
    };

    props.getHostRevenue(data);
  };

  const getCurrentMonthData = (monthlyRevenue) => {
    const currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại
    const currentMonthData = monthlyRevenue.find(item => {
      const [month, year] = item.time.split('/'); // Tách tháng và năm từ chuỗi 'time'
      return parseInt(month) === currentMonth; // So sánh với tháng hiện tại
    });
    return currentMonthData || {}; // Trả về dữ liệu của tháng hiện tại hoặc một đối tượng rỗng nếu không có dữ liệu
  };

  // Lấy dữ liệu cho tháng hiện tại
  const currentMonthData = getCurrentMonthData(hostRevenue.monthlyRevenue || []);

  // Lấy giá trị doanh thu, electricNumber và electricPrice của tháng hiện tại
  const currentMonthRevenue = currentMonthData.revenue || 0;
  const currentMonthElectricNumber = currentMonthData.electricNumber || 0;
  const currentMonthElectricPrice = currentMonthData.electricPrice || 0;

  console.log('currentMonthRevenue', currentMonthRevenue);
  console.log('currentMonthElectricNumber', currentMonthElectricNumber);
  console.log('currentMonthElectricPrice', currentMonthElectricPrice);






  const exportFile = async () => {
    const data = hostRevenue || []; // Sử dụng dữ liệu từ hostRevenueData
    const arrData = data.map((obj, index) => ({
      'STT': index + 1,
      'Thời gian': obj.time,
      'Doanh thu': obj.revenue,
    }));

    // Định dạng cho tiêu đề
    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center' },
      fill: { fgColor: { rgb: 'FFC000' } } // Màu cam
    };

    // Định dạng cho dữ liệu
    const dataStyle = {
      font: { bold: false },
      alignment: { horizontal: 'left' },
      fill: { fgColor: { rgb: 'FFFFFF' } } // Màu trắng
    };

    const wscols = [
      { wch: 5 }, // Độ rộng của cột STT
      { wch: 15 }, // Độ rộng của cột Thời gian
      { wch: 20 }, // Độ rộng của cột Doanh thu
    ];

    const worksheet = XLSX.utils.json_to_sheet(arrData);
    worksheet['!cols'] = wscols;

    // Thêm hàng tiêu đề
    XLSX.utils.sheet_add_aoa(worksheet, [['Số thứ tự', 'Thời gian', 'Doanh thu']], { origin: 'A1' });

    // Định dạng tiêu đề
    const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    for (let c = headerRange.s.c; c <= headerRange.e.c; c++) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: headerRange.s.r, c })];
      cell.s = headerStyle;
    }

    // Định dạng dữ liệu
    const dataRange = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = 1; R <= dataRange.e.r; ++R) {
      for (let C = dataRange.s.c; C <= dataRange.e.c; ++C) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
        cell.s = dataStyle;
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Thêm biểu đồ
    const chart = {
      type: 'bar',
      data: arrData.map(obj => obj['Doanh thu']),
      labels: arrData.map(obj => obj['Thời gian']),
    };
    XLSX.utils.book_append_sheet(workbook, chart, 'Chart1');

    if (arrData.length > 0) {
      XLSX.writeFile(workbook, 'Report.xlsx');
    }
  };

  const handleWithdrawRequest = () => {
    if (selectedBuilding === 'Chọn tòa nhà') {
      toast.error('Vui lòng chọn tòa nhà');
      return;
    }
    setModal(true);
    const userBankRequest = urlLink.api.serverUrl + urlLink.api.getBankUser;
    console.log('userBankRequest', userBankRequest);
    const data = { id };

    axios.get(userBankRequest, { params: data })
      .then((response) => {
        console.log('response', response.data.data.data);
        const fetchedData = response.data.data.data;
        if (Array.isArray(fetchedData)) {
          setBankData(fetchedData); // Ensure data is an array
          if (fetchedData.length > 0) {
            setSelectedBank(fetchedData[0]._id); // Set the first bank as the default selected
          }
        } else {
          setBankData([]); // Set as empty array if data is not an array
        }
      })
      .catch((error) => {
        console.log('error', error);
        setBankData([]); // Set as empty array on error
      });
  };

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  const getSelectedBankAccountNumber = () => {
    if (Array.isArray(bankData)) {
      const selectedBankData = bankData.find(bank => bank._id === selectedBank);
      return selectedBankData ? selectedBankData.stk : '';
    }
    return '';
  };



  const handleSendWithdrawRequest = () => {
    const bankId = selectedBank;
    const accountNumber = getSelectedBankAccountNumber();
    const withdrawAmount = document.getElementById('withdrawAmount').value;
    const withdrawReason = document.getElementById('withdrawReason').value;

    //create getRandomHex function
    function getRandomHex() {
      // Generate a random 32-bit integer
      const randomInt = Math.floor(Math.random() * 0xFFFFFFFF);
      // Convert the integer to a hexadecimal string and ensure it is 8 characters long
      const hexString = randomInt.toString(16).toUpperCase().padStart(8, '0');
      return hexString;
    }
    const keyPayment = getRandomHex();
    console.log('keyPayment', keyPayment);

    if (!withdrawAmount) {
      toast.error('Vui lòng nhập số tiền cần rút');
      return;
    }

    if (!withdrawReason) {
      toast.error('Vui lòng nhập lý do rút tiền');
      return;
    }

    if (withdrawAmount > hostRevenue.totalRevenue) {
      toast.error('Số tiền rút phải nhỏ hơn tổng doanh thu');
      return;
    }

    const withdrawRequest = urlLink.api.serverUrl + urlLink.api.withdrawRequest;
    //create current date format "yyyy-mm"
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const requestDate = `${year}-${month}`;


    const data = {
      id,
      keyPayment,
      requestDate,
      //motel name
      motelName: selectedBuilding,
      bankId,
      accountNumber,
      withdrawAmount,
      withdrawReason,
      type: 'cash',
    };
    console.log('data', data);
    setModal(false);
    //reset form
    document.getElementById('withdrawAmount').value = '';
    document.getElementById('withdrawReason').value = '';
    props.postWithdraw(data);
    if (data) {
      toast.success('Gửi yêu cầu rút tiền thành công');
    } else {
      toast.error('Gửi yêu cầu rút tiền thất bại');

    }

  }

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>Quản lý doanh thu</title>
        <meta
          name="description"
          content="Description of HostRevenue"
        />
      </Helmet>
      <div className="title">
        <FormattedMessage {...messages.Header} />
      </div>
      <div className="job-list-wrapper container-fluid">
        <Row className="action-container">
          <ModalComponent
            modal={modal}
            toggle={() => setModal(!modal)}
            className="modal-lg"
            modalTitle="Xác nhận yêu cầu rút tiền"
            footer={
              <>
                <Button color="secondary" onClick={() => setModal(!modal)}>
                  <FormattedMessage {...messages.Cancel} />
                </Button>
                <Button color="primary" onClick={handleSendWithdrawRequest}>
                  <FormattedMessage {...messages.Send} />
                </Button>
              </>
            }
          >
            <Row>
              <Col md={12}>
                <Form>
                  <FormGroup>
                    <Label for="bankName">
                      <FormattedMessage {...messages.Bank} />
                    </Label>
                    <Input
                      type="select"
                      name="bankName"
                      id="bankName"
                      value={selectedBank}
                      onChange={handleBankChange}
                    >
                      {bankData.length > 0 ? (
                        bankData.map(bank => (
                          <option key={bank._id} value={bank._id}>
                            {bank.nameTkLable}
                          </option>
                        ))
                      ) : (
                        <option>
                          <FormattedMessage {...messages.NoData} />
                        </option>
                      )}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="accountNumber">
                      <FormattedMessage {...messages.BankAccount} />
                    </Label>
                    <Input
                      type="text"
                      name="accountNumber"
                      id="accountNumber"
                      value={getSelectedBankAccountNumber()}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="withdrawAmount">
                      <FormattedMessage {...messages.AmountToWithdraw} />
                    </Label>
                    <Input
                      type="text"
                      name="withdrawAmount"
                      id="withdrawAmount"
                      placeholder="Nhập số tiền cần rút"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="withdrawReason">
                      <FormattedMessage {...messages.Note} />
                    </Label>
                    <Input
                      type="textarea"
                      name="withdrawReason"
                      id="withdrawReason"
                    />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </ModalComponent>
          <Row>
          </Row>
          <Col xs={12} sm={2}>
            <Dropdown isOpen={yearDropdownOpen} toggle={() => setYearDropdownOpen(!yearDropdownOpen)} className="mt-4 room-dropdown-container">
              <DropdownToggle caret color="none" className="room-dropdown custom-dropdown-toggle">
                {selectedYear}
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu">
                {years.map((year, index) => (
                  <DropdownItem key={index} onClick={() => setSelectedYear(year, index)} className='dropdown-item'>
                    <span className='dropdown-key'>{year}</span>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col xs={12} sm={2}>
            <Dropdown
              isOpen={isOpen}
              toggle={() => setIsOpen(!isOpen)}
              className="mt-4 room-dropdown-container"
            >
              <DropdownToggle
                caret
                color="none"
                className="room-dropdown"
              >
                {selectedBuilding}
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu">
                {motelsArray.length > 0 ? (
                  motelsArray.map(([key, value]) => (
                    <DropdownItem
                      key={key}
                      value={value}
                      className="dropdown-item"
                      onClick={() => handleSelectBuilding(value, key)}
                    >
                      <span className="dropdown-key">{key}</span>
                    </DropdownItem>
                  ))
                ) : (
                  <DropdownItem>
                    <FormattedMessage {...messages.NoData} />
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col xs={12} sm={5}>
            <Row>
              <Col md={3}>
                <Button
                  color="primary"
                  className="btn-block mt-4"
                  onClick={handleFilter}
                >
                  {<FormattedMessage {...messages.Search} />}
                </Button>
              </Col>
              <Col md={3}>
                <Button
                  onClick={exportFile}
                  color="success"
                  className="btn-block mt-4"
                >
                  {<FormattedMessage {...messages.Export} />}
                </Button>
              </Col>
              <Col md={5}>
                <Button
                  onClick={handleWithdrawRequest}
                  color="primary"
                  className="btn-block mt-4"
                >
                  {<FormattedMessage {...messages.Withdraw} />}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="revenueData-container">
          <Col xs={12} sm={3} className="totalRevenue-container">
            <div className="totalRevenue">
              <div className='icon-container'>
                <MonetizationOn />
              </div>
              <div className='revenueText-container'>
                <span className="totalRevenue-text">
                  <FormattedMessage {...messages.Total} />
                </span>
                <span className="totalRevenue-number">
                  {totalRevenue ? vndFormatter.format(totalRevenue) : 'Không có dữ liệu'}</span>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={4} className="totalRevenue-container">
            <div className="totalRevenue">
              <div className='icon-container'>
                <MonetizationOn />
              </div>
              <div className='revenueText-container'>
                <span className="totalRevenue-text">
                  <FormattedMessage {...messages.TotalRoomPrice} />
                </span>
                <span className="totalRevenue-number">
                  {totalRoomPrice ? vndFormatter.format(totalRoomPrice) : 'Không có dữ liệu'}</span>
              </div>

            </div>
          </Col>
          <Col xs={12} sm={4} className="totalRevenue-container">
            <div className="totalRevenue">
              <div className='icon-container'>
                <Payment />
              </div>
              <div className='revenueText-container'>
                <span className="totalRevenue-text">
                  <FormattedMessage {...messages.CurrentMonth} />
                </span>
                <span className="totalRevenue-number">
                  {currentMonthRevenue ? vndFormatter.format(currentMonthRevenue) : 'Không có dữ liệu'}</span>
              </div>
            </div>
          </Col>
          {/* <Col xs={12} sm={3} className="totalRevenue-container">
            <div className="totalRevenue">
              <div className='icon-container'>
                <Power />
              </div>
              <div className='revenueText-container'>
                <span className="totalRevenue-text">
                  <FormattedMessage {...messages.Electric} />
                </span>
                <span className="totalRevenue-number">
                  {currentMonthElectricPrice ? vndFormatter.format(currentMonthElectricPrice) : 'Không có dữ liệu'}
                </span>
              </div>
            </div>
          </Col> */}
        </Row>
        <Row className="dashboard-container">
          <Col xs={12} sm={7} className="compare-container">
            <LineChart
              textY="Doanh thu"
              nameChart="Doanh thu"
              hostRevenue={hostRevenue ? hostRevenue.monthlyRevenue : []}
            />
          </Col>
          <Col xs={12} sm={4} className="compare-container">
            <LineChartElectric
              textY="Tỉ lệ doanh thu và tiền điện"
              nameChart="Tỉ lệ doanh thu và tiền điện"
              hostRevenue={hostRevenue ? hostRevenue.monthlyRevenue : []}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

HostMotelRoomDetailUser.propTypes = {
  getListRoom: PropTypes.func,
  getHostRevenue: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  hostMotelRoomDetailUser: makeSelectHostMotelRoomDetailUser(),
  hostRevenueData: makeSelectHostRevenue(),
  withdraw: makeSelectWithdraw(),
});


function mapDispatchToProps(dispatch) {
  return {
    getListRoom: id => {
      dispatch(getListRoom(id));
    },
    getHostRevenue: data => {
      dispatch(getHostRevenue(data));
    },
    postWithdraw: data => {
      dispatch(postWithdraw(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HostMotelRoomDetailUser);
