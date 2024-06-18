import React, { useState, useEffect } from 'react';
import { Grid, Tabs, Tab, Box } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import LineChart from '../../components/LineChart';
import Speedometer from '../../components/Speedmetter';
import PaperWrapper from '../../components/PaperWrapper';
import { urlLink } from '../../helper/route';
import './style.scss';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  changeStoreData,
  getDataEnergyPerHour,
  getDataEnergyPerDay,
} from './actions';

import reducer from './reducer';
import saga from './saga';
import makeSelectDataEnergy from './selectors';

import Calendar from 'moedim';
import moment from 'moment-timezone';

const labelsInDay = [
  '1h',
  '2h',
  '3h',
  '4h',
  '5h',
  '6h',
  '7h',
  '8h',
  '9h',
  '10h',
  '11h',
  '12h',
  '13h',
  '14h',
  '15h',
  '16h',
  '17h',
  '18h',
  '19h',
  '20h',
  '21h',
  '22h',
  '23h',
  '24h',
];

function getDaysInCurrentMonth() {
  // Set the timezone to 'Asia/Ho_Chi_Minh' (Vietnam timezone)
  moment.tz.setDefault('Asia/Ho_Chi_Minh');

  const today = moment();
  const daysInMonth = today.daysInMonth();

  const dayLabels = [];
  for (let day = 1; day <= daysInMonth; day++) {
    dayLabels.push(day);
  }
  return dayLabels;
}

const labelsInMon = getDaysInCurrentMonth();

const FollowEnergyAdmin = props => {
  const { id } = useParams();

  console.log('iddđ', id);

  useInjectReducer({ key: 'dataEnergy', reducer });
  useInjectSaga({ key: 'dataEnergy', saga });

  // useEffect(() => {
  //   // props.getDataEnergyPerHour(id);
  //   props.getDataEnergyPerDay(id);
  // }, []);

  const { dataEnergy = {}, dataEnergyPerDay = {} } = props.dataEnergy;

  console.log('dataEnergyPerDay', dataEnergyPerDay);

  console.log('labelsInMon', labelsInMon);
  const [currentDay, setCurrentDay] = useState(new Date());
  // get Device Id

  const [labelLineChart, setLabelLineChart] = useState(labelsInDay);

  const apiKwh = `http://localhost:5502/api/v1/homeKey/energy/device/currentDayDataPerHour/${id}`;

  const [value, setValue] = useState(0);
  const handleChangeTime = (event, newValue) => {
    setValue(newValue);
  };

  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const [currentElectric, setCurrentElectric] = useState(70);
  // per 15 minutes
  const getCurrentElectric = async () => {
    const apiUrl = `${urlLink.api.serverUrl +
      urlLink.api.getLatestDataDeviceEnergy}${id}`;
    try {
      const response = await axios.get(apiUrl);

      setCurrentElectric(response.data.Current);

      console.log('getCurrentElectric', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCurrentElectric();

    const intervalId = setInterval(() => {
      getCurrentElectric();
    }, 1000 * 60 * 15);

    return () => clearInterval(intervalId);
  }, []);

  const [currentDayData, setCurrentDayData] = useState({});

  const [currentKwh, setCurrentKwh] = useState([]);

  const getCurrentDayData = async () => {
    console.log('Gọi lại ', apiKwh);

    startLoading();

    const apiUrl = apiKwh;
    // http://localhost:5502/api/v1/homeKey/energy/device/currentDayDataPerHour/23/2024-01-09T00:00:00/2024-01-09T23:59:59
    try {
      const response = await axios.get(apiUrl);

      if (value === 0) {
        setCurrentDayData(response.data.data);
      }
      setCurrentKwh(response.data.data.kWhData);

      console.log('getCurrentDayData', response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (value === 0) {
      props.getDataEnergyPerHour(id);
      setLabelLineChart(labelsInDay);

      setCurrentKwh(dataEnergy.kWhData);
    } else if (value === 1) {
      props.getDataEnergyPerDay(id);
      setLabelLineChart(labelsInMon);
      setCurrentKwh(dataEnergyPerDay.kWhData);
    }

    setCurrentDayData(dataEnergy);
  }, [value]);

  return (
    <>
      {loading && <div className="loading-overlay" />}
      <h1>Theo dõi điện năng</h1>
      <div style={{ marginLeft: '150px' }}>
        <Tabs
          value={value}
          onChange={handleChangeTime}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          label="scrollable auto tabs example"
        >
          <Tab label="1 Ngày" />
          <Tab label="1 Tháng" />
        </Tabs>
      </div>
      <div>
        <Grid container justify="center">
          <Grid
            item
            xs={12}
            sm={7}
            md={5}
            style={{
              height: '300px',
              margin: '8px',
              borderRadius: '20px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <LineChart
              textY="(kWh)"
              nameChart="Total kWh"
              dataEnergy={currentKwh}
              labelsEnergy={labelLineChart}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            style={{
              backgroundColor: 'white',
              height: '300px',
              margin: '8px',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              borderRadius: '20px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Speedometer
              id="dial6"
              value={currentElectric}
              title="Electric (A) lastupdate"
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            style={{
              height: '300px',
              margin: '8px',
              borderRadius: '20px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <LineChart
              textY="(W)"
              nameChart="Active Power last update x1000"
              dataEnergy={currentDayData.activePowerPerHour}
              labelsEnergy={labelsInDay}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            style={{
              height: '300px',
              margin: '8px',
              borderRadius: '20px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <LineChart
              textY="(A)"
              nameChart="Current Electric per 1 hour"
              dataEnergy={currentDayData.electricPerHour}
              labelsEnergy={labelsInDay}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            style={{
              height: '300px',
              margin: '8px',
              borderRadius: '20px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Calendar
              value={currentDay}
              onChange={d => setValue(d)}
              style={{ width: '300px', height: '200px' }}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  dataEnergy: makeSelectDataEnergy(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDataEnergyPerHour: id => {
      dispatch(getDataEnergyPerHour(id));
    },
    getDataEnergyPerDay: id => {
      dispatch(getDataEnergyPerDay(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default FollowEnergyAdmin;

export default compose(withConnect)(FollowEnergyAdmin);
