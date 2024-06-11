/**
 *
 * RoomDetail
 *
 */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import localStoreService from 'local-storage';
import _ from 'lodash';
import localStore from 'local-storage';
import {
  MonetizationOnOutlined,
  LocalAtmOutlined,
  Waves,
  EmojiObjects,
  Wifi,
  EditOutlined,
  DeleteOutline,
  RoomService,
  MoreHoriz,
} from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Row, UncontrolledCarousel } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Tooltip from '@material-ui/core/Tooltip';
import { Collapse, IconButton } from '@material-ui/core';
import WarningPopup from '../../components/WarningPopup';
import Money from '../App/format';

import { changeStoreData, deleteRoom, getRoom } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectRoomDetail from './selectors';

import defaultRoomImage from '../../images/defaul-room.jpg';

import './style.scss';

export function RoomDetail(props) {
  const { id } = useParams();
  useInjectReducer({ key: 'roomDetail', reducer });
  useInjectSaga({ key: 'roomDetail', saga });
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = event => {
    setOpen(!open);
  };
  useEffect(() => {
    if (_.isArray(localStoreService.get('user').role)) {
      for (
        let index = 0;
        index < localStoreService.get('user').role.length;
        // eslint-disable-next-line no-plusplus
        index++
      ) {
        const element = localStoreService.get('user').role[index];
        if (element === 'master') {
          setIsAdmin(true);
        }
      }
    }
    props.getRoom(id);
  }, []);
  const history = useHistory();
  const { room = {}, showWarningPopup } = props.roomDetail;
  const {
    _id,
    utilities = [],
    name = '',
    price = '',
    electricityPrice = '',
    waterPrice = '',
    wifiPrice = '',
    garbagePrice = '',
    images = [],
    status,
    minimumMonths,
    motelRoomDataDetail = {
      owner: '',
      images: [],
    },
    linkVideo = '',
  } = room;

  function convertYouTubeLinkToEmbed(url) {
    if (!url) {
      return 'https://www.youtube.com/embed/';
    }
    try {
      let urlObj = new URL(url);
      let videoId = urlObj.searchParams.get("v");
      if (!videoId) {
        return ''; // Trả về chuỗi rỗng nếu không có tham số 'v'
      }
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      return 'https://www.youtube.com/embed/';
    }
  }

  const isEdit =
    localStore.get('user') === null
      ? false
      : motelRoomDataDetail.owner === localStore.get('user')._id;

  const items =
    images.map((image, index) => ({
      key: index,
      src: image,
      altText: '',
      caption: '',
      header: '',
    })) || [];

  return (
    <div className="room-detail-wrapper">
      <Helmet>
        <title>RoomDetail</title>
        <meta name="description" content="Description of RoomDetail" />
      </Helmet>
      <div className="infor">
        {items.length > 0 && (
          <UncontrolledCarousel className="image-slider" items={items} />
        )}

        <Container>
          <div className="room-container">
            <Row className="room-infor">
              <Col xs={12} sm={4} className="room-image">
                {images && images.length > 0 ? (
                  <img className="image" src={images[0]} alt="motel" />
                ) : (
                  <img className="image" src={defaultRoomImage} alt="motel" />
                )}
              </Col>
              <Col xs={12} sm={8} className="room-detail">
                <Row>
                  <Col xs={12} sm={6} className="name-room">
                    <FormattedMessage {...messages.Information} /> {name}
                  </Col>
                  <Col xs={12} sm={5} className="button-container">
                    {localStoreService.get('user').role.length > 1 && isEdit && (
                      <>
                        <Tooltip
                          title="Chỉnh sửa thông tin"
                          placement="top"
                          arrow
                        >
                          <IconButton
                            onClick={handleClick}
                            className="action-button"
                          >
                            <MoreHoriz />
                          </IconButton>
                        </Tooltip>
                        <Collapse in={open} className="collapse">
                          <div>
                            <button
                              className="edit-button-detail"
                              onClick={() => {
                                history.push(`/room-detail-update/${_id}`);
                              }}
                            >
                              <EditOutlined className="edit-icon" />
                              <FormattedMessage {...messages.EditRoom} />
                            </button>
                            <button
                              className="delete-button-detail"
                              onClick={() => {
                                props.changeStoreData('showWarningPopup', true);
                                setOpen(false);
                              }}
                            >
                              <DeleteOutline className="delete-icon" />
                              <FormattedMessage {...messages.DeleteRoom} />
                            </button>
                          </div>
                        </Collapse>
                      </>
                    )}
                  </Col>
                </Row>
                <Row>
                  <div className="price-room">
                    <Col xs={12} sm={6} className="price-title">
                      <MonetizationOnOutlined className="price-icon" />
                      <FormattedMessage
                        {...messages.Price}
                        className="price-text"
                      />
                      <span className="price-text">{Money(price)} đ</span>
                    </Col>
                  </div>
                  <div className="price-deposit">
                    <Col xs={12} className="deposit-title">
                      <LocalAtmOutlined className="deposit-icon" />
                      <FormattedMessage {...messages.DepositPrice} />{' '}
                      {Money(price / 2)} đ
                    </Col>
                  </div>
                  <div className="minimum-month">
                    <Col xs={12}>
                      <span className="minimum-month-title">
                        <FormattedMessage {...messages.MinimumMonth} />
                        {minimumMonths}
                      </span>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <Col xs={6} sm={3}>
                    <div className="item">
                      <div className="electric-title">
                        <EmojiObjects className="electric-icon" />
                        <FormattedMessage {...messages.electricityPrice} />
                      </div>
                      {Money(electricityPrice)} đ
                    </div>
                  </Col>
                  <Col xs={6} sm={3}>
                    <div className="item">
                      <div className="water-title">
                        <Waves className="water-icon" />
                        <FormattedMessage {...messages.waterPrice} />
                      </div>
                      {Money(wifiPrice)} đ
                    </div>
                  </Col>
                  <Col xs={6} sm={3}>
                    <div className="item">
                      <div className="wifi-title">
                        <Wifi className="wifi-icon" />
                        <FormattedMessage {...messages.wifiPrice} />
                      </div>
                      {Money(waterPrice)} đ
                    </div>
                  </Col>
                  <Col xs={6} sm={3}>
                    <div className="item">
                      <div className="garbage-title">
                        <RoomService className="garbage-icon" />
                        <FormattedMessage {...messages.GarbagePrice} />
                      </div>
                      {Money(garbagePrice)} đ
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="furniture">
              <div className="title">
                <FormattedMessage {...messages.Furniture} />
              </div>
              <Row>
                {utilities.includes('gac_lung') && (
                  <Col xs={2}>

                    <div className="interior-item">
                      <div className="icon">
                        <img src="../stairs.png" alt="stairs" />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.Mezzanine} />
                      </div>
                    </div>

                  </Col>
                )}
                {utilities.includes('tu_quan_ao') && (
                  <Col xs={2}>
                    <div className="interior-item">
                      <div className="icon">
                        <img src="../wardrobe.png" alt="wardrobe" />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.Wardrobe} />
                      </div>
                    </div>
                  </Col>
                )}
                {utilities.includes('tu_bep') && (
                  <Col xs={2}>
                    <div className="interior-item">
                      <div className="icon">
                        <img src="../kitchen.png" alt="kitchen" />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.Kitchen} />
                      </div>
                    </div>
                  </Col>
                )}
                {utilities.includes('san_go') && (
                  <Col xs={2}>
                    <div className="interior-item">
                      <div className="icon">
                        <img src="../dropceiling.png" alt="dropceiling" />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.WoodFloor} />
                      </div>
                    </div>
                  </Col>
                )}
                {utilities.includes('bon_cau') && (
                  <Col xs={2}>
                    <div className="interior-item">
                      <div className="icon">
                        <img src="../toiletbowl.png" alt="toilet" />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.toiletBowl} />
                      </div>
                    </div>
                  </Col>
                )}
                {utilities.includes('bon_rua_mat') && (
                  <Col xs={2}>
                    <div className="interior-item">
                      <div className="icon">
                        <img src="../washstand.png" alt="washstand" />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.washstand} />
                      </div>
                    </div>
                  </Col>
                )}
              </Row>
            </div>

            <div className="utilities">
              <div className="title">
                <FormattedMessage {...messages.Utilities} />
              </div>
              <Row>
                {utilities.includes('wifi') && (
                  <Col xs={2}>
                    <div className="furniture-item">
                      <div className="icon">
                        <img src="../wifi.png" alt="wifi" />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.wifi} />
                      </div>
                    </div>
                  </Col>
                )}
                {utilities.includes('giat_ui') && (
                  <Col xs={2}>
                    <div className="furniture-item">
                      <div className="icon">
                        <img src="../laundry.png" alt="laundry" />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.washingDrying} />
                      </div>
                    </div>
                  </Col>
                )}
                {utilities.includes('giu_xe') && (
                  <Col xs={2}>
                    <div className="furniture-item">
                      <div className="icon">
                        <img src="../delivery.png" alt="delivery" />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.parkingLot} />
                      </div>
                    </div>
                  </Col>
                )}
                {utilities.includes('dieu_hoa') && (
                  <Col xs={2}>
                    <div className="furniture-item">
                      <div className="icon">
                        <img
                          src="../air_conditioner.png"
                          alt="air conditioner"
                        />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.AirConditioner} />
                      </div>
                    </div>
                  </Col>
                )}
                {utilities.includes('don_phong') && (
                  <Col xs={2}>
                    <div className="furniture-item">
                      <div className="icon">
                        <img src="../broom.png" alt="broom" />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.clearTheRoom} />
                      </div>
                    </div>
                  </Col>
                )}
                {utilities.includes('truyen_hinh') && (
                  <Col xs={2}>
                    <div className="furniture-item">
                      <div className="icon">
                        <img src="../television.png" alt="television" />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.television} />
                      </div>
                    </div>
                  </Col>
                )}
                {utilities.includes('gio_giac_tu_do') && (
                  <Col xs={2}>
                    <div className="furniture-item">
                      <div className="icon">
                        <img src="../time.png" alt="time" />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.FreeTime} />
                      </div>
                    </div>
                  </Col>
                )}
                {utilities.includes('loi_di_rieng') && (
                  <Col xs={2}>
                    <div className="furniture-item">
                      <div className="icon">
                        <img src="../gate.png" alt="gate" />
                      </div>
                      <div className="name">
                        <FormattedMessage {...messages.PrivateEntrance} />
                      </div>
                    </div>
                  </Col>
                )}
              </Row>
              <Row className="button">
                <Col xs={6} className="button-deposit">
                  {!isAdmin && (
                    <>
                      <Button
                        onClick={() => {
                          history.push(`/job/${id}`);
                        }}
                        color="primary"
                        className="btn-block"
                        disabled={room.status !== 'available'}
                      >
                        <FormattedMessage {...messages.Deposit} />
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            </div>
          </div>

          <div className="video-responsive">
            <iframe
              width="560"
              height="315"
              // src="https://www.youtube.com/embed/VneFHjHEIjs"
              src={convertYouTubeLinkToEmbed(linkVideo)}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen />
          </div>
          <br />
        </Container>
      </div>

      <WarningPopup
        visible={showWarningPopup}
        content={<FormattedMessage {...messages.ErrPopup} />}
        // content={<FormattedMessage {...messages.reallyMessage} />}
        callBack={() => props.deleteRoom(id)}
        toggle={() => {
          props.changeStoreData('showWarningPopup', false);
        }}
      />
    </div>
  );
}

RoomDetail.propTypes = {
  getRoom: PropTypes.func,
  roomDetail: PropTypes.object,
  changeStoreData: PropTypes.func,
  deleteRoom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  roomDetail: makeSelectRoomDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRoom: id => {
      dispatch(getRoom(id));
    },
    deleteRoom: id => {
      dispatch(deleteRoom(id));
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RoomDetail);
