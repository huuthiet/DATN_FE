import React, {useState, useEffect} from 'react';
import {Grid,  Tabs, Tab, Box} from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import localStore from 'local-storage';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import LineChart from '../../components/LineChart';
import Speedometer from '../../components/Speedmetter';
import PaperWrapper from '../../components/PaperWrapper';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import './style.scss';

import Calendar from 'moedim';
import moment from 'moment-timezone';

const labelsInDay = ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h', '24h']

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


const FollowEnergyUser2 = props => {
  // const { currentUser = {} } = props;
  const currentUser = localStore.get('user') || {};
  const { idDevice = '' } = currentUser;
  // console.log("currentUser FollowEnergyUser", idDevice);
  //   console.log("labelsInMon", labelsInMon)
    const [currentDay, setCurrentDay] = useState(new Date());
    //get Device Id
    // const { id, name } = useParams();

    // console.log("iddđ", id);

    const [labelLineChart, setLabelLineChart] = useState(labelsInDay);

    // let apiKwh = `http://localhost:5502/api/v1/homeKey/energy/device/currentDayDataPerHour/${id}`;
    
    let apiKwh = urlLink.api.serverUrl + urlLink.api.getDataEnergyPerHour + idDevice;

    const [value, setValue] = useState(0);
    const handleChangeTime = (event, newValue) => {
        setValue(newValue);
        // console.log("newValue", newValue);
        // console.log("newValue", typeof(newValue));

        // if (newValue === 0) {
        //   apiKwh = `http://localhost:5502/api/v1/homeKey/energy/device/currentDayDataPerHour/${id}`;
        //   console.log("Đã chọn 00000")
        //   setLabelLineChart(labelsInDay);
        // } else if (newValue === 1) {
        //   apiKwh = `http://localhost:5502/api/v1/homeKey/energy/device/currentMonDataPerDay/${id}`;
        //   setLabelLineChart(labelsInMon);
        //   console.log("Đã chọn 1111111111111", apiKwh);
        // } 
    }


    
    // if (value === 0) {
    //   apiKwh = `http://localhost:5502/api/v1/homeKey/energy/device/currentDayDataPerHour/${id}`;
    //   setLabelLineChart(labelsInDay);
    // } else if (value === 1) {
    //   apiKwh = `http://localhost:5502/api/v1/homeKey/energy/device/currentMonDataPerDay/${id}`;
    //   setLabelLineChart(labelsInMon);
    // } 
    const [nameRoom, setNameRoom] = useState('');
    const [totalkWh, setTotalkWh] = useState(-1);

    const getNameRoom = async () => {
      // const apiUrl = urlLink.api.serverUrl + urlLink.api.getListDeviceEnergy;
      const apiUrl = urlLink.api.serverUrl + urlLink.api.getNameRoomByIdDevice + idDevice;
        try {
          const response = await axios.get(apiUrl);

          setNameRoom(response.data.data.roomName);
      
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
      getNameRoom();
    }, [])


    const [loading, setLoading] = useState(false);
    const startLoading = () => {
      setLoading(true);
    };
  
    const stopLoading = () => {
      setLoading(false);
    };

    const [currentElectric, setCurrentElectric] = useState(70);
    //per 15 minutes
    const getCurrentElectric = async () => {
        const apiUrl = urlLink.api.serverUrl + urlLink.api.getLatestDataDeviceEnergy + `${idDevice}`;
        if (currentUser.idDevice) {
          try {
            const response = await axios.get(apiUrl);
  
            setCurrentElectric(response.data.data.Current);
        
            // console.log("getCurrentElectric", response.data)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      };

      useEffect(() => {
        getCurrentElectric();
    
        const intervalId = setInterval(() => {
          getCurrentElectric();
        }, 1000*60*60);

        return () => clearInterval(intervalId);
      }, []);

    const [currentDayData, setCurrentDayData ] = useState([]);
    const [currentKwh, setCurrentKwh ] = useState([]);

    const getCurrentDayData = async () => {
      startLoading();

      // if (value === 0) {
      //   apiKwh = urlLink.api.serverUrl + urlLink.api.getDataEnergyPerHour + idDevice;
      //   // console.log("Đã chọn 00000")
      //   setLabelLineChart(labelsInDay);
      // } else if (value === 1) {
      //   const current = new Date();

      //   const currentYear = current.getFullYear();
      //   const currentMon = current.getMonth() + 1;

      //   // apiKwh = `http://localhost:5502/api/v1/homeKey/energy/device/currentMonDataPerDay/${id}/2024/01`;
      //   apiKwh = urlLink.api.serverUrl + urlLink.api.getDataEnergyPerDay + idDevice + '/' + currentYear + '/' + currentMon;
      //   setLabelLineChart(labelsInMon);
      //   // console.log("Đã chọn 1111111111111", apiKwh);
      // } 
        const current = new Date();

        const currentYear = current.getFullYear();
        const currentMon = current.getMonth() + 1;

        const apiUrl = apiKwh;
        const apiUrlDay = urlLink.api.serverUrl + urlLink.api.getDataEnergyPerHour + idDevice;
        const apiUrlMon = urlLink.api.serverUrl + urlLink.api.getDataEnergyPerDay + idDevice + '/' + currentYear + '/' + currentMon;

        if (currentUser.idDevice){
          try {
            const responseDay = await axios.get(apiUrlDay);
            const responseMon = await axios.get(apiUrlMon);

            if (value === 0) {
              setCurrentKwh(responseDay.data.data.kWhData);
              const formattedTotalkWh = parseFloat(responseDay.data.data.totalkWhDay).toFixed(2);
              setTotalkWh(formattedTotalkWh);
            } else if (value === 1) {
              const formattedTotalkWh = parseFloat(responseMon.data.data.totalkWhMon).toFixed(2);
              setTotalkWh(formattedTotalkWh);
              setCurrentKwh(responseMon.data.data.kWhData);
            }
            setCurrentDayData(responseDay.data.data);

          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            stopLoading();
            // reposLoaded();
          }
        } else {
          stopLoading();
          // reposLoaded();
        }
      };


      useEffect(() => {
        if (value === 0) {
          setLabelLineChart(labelsInDay);
        } else if (value === 1) {
          setLabelLineChart(labelsInMon);
        } 

        getCurrentDayData();
    
        const intervalId = setInterval(() => {
            getCurrentDayData();
        }, 1000*60*60);

        return () => clearInterval(intervalId);
      }, [value]);

    return (
        <>
        <Helmet>
          <title>Energy</title>
          <meta name="description" content="Description of Energy" />
        </Helmet>
        <div className="title-abc">Theo dõi năng lượng: {nameRoom}</div>

          {loading && <div className="loading-overlay"></div>}

            {/* display: 'flex', justifyContent: 'center'  */}
            <div style={{marginLeft:'150px' }}>
                <Tabs 
                    value={value} 
                    onChange={handleChangeTime} 
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor="primary" 
                textColor="primary"
                label="scrollable auto tabs example">
                <Tab label="1 Ngày" /> 
                <Tab label="1 Tháng" />
                </Tabs>
            </div>
            <div>
            <Grid container justify="center">
                <Grid item xs={12} sm={7} md={5} style={{ height: '300px', margin: '8px', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                    <LineChart textY='(kWh)' nameChart={`Total kWh: ${totalkWh}`} dataEnergy={currentKwh} labelsEnergy={labelLineChart}/>
                </Grid>

                <Grid item xs={12} sm={4} md={3} 
                    style={{ backgroundColor: 'white', height: '300px', margin: '8px', justifyContent: 'center', 
                        alignItems:'center', textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', 
                        borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                    <Speedometer
                        id="dial6"
                        value={currentElectric}
                        title="Electric (A)"
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={3} style={{height: '300px', margin: '8px', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <LineChart textY='(kW)' nameChart='Active Power' dataEnergy={currentDayData.activePowerPerHour} labelsEnergy={labelsInDay}/>
                </Grid>

                <Grid item xs={12} sm={7} md={7} style={{height: '300px', margin: '8px', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <LineChart textY='(A)' nameChart='Current Electric' dataEnergy={currentDayData.electricPerHour} labelsEnergy={labelsInDay}/>
                </Grid>

                <Grid item xs={12} sm={4} md={4} style={{ height: '300px', margin: '8px', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                         justifyContent: 'center', alignItems:'center', textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <Calendar value={currentDay} onChange={(d) => setValue(d)} style={{width: '300px', height: '200px'}}/>
                </Grid>
            </Grid>
            </div>
        </>
    );
}

FollowEnergyUser2.propTypes = {
  currentUser: PropTypes.object,
};
export default FollowEnergyUser2;