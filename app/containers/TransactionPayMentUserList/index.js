/**
 *
 * transactionPaymentUserList
 *
 */

import { Button } from 'reactstrap';
import { CloudUpload } from '@material-ui/icons';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import localStoreService from 'local-storage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { urlLink } from '../../helper/route';
import Money from '../App/format';
import { changeStoreData, getTransactionPayMentUserList } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectTransactionPaymentUserList from './selectors';
import './style.scss';

import { makeStyles } from '@material-ui/core/styles';
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

export function TransactionPayMentUserList(props) {
  const classes = useStyles();
  useInjectReducer({ key: 'transactionPaymentUserList', reducer });
  useInjectSaga({ key: 'transactionPaymentUserList', saga });
  const [id, setId] = useState('');
  const [urlImgCloud, setUrlImgCloud] = useState('');

  const {
    transactionPayment,
    showWarningapprove,
    showSuccessapprove,
  } = props.transactionPaymentUserList;

  const TenMegaBytes = 10 * 1024 * 1024;
  const handleFileInputChange = e => {
    const abcfile = e.target.files[0];
    console.log('abcfile', abcfile);
    // check mb file size
    if (abcfile.size <= TenMegaBytes) {
      const formData = new FormData();
      formData.append('file', abcfile);
      try {
        const data = {
          // eslint-disable-next-line no-underscore-dangle
          id,
          formData,
        };
        console.log('data', data);
        apiPostImg(data);
      } catch (error) { }
    }
  };
  const apiPostImg = async payload => {
    const { id, formData } = payload;
    console.log('formData', formData);
    // eslint-disable-next-line no-useless-concat
    const requestUrl =
      // eslint-disable-next-line no-useless-concat
      `${urlLink.api.serverUrl}/v1/uploading` + `/img/${id}/transaction`;
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


  useEffect(() => {
    props.getTransactionPayMentUserList();
  }, [urlImgCloud]);

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'fullName',
      headerName: 'Người tạo lệnh',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
    {
      field: 'keyPayment',
      headerName: 'Mã thanh toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'paymentMethod',
      headerName: 'Phuong thức thanh toán',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'amount',
      headerName: 'Số tiền',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'description',
      headerName: 'Nội dung thanh toán',
      headerAlign: 'center',
      width: 500,
      headerClassName: 'header-bold',
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      renderCell: (params) => {
        const status = params.value;
        let color = '';
        let background = '';
        let width = '';
        let borderRadius = '20px';

        switch (status) {
          case 'success':
            color = '#56AD1F';
            width = '120px';
            break;
          case 'waiting':
            color = '#C9CF1A';
            width = '120px';
            break;
          case 'cancel':
            color = '#FF0000';
            width = '120px';
            break;
          default:
            color = 'black';
            break;
        }

        return <span style=
          {{
            color: color,
            background: background,
            width: width,
            borderRadius: borderRadius,
            padding: '2px auto',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textTransform: 'capitalize',
          }}>{status}</span>;
      },
    },
    {
      field: 'iamgeLink',
      headerName: 'Chứng từ',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <a href={params.value} target="bank">
          LINK
        </a>
      ),
    },
    {
      field: 'action',
      headerName: 'Sự kiện',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
      align: 'center',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <>
          <div className={classes.root}>
            <input
              accept=".png, .jpg"
              className={classes.input}
              id="contained-button-file"
              type="file"
              onChange={e => {
                handleFileInputChange(e);
              }}
            />
            <label htmlFor="contained-button-file">
              <button
                className='btn-upload-img'
                onClick={() => {
                  setId(params.row._id);
                }}
              >
                <CloudUpload className='upload-icon' />
                Tải ảnh lên
              </button>
            </label>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Nhật ký nạp tiền</title>
        <meta
          name="description"
          content="Description of transactionPaymentUserList"
        />
      </Helmet>
      <div className="order-list-wrapper container-fluid">
        <div className="title-abc">Nhật ký nạp tiền</div>
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={transactionPayment}
            columns={columns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
          />
        </div>
      </div>
    </div>
  );
}

TransactionPayMentUserList.propTypes = {
  getTransactionPayMentUserList: PropTypes.func,
  transactionPaymentUserList: PropTypes.object,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  transactionPaymentUserList: makeSelectTransactionPaymentUserList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTransactionPayMentUserList: () => {
      dispatch(getTransactionPayMentUserList());
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

export default compose(withConnect)(TransactionPayMentUserList);
