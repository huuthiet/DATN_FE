/**
 *
 * ForgotPassword
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import localStoreService from 'local-storage';
import 'react-datepicker/dist/react-datepicker.css';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import _ from 'lodash';
import { Col, Container, Row } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { urlLink } from '../../helper/route';
import { getRoom } from '../RoomDetail/actions';
import { changeStoreData, postMotel, putRoomDetailUpdate } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectRoomDetail from './selectors';
import './style.scss';
export function RoomDetail(props) {
  useInjectReducer({ key: 'roomDetail', reducer });
  useInjectSaga({ key: 'roomDetail', saga });
  const { id } = useParams();
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
  }, [id]);

  const { room = {} } = props.roomDetail;

  const { status } = room;

  let statusRoom = '';
  if (status) {
    if (status.toString() === 'available') {
      statusRoom = <FormattedMessage {...messages.available} />;
    } else if (status.toString() === 'rented') {
      statusRoom = <FormattedMessage {...messages.rented} />;
    } else if (status.toString() === 'deposited') {
      statusRoom = <FormattedMessage {...messages.deposited} />;
    } else {
      statusRoom = <FormattedMessage {...messages.unknown} />;
    }
  }

  const options = [
    { value: 'available', label: <FormattedMessage {...messages.available} /> },
    { value: 'rented', label: <FormattedMessage {...messages.rented} /> },
    { value: 'unknown', label: <FormattedMessage {...messages.unknown} /> },
    { value: 'deposited', label: <FormattedMessage {...messages.deposited} /> },
    {
      value: 'monthlyPayment',
      label: <FormattedMessage {...messages.monthlyPayment} />,
    },
    {
      value: 'roomedPayment',
      label: <FormattedMessage {...messages.roomedPayment} />,
    },
  ];
  const history = useHistory();

  const handleFileInputChange = async e => {
    const dataOptions = e.value;
    const requestUrl = urlLink.api.serverUrl + urlLink.api.editStatus + id;
    try {
      await fetch(`${requestUrl}`, {
        method: 'POST',
        body: JSON.stringify({ data: dataOptions }),
        headers: { 'Content-Type': 'application/json' },
      });
      // feth data
      history.push(`/room-detail/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>RoomDetailUpdate</title>
        <meta name="description" content="Description of ForgotPassword" />
      </Helmet>
      <Container>
        <div className="title mb-3">
          <h3>
            <FormattedMessage {...messages.UpdateRoom} />{' '}
          </h3>
        </div>
        <Row>
          <Col md={12}>
            <h5>
              <FormattedMessage {...messages.AutoUpdate} />
            </h5>
            <Select
              placeholder={statusRoom}
              options={options}
              className="mb-3"
              onChange={e => {
                handleFileInputChange(e);
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

RoomDetail.propTypes = {
  dispatch: PropTypes.func,
  postMotel: PropTypes.func,
  roomDetail: PropTypes.object,
  changeStoreData: PropTypes.func,
  putRoomDetailUpdate: PropTypes.func,
  getRoom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  roomDetail: makeSelectRoomDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    postMotel: data => {
      dispatch(postMotel(data));
    },
    getRoom: id => {
      dispatch(getRoom(id));
    },
    putRoomDetailUpdate: data => {
      dispatch(putRoomDetailUpdate(data));
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
