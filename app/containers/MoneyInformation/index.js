/**
 *
 * MoneyInformation
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import { changeStoreData, deleteAdminBank, getAdminBank } from './actions';

import { getMasterDataBank } from '../MoneyInformationDetail/actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectMoneyInformation from './selectors';
import './styles.scss';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export function MoneyInformation(props) {
  useInjectReducer({ key: 'moneyInformation', reducer });
  useInjectSaga({ key: 'moneyInformation', saga });
  const history = useHistory();
  const { banks, showSuccessPopup, showWarningPopup } = props.moneyInformation;
  useEffect(() => {
    props.getAdminBank();
  }, []);
  const [id, setId] = useState('');

  return (
    <div>
      <Helmet>
        <title>Quản lý tài khoản ngân hàng</title>
        <meta name="description" content="Description of Bank Admin" />
      </Helmet>
      <div className="title">
        <FormattedMessage {...messages.Header} />
      </div>
      <div className="admin-users-wrapper container">
        <Button
          className='btn-add'
          color="success"
          onClick={() => {
            /* eslint no-underscore-dangle: 0 */
            history.push(`/money-information/add`);
          }}
        >
          <i className="fa fa-edit" aria-hidden="true"></i>
          <FormattedMessage {...messages.AddAccount} />
        </Button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <FormattedMessage {...messages.AccountNumber} />
              </th>
              <th scope="col">
                <FormattedMessage {...messages.AccountName} />
              </th>
              <th scope="col">
                <FormattedMessage {...messages.BankName} />
              </th>
              <th scope="col">
                <FormattedMessage {...messages.Branch} />
              </th>
              {/* <th scope="col">Hình QR</th> */}
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {banks.map((bank, index) => (
              /* eslint no-underscore-dangle: 0 */
              <tr key={bank._id}>

                <td>{bank.stk}</td>
                <td>{bank.nameTk}</td>
                <td>{bank.nameTkLable}</td>
                <td>{bank.branch}</td>
                {/* <td>
                  <a href={bank.images[0].path} target="bank">
                    LINK
                  </a>
                </td> */}
                <td>
                  <div className='btn-container'>
                    <Button
                      className='btn-edit'
                      onClick={() => {
                        /* eslint no-underscore-dangle: 0 */
                        history.push(`/money-information/${bank._id}`);
                      }}
                    >
                      <i className="fa fa-edit" aria-hidden="true"></i>
                    </Button>
                    <Button
                      className='btn-delete'
                      onClick={() => {
                        /* eslint no-underscore-dangle: 0 */
                        setId(bank._id);
                        props.changeStoreData('showWarningPopup', true);
                      }}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true" />
                    </Button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SuccessPopup
        visible={showSuccessPopup}
        content={<FormattedMessage {...messages.DeleteSuccess} />}
        toggle={() => {
          // eslint-disable-next-line react/prop-types
          props.changeStoreData('showSuccessPopup', !showSuccessPopup);
        }}
      />
      <WarningPopup
        visible={showWarningPopup}
        content={<FormattedMessage {...messages.ConfirmDelete} />}
        callBack={() => props.deleteAdminBank(id)}
        toggle={() => {
          // eslint-disable-next-line react/prop-types
          props.changeStoreData('showWarningPopup', false);
        }}
      />
    </div>
  );
}

MoneyInformation.propTypes = {
  getAdminBank: PropTypes.func,
  deleteAdminBank: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  getMasterDataBank: PropTypes.func,
  moneyInformation: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  moneyInformation: makeSelectMoneyInformation(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAdminBank: () => {
      dispatch(getAdminBank());
    },
    deleteAdminBank: id => {
      dispatch(deleteAdminBank(id));
    },
    getMasterDataBank: () => {
      dispatch(getMasterDataBank());
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

export default compose(withConnect)(MoneyInformation);
