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
  FilterList,
} from '@material-ui/icons';
import { geocodeByAddress, getLatLng } from 'react-google-autocomplete';

import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-select';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import img2 from './en.png';
import img1 from './vi.png';
import messages from './messages';
import MenuButton from '../MenuButton';
import Money from '../../containers/App/format';
import InputLocation from '../../components/InputLocation';
import ModalComponent from './modal';
import CheckBox from '../CheckBox';

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
      // width: '20ch',
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
  const { currentUser = {}, listroom, onInputChange, onFilterChange } = props;
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

  const [isOpenCheckIn, setIsOpenCheckIn] = useState(false);
  const toggleCheckInModal = () => {
    setIsOpenCheckIn(!isOpenCheckIn);
  };

  const openFilter = () => {
    setIsOpenCheckIn(true);
  }

  const [selectedUtility, setSelectedUtility] = useState(null);

  const [address, setAddress] = useState("Viet Nam");
  const [utilities, setUtilities] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000);

  const handleUtilityChange = (utility) => {
    setSelectedUtility(utility);
  };



  // const utilityOptions = ["wifi","bon_cau", "dieu_hoa", "truyen_hinh", "voi_hoa_sen",
  //   "giat_ui", "giu_xe", "gac_lung", "bon_rua_mat", "don_phong",
  //   "san_go", "tu_quan_ao", "gio_giac_tu_do", "loi_di_rieng"];

  const utilityOptions = [
    { label: "Internet", value: "wifi" },
  ]

  const vietnamProvinces = [
    { label: "An Giang", value: "An Giang" },
    { label: "Bà Rịa - Vũng Tàu", value: "Ba Ria - Vung Tau" },
    { label: "Bạc Liêu", value: "Bac Lieu" },
    { label: "Bắc Kạn", value: "Bac Kan" },
    { label: "Bắc Giang", value: "Bac Giang" },
    { label: "Bắc Ninh", value: "Bac Ninh" },
    { label: "Bến Tre", value: "Ben Tre" },
    { label: "Bình Dương", value: "Binh Duong" },
    { label: "Bình Định", value: "Binh Dinh" },
    { label: "Bình Phước", value: "Binh Phuoc" },
    { label: "Bình Thuận", value: "Binh Thuan" },
    { label: "Cà Mau", value: "Ca Mau" },
    { label: "Cao Bằng", value: "Cao Bang" },
    { label: "Cần Thơ", value: "Can Tho" },
    { label: "Đà Nẵng", value: "Da Nang" },
    { label: "Đắk Lắk", value: "Dak Lak" },
    { label: "Đắk Nông", value: "Dak Nong" },
    { label: "Điện Biên", value: "Dien Bien" },
    { label: "Đồng Nai", value: "Dong Nai" },
    { label: "Đồng Tháp", value: "Dong Thap" },
    { label: "Gia Lai", value: "Gia Lai" },
    { label: "Hà Giang", value: "Ha Giang" },
    { label: "Hà Nam", value: "Ha Nam" },
    { label: "Hà Nội", value: "Ha Noi" },
    { label: "Hà Tĩnh", value: "Ha Tinh" },
    { label: "Hải Dương", value: "Hai Duong" },
    { label: "Hải Phòng", value: "Hai Phong" },
    { label: "Hậu Giang", value: "Hau Giang" },
    { label: "Hòa Bình", value: "Hoa Binh" },
    { label: "Hồ Chí Minh", value: "Ho Chi Minh" },
    { label: "Hưng Yên", value: "Hung Yen" },
    { label: "Khánh Hòa", value: "Khanh Hoa" },
    { label: "Kiên Giang", value: "Kien Giang" },
    { label: "Kon Tum", value: "Kon Tum" },
    { label: "Lai Châu", value: "Lai Chau" },
    { label: "Lâm Đồng", value: "Lam Dong" },
    { label: "Lạng Sơn", value: "Lang Son" },
    { label: "Lào Cai", value: "Lao Cai" },
    { label: "Long An", value: "Long An" },
    { label: "Nam Định", value: "Nam Dinh" },
    { label: "Nghệ An", value: "Nghe An" },
    { label: "Ninh Bình", value: "Ninh Binh" },
    { label: "Ninh Thuận", value: "Ninh Thuan" },
    { label: "Phú Thọ", value: "Phu Tho" },
    { label: "Phú Yên", value: "Phu Yen" },
    { label: "Quảng Bình", value: "Quang Binh" },
    { label: "Quảng Nam", value: "Quang Nam" },
    { label: "Quảng Ngãi", value: "Quang Ngai" },
    { label: "Quảng Ninh", value: "Quang Ninh" },
    { label: "Quảng Trị", value: "Quang Tri" },
    { label: "Sóc Trăng", value: "Soc Trang" },
    { label: "Sơn La", value: "Son La" },
    { label: "Tây Ninh", value: "Tay Ninh" },
    { label: "Thái Bình", value: "Thai Binh" },
    { label: "Thái Nguyên", value: "Thai Nguyen" },
    { label: "Thanh Hóa", value: "Thanh Hoa" },
    { label: "Thừa Thiên - Huế", value: "Thua Thien - Hue" },
    { label: "Tiền Giang", value: "Tien Giang" },
    { label: "Trà Vinh", value: "Tra Vinh" },
    { label: "Tuyên Quang", value: "Tuyen Quang" },
    { label: "Vĩnh Long", value: "Vinh Long" },
    { label: "Vĩnh Phúc", value: "Vinh Phuc" },
    { label: "Yên Bái", value: "Yen Bai" },
  ];

  const SubmitModal = () => {
    // console.log({utilities});
    // console.log({minPrice});
    // console.log({maxPrice});
    // console.log(typeof(minPrice));
    // console.log(typeof(maxPrice));

    let MinPrice = minPrice;
    let MaxPrice = maxPrice;

    if (typeof (MinPrice) !== 'number') {
      MinPrice = parseInt(MinPrice);
    }
    if (typeof (MaxPrice) !== 'number') {
      MaxPrice = parseInt(MaxPrice);
    }


    const data = {
      address: address,
      utilities: utilities,
      minPrice: MinPrice,
      maxPrice: MaxPrice,
    }
    // console.log({data})
    console.log("JKAHLSDFKJAHSDFLJKHASDKLJFH")
    onInputChange(address);
    console.log({ address });
    onFilterChange(data);
    setIsOpenCheckIn(false);
  }


  return (
    <div className="navbar-wrapper">
      <div className="header-content clearfix">

        <ModalComponent
          modal={isOpenCheckIn}
          toggle={toggleCheckInModal}
          modalTitle="Bộ lọc"
          footer={
            <div>
              <Button color="secondary" onClick={toggleCheckInModal}>
                <FormattedMessage {...messages.Cancel} />
              </Button>{' '}
              <Button onClick={SubmitModal} color="primary">
                <FormattedMessage {...messages.Accept} />
              </Button>
            </div>
          }
        >
          <div>
            <Select
              placeholder="Chọn vị trí"
              options={vietnamProvinces}
              onChange={selectedOption => {
                console.log('Selected bank:', selectedOption);
                setAddress(selectedOption.label);
              }}
            />
            <span
              style={{ fontSize: '22px', fontWeight: '600' }}
            >
              <FormattedMessage {...messages.utilities} />
            </span>
            <Row
              style={{ marginTop: '10px' }}
            >

              <Col xs={6} md={4}>
                <CheckBox
                  label="Internet"
                  onChange={e => {
                    const index = utilities.indexOf('wifi');
                    console.log({ utilities });
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('wifi');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <CheckBox
                  label={<FormattedMessage {...messages.washingDrying} />}
                  onChange={e => {
                    const index = utilities.indexOf('giat_ui');
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('giat_ui');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <CheckBox
                  label={<FormattedMessage {...messages.parkingLot} />}
                  onChange={e => {
                    const index = utilities.indexOf('giu_xe');
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('giu_xe');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <CheckBox
                  label={<FormattedMessage {...messages.television} />}
                  onChange={e => {
                    const index = utilities.indexOf('truyen_hinh');
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('truyen_hinh');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <CheckBox
                  label={
                    <FormattedMessage {...messages.AirConditioner} />
                  }
                  onChange={e => {
                    const index = utilities.indexOf('dieu_hoa');
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('dieu_hoa');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <CheckBox
                  label={<FormattedMessage {...messages.toiletBowl} />}
                  onChange={e => {
                    const index = utilities.indexOf('bon_cau');
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('bon_cau');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <CheckBox
                  label={<FormattedMessage {...messages.Mezzanine} />}
                  onChange={e => {
                    const index = utilities.indexOf('gac_lung');
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('gac_lung');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <CheckBox
                  label={<FormattedMessage {...messages.washstand} />}
                  onChange={e => {
                    const index = utilities.indexOf('bon_rua_mat');
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('bon_rua_mat');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <CheckBox
                  label={<FormattedMessage {...messages.clearTheRoom} />}
                  onChange={e => {
                    const index = utilities.indexOf('don_phong');
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('don_phong');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <CheckBox
                  label={<FormattedMessage {...messages.WoodFloor} />}
                  onChange={e => {
                    const index = utilities.indexOf('san_go');
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('san_go');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <CheckBox
                  label={<FormattedMessage {...messages.Wardrobe} />}
                  onChange={e => {
                    const index = utilities.indexOf('tu_quan_ao');
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('tu_quan_ao');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <CheckBox
                  label={<FormattedMessage {...messages.shower} />}
                  onChange={e => {
                    const index = utilities.indexOf('voi_hoa_sen');
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('voi_hoa_sen');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <CheckBox
                  label={<FormattedMessage {...messages.FreeTime} />}
                  onChange={e => {
                    const index = utilities.indexOf('gio_giac_tu_do');
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('gio_giac_tu_do');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <CheckBox
                  label={
                    <FormattedMessage {...messages.PrivateEntrance} />
                  }
                  onChange={e => {
                    const index = utilities.indexOf('loi_di_rieng');
                    if (e.target.checked) {
                      if (index === -1) {
                        const newArr = [...utilities];
                        newArr.push('loi_di_rieng');
                        setUtilities(newArr);
                      }
                    } else if (index !== -1) {
                      const newArr = [...utilities];
                      newArr.splice(index, 1);
                      setUtilities(newArr);
                    }
                  }}
                />
              </Col>
            </Row>
            <span
              style={{ fontSize: '22px', fontWeight: '600' }}
            >
              <FormattedMessage {...messages.priceRange} />
            </span>
            <Row
              style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-start' }}>
              <Col xs={4} sm={2} md={3} lg={3}>
                {
                  <FormattedMessage {...messages.MinPrice}>
                    {msg => (
                      <InputBase
                        autoComplete={{}}
                        placeholder={msg}
                        value={(minPrice)}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={e => {
                          // handleSearchTermChange(e);
                          setMinPrice((e.target.value));
                        }}
                        className="HanbleSearch"
                      // onFocus={onSearch}
                      />
                    )}
                  </FormattedMessage>
                }
              </Col>
              <Col xs={4} sm={2} md={3} lg={3}>
                {
                  <FormattedMessage {...messages.MaxPrice}>
                    {msg => (
                      <InputBase
                        autoComplete={{}}
                        placeholder={msg}
                        value={(maxPrice)}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={e => {
                          // handleSearchTermChange(e);
                          setMaxPrice((e.target.value));
                        }}
                        className="HanbleSearch"
                      // onFocus={onSearch}
                      />
                    )}
                  </FormattedMessage>
                }
              </Col>
            </Row>
          </div>
        </ModalComponent>

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
            {/* <Button
              className="filter-button"
              onClick={toggleCheckInModal}
              // onClick={openFilter}
            >
              <FilterList className='filter-icon' />
              <FormattedMessage {...messages.filter} />
            </Button> */}
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
                          {/* <DropdownItem
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
                          </DropdownItem> */}
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
                          {/* <DropdownItem
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
                          </DropdownItem> */}
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
                      {currentUser.role.includes('customer') && (
                        <DropdownItem
                          className={pathname.includes('/transaction-banking-cash-log') ? 'active' : ''}
                          onClick={() => {
                            setToggle(false);
                            history.push('/transaction-banking-cash-log');
                          }}
                        >
                          <ReceiptOutlined className="icon" />
                          <FormattedMessage {...messages.TransactionBankingCashLog} />
                        </DropdownItem>
                      )}
                      {currentUser.role.includes('customer') ? (
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
                      ) : null}
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
                    onClick={(e) => {
                      // e.preventDefault();
                      // e.stopPropagation();
                      setToggle(false);
                      // handleClickLogin();
                      console.log("HIHI")
                    }}
                  >
                    <i className="fa fa-sign-in" aria-hidden="true" />{' '}
                    <FormattedMessage {...messages.signin_signup} />
                  </NavLink>
                </li>
              )}
            </ul>
          </Col>
        </Row>
      </div>

    </div>
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
