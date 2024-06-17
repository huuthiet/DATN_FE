/**
 *
 * Profile
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Button } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AddIcon from '@material-ui/icons/Add';
import ContactsIcon from '@material-ui/icons/Contacts';
import DeleteIcon from '@material-ui/icons/Delete';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import TocIcon from '@material-ui/icons/Toc';
import ReportIcon from '@material-ui/icons/Report';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import localStore from 'local-storage';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import AlertDialog from '../../components/AlertDialog/Loadable';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import Money from '../../helper/format';
import {
  changeStoreData,
  deleteJob,
  deleteMotel,
  getJobs,
  getMotelList,
  getProfile,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectProfile from './selectors';
import './style.scss';
import { urlLink } from '../../helper/route';
import axios from 'axios';
import localStoreService from 'local-storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Person from '@material-ui/icons/Person';
import { Home, LocalPhone } from '@material-ui/icons';

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
}));

export function Profile(props) {
  const classes = useStyles();
  useInjectReducer({ key: 'profile', reducer });
  useInjectSaga({ key: 'profile', saga });
  const [urlImgCloud, setUrlImgCloud] = useState('');

  const currentUser = localStore.get('user') || {};
  const {
    _id = '',
    lastName = '',
    firstName = '',
    role = [],
    phoneNumber = {},
  } = currentUser;
  const history = useHistory();

  const {
    jobs = [],
    profile = {},
    showAlert = false,
    alert = {},
  } = props.profile;
  console.log({ profile })

  const TenMegaBytes = 10 * 1024 * 1024;
  const handleFileInputChange = e => {
    const abcfile = e.target.files[0];
    // check mb file size
    if (abcfile.size <= TenMegaBytes) {
      const formData = new FormData();
      formData.append('file', abcfile);
      try {
        const data = {
          // eslint-disable-next-line no-underscore-dangle
          id: profile._id,
          formData,
        };
        apiPostImg(data);
      } catch (error) { }
    }
  };
  const apiPostImg = async payload => {
    const { id, formData } = payload;
    // eslint-disable-next-line no-useless-concat
    const requestUrl =
      `${urlLink.api.serverUrl}/v1/uploading` + `/img/${id}/user`;
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStoreService.get('user').token}`,
      },
    };
    try {
      const response = await axios.post(requestUrl, formData, config);
      if (response.data.data.images) {
        setUrlImgCloud(response.data.data.images.imageUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = id => {
    props.changeStoreData('alert', {
      title: <FormattedMessage {...messages.cancellation} />,
      content: <FormattedMessage {...messages.cancellationtext} />,
      callBack: () => {
        props.deleteJob(id);
      },
    });
    props.changeStoreData('showAlert', true);
  };

  useEffect(() => {
    props.getMotelList();
    props.getJobs();
    props.getProfile();
  }, [urlImgCloud]);
  const {
    motelList,
    error,
    showSuccessPopup,
    showErrorPopup,
    showWarningPopup,
  } = props.profile;
  const [id, setId] = useState('');

  console.log({ jobs });
  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <div className="user-profile">
        {role.length === 1 && role[0] === 'customer' ? (
          <div>
            <div className="user-profile-title">
              <FormattedMessage {...messages.profile} />
            </div>
            <Row>
              <Col md={4}>
                <div className={classes.root}>
                  <Avatar
                    alt="Avatar"
                    src={profile.avatar}
                    className={classes.large}
                  />
                </div>
              </Col>
              <Col md={8}>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PermIdentityIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      // primary={<FormattedMessage {...messages.name} />}
                      secondary={`${lastName} ${firstName}`}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PhoneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      // primary={<FormattedMessage {...messages.sdt} />}
                      secondary={`${phoneNumber.countryCode} ${phoneNumber.number
                        }`}
                    />
                  </ListItem>
                  <Row
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '20px',
                    }}
                  >
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      md={4}
                    >
                      <Button
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', margin: 'auto' }}
                        onClick={() => {
                          history.push('/');
                        }}
                      >
                        <RoomIcon color="white" style={{ fontSize: '22px' }} />
                        {<FormattedMessage {...messages.aboutmap} />}
                      </Button>
                    </Col>
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      md={4}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{ margin: 'auto' }}
                        onClick={() => {
                          history.push(`/profile/${_id}`);
                        }}
                      >
                        {<FormattedMessage {...messages.profileupdate} />}
                      </Button>
                    </Col>
                  </Row>
                </List>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="list-motel">
            <div className="user-profile-container">
              <Typography className="user-profile-title">
                {<FormattedMessage {...messages.profile} />}
              </Typography>
              <Row>
                <Col md={4}>
                  <div className={classes.root}>
                    <Avatar
                      alt="Avatar"
                      src={profile.avatar}
                      className={classes.large}
                    />
                  </div>
                </Col>
                <Col md={8}>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ContactsIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText secondary="Quản lý phòng thuê" />
                      <ListItemSecondaryAction>
                        <Tooltip title="Danh sách phòng" placement='top'>
                          <IconButton
                            edge="end"
                            aria-label="comments"
                            onClick={() => {
                              history.push('/roomManage');
                            }}
                          >
                            <ViewComfyIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PermIdentityIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<FormattedMessage {...messages.name} />}
                        secondary={`${lastName} ${firstName}`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PhoneIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<FormattedMessage {...messages.sdt} />}
                        secondary={`${phoneNumber.countryCode} ${phoneNumber.number
                          }`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <Row className='map-profile-btn'
                    >
                      <Col
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        xs={6} md={4}
                      >
                        <Button
                          className='map-btn'
                          onClick={() => {
                            history.push('/');
                          }}
                        >
                          <RoomIcon color="white" style={{ fontSize: '22px' }} />
                          {<FormattedMessage {...messages.aboutmap} />}
                        </Button>
                      </Col>
                      <Col
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        xs={6} md={4}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          className='profile-update-btn'
                          onClick={() => {
                            history.push(`/profile/${_id}`);
                          }}
                        >
                          {<FormattedMessage {...messages.profile} />}
                        </Button>
                      </Col>
                    </Row>
                  </List>
                </Col>
              </Row>
            </div>
            {(role[1] !== 'master') & (role[0] !== 'master') ? (
              <Row xs={12} className='motel-title'>
                <Col xs={9} sm={6} className='motellist-title'>
                  <FormattedMessage {...messages.listbuilding} className="add-new-title" />
                </Col>
                <Col xs={2} sm={6} className='add-new-button-container'>
                  <Button
                    className='add-new-btn'
                    component="span"
                    onClick={() => {
                      history.push('/create-motel');
                    }}
                  >
                    <div className="add-new-icon">
                      <i className="fa fa-plus" aria-hidden="true" />
                    </div>
                    <div className='add-new-building-text'>
                      {<FormattedMessage {...messages.addnew} />}
                    </div>
                  </Button>
                </Col>
              </Row>
            ) : (
              ''
            )}
            {motelList.length > 0 ? (
              <>
                <ul>
                  {motelList.map((motel, index) => (
                    <li key={motel._id}>
                      <Row className="motel">
                        <Col xs={6} sm={4} className="motel-name">
                          {index + 1}. {motel.name}
                        </Col>
                        <Col xs={6} sm={4}>
                          {motel.isAcceptedByAdmin === true ? (
                            <div>Đã phê duyệt</div>
                          ) : (
                            <div>Chưa phê duyệt</div>
                          )}
                        </Col>
                        <Col xs={12} sm={4}>
                          <div className='edit-delete-btn'>
                            <div className="motel-edit"
                              onClick={() => {
                                history.push(`/motel/${motel._id}`);
                              }}
                            >
                              <div>
                                <i className="fa fa-cog" aria-hidden="true" />
                              </div>
                              <div><FormattedMessage {...messages.edit} /></div>
                            </div>
                            <div className="motel-remove"
                              onClick={() => {
                                setId(motel._id);
                                props.changeStoreData('showWarningPopup', true);
                              }}
                            >
                              <div>
                                <i className="fa fa-trash" aria-hidden="true" />
                              </div>
                              <div><FormattedMessage {...messages.delete} /></div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </li>
                  ))}
                </ul>
              </>

            ) : (
              <div className='job-empty'>
                <FormattedMessage {...messages.empty} />
              </div>
            )}

          </div>
        )}
      </div>
      <div className='job-container'>
        <div className='job-title'>
          <FormattedMessage {...messages.listroom} />
        </div>
        {jobs.length !== 0 ? (
          <>
            {jobs.map((job, index) => (
              <Grid item xs={12} key={job._id}>
                <div className='job-information'>
                  <Row className='job-detail' container justify="center" alignItems="center">
                    <Col xs={12} sm={8} >
                      <Row xs={12} className='job-item1'>
                        <Col xs={12} sm={5} className='job-fullname'>
                          {index + 1}{' '}
                          <Person className='fullname-icon' />{' '}
                          <Typography className='fullname-text'>
                            {job.fullName}
                          </Typography>
                        </Col>

                        <Col xs={12} sm={6} className='job-phone'>
                          <Home className='phone-icon' />
                          <Typography className='phone-text'>{job.motelName}</Typography>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={12} sm={4} className='job-item2'>
                      <div className='job-btn'>
                        <Tooltip title="Xem chi tiết" placement='top'>
                          {job && job.room && job.room._id !== null ? (
                            <Button
                              variant='contained'
                              color="primary"
                              onClick={() => {
                                history.push(`/job-detail/${job._id}/${job.room._id}`);
                              }}
                            >
                              <TocIcon />
                            </Button>
                          ) : (
                            <Button
                              variant='contained'
                              color="primary"
                              onClick={() => {
                                history.push(`/job-detail/${job._id}/null`);
                              }}
                            >
                              <TocIcon />
                            </Button>
                          )}

                        </Tooltip>
                        <Tooltip title="Báo cáo" placement='top'>
                          <Button
                            variant='contained'
                            color="primary"
                            onClick={() => {
                              history.push(`/report-problem/${job._id}`);
                            }}
                          >
                            <ReportIcon />
                          </Button>
                        </Tooltip>

                        <Tooltip title="Xóa" placement='top'>
                          <Button
                            color="danger"
                            onClick={() => {
                              props.changeStoreData('showAlert', true);
                              handleDelete(job._id);
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </Tooltip>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Grid>
            ))}
          </>
        ) : (
          <div className='job-empty'>
            <FormattedMessage {...messages.empty} />
          </div>
        )}

      </div>
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
        content={<FormattedMessage {...messages.reallyMessage} />}
        callBack={() => props.deleteMotel(id)}
        toggle={() => {
          props.changeStoreData('showWarningPopup', false);
        }}
      />
      <AlertDialog
        open={showAlert}
        alert={alert}
        handleClose={() => {
          props.changeStoreData('showAlert', false);
        }}
      />
    </div>
  );
}

Profile.propTypes = {
  dispatch: PropTypes.func,
  getRoomList: PropTypes.func,
  deleteMotel: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotelList: () => {
      dispatch(getMotelList());
    },
    deleteMotel: id => {
      dispatch(deleteMotel(id));
    },
    getJobs: () => {
      dispatch(getJobs());
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    deleteJob: id => {
      dispatch(deleteJob(id));
    },
    getProfile: () => {
      dispatch(getProfile());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Profile);
