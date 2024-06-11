/**
 *
 * AdminUsers
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DataGrid } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import InputForm from '../../components/InputForm';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import Money from '../App/format';
import Modal from 'react-modal';
import Tooltip from '@material-ui/core/Tooltip';
import {
  changeStoreData,
  deleteAdminUser,
  getAdminUsers,
  postUpdateUser,
  resetPWAdminUser,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectAdminUsers from './selectors';
import './styles.scss';
import ModalComponent from './modal';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export function AdminUsers(props) {
  useInjectReducer({ key: 'adminUsers', reducer });
  useInjectSaga({ key: 'adminUsers', saga });
  const history = useHistory();
  useEffect(() => {
    props.getAdminUsers();
    Modal.setAppElement('body');
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const [id, setId] = useState('');
  const [dataReq, setDataReq] = useState('');
  const [idReq, setIdReq] = useState('');
  const {
    users,
    showSuccessPopup,
    showWarningPopup,
    showSuccessPopupWall,
    showWarningPopupWall,
    showSuccessResetPW,
    PwNew,
    showWarningResetPW,
  } = props.adminUsers;

  console.log({ users });

  const [wallet, setWallet] = useState();
  const [userProfile, setUserProfile] = useState({});

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'fullName',
      headerName: <FormattedMessage {...messages.FullName} />,
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
    },
    {
      field: 'phoneNumber',
      headerName: <FormattedMessage {...messages.PhoneNumber} />,
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'email',
      headerName: <FormattedMessage {...messages.Email} />,
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'role',
      headerName: <FormattedMessage {...messages.Permission} />,
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => {
        return <div>{params.value.join(',')}</div>;
      },
    },
    // {
    //   field: 'wallet',
    //   headerName: 'Số tiền trong ví',
    //   headerAlign: 'center',
    //   width: 200,
    //   headerClassName: 'header-bold',
    //   valueGetter: params => {
    //     return `${Money(params.value)} đ`;
    //   },
    // },
    {
      field: 'edit',
      headerName: <FormattedMessage {...messages.Action} />,
      headerAlign: 'center',
      width: 280,
      align: 'center',
      headerClassName: 'header-bold',
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        return (
          <>
            {/* <Button
              style={{ marginRight: '10px' }}
              color="primary"
              onClick={() => {
                setUserProfile(params.row);
                setWallet('');
                setWallet(params.row.wallet);
                toggleModal();
              }}
            >
              <i className="fa fa-edit" aria-hidden="true">
                Update
              </i>
            </Button> */}
            <Tooltip title={<FormattedMessage {...messages.UpdateProfile} />} placement="top">
              <Button
                onClick={() => {
                  /* eslint no-underscore-dangle: 0 */
                  history.push(`/admin/users/${params.row._id}`);
                }}
              >
                <i className="fa fa-edit" aria-hidden="true">
                </i>
              </Button>
            </Tooltip>
            <Tooltip title={<FormattedMessage {...messages.RoomDetail} />} placement="top">
              <Button
                style={{ margin: '0 10px' }}
                onClick={() => {
                  /* eslint no-underscore-dangle: 0 */
                  history.push(`/admin/user/job/list/${params.row._id}`);
                }}
              >
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </Button>
            </Tooltip>

            <Tooltip title={<FormattedMessage {...messages.DeleteProfile} />} placement="top">
              <Button
                color='danger'
                style={{ marginRight: '10px' }}
                onClick={() => {
                  /* eslint no-underscore-dangle: 0 */
                  setId(params.row._id);

                  props.changeStoreData('showWarningPopup', true);
                }}
              >
                <i className="fa fa-trash-o" aria-hidden="true" />
              </Button>
            </Tooltip>
            <Tooltip title={<FormattedMessage {...messages.ResetPassword} />} placement="top">
              <Button
                onClick={() => {
                  /* eslint no-underscore-dangle: 0 */
                  setId(params.row._id);

                  props.changeStoreData('showWarningResetPW', true);
                }}
              >
                <i className="fa fa-refresh" aria-hidden="true">
                  {' '}
                </i>
              </Button>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Quản lý người dùng</title>
        <meta name="description" content="Description of AdminUsers" />
      </Helmet>
      <div className="title">
        <FormattedMessage {...messages.Header} />
      </div>
      <div
        className="admin-users-wrapper container-fulid"
        style={{ margin: '15px' }}
      >
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          contentLabel="My dialog"
          style={customStyles}
        >
          <div className="deposit">
            <InputForm
              name={`wallet${userProfile._id}`}
              autoComplete={`wallet${userProfile._id}`}
              icon="fa fa-money"
              value={wallet}
              placeholder={wallet}
              onChange={e => {
                setWallet(e.target.value);
              }}
            />
          </div>
          <Button
            color="primary"
            onClick={() => {
              // eslint-disable-next-line camelcase
              const id_user = userProfile._id;
              const data = wallet;
              setDataReq(data);
              setIdReq(id_user);
              props.changeStoreData('showWarningPopupWall', true);
            }}
          >
            <i className="fa fa-edit" aria-hidden="true" />
          </Button>
        </Modal>
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={users}
            columns={columns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
            disableSelectionOnClick
          />
        </div>
      </div>
      <SuccessPopup
        visible={showSuccessPopup}
        content={<FormattedMessage {...messages.DeleteSuccess} />}
        toggle={() => {
          props.changeStoreData('showSuccessPopup', !showSuccessPopup);
        }}
      />

      <SuccessPopup
        visible={showSuccessResetPW}
        content={`Mật khẩu mới: ${PwNew}. Mật khẩu đã được gửi về mail người dùng!`}
        toggle={() => {
          props.changeStoreData('showSuccessResetPW', !showSuccessResetPW);
        }}
      />

      <SuccessPopup
        visible={showSuccessPopupWall}
        content={<FormattedMessage {...messages.UpdateSuccess} />}
        toggle={() => {
          props.changeStoreData('showSuccessPopupWall', !showSuccessPopupWall);
        }}
      />

      <WarningPopup
        visible={showWarningPopup}
        content={<FormattedMessage {...messages.ConfirmDelete} />}
        callBack={() => props.deleteAdminUser(id, '')}
        toggle={() => {
          props.changeStoreData('showWarningPopup', false);
        }}
      />

      <WarningPopup
        visible={showWarningResetPW}
        content={<FormattedMessage {...messages.ConfirmResetPassword} />}
        callBack={() => props.resetPWAdminUser(id, '')}
        toggle={() => {
          props.changeStoreData('showWarningResetPW', false);
        }}
      />

      <WarningPopup
        visible={showWarningPopupWall}
        content="Bạn thực sự muốn cập nhật số tiền?"
        callBack={() => {
          props.postUpdateUser(idReq, dataReq);
          toggleModal();
          props.getAdminUsers();
        }}
        toggle={() => {
          props.changeStoreData('showWarningPopupWall', false);
        }}
      />
    </div>
  );
}

AdminUsers.propTypes = {
  getAdminUsers: PropTypes.func,
  adminUsers: PropTypes.object,
  deleteAdminUser: PropTypes.func,
  resetPWAdminUser: PropTypes.func,
  changeStoreData: PropTypes.func,
  postUpdateUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminUsers: makeSelectAdminUsers(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAdminUsers: () => {
      dispatch(getAdminUsers());
    },
    deleteAdminUser: (userId, reason) => {
      dispatch(deleteAdminUser(userId, reason));
    },
    resetPWAdminUser: (userId, reason) => {
      dispatch(resetPWAdminUser(userId, reason));
    },
    postUpdateUser: (userId, reason) => {
      dispatch(postUpdateUser(userId, reason));
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

export default compose(withConnect)(AdminUsers);
