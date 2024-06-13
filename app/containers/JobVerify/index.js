/**
 *
 * JobVerify
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
} from '@material-ui/core';
import { Alert } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import makeSelectJobVerify from './selectors';
import reducer from './reducer';
import saga from './saga';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import { putImages, changeStoreData } from './actions';
import './style.scss';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import axios from 'axios';
import { urlLink } from '../../helper/route';
import localStoreService from 'local-storage';
import localStore from 'local-storage';

export function JobVerify(props) {
  useInjectReducer({ key: 'jobVerify', reducer });
  useInjectSaga({ key: 'jobVerify', saga });
  const { id, idElectricMetter } = useParams();
  const [frontID, setFrontID] = useState('');
  const [backID, setBackID] = useState('');
  const [frontIDUrl, setFrontIDUrl] = useState('');
  const [backIDUrl, setBackIDUrl] = useState('');
  const TenMegaBytes = 5 * 1024 * 1024;

  const currentUser = localStore.get('user') || {};

  console.log("uerrrrrrr", currentUser);

  // Up Img CM
  const [urlImageArr, setUrlImageArr] = useState([]);

  // Strat UpLoad
  const [actionsubmit, setactionsubmit] = useState(false);
  const [submitAction, setSubmitAction] = useState(false);

  const apiPostImg = async payload => {
    const { id, formData } = payload;
    const requestUrl = `${urlLink.api.serverUrl}/v1/uploading` + `/img/${id}`;
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStoreService.get('user').token}`,
      },
    };
    try {
      console.log({config})
      const response = await axios.post(requestUrl, formData, config);
      if (response.data.data.images) {
        return response.data.data.images.imageId;
      }
    } catch (err) {
      console.error(err);
    }
  };

  // End Upload

  const handleFileInputChange = async e => {
    const file = e.target.files[0];
    const array = [...urlImageArr];
    setSubmitAction(true);
    if (file.size <= TenMegaBytes) {
      setSubmitAction(false);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const data = {
          id: 1,
          formData,
        };
        const urk = await apiPostImg(data);
        array.push(urk);
        setUrlImageArr(array);
        setactionsubmit(true);
      } catch (error) { }
    }
  };

  useEffect(() => {
    if (frontID) {
      setFrontIDUrl(URL.createObjectURL(frontID));
    } else {
      setFrontIDUrl('');
    }
  }, [frontID]);
  useEffect(() => {
    if (backID) {
      setBackIDUrl(URL.createObjectURL(backID));
    } else {
      setBackIDUrl('');
    }
  }, [backID]);

  return (
    <div className="job-verify-wrapper">
      <Helmet>
        <title>JobVerify</title>
        <meta name="description" content="Description of JobVerify" />
      </Helmet>
      <Container maxWidth="md">
        <PaperWrapper>
          <Typography component="h1" variant="h5">
            <FormattedMessage {...messages.IdentutyVerification} />
          </Typography>
          <Typography>
            <FormattedMessage {...messages.IdToIdentutyVerification} />
          </Typography>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item xs={6}>
              <div className="image-wrapper">
                {frontIDUrl && <img src={frontIDUrl} alt="front identify" />}
                <input
                  id="frontID"
                  type="file"
                  // value={fileInputState}
                  name="image"
                  accept=".png, .jpg"
                  onChange={e => {
                    handleFileInputChange(e);
                    setFrontID(e.target.files[0]);
                  }}
                />
                {frontIDUrl ? (
                  <IconButton
                    onClick={() => {
                      setFrontID('');
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  <label className="label-input" htmlFor="frontID">
                    <AddPhotoAlternateIcon />
                    <Typography>
                      <FormattedMessage {...messages.Front} />
                    </Typography>
                  </label>
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="image-wrapper">
                {backIDUrl && <img src={backIDUrl} alt="back identify" />}
                <input
                  id="backID"
                  type="file"
                  accept=".png, .jpg"
                  // value={fileInputState}
                  onChange={e => {
                    handleFileInputChange(e);
                    setBackID(e.target.files[0]);
                  }}
                />
                {backIDUrl ? (
                  <IconButton
                    onClick={() => {
                      setBackID('');
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  <label className="label-input" htmlFor="backID">
                    <AddPhotoAlternateIcon />
                    <Typography>
                      <FormattedMessage {...messages.BackSide} />
                    </Typography>
                  </label>
                )}
              </div>
            </Grid>
          </Grid>
          {submitAction === true ? (
            <Alert color="danger" className="mt-3">
              <FormattedMessage {...messages.ErrSizeImage} />
            </Alert>
          ) : (
            ''
          )}

          <Button
            style={{ marginTop: '20px' }}
            fullWidth
            variant="contained"
            color="primary"
            disabled={!(frontID && backID)}
            onClick={() => {
              const temp = [...urlImageArr];
              if (temp.length === 2 && actionsubmit === true) {
                props.putImages(id, idElectricMetter, temp);
              }
            }}
          >
            <FormattedMessage {...messages.Finish} />
          </Button>
        </PaperWrapper>
      </Container>
    </div>
  );
}

JobVerify.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  jobVerify: makeSelectJobVerify(),
});

function mapDispatchToProps(dispatch) {
  return {
    putImages: (id, idElctricMetter, formData) => {
      dispatch(putImages(id, idElctricMetter, formData));
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

export default compose(
  withConnect,
  memo,
)(JobVerify);
