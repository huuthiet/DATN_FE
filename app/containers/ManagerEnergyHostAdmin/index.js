import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
} from 'reactstrap';

import { Card, CircularProgress, Paper, makeStyles } from '@material-ui/core';
import {
  ArrowForwardIos,
  Backup,
  Delete,
  InsertDriveFile,
  LocalPhone,
} from '@material-ui/icons';

import localStore, { set } from 'local-storage';
import { useHistory } from 'react-router-dom';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { getMotelList } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectManagerBuildingHost from './selectors';
import './style.scss';
import { urlLink } from '../../helper/route';
import ModalComponent from './modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Popover, Divider, List } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  input: {
    display: 'none',
  },
  moreStyle: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: '5px',
    width: '100%',
    backgroundColor: 'transparent',
    padding: '8px',
    border: 'none',
    borderRadius: '6px',
    textAlign: 'left',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  iconStyle: {
    color: 'gray',
    fontSize: '18px',
  },
  listStyle: {
    display: 'flex',

    flexDirection: 'column',
    gap: '5px',
    backgroundColor: 'white',
    width: '200px',
    border: 'none',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '2px 2px 20px 3px rgba(0, 0, 0, 0.03)',
  },
  popoverButton: {
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    cursor: 'pointer',
    color: 'gray',
    transition: 'background-color 0.3s, color 0.3s',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      color: 'black',
    },
  },
}));
export function ManagerEnergyHostAdmin(props) {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  // const classes = useStyles();
  useInjectReducer({ key: 'motelprofileList', reducer });
  useInjectSaga({ key: 'motelprofileList', saga });

  const currentUser = localStore.get('user') || {};
  const { role = [] } = currentUser;
  const history = useHistory();

  useEffect(() => {
    props.getMotelList();
  }, []);
  console.log(props);
  const { hosts = [] } = props.motelprofileList;
  console.log("hosts admin", hosts);

  const toggle = () => {
    setModal(!modal);
    //close popover
    handleClose();

  };
  const [loading, setLoading] = useState(false);
  const [clear_data_modal, set_clear_data_modal] = useState(false);
  const [export_bill_modal, set_export_bill_modal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [formattedStartDate, setFormattedStartDate] = useState('');

  const [endDate, setEndDate] = useState('');
  const [formattedEndDate, setFormattedEndDate] = useState('');

  const [startDateBackup, setStartDateBackup] = useState('');
  const [formattedStartDateBackup, setFormattedStartDateBackup] = useState('');

  const [endDateBackup, setEndDateBackup] = useState('');
  const [formattedEndDateBackup, setFormattedEndDateBackup] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const toggle_clear_data = () => {
    set_clear_data_modal(!clear_data_modal);
    //close popover
    handleClose();

  };
  const toggle_export_bill = () => {
    set_export_bill_modal(!export_bill_modal);
    //close popover
    handleClose();

  };

  const toggle_confirm = () => setConfirmModal(!confirmModal);

  const handleConfirmPassword = () => {
    setConfirmModal(!confirmModal);
    set_clear_data_modal(!clear_data_modal);
  };

  const handleGetHostInfo = async () => {
    setLoading(true);
    set_export_bill_modal(!export_bill_modal);

    const toastMessages = {
      'Motel has no rented rooms':
        'Không có phòng nào được thuê trong thời gian này!',
      'Motel has no rooms with idMetter': 'Không có phòng nào có idMetter!',
      'Motel has no floors': 'Không có tầng nào trong tòa nhà!',
      exportBillAllRoomSuccess: 'Xuất hóa đơn thành công!',
    };

    const exportBillPromises = hosts.data.map(host => {
      const exportBillApi =
        urlLink.api.serverUrl + urlLink.api.getListMotelByHost + `${host._id}`;

      return axios.get(exportBillApi).then(response => {
        console.log('response', response);
        if (response && response.data && response.data.data) {
          const data = response.data.data;
          const motelExportBillPromises = data.map(motel => {
            const motelId = motel._id;
            console.log('motelId', motelId);
            const exportBillApi =
              urlLink.api.serverUrl +
              urlLink.api.exportAllBill +
              `${motelId}/${startDateBackup}/${endDateBackup}`;
            console.log(exportBillApi);

            return axios.get(exportBillApi).then(response => {
              console.log('response', response);
              const status = response.data.data;
              const toastMessage =
                toastMessages[status] || 'Lỗi không xác định';
              const isError = status !== 'exportBillAllRoomSuccess';

              const toastConfig = {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
              };

              const showToast = (message, isError) => {
                toast[isError ? 'error' : 'success'](message, toastConfig);
              };

              showToast(toastMessage, isError);
            });
          });
          return Promise.all(motelExportBillPromises);
        } else {
          console.log('error');
          return null;
        }
      });
    });

    Promise.all(exportBillPromises)
      .then(() => {
        // Tất cả các yêu cầu đã được xử lý
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleBackupData = async () => {
    setModal(!modal);

    const backupDataApi =
      urlLink.api.serverUrl +
      urlLink.api.backupData +
      `/${startDateBackup}/${endDateBackup}`;
    console.log(backupDataApi);
    //call api to backup data
    setLoading(true);
    await axios
      .get(backupDataApi)
      .then(response => {
        if (response.status === 200) {
          toast.success('Backup dữ liệu thành công', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          setLoading(false);
          toggle();
        } else {
          toast.error('Backup dữ liệu thất bại', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setLoading(false);
          toggle();
        }
      })
      .catch(error => {
        toast.error('Backup dữ liệu thất bại', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setLoading(false);
        toggle();
      });
  };

  const getStartDayBackup = () => {
    const startDate = document.getElementById('startDateBackup').value;
    //format startDate to dd/mm/yyyy
    const formattedStartDate = new Date(startDate).toLocaleDateString('en-GB');
    console.log(formattedStartDate);

    //check if start date is empty
    if (startDate === '') {
      alert('Vui lòng chọn ngày bắt đầu');
      return;
      //check if start day is greater than current day
    }
    if (new Date(startDate) > new Date()) {
      alert('Ngày bắt đầu không thể lớn hơn ngày hiện tại');
      return;
    }

    setStartDateBackup(startDate);
    setFormattedStartDateBackup(formattedStartDate);
    console.log(startDate);
  };

  const getEndDayBackup = () => {
    const endDate = document.getElementById('endDateBackup').value;
    console.log(endDate);
    //format endDate to dd/mm/yyyy
    const formattedEndDate = new Date(endDate).toLocaleDateString('en-GB');

    //check if end date is empty
    if (endDate === '') {
      alert('Vui lòng chọn ngày kết thúc');
      //clear start date
      document.getElementById('startDateBackup').value = '';
      return;
    }
    //check if end day is greater than current day
    if (new Date(endDate) > new Date()) {
      alert('Ngày kết thúc không thể lớn hơn ngày hiện tại');
      return;
    }
    //check if end day is greater than start day
    if (new Date(endDate) < new Date(startDate)) {
      alert('Ngày kết thúc không thể nhỏ hơn ngày bắt đầu');
      //clear end date
      document.getElementById('endDateBackup').value = '';
      return;
    }
    setEndDateBackup(endDate);
    setFormattedEndDateBackup(formattedEndDate);
    console.log(endDate);
  };

  const getStartDay = () => {
    const startDate = document.getElementById('startDate').value;
    //format startDate to dd/mm/yyyy
    const formattedStartDate = new Date(startDate).toLocaleDateString('en-GB');
    console.log(formattedStartDate);

    //check if start date is empty
    if (startDate === '') {
      alert('Vui lòng chọn ngày bắt đầu');
      return;
      //check if start day is greater than current day
    }
    if (new Date(startDate) > new Date()) {
      alert('Ngày bắt đầu không thể lớn hơn ngày hiện tại');
      return;
    }

    setStartDate(startDate);
    setFormattedStartDate(formattedStartDate);
    console.log(startDate);
  };

  const getEndDay = () => {
    const endDate = document.getElementById('endDate').value;
    console.log(endDate);
    //format endDate to dd/mm/yyyy
    const formattedEndDate = new Date(endDate).toLocaleDateString('en-GB');

    //check if end date is empty
    if (endDate === '') {
      alert('Vui lòng chọn ngày kết thúc');
      //clear start date
      document.getElementById('startDate').value = '';
      return;
    }
    //check if end day is greater than current day
    if (new Date(endDate) > new Date()) {
      alert('Ngày kết thúc không thể lớn hơn ngày hiện tại');
      return;
    }
    //check if end day is greater than start day
    if (new Date(endDate) < new Date(startDate)) {
      alert('Ngày kết thúc không thể nhỏ hơn ngày bắt đầu');
      //clear end date
      document.getElementById('endDate').value = '';
      return;
    }
    setEndDate(endDate);
    setFormattedEndDate(formattedEndDate);
    console.log(endDate);
  };

  const handleConfirmAndCallApi = () => {
    const email = currentUser.email;
    const password = document.getElementById('password').value;
    if (password === '') {
      alert('Vui lòng nhập mật khẩu');
      return;
    }
    setConfirmModal(!confirmModal);
    //add start date and end date to the request
    if (startDate !== '') {
      const clearDataApi =
        urlLink.api.serverUrl +
        urlLink.api.clearData +
        `/${startDate}/${endDate}`;
      // const clearDataApi = '';
      console.log(clearDataApi);
      //add email and password to the request
      const data = {
        email,
        password,
      };
      //call api to clear data
      axios
        .post(clearDataApi, data)
        .then(response => {
          if (response.status === 200) {
            toast.success('Xóa dữ liệu thành công', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
            toast.error('Xóa dữ liệu thất bại', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        })
        .catch(error => {
          toast.error('Xóa dữ liệu thất bại', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    } else {
      clearDataApi = ``;
    }
  };

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Quản lý điện năng các chủ trọ</title>
        <meta name="description" content="Description of Manager Energy Host" />
      </Helmet>
      <div className="title-abc">
        <FormattedMessage {...messages.Header} />
      </div>
      {loading && <div className="loading-overlay" />}

      <div className="user-profile">
        {hosts.data && role.length === 2 && role.includes('master') ? (
          <>
            <ModalComponent
              modal={modal}
              toggle={toggle}
              modalTitle="Backup Data"
              footer={
                <div>
                  <Button color="secondary" onClick={toggle}>
                    Hủy
                  </Button>{' '}
                  <Button color="primary" onClick={handleBackupData}>
                    Xác nhận
                  </Button>
                </div>
              }
            >
              <FormGroup onChange={getStartDayBackup}>
                <Label for="startDateBackup">Ngày bắt đầu</Label>
                <Input
                  id="startDateBackup"
                  name="date"
                  placeholder="Ngày bắt đầu..."
                  type="date"
                />
              </FormGroup>
              <FormGroup onChange={getEndDayBackup}>
                <Label for="endDateBackup">Ngày kết thúc</Label>
                <Input
                  id="endDateBackup"
                  name="date"
                  placeholder="Ngày kết thúc..."
                  type="date"
                />
              </FormGroup>
              <div>
                Bạn có chắc muốn backup dữ liệu từ ngày{' '}
                {formattedStartDateBackup} đến {formattedEndDateBackup} không?
                Quá trình này có thể mất một khoảng thời gian dài.
              </div>
            </ModalComponent>

            <ModalComponent
              modal={clear_data_modal}
              toggle={toggle_clear_data}
              modalTitle="Clear Data"
              footer={
                <div>
                  <Button color="secondary" onClick={toggle_clear_data}>
                    Hủy
                  </Button>{' '}
                  <Button color="primary" onClick={handleConfirmPassword}>
                    Xác nhận
                  </Button>
                </div>
              }
            >
              <div>
                <FormGroup onChange={getStartDay}>
                  <Label for="startDate">Ngày bắt đầu</Label>
                  <Input
                    id="startDate"
                    name="date"
                    placeholder="Ngày bắt đầu..."
                    type="date"
                  />
                </FormGroup>
                <FormGroup onChange={getEndDay}>
                  <Label for="endDate">Ngày kết thúc</Label>
                  <Input
                    id="endDate"
                    name="date"
                    placeholder="Ngày kết thúc..."
                    type="date"
                  />
                </FormGroup>
              </div>
            </ModalComponent>

            <ModalComponent
              modal={confirmModal}
              toggle={toggle_confirm}
              modalTitle="Confirm Clear Data"
              footer={
                <div>
                  <Button color="secondary" onClick={toggle_confirm}>
                    Hủy
                  </Button>{' '}
                  <Button color="danger" onClick={handleConfirmAndCallApi}>
                    Xác nhận
                  </Button>
                </div>
              }
            >
              <>
                <FormGroup onChange={getStartDay}>
                  <Label for="startDate">Nhập mật khẩu</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Nhập mật khẩu..."
                    type="password"
                  />
                </FormGroup>
                <div>
                  Bạn có chắc muốn xóa dữ liệu từ ngày {formattedStartDate} đến
                  ngày {formattedEndDate} không? Đây là hành động không thể hoàn
                  tác, hãy cân nhắc ký trước khi xác nhận!
                </div>
              </>
            </ModalComponent>

            <ModalComponent
              modal={export_bill_modal}
              toggle={toggle_export_bill}
              modalTitle="Xuất hóa đơn"
              footer={
                <div>
                  <Button color="secondary" onClick={toggle_export_bill}>
                    Hủy
                  </Button>{' '}
                  <Button color="primary" onClick={handleGetHostInfo}>
                    Xác nhận
                  </Button>
                </div>
              }
            >
              <FormGroup onChange={getStartDayBackup}>
                <Label for="startDateBackup">Ngày bắt đầu</Label>
                <Input
                  id="startDateBackup"
                  name="date"
                  placeholder="Ngày bắt đầu..."
                  type="date"
                // defaultValue={startDateExportBill()}
                />
              </FormGroup>
              <FormGroup onChange={getEndDayBackup}>
                <Label for="endDateBackup">Ngày kết thúc</Label>
                <Input
                  id="endDateBackup"
                  name="date"
                  placeholder="Ngày kết thúc..."
                  type="date"
                // defaultValue={new Date().toISOString().slice(0, 10)}
                />
              </FormGroup>
              <div>
                Bạn có chắc muốn xuất hóa đơn từ ngày {formattedStartDateBackup}{' '}
                đến {formattedEndDateBackup} không? Hóa đơn sẽ được gửi về email
                của bạn.
              </div>
            </ModalComponent>

            <div className="list-motel">
              <ul>
                <Row className='list-title'>
                  <Col xs={5} className="motel-name">
                    <b>
                      <FormattedMessage {...messages.HostName} />
                    </b>
                  </Col>
                  <Col xs={5} className="motel-phonenumber">
                    <b>
                      <FormattedMessage {...messages.PhoneNumber} />
                    </b>
                  </Col>
                  <Col xs={2} className={classes.moreStyle}>
                    <div>
                      <button className={classes.popoverButton} aria-describedby={id} onClick={handleClick}>
                        <MoreHoriz />
                      </button>
                      <Popover
                        id={id}
                        open={open}
                        anchorReference="anchorPosition"
                        anchorPosition={{ top: 250, left: 1120 }}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        onClose={handleClose}
                      >
                        <div className={classes.listStyle}>
                          <button className={classes.buttonStyle} onClick={toggle}>
                            <Backup className={classes.iconStyle} />
                            <span>Backup DB</span>
                          </button>
                          <button className={classes.buttonStyle} onClick={toggle_clear_data}>
                            <Delete className={classes.iconStyle} />
                            <span>Clear Data</span>
                          </button>
                          <button className={classes.buttonStyle} onClick={toggle_export_bill}>
                            <InsertDriveFile className={classes.iconStyle} />
                            <span>Export Bill</span>
                          </button>
                        </div>
                      </Popover>
                    </div>
                  </Col>
                </Row>
                {hosts.data.length > 0 &&
                  hosts.data.map(host => (
                    <li key={host._id} id={host._id}>
                      <Row className="motel">
                        <Col xs={5} className="motel-name">
                          {host.lastName} {host.firstName}
                        </Col>
                        <Col xs={5} className="motel-phonenumber">
                          0{host.phoneNumber.number}
                        </Col>
                        <Col xs={2} className="motel-edit">
                          <button
                            className="btn-detail"
                            onClick={() => {
                              history.push(
                                `/admin/manager-energy-buildings-host/${host._id
                                }/${host.lastName + host.firstName}`,
                              );
                            }}
                          >
                            <FormattedMessage {...messages.Detail} />
                          </button>
                        </Col>
                      </Row>
                    </li>
                  ))}
              </ul>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

ManagerEnergyHostAdmin.propTypes = {
  dispatch: PropTypes.func,
  getRoomList: PropTypes.func,
  changeStoreData: PropTypes.func,
  // buildingHost: PropTypes.object,
  motelprofileList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  // buildingHost: makeSelectManagerBuildingHost(),
  motelprofileList: makeSelectManagerBuildingHost(),
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
