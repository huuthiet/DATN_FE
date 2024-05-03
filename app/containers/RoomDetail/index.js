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
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Row, UncontrolledCarousel } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import WarningPopup from '../../components/WarningPopup';
import Money from '../App/format';
import { changeStoreData, deleteRoom, getRoom } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectRoomDetail from './selectors';
import './style.scss';

export function RoomDetail(props) {
  const { id } = useParams();
  useInjectReducer({ key: 'roomDetail', reducer });
  useInjectSaga({ key: 'roomDetail', saga });
  const [isAdmin, setIsAdmin] = useState(false);
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
    },
  } = room;

  const isEdit =
    localStore.get('user') === null
      ? false
      : motelRoomDataDetail.owner === localStore.get('user')._id;

  const items = images.map((image, index) => ({
    key: index,
    src: image,
    altText: '',
    caption: '',
    header: '',
  }));

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
          <div className="room-detail">
            <Row>
              <Col xs={2}>
                <div className="name-room">
                  <FormattedMessage {...messages.Infomation} /> {name}
                </div>
              </Col>
              <Col xs={2}>
                {localStoreService.get('user').role.length > 1 && isEdit && (
                  <div
                    className="edit-button-detail"
                    onClick={() => {
                      history.push(`/room-detail-update/${_id}`);
                    }}
                  >
                    <img src="/edit.png" />
                  </div>
                )}
              </Col>
              <Col xs={2}>
                {localStoreService.get('user').role.length > 1 && isEdit && (
                  <div
                    className="edit-button-detail"
                    onClick={() => {
                      props.changeStoreData('showWarningPopup', true);
                    }}
                  >
                    <img
                      src="/trash.png"
                      style={{ width: '30px', height: '30px' }}
                    />
                  </div>
                )}
              </Col>
              <Col xs={3}>
                <div className="price-room">
                  <FormattedMessage {...messages.Price} /> {Money(price)}
                </div>
              </Col>
              <Col xs={3}>
                <div className="price-room">
                  <FormattedMessage {...messages.DepositPrice} />{' '}
                  {Money(price / 2)}
                </div>
              </Col>
            </Row>

            <Row className="price-wrapper">
              <Col xs={4}>
                <Row>
                  <Col xs={6}>
                    <div className="item">
                      <div className="icon">
                        <img src="/electric.png" alt="electric" />
                      </div>
                      <div className="price">{Money(electricityPrice)}</div>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="item">
                      <div className="icon">
                        <img src="/wifi.png" alt="wifi" />
                      </div>
                      <div className="price">{Money(wifiPrice)}</div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={4}>
                <div className="item">
                  <div className="icon">
                    <img src="/month.png" alt="month" />
                  </div>
                  <div className="price">{minimumMonths}</div>
                </div>
              </Col>
              <Col xs={4}>
                <Row>
                  <Col xs={6}>
                    <div className="item">
                      <div className="icon">
                        <img src="/water.png" alt="water" />
                      </div>
                      <div className="price">{Money(waterPrice)}</div>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="item">
                      <div className="icon">
                        <img src="../broom.png" alt="broom" />
                      </div>
                      <div className="price">{Money(garbagePrice)}</div>
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
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('gac_lung') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../stairs.png" alt="stairs" />
                    </div>
                    <div className="name">
                      <FormattedMessage {...messages.Mezzanine} />
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('tu_quan_ao') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../wardrobe.png" alt="wardrobe" />
                    </div>
                    <div className="name">
                      <FormattedMessage {...messages.Wardrobe} />
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('voi_hoa_sen') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../shower.png" alt="shower" />
                    </div>
                    <div className="name">
                      <FormattedMessage {...messages.shower} />
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('san_go') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../dropceiling.png" alt="dropceiling" />
                    </div>
                    <div className="name">
                      <FormattedMessage {...messages.WoodFloor} />
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('bon_cau') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../toiletbowl.png" alt="toiletbowl" />
                    </div>
                    <div className="name">
                      <FormattedMessage {...messages.toiletBowl} />
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('bon_rua_mat') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../washstand.png" alt="washstand" />
                    </div>
                    <div className="name">
                      <FormattedMessage {...messages.washstand} />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="utilities">
              <div className="title">
                <FormattedMessage {...messages.Utilities} />
              </div>
              <Row>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('wifi') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../wifi.png" alt="wifi" />
                    </div>
                    <div className="name">Wifi</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('giat_ui') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../laundry.png" alt="laundry" />
                    </div>
                    <div className="name">
                      <FormattedMessage {...messages.washingDrying} />
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('giu_xe') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../delivery.png" alt="delivery" />
                    </div>
                    <div className="name">
                      <FormattedMessage {...messages.parkingLot} />
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('dieu_hoa') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../air_conditioner.png" alt="air conditioner" />
                    </div>
                    <div className="name">
                      <FormattedMessage {...messages.AirConditioner} />
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('don_phong') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../broom.png" alt="broom" />
                    </div>
                    <div className="name">
                      <FormattedMessage {...messages.clearTheRoom} />
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('truyen_hinh') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../television.png" alt="television" />
                    </div>
                    <div className="name">
                      <FormattedMessage {...messages.television} />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
      <div className="more-infor">
        <Container>
          <div className="title">
            <FormattedMessage {...messages.AdditionalDescription} />
          </div>
          <Row>
            <Col xs={6}>
              <div className="item">
                {utilities.includes('gio_giac_tu_do') && (
                  <div className="checked">
                    <img src="/checked.png" alt="checked" />
                  </div>
                )}
                <div className="icon">
                  <img src="../time.png" alt="time" />
                </div>
                <div className="name">
                  <FormattedMessage {...messages.FreeTime} />
                </div>
              </div>
            </Col>
            <Col xs={6}>
              <div className="item">
                {utilities.includes('loi_di_rieng') && (
                  <div className="checked">
                    <img src="/checked.png" alt="checked" />
                  </div>
                )}
                <div className="icon">
                  <img src="../gate.png" alt="gate" />
                </div>
                <div className="name">
                  <FormattedMessage {...messages.PrivateEntrance} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {!isAdmin && (
        <div className="button">
          <div className="button-deposit">
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
          </div>
        </div>
      )}

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
