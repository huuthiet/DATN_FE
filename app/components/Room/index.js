/**
 *
 * Room
 *
 */

import React, { useState } from 'react';

import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Row, UncontrolledCarousel } from 'reactstrap';
import {
  CheckCircleOutlineOutlined,
  InfoOutlined,
  VpnKeyOutlined,
  AttachMoneyOutlined,
  MonetizationOnOutlined, LocalAtmOutlined, Waves, EmojiObjects, Wifi
} from '@material-ui/icons';
import defaultRoomImage from '../../images/defaul-room.jpg';
import Money from '../../containers/App/format';
import useLongPress from './longpress';
import ModalComponent from './modal';

import { roomStatus, roomStatusCode } from '../../helper/constants';

function Room(props) {
  const { item = {}, status = '', isEdit, isHost } = props;
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
    minimumMonths,
    motelRoomDataDetail = {
      owner: '',
      images: [],
    },
  } = item;

  const items =
    images.map((image, index) => ({
      key: index,
      src: image,
      altText: '',
      caption: '',
      header: '',
    })) || [];
  const [modal, setModal] = useState(false);
  const history = useHistory();
  /* eslint no-underscore-dangle: 0 */
  const backspaceLongPress = useLongPress(() => {
    history.push(`/update-room/${item._id}`);
  }, 500);

  return (
    //
    <div
      role="presentation"
      {...isEdit && {
        ...backspaceLongPress,
      }}
      className={ClassNames(
        'room-box',
        // 1 => rented
        status === roomStatusCode.RENTED && {
          // 'room-other': item.status === roomStatus.AVAILABLE,
          'info-other':
            item.status === roomStatus.AVAILABLE ||
            item.status === roomStatus.DEPOSITED ||
            item.status === roomStatus.SOONEXPIRECONTRACT,
        },
        // 2 => available
        status === roomStatusCode.AVAILABLE && {
          // 'room-other': item.status === roomStatus.RENTED,
          'info-other':
            item.status === roomStatus.RENTED ||
            item.status === roomStatus.DEPOSITED ||
            item.status === roomStatus.SOONEXPIRECONTRACT,
        },
        // 3 => deposited
        status === roomStatusCode.DEPOSITED && {
          // 'room-other': item.status === roomStatus.AVAILABLE,
          'info-other':
            item.status === roomStatus.AVAILABLE ||
            item.status === roomStatus.RENTED ||
            item.status === roomStatus.SOONEXPIRECONTRACT,
        },
        // 4: soonExpireContract
        status === roomStatusCode.SOONEXPIRECONTRACT && {
          // 'room-other': item.status === roomStatus.AVAILABLE,
          'info-other':
            item.status === roomStatus.DEPOSITED ||
            item.status === roomStatus.RENTED ||
            item.status === roomStatus.AVAILABLE,
        },
      )}
      onClick={() => {
        setModal(true);
        // if (isHost) {

        //   // history.push(`/room-detail/${item._id}`);
        // } else if (!isEdit) {
        //   history.push('/auth/login');
        // } else {
        //   /* eslint no-underscore-dangle: 0 */
        //   history.push(`/room-detail/${item._id}`);
        // }
      }}
    >
      <ModalComponent
        modal={modal}
        toggle={() => setModal(false)}
        className="room-modal"
        modalTitle={<FormattedMessage {...messages.Information} />}
        footer={
          <>
            <Button color="secondary" onClick={() => setModal(false)}>
              <FormattedMessage {...messages.Cancel} />
            </Button>
            <Button
              color="primary" onClick={() => {
                history.push(`/room-detail/${item._id}`);
                // if (isHost) {
                //   history.push(`/room-detail/${item._id}`);
                // } else if (!isEdit) {
                //   history.push('/auth/login');
                // } else {
                //   /* eslint no-underscore-dangle: 0 */
                //   history.push(`/room-detail/${item._id}`);
                // }
              }}
            >
              <FormattedMessage {...messages.Detail} />
            </Button>
          </>
        }
      >
        <Container>
          <div>
            {items.length > 0 ? (
              <UncontrolledCarousel className="image-slider" items={items} />
            ) : (
              <Row className="room-infor">
                <Col xs={12} className="room-image">
                  <img src={defaultRoomImage} alt="default" />
                </Col>
              </Row>
            )}
            <Row className="room-infor">
              <Col xs={12} className="room-detail">
                <Row>
                  <div className="name-room">
                    <FormattedMessage {...messages.Information} /> {name}
                  </div>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="price-room">
                      <div className="price-title">
                        <MonetizationOnOutlined className="price-icon" />
                        <FormattedMessage
                          {...messages.Price}
                          className="price-text"
                        />
                      </div>
                      {Money(price)} đ
                    </div>
                    <div className="price-deposit">
                      <div className="deposit-title">
                        <LocalAtmOutlined className="deposit-icon" />
                        <FormattedMessage {...messages.DepositPrice} />{' '}
                      </div>
                      {Money(price / 2)} đ
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <div className="item">
                      <div className="electric-title">
                        <EmojiObjects className="electric-icon" />
                        <FormattedMessage {...messages.electricityPrice} />
                      </div>
                      {Money(electricityPrice)} đ
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="item">
                      <div className="water-title">
                        <Waves className="water-icon" />
                        <FormattedMessage {...messages.waterPrice} />
                      </div>
                      {Money(wifiPrice)} đ
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="item">
                      <div className="wifi-title">
                        <Wifi className="wifi-icon" />
                        <FormattedMessage {...messages.wifiPrice} />
                      </div>
                      {Money(waterPrice)} đ
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
      </ModalComponent>

      <div
        className={ClassNames(
          'room-status',
          status === '0' && {
            available: item.status === roomStatus.AVAILABLE,
            rented: item.status === roomStatus.RENTED,
            deposited: item.status === roomStatus.DEPOSITED,
            soonExpireContract: item.status === roomStatus.SOONEXPIRECONTRACT,
          },
          status === '1' && {
            rented: item.status === roomStatus.RENTED,
          },
          status === '2' && {
            available: item.status === roomStatus.AVAILABLE,
          },
          status === '3' && {
            deposited: item.status === roomStatus.DEPOSITED,
          },
          status === '4' && {
            deposited: item.status === roomStatus.SOONEXPIRECONTRACT,
          },
        )}
      >
        <span className={ClassNames('status')}>
          {status === '0' ? (
            <>
              {item.status === 'unknown' ? (
                <>
                  <InfoOutlined className={ClassNames('icon')} />
                  {item.status === 'unknown'
                    ? <FormattedMessage {...messages.unknown} />
                    : <FormattedMessage {...messages.unknown} />}
                </>
              ) : item.status === roomStatus.AVAILABLE ? (
                <>
                  <CheckCircleOutlineOutlined className={ClassNames('icon')} />
                  {item.status === roomStatus.AVAILABLE
                    ? <FormattedMessage {...messages.available} />
                    : <FormattedMessage {...messages.unknown} />}
                </>
              ) : item.status === roomStatus.RENTED ? (
                <>
                  <VpnKeyOutlined className={ClassNames('icon')} />
                  {item.status === roomStatus.RENTED
                    ? <FormattedMessage {...messages.rented} />
                    : <FormattedMessage {...messages.unknown} />}
                </>
              ) : item.status === roomStatus.DEPOSITED ? (
                <>
                  <AttachMoneyOutlined className={ClassNames('icon')} />
                  {item.status === roomStatus.DEPOSITED
                    ? <FormattedMessage {...messages.deposited} />
                    : <FormattedMessage {...messages.unknown} />}
                </>
              ) : item.status === roomStatus.SOONEXPIRECONTRACT ? (
                <>
                  <AttachMoneyOutlined className={ClassNames('icon')} />
                  {item.status === roomStatus.SOONEXPIRECONTRACT
                    ? <FormattedMessage {...messages.soonExpireContract} />
                    : <FormattedMessage {...messages.unknown} />}
                </>
              ) : (
                <>
                  <InfoOutlined className={ClassNames('icon')} />
                  <FormattedMessage {...messages.unknown} />
                </>
              )}
            </>
          ) : status === '1' ? (
            <>
              {item.status === roomStatus.RENTED ? (
                <>
                  <VpnKeyOutlined className={ClassNames('icon')} />
                  {item.status === roomStatus.RENTED
                    ? <FormattedMessage {...messages.rented} />
                    : <FormattedMessage {...messages.unknown} />}
                </>
              ) : (
                <FormattedMessage {...messages.unknown} />
              )}
            </>
          ) : status === '2' ? (
            <>
              {item.status === roomStatus.AVAILABLE ? (
                <>
                  <CheckCircleOutlineOutlined className={ClassNames('icon')} />
                  {item.status === roomStatus.AVAILABLE
                    ? <FormattedMessage {...messages.available} />
                    : <FormattedMessage {...messages.unknown} />}
                </>
              ) : (
                <FormattedMessage {...messages.unknown} />
              )}
            </>
          ) : status === '3' ? (
            <>
              {item.status === roomStatus.DEPOSITED ? (
                <>
                  <AttachMoneyOutlined className={ClassNames('icon')} />
                  {item.status === roomStatus.DEPOSITED
                    ? <FormattedMessage {...messages.deposited} />
                    : <FormattedMessage {...messages.unknown} />}
                </>
              ) : (
                <FormattedMessage {...messages.unknown} />
              )}
            </>
          ) : status === '4' ? (
            <>
              {item.status === roomStatus.SOONEXPIRECONTRACT ? (
                <>
                  <AttachMoneyOutlined className={ClassNames('icon')} />
                  {item.status === roomStatus.SOONEXPIRECONTRACT
                    ? <FormattedMessage {...messages.soonExpireContract} />
                    : <FormattedMessage {...messages.unknown} />}
                </>
              ) : (
                <FormattedMessage {...messages.unknown} />
              )}
            </>
          ) : (
            <>
              <InfoOutlined className={ClassNames('icon')} />
              <FormattedMessage {...messages.unknown} />
            </>
          )}
        </span>
      </div>
      <div className={ClassNames('info')}>
        <div>
          <span>
            <FormattedMessage {...messages.Room} />
          </span>
          {item.status === 'unknown' ? <FormattedMessage {...messages.unknown} /> : item.name}
        </div>
        <div>
          <span>
            <FormattedMessage {...messages.Acreage} />
          </span>
          {item.status === 'unknown' ? 'unknown' : `${item.acreage} m2`}
        </div>
        <div>
          <span>
            <FormattedMessage {...messages.roomPrice} />
          </span>
          {item.price ? `${Money(item.price)} đ` : `Chưa cập nhật`}
        </div>
      </div>
    </div>
  );
}

Room.propTypes = {
  item: PropTypes.object,
  status: PropTypes.string,
  isEdit: PropTypes.bool,
  isHost: PropTypes.bool,
};

export default Room;
