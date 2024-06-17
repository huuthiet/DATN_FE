import React, { useState, Fragment, useRef, useEffect } from 'react';
import ClassNames from 'classnames';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

import _, { set } from 'lodash';
import PropTypes from 'prop-types';
import './style.scss';
import { Avatar } from '@material-ui/core';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Row,
  Container,
  Button,
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import InputBase from '@material-ui/core/InputBase';

import { fade, makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import {
  PermIdentityOutlined,
  PeopleOutline,
  BlurOn,
  ShoppingCartOutlined,
  LibraryBooksOutlined,
  LocalOfferOutlined,
  AccountBalanceWalletOutlined,
  SyncAltOutlined,
  CreditCardOutlined,
  HomeOutlined,
  ReceiptOutlined,
  DvrOutlined,
  RestoreOutlined,
  DnsOutlined,
  NotificationImportantOutlined,
  AccountBalanceOutlined,
  PaymentOutlined,
  ExitToAppRounded,
  Close,
  CheckCircleOutline,
} from '@material-ui/icons';
import { geocodeByAddress, getLatLng } from 'react-google-autocomplete';

import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import img2 from './en.png';
import img1 from './vi.png';
import messages from './messages';
import MenuButton from '../MenuButton';
import Money from '../../containers/App/format';
import InputLocation from '../../components/InputLocation';

import { SearchLocationContext } from "../../components/SearchLocationContext";

// note
import makeSelectProfile from '../../containers/Profile/selectors';

import { getProfile } from '../../containers/Profile/actions';

import reducer from '../../containers/Profile/reducer';
import saga from '../../containers/Profile/saga';

// ---------------------

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    cursor: 'pointer',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '1px solid',
    borderRadius: '5px',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  btnLogin: {
    '&:hover': {
      color: 'unset',
    },
  },
}));

const Navbar = props => {
  const history = useHistory();
  const { currentUser = {}, listroom, onInputChange } = props;
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const classes = useStyles();
  const typingTimeoutRef = useRef(null);

  // note
  // useInjectReducer({ key: 'profile', reducer });
  // useInjectSaga({ key: 'profile', saga });
  const { profile = {} } = props.profile;

  useEffect(() => {
    props.getProfile();
  }, []);
  //-----------------------

  const handleSearchLocationChange = async (e) => {
    console.log("hihsdaádsid");
    console.log({ e })
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState({ lat: 10.856866, lng: 106.763324 });

  const [namePositon, setNamePosition] = useState('');

  // const handleInputChangeLat = (e) => {
  //   const lat = parseInt(e.target.value);
  //   setUser({lat: lat, lng: user.lng});
  //   onInputChange({lat: lat, lng: user.lng});
  // };
  // const handleInputChangeLng = (e) => {
  //   const lng = parseInt(e.target.value);
  //   setUser({lat: user.lat, lng: lng});
  //   onInputChange({lat: user.lat, lng: lng});
  // };

  const onSearch = () => {
    onInputChange(namePositon);
  }

  const menulistSearch = listroom.length > 0 && (
    <div className="listroommenu">
      <Container style={{ padding: '0' }}>
        <ul>
          {listroom.map((item, index) => (
            <li
              key={index.toString()}
              onClick={() => {
                history.push(`/motel/${item._id}`);
                props.changeStoreData('listroom', []);
              }}
            >
              <a>
                <Row>
                  <Col xs={4}>
                    <div className="full-image">
                      {item.images ? (
                        <Avatar
                          style={{
                            width: '80px',
                            height: '80px',
                          }}
                          variant="square"
                          alt="Avatar"
                          src={item.images}
                        >
                          N
                        </Avatar>
                      ) : (
                        <Avatar
                          style={{
                            width: '80px',
                            height: '80px',
                          }}
                          variant="square"
                          alt="Avatar"
                          src="./defaul-room.jpg"
                        >
                          N
                        </Avatar>
                      )}
                    </div>
                  </Col>
                  <Col xs={8} style={{ padding: '0' }}>
                    <h5>Tên: {item.name} </h5>
                    <h6>Địa chỉ: {item.address.address}</h6>
                    <Row>
                      <Col xs={6}>
                        <h6 style={{ color: 'red' }}>
                          Giá: {Money(item.price)} đ
                        </h6>
                      </Col>
                      <Col xs={6}>
                        <p>Liên hệ: {item.contactPhone}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
  const handleSearchTermChange = e => {
    const { value } = e.target;
    setNamePosition(value);
    // onInputChange(value);
    console.log({ value });
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      // props.Search_Addresses(value);
      onInputChange(value);
    }, 1000);
  };

  const handleClick = () => {
    setToggle(!toggle);
    console.log({ toggle });
  };

  const handleClose = () => {
    setToggle(false);
  }

  return (
    <div className="navbar-wrapper">
      <div className="header-content clearfix">

        <Row>
          <Col xs={12} sm={2} md={3} lg={2} className="text-logo">
            <NavLink exact to="/">
              <div className="logo-text">
                <img className="logo zoom-hover" src="/favicon.png" alt="logo" />{' '}
                <FormattedMessage {...messages.home} />
              </div>
            </NavLink>
            <button
              className="menu-button"
              onClick={handleClick}>
              <MenuButton />
            </button>
          </Col>
          <Col xs={12} sm={10} md={9} lg={5} className="menu-language">
            <li
              className="language-vi"
              onClick={() => {
                props.changeLocale('vi');
              }}
            >
              <img src={img1} alt="language" />
            </li>
            <li
              className="language-en"
              onClick={() => {
                props.changeLocale('en');
              }}
            >
              <img src={img2} alt="language" />
            </li>
            <li className="menulistSearchAll">
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                {
                  <FormattedMessage {...messages.search_location}>
                    {msg => (
                      <InputBase
                        autoComplete={{}}
                        placeholder={msg}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={e => {
                          handleSearchTermChange(e);
                        }}
                        className="HanbleSearch"
                      // onFocus={onSearch}
                      />
                    )}
                    {/* {msg => (
                    <InputLocation
                      label={msg}
                      placeholder={msg}
                      name="address"
                      autoComplete="address"
                      // touched={touched.address}
                      // error={errors.address}
                      // onSelect={address => {
                      //   setFieldValue('address', address.formatted_address);
                      // }}
                      // onBlur={handleBlur}
                      onChange={e => {
                        handleSearchLocationChange(e);
                      }}
                    />
                  )} */}
                  </FormattedMessage>
                }
                {menulistSearch}
              </div>
            </li>
            <div className="mobisearch">
              <li className="menulistSearchAll">
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  {
                    <FormattedMessage {...messages.search_location}>
                      {msg => (
                        <InputBase
                          placeholder={msg}
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          inputProps={{ 'aria-label': 'search' }}
                          onChange={e => {
                            handleSearchTermChange(e);
                          }}
                        // onFocus={onSearch}
                        />
                      )}
                      {/* {msg => (
                  <InputLocation
                    label={msg}
                    placeholder={msg}
                    name="address"
                    autoComplete="address"
                    // touched={touched.address}
                    // error={errors.address}
                    // onSelect={address => {
                    //   setFieldValue('address', address.formatted_address);
                    // }}
                    // onBlur={handleBlur}
                    onChange={e => {
                      handleSearchLocationChange(e);
                    }}
                  />
                )} */}
                    </FormattedMessage>
                  }
                  {menulistSearch}
                </div>
              </li>
            </div>

          </Col>

          <Col Col xs={12} sm={12} md={12} lg={5}
            className={
              ClassNames(
                'site-nav',
                { 'mobile-menu-hide': !toggle },
                { 'mobile-menu-show': toggle },
              )}
          >

            <ul className="site-main-menu">
              {/* note */}
              {/* {!_.isEmpty(currentUser) && (
              <li>
                <strong>
                  <FormattedMessage {...messages.wallet} />:{' '}
                </strong>
                {profile.wallet || profile.wallet === 0
                  ? `${Money(Number(profile.wallet))} VND`
                  : 'Chưa có dữ liệu'}
              </li>
            )} */}

              {/* {!_.isEmpty(currentUser) && !currentUser.role.includes('master') && (
              <li>
                <NavLink
                  exact
                  to="/withdraw"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <FormattedMessage {...messages.withdraw} />
                </NavLink>
              </li>
            )} */}
              {/* ------------------------------- */}
              <div className="close-menu">
                <button
                  className='close-menu-btn'
                  onClick={handleClose}
                >
                  <Close />
                </button>
              </div>
              <li>
                <NavLink
                  exact
                  to="/terms"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <FormattedMessage {...messages.contact} />
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/about"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <FormattedMessage {...messages.about} />
                </NavLink>
              </li>
              {!_.isEmpty(currentUser) ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <FormattedMessage {...messages.hi} />{' '}
                    <strong>
                      {currentUser.lastName} {currentUser.firstName}{' '}
                    </strong>
                  </DropdownToggle>
                  <div className="money-info-box">
                    {/* All user role */}
                    <DropdownMenu right>
                      {/* Money info */}

                      <DropdownItem
                        className={
                          pathname.includes('/money-information') ? 'active' : ''
                        }
                        onClick={() => {
                          history.push('/money-information');
                        }}
                      >
                        <PermIdentityOutlined className="icon" />
                        <FormattedMessage {...messages.money} />
                      </DropdownItem>

                      {/* Host role */}
                      {currentUser.role.includes('host') && (
                        <>
                          {/* <DropdownItem
                          className={
                            pathname.includes('/energy-billing-manage')
                              ? 'active'
                              : ''
                          }
                          onClick={() => {
                            history.push('/energy-billing-manage');
                          }}
                        >
                          <DnsOutlined className="icon" />
                          <FormattedMessage {...messages.energyManagerHost} />
                        </DropdownItem> */}
                          <DropdownItem
                            className={
                              pathname.includes('/roomManage') ? 'active' : ''
                            }
                            onClick={() => {
                              setToggle(false);
                              history.push('/roomManage');
                            }}
                          >
                            <HomeOutlined className="icon" />
                            <FormattedMessage {...messages.roomManager} />
                          </DropdownItem>
                          <DropdownItem
                            className={
                              pathname.includes('/manager-energy-buildings-host')
                                ? 'active'
                                : ''
                            }
                            onClick={() => {
                              setToggle(false);
                              history.push('/manager-energy-buildings-host');
                            }}
                          >
                            <BlurOn className="icon" />
                            <FormattedMessage {...messages.energyManager} />
                          </DropdownItem>
                          {/* <DropdownItem
                          className={
                            pathname.includes('/order/list') ? 'active' : ''
                          }
                          onClick={() => {
                            history.push('/order/list');
                          }}
                        >
                          <LocalOfferOutlined className="icon" />
                          <FormattedMessage {...messages.order} />
                        </DropdownItem> */}
                          <DropdownItem
                            className={
                              pathname.includes('/manage-deposit') ? 'active' : ''
                            }
                            onClick={() => {
                              setToggle(false);
                              history.push('/manage-deposit');
                            }}
                          >
                            <LocalOfferOutlined className="icon" />
                            <FormattedMessage {...messages.order} />
                          </DropdownItem>
                          <DropdownItem
                            className={
                              pathname.includes('/manage-monthly-order')
                                ? 'active'
                                : ''
                            }
                            onClick={() => {
                              setToggle(false);
                              history.push('/manage-monthly-order');
                            }}
                          >
                            <LocalOfferOutlined className="icon" />
                            <FormattedMessage {...messages.manageMonthly} />
                          </DropdownItem>
                          {/* <DropdownItem
                          className={
                            pathname.includes('/monthly-order/list')
                              ? 'active'
                              : ''
                          }
                          onClick={() => {
                            history.push('/monthly-order/list');
                          }}
                        >
                          <ShoppingCartOutlined className="icon" />
                          <FormattedMessage {...messages.monthlyOrder} />
                        </DropdownItem> */}
                          <DropdownItem
                            className={
                              pathname.includes('/user/hostRevenue')
                                ? 'active'
                                : ''
                            }
                            onClick={() => {
                              setToggle(false);
                              history.push(
                                `/user/hostRevenue/${currentUser._id}`,
                              );
                            }}
                          >
                            <LibraryBooksOutlined className="icon" />
                            <FormattedMessage {...messages.hostRoomRevenue} />
                          </DropdownItem>
                          <DropdownItem
                            className={
                              pathname.includes('/historyRoomHost')
                                ? 'active'
                                : ''
                            }
                            onClick={() => {
                              setToggle(false);
                              history.push('/historyRoomHost');
                            }}
                          >
                            <RestoreOutlined className="icon" />
                            <FormattedMessage {...messages.hostRoomHist} />
                          </DropdownItem>
                          <DropdownItem
                            className={
                              pathname.includes('/bill-list') ? 'active' : ''
                            }
                            onClick={() => {
                              setToggle(false);
                              history.push('/bill-list');
                            }}
                          >
                            <ReceiptOutlined className="icon" />
                            <FormattedMessage {...messages.billList} />
                          </DropdownItem>
                          <DropdownItem
                            className={
                              pathname.includes('/admin/report-problem-list')
                                ? 'active'
                                : ''
                            }
                            onClick={() => {
                              setToggle(false);
                              history.push('/admin/report-problem-list');
                            }}
                          >
                            <NotificationImportantOutlined className="icon" />
                            <FormattedMessage {...messages.reportProblemList} />
                          </DropdownItem>
                          {/* <DropdownItem
                          className={
                            pathname.includes('/host/transaction/list')
                              ? 'active'
                              : ''
                          }
                          onClick={() => {
                            history.push('/host/transaction/list');
                          }}
                        >
                          <PaymentOutlined className="icon" />
                          <FormattedMessage {...messages.transactionPayment} />
                        </DropdownItem> */}
                        </>
                      )}
                      {/* Admin role */}
                      {currentUser.role.includes('master') && (
                        <Fragment>
                          <DropdownItem
                            className={
                              pathname.includes('/admin/users') ? 'active' : ''
                            }
                            onClick={() => {
                              setToggle(false);
                              history.push('/admin/users');
                            }}
                          >
                            <PeopleOutline className="icon" />
                            <FormattedMessage {...messages.user} />
                          </DropdownItem>
                          <DropdownItem
                            className={
                              pathname.includes('/admin/manager-energy-host')
                                ? 'active'
                                : ''
                            }
                            onClick={() => {
                              setToggle(false);
                              history.push('/admin/manager-energy-host');
                            }}
                          >
                            <BlurOn className="icon" />
                            <FormattedMessage {...messages.managerHost} />
                          </DropdownItem>
                          {/* <DropdownItem
                          className={
                            pathname.includes('/admin/order/list')
                              ? 'active'
                              : ''
                          }
                          onClick={() => {
                            history.push('/admin/order/list');
                          }}
                        >
                          <ShoppingCartOutlined className="icon" />
                          <FormattedMessage {...messages.order} />
                        </DropdownItem> */}
                          {/* <DropdownItem
                          className={
                            pathname.includes('/admin/monthly-order/list')
                              ? 'active'
                              : ''
                          }
                          onClick={() => {
                            history.push('/admin/monthly-order/list');
                          }}
                        >
                          <ShoppingCartOutlined className="icon" />
                          <FormattedMessage {...messages.monthlyOrder} />
                        </DropdownItem> */}
                          {/* <DropdownItem
                          className={
                            pathname.includes('/admin/transaction/list')
                              ? 'active'
                              : ''
                          }
                          onClick={() => {
                            history.push('/admin/transaction/list');
                          }}
                        >
                          <PaymentOutlined className="icon" />
                          <FormattedMessage {...messages.transactionPayment} />
                        </DropdownItem> */}
                          {/* <DropdownItem
                          className={
                            pathname.includes('/admin/requestWithdraw/list')
                              ? 'active'
                              : ''
                          }
                          onClick={() => {
                            history.push('/admin/requestWithdraw/list');
                          }}
                        >
                          <AccountBalanceOutlined className="icon" />
                          <FormattedMessage {...messages.withdrawPayment} />
                        </DropdownItem> */}
                          <DropdownItem
                            className={
                              pathname.includes('/admin/hostMotelRoom')
                                ? 'active'
                                : ''
                            }
                            onClick={() => {
                              setToggle(false);
                              history.push('/admin/hostMotelRoom');
                            }}
                          >
                            <LibraryBooksOutlined className="icon" />
                            <FormattedMessage {...messages.host} />
                          </DropdownItem>
                          {/* <DropdownItem
                          className={
                            pathname.includes('/admin/historyRoomHost')
                              ? 'active'
                              : ''
                          }
                          onClick={() => history.push('/admin/historyRoomHost')}
                        >
                          <RestoreOutlined className="icon" />
                          <FormattedMessage {...messages.hostRoomHist} />
                        </DropdownItem> */}
                          {/* <DropdownItem
                          className={
                            pathname.includes('/admin/bill-list')
                              ? 'active'
                              : ''
                          }
                          onClick={() => history.push('/admin/bill-list')}
                        >
                          <ReceiptOutlined className="icon" />
                          <FormattedMessage {...messages.billList} />
                        </DropdownItem> */}
                          <DropdownItem
                            className={
                              pathname.includes('/admin/report-problem-list')
                                ? 'active'
                                : ''
                            }
                            onClick={() => {
                              setToggle(false);
                              history.push('/admin/report-problem-list')
                            }
                            }
                          >
                            <NotificationImportantOutlined className="icon" />
                            <FormattedMessage {...messages.reportProblemList} />
                          </DropdownItem>
                          <DropdownItem
                            className={
                              pathname.includes('/admin/censor-motels')
                                ? 'active'
                                : ''
                            }
                            onClick={() => history.push('/admin/censor-motels/')}
                          >
                            <CheckCircleOutline className="icon" />
                            <FormattedMessage {...messages.acceptMotels} />
                          </DropdownItem>
                          <DropdownItem
                            className={
                              pathname.includes('/admin/censor-hosts')
                                ? 'active'
                                : ''
                            }
                            onClick={() => history.push('/admin/censor-hosts/')}
                          >
                            <CheckCircleOutline className="icon" />
                            <FormattedMessage {...messages.acceptHosts} />
                          </DropdownItem>
                        </Fragment>
                      )}
                      {/* Customer role */}
                      {currentUser.role.length === 1 &&
                        currentUser.role.includes('customer') && (
                          <>
                            <DropdownItem
                              className={
                                pathname.includes('/manager-energy-rooms-user')
                                  ? 'active'
                                  : ''
                              }
                              onClick={() => {
                                setToggle(false);
                                history.push('/manager-energy-rooms-user');
                              }}
                            >
                              <BlurOn className="icon" />

                              <FormattedMessage {...messages.energyRoomsUser} />
                            </DropdownItem>

                            {/* Report problem */}
                            <DropdownItem
                              className={
                                pathname.includes('/report-problem-list')
                                  ? 'active'
                                  : ''
                              }
                              onClick={() => {
                                setToggle(false);
                                history.push('/report-problem-list');
                              }}
                            >
                              <NotificationImportantOutlined className="icon" />
                              <FormattedMessage {...messages.reportProblemList} />
                            </DropdownItem>
                          </>
                        )}
                      <DropdownItem divider />
                      {/* Profile */}
                      <DropdownItem
                        className={pathname.includes('/profile') ? 'active' : ''}
                        onClick={() => {
                          setToggle(false);
                          history.push('/profile');
                        }}
                      >
                        <PermIdentityOutlined className="icon" />
                        <FormattedMessage {...messages.infor} />
                      </DropdownItem>
                      <DropdownItem
                        className={
                          pathname.includes('/changePassword') ? 'active' : ''
                        }
                        onClick={() => {
                          setToggle(false);
                          history.push('/changePassword');
                        }}
                      >
                        <SyncAltOutlined className="icon" />
                        <FormattedMessage {...messages.changepassword} />
                      </DropdownItem>
                      {/* <DropdownItem
                      className={
                        pathname.includes('/transaction/user/list')
                          ? 'active'
                          : ''
                      }
                      onClick={() => {
                        history.push('/transaction/user/list');
                      }}
                    >
                      <CreditCardOutlined className="icon" />
                      <FormattedMessage {...messages.LogtransactionPayment} />
                    </DropdownItem> */}
                      {/* <DropdownItem
                      className={
                        pathname.includes('/requestWithdraw/user/list')
                          ? 'active'
                          : ''
                      }
                      onClick={() => {
                        history.push('/requestWithdraw/user/list');
                      }}
                    >
                      <AccountBalanceWalletOutlined className="icon" />
                      <FormattedMessage {...messages.LogRequestWithdraw} />
                    </DropdownItem> */}
                      {/* <DropdownItem
                      className={
                        pathname.includes('/transactionLog') ? 'active' : ''
                      }
                      onClick={() => {
                        history.push('/transactionLog');
                      }}
                    >
                      <ReceiptOutlined className="icon" />
                      <FormattedMessage {...messages.TransactionLog} />
                    </DropdownItem> */}
                      <DropdownItem
                        className={
                          pathname.includes('/transaction-banking-cash-log')
                            ? 'active'
                            : ''
                        }
                        onClick={() => {
                          setToggle(false);
                          history.push('/transaction-banking-cash-log');
                        }}
                      >
                        <ReceiptOutlined className="icon" />
                        <FormattedMessage
                          {...messages.TransactionBankingCashLog}
                        />
                      </DropdownItem>
                      <DropdownItem
                        className={
                          pathname.includes('/orders-pending-pay-user')
                            ? 'active'
                            : ''
                        }
                        onClick={() => {
                          setToggle(false);
                          history.push('/orders-pending-pay-user');
                        }}
                      >
                        <ReceiptOutlined className="icon" />
                        <FormattedMessage {...messages.orderPendingPayList} />
                      </DropdownItem>
                      <DropdownItem
                        className={
                          pathname.includes('/pay-deposit-user/')
                            ? 'active'
                            : ''
                        }
                        onClick={() => {
                          setToggle(false);
                          history.push('/pay-deposit-user/');
                        }}
                      >
                        <ReceiptOutlined className="icon" />
                        <FormattedMessage {...messages.payDeposits} />
                      </DropdownItem>
                      {/* <DropdownItem
                      className={pathname.includes('/recharge') ? 'active' : ''}
                      onClick={() => {
                        history.push('/recharge');
                      }}
                    >
                      <CreditCardOutlined className="icon" />
                      <FormattedMessage {...messages.addMoney} />
                    </DropdownItem> */}
                      <DropdownItem divider />
                      <DropdownItem
                        onClick={() => {
                          props.changeStoreData('showLogout', true);
                        }}
                      >
                        <ExitToAppRounded className="icon" />
                        <FormattedMessage {...messages.logout} />
                      </DropdownItem>
                    </DropdownMenu>
                  </div>
                </UncontrolledDropdown>
              ) : (
                <li className={pathname.includes('/auth/login') ? 'active' : ''}>
                  <NavLink
                    exact
                    to="/auth/login"
                    onClick={() => {
                      setToggle(false);
                    }}
                  >
                    <i className="fa fa-sign-in" aria-hidden="true" />{' '}
                    <FormattedMessage {...messages.signin_signup} />
                  </NavLink>
                </li>
              )}
            </ul>
          </Col >
        </Row >
      </div >

    </div >
  );
};

Navbar.propTypes = {
  dispatch: PropTypes.func,
  currentUser: PropTypes.object,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProfile: () => {
      dispatch(getProfile());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Navbar);
