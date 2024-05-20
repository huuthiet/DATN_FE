import React, { useState, useEffect } from 'react';
import { Grid, Tabs, Tab, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import {
  Cancel,
  GetApp,
  Search,
  ArrowRightAlt,
  AttachMoney,
  Speed,
} from '@material-ui/icons';
import dayjs, { Dayjs } from 'dayjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import localStore from 'local-storage';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import LineChart from '../../components/LineChart';
import LineChartHover from '../../components/LineChartHover';
import Speedometer from '../../components/Speedmetter';
import PaperWrapper from '../../components/PaperWrapper';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import './style.scss';

import Calendar from 'moedim';
import moment from 'moment-timezone';

const labelsInDay = [
  '0h',
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

const FollowEnergyUser = props => {
  const currentUser = localStore.get('user') || {};
  const { idDevice = '' } = currentUser;

  const [currentDay, setCurrentDay] = useState(new Date());
  // get Device Id
  const { name, roomId } = useParams();
  console.log('roomId', roomId);

  // note
  const [info, setInfo] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [titleKwhChart, setTitleKwhChart] = useState('');
  const [exportState, setExportState] = useState(false);

  // State for export PDF
  const [exportStartDay, setExportStartDay] = useState('');
  const [exportEndDay, setExportEndDay] = useState('');
  const [exportInfo, setExportInfo] = useState({});
  const [exportRoomName, setExportRoomName] = useState('');
  const [exportTotalKwh, setExportTotalKwh] = useState('');
  const [exportLastKwh, setExportLastKwh] = useState('');
  const [exportLastWater, setExportLastWater] = useState('');
  const [exportLatestKwh, setExportLatestKwh] = useState('');
  const [exportLatestWater, setExportLatestWater] = useState('');
  const [exportDateTime, setExportDateTime] = useState([]);
  const [exportElectricUsage, setExportElectricUsage] = useState([]);
  const [exportWaterUsage, setExportWaterUsage] = useState([]);

  const currentDate = new Date();
  const [startDate, setStartDate] = useState(
    dayjs()
      .startOf('month')
      .format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState(
    dayjs(
      `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1,
      ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`,
    ).format('YYYY-MM-DD'),
  );
  // ngày bắt đầu và kế thúc để hiển thị, chưa lọc
  const [startDateDisplay, setStartDateDisplay] = useState(startDate);
  const [endDateDisplay, setEndDateDisplay] = useState(endDate);

  const [formattedStartDate, setFormattedStartDate] = useState('');
  const [formattedEndDate, setFormattedEndDate] = useState('');

  const handleStartDateDisplayChange = event => {
    const newDate = event.target.value;
    console.log('newDate', newDate);

    setStartDateDisplay(newDate);
  };
  const handleEndDateDisplayChange = event => {
    const newDate = event.target.value;

    setEndDateDisplay(newDate);
  };

  const handleButtonFilter = async () => {
    if (endDateDisplay < startDateDisplay) {
      setShowAlert(true);
    } else {
      setShowAlert(false);

      const apiGetDay = `${urlLink.api.serverUrl +
        urlLink.api.getTotalKWhPerDayForDayToDayV2 +
        roomId}/${startDateDisplay}/${endDateDisplay}`;

      console.log("apiGetDay hihi: ", apiGetDay);

      try {
        setValue(2);
        startLoading();
        const totalKWhtitle = document.getElementById('total-kwh-title');
        const detailKwhTitle = document.getElementById('detail-kwh-title');
        totalKWhtitle.setAttribute('hidden', true);
        detailKwhTitle.setAttribute('hidden', true);
        console.log("apiGetDay hihi: ", apiGetDay);
        const response = await axios.get(apiGetDay);
        // console.log('response', response);

        const result = response.data.data;
        // console.log('resultttttttttttttttttttttttttttt', result);

        setInfo(result);

        // parseFloat(responseMon.data.data.totalkWhMon).toFixed(2);

        setTotalkWh(parseFloat(result.totalkWhTime).toFixed(2));
        setCurrentKwh(result.kWhData);
        setLabelLineChart(result.labelTime);

        setExportStartDay(format(new Date(startDateDisplay), 'dd/MM/yyyy'));
        setExportEndDay(format(new Date(endDateDisplay), 'dd/MM/yyyy'));
        setExportRoomName(result.dataBefore.NameRoom);
        // Hàm định dạng ngày tháng
        const formatDate = inputDate => {
          // Nếu không có inputDate thì trả về chuỗi rỗng
          if (!inputDate) return 'No data';
          const date = new Date(inputDate);
          const day = date.getDate();
          const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        };

        // Lấy kết quả và định dạng ngày tháng
        const formattedExportDateTime = result.labelTime.map(formatDate);

        // Lưu trữ kết quả đã định dạng trong state
        setExportDateTime(formattedExportDateTime);

        // Check if result.kWhData is not null
        const exportElectricUsage = result.kWhData !== null ? result.kWhData : 0;
        setExportElectricUsage(exportElectricUsage);

        const exportWaterUsage = result.waterData !== null ? result.waterData : 0;

        setExportWaterUsage(exportWaterUsage);

        setExportInfo(result);
        setExportTotalKwh(result.totalkWhTime.toFixed(2));

        setTitleKwhChart(
          `Total kWh from ${startDateDisplay} to ${endDateDisplay}`,
        );
        // Định dạng lại ngày sử dụng format từ date-fns
        setFormattedStartDate(format(new Date(startDateDisplay), 'dd/MM/yyyy'));
        setFormattedEndDate(format(new Date(endDateDisplay), 'dd/MM/yyyy'));

        // Lưu số điện và số nước tháng trước vào state
        if (result.dataBefore.Total_kWh) {
          setExportLastKwh(result.dataBefore.Total_kWh);
        } else setExportLastKwh('No data');
        if (result.dataBefore.Total_Water) {
          setExportLastWater(result.dataBefore.Total_Water);
        } else {
          setExportLastWater('No data');
        }

        // Lưu số điện và số nước tháng này vào state
        const { rawData } = result;
        if (rawData) {
          const latestTotalKwh = rawData[rawData.length - 1];
          // console.log('latestTotalKwh', latestTotalKwh);
          if (latestTotalKwh.Total_kWh) {
            setExportLatestKwh(
              latestTotalKwh.Total_kWh.toLocaleString('vi-VN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
            );
          } else {
            setExportLatestKwh('No data');
          }
        } else {
          setExportLatestKwh('No data');
        }
        if (rawData) {
          const latestTotalWater = rawData[rawData.length - 1];
          if (latestTotalWater.Total_Water) {
            setExportLatestWater(
              latestTotalWater.Total_Water.toLocaleString('vi-VN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
            );
          } else {
            setExportLatestWater('No data');
          }
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
        toast.error(
          error.response.data.errors[0].errorMessage,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
          },
        );
      } finally {
        stopLoading();
      }
    }
  };

  const handleExportPdf = async () => {
    // Tạo đối tượng jsPDF với kích thước trang A4
    const pdfDoc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    // setfont
    pdfDoc.setFontSize(12);

    // Define table column headers
    const headers = [
      [
        'Time',
        'Electricity Usage (kWh)',
        'Water Usage (cubic meters)',
        'Total Cost (VND)',
      ],
    ];

    // Tạo mảng data ban đầu
    const data = [];

    // Hàm tính toán totalPrice
    const calculateTotalPrice = (electricUsage, waterUsage) => {
      // console.log('electricUsagehỉhrkfhdfkdfdkhfkdh', electricUsage, 'waterUsage', waterUsage);
      if (electricUsage === undefined) {
        electricUsage = 0;
      }
      if (waterUsage === null) {
        waterUsage = 0;
      }

      const electricUnitPrice = 3900; // Giá tiền cho mỗi đơn vị electricUsage
      const waterUnitPrice = 4400; // Giá tiền cho mỗi đơn vị waterUsage
      const totalPrice =
        electricUsage * electricUnitPrice + waterUsage * waterUnitPrice;
      return totalPrice.toFixed(0);
    };

    // Thêm dữ liệu từ exportDateTime, exportElectricUsage và exportWaterUsage vào data
    exportDateTime.forEach((dateTime, index) => {
      const electricUsage =
        exportElectricUsage[index] != null
          ? exportElectricUsage[index]
          : 0;
      const formattedElectricUsage = parseFloat(electricUsage).toLocaleString(
        'vi-VN',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      );
      const waterUsage =
        exportWaterUsage && exportWaterUsage[index] !== undefined
          ? exportWaterUsage[index]
          : 0;
      const formattedWaterUsage = parseFloat(waterUsage).toLocaleString(
        'vi-VN',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      );

      const totalPrice = calculateTotalPrice(electricUsage, waterUsage);
      const formattedTotalPrice = parseFloat(totalPrice).toLocaleString(
        'vi-VN',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      );

      data.push([
        dateTime,
        _.isNaN(formattedElectricUsage) ? 0 : formattedElectricUsage,
        _.isNaN(formattedWaterUsage) ? 0 : formattedWaterUsage,
        formattedTotalPrice,
      ]);
    });

    // Tính tổng toàn bộ tiền
    const totalPriceSum = exportDateTime.reduce((total, dateTime, index) => {
      const electricUsage =
        exportElectricUsage[index] !== undefined
          ? exportElectricUsage[index]
          : 0;
      // console.log('electricUsage', electricUsage);
      const waterUsage =
        exportWaterUsage[index] !== undefined ? exportWaterUsage[index] : 0;
      const totalPrice = calculateTotalPrice(electricUsage, waterUsage);
      return total + parseFloat(totalPrice);
    }, 0);

    // Định dạng số và thêm đơn vị tiền tệ
    const totalPriceFormatted = totalPriceSum.toLocaleString('vi-VN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Thêm vào mảng dữ liệu
    data.push(['Total Amount', '', '', `${totalPriceFormatted} (VND)`]);

    // Thêm tiêu đề và thông tin khác vào file PDF
    const title = 'HOMELAND INVOICE';
    pdfDoc.setFontSize(20); // Kích thước font cho tiêu đề

    const textWidth = pdfDoc.getTextWidth(title);
    const startX = (pdfDoc.internal.pageSize.getWidth() - textWidth) / 2; // Căn giữa theo chiều rộng
    const electricUnitPrice = 3900;
    const formattedElectricUnitPrice = electricUnitPrice.toLocaleString(
      'vi-VN',
      {
        maximumFractionDigits: 2,
      },
    );
    const waterUnitPrice = 4400;
    const formattedWaterUnitPrice = waterUnitPrice.toLocaleString('vi-VN', {
      maximumFractionDigits: 2,
    });

    pdfDoc.text(title, startX, 20);

    pdfDoc.setFontSize(12); // Kích thước font cho thông tin
    pdfDoc.text(`Room Name: ${exportRoomName}`, 30, 30);

    pdfDoc.text(`Period: From ${exportStartDay} to ${exportEndDay}`, 30, 40);
    drawHorizontalLine(30, 44); // Vẽ đường ngang dưới thông tin
    pdfDoc.text(`Electricity Usage Last Month: ${exportLastKwh} (kWh)`, 30, 50);
    pdfDoc.text(
      `Electricity Usage This Month: ${exportLatestKwh} (kWh)`,
      30,
      60,
    );
    pdfDoc.text(
      `Water Usage Last Month: ${exportLastWater} (cubic meters)`,
      30,
      70,
    );
    pdfDoc.text(
      `Water Usage This Month: ${exportLatestWater} (cubic meters)`,
      30,
      80,
    );

    pdfDoc.text(`Total kWh: ${exportTotalKwh} (kWh)`, 30, 90);
    pdfDoc.text(
      `Electricity Unit Price: ${formattedElectricUnitPrice} (VND/kWh)`,
      30,
      100,
    );
    pdfDoc.text(
      `Water Unit Price: ${formattedWaterUnitPrice} (VND/cubic meter)`,
      30,
      110,
    );

    pdfDoc.text(`Total Amount: ${totalPriceFormatted} (VND)`, 30, 120);

    // Hàm vẽ đường ngang
    function drawHorizontalLine(startX, startY) {
      const lineLength = 150; // Độ dài đường ngang
      const lineHeight = 0.5; // Độ dày đường ngang
      pdfDoc.setLineWidth(lineHeight);
      pdfDoc.line(
        startX,
        startY + lineHeight,
        startX + lineLength,
        startY + lineHeight,
      );
    }

    // Lấy ra element chứa biểu đồ
    const chartContainer = document.querySelector('.bill-1-component1 canvas');

    // Chuyển đổi biểu đồ thành hình ảnh sử dụng html2canvas
    const chartImage = await html2canvas(chartContainer);

    // Chèn hình ảnh biểu đồ vào file PDF
    pdfDoc.addImage(chartImage.toDataURL('image/png'), 'PNG', 20, 150, 180, 80);

    pdfDoc.addPage();
    pdfDoc.autoTable({
      head: headers,
      body: data,
      theme: 'striped',
      startY: 20, // starting y position of the table
      margin: { top: 20, left: 30 }, // margin-top
    });

    // Xuất file PDF
    pdfDoc.save(
      `energy_report_${exportRoomName}_${exportStartDay}_${exportEndDay}.pdf`,
    );
  };

  const handleExportPreview = () => {
    // Toggle the export state
    setExportState(true);
    // console.log('exportState', exportState);

    // Elements to toggle visibility
    const pdfExportContainer = document.getElementById('pdf-export-container');
    const chartContainer = document.getElementById('chart-container');
    const btnPreview = document.getElementById('btn-export-preview');
    const btnExport = document.getElementById('btn-export');
    const btnCancel = document.getElementById('btn-cancel');

    // Toggle visibility based on the updated export state
    if (exportState === false) {
      pdfExportContainer.removeAttribute('hidden');
      chartContainer.setAttribute('hidden', true);
      btnExport.removeAttribute('hidden');
      btnCancel.removeAttribute('hidden');
      btnPreview.setAttribute('hidden', true);
    } else {
      pdfExportContainer.setAttribute('hidden', true);
      chartContainer.removeAttribute('hidden');
      btnExport.setAttribute('hidden', true);
      btnCancel.setAttribute('hidden', true);
      btnPreview.removeAttribute('hidden');
    }
  };

  const handleCancel = () => {
    // Elements to toggle visibility
    const pdfExportContainer = document.getElementById('pdf-export-container');
    const chartContainer = document.getElementById('chart-container');
    const btnPreview = document.getElementById('btn-export-preview');
    const btnExport = document.getElementById('btn-export');
    const btnCancel = document.getElementById('btn-cancel');
    const totalKWhtitle = document.getElementById('total-kwh-title');
    const detailKwhTitle = document.getElementById('detail-kwh-title');

    // Toggle visibility based on the updated export state
    pdfExportContainer.setAttribute('hidden', true);
    chartContainer.removeAttribute('hidden');
    btnPreview.removeAttribute('hidden');
    btnExport.setAttribute('hidden', true);
    btnCancel.setAttribute('hidden', true);
    totalKWhtitle.removeAttribute('hidden');
    detailKwhTitle.removeAttribute('hidden');

    // Reset the export state
    setExportState(false);
    // Reset date
    setStartDateDisplay(startDate);
    setEndDateDisplay(endDate);

    // Reset info
    setInfo({});

    // Reset chart
    setCurrentKwh([]);
    setLabelLineChart(labelsInDay);
    setTitleKwhChart(`Total kWh today`);
  };

  //--------------------------

  const [labelLineChart, setLabelLineChart] = useState(labelsInDay);

  // let apiKwh = `http://localhost:5502/api/v1/homeKey/energy/device/currentDayDataPerHour/${id}`;
  // const resultData = {
  //   totalkWhDay: totalkWhDay,
  //   kWhData: kWhData,
  //   dataBeforeDay: dataBeforeDay,
  //   dataInDay: dataWithNulls,
  //   activePowerPerHour: activePowerPerHour,
  //   electricPerHour: electricPerHour,
  // };

  // const apiKwh =
  //   urlLink.api.serverUrl + urlLink.api.getDataEnergyPerHour + idMetter;

  // const apiKwh = urlLink.api.serverUrl + urlLink.api.getTotalKWhPerHourInOneDayV2
  //   + roomId + "/" + moment().format("YYYY-MM-DD");

  // console.log('apiKwh', apiKwh);


  const [value, setValue] = useState(0);
  const handleChangeTime = (event, newValue) => {
    setValue(newValue);
  };

  const [totalkWh, setTotalkWh] = useState(-1);
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const [currentDayData, setCurrentDayData] = useState([]);
  const [currentKwh, setCurrentKwh] = useState([]);
  const [currentCurrent, setCurrentCurrent] = useState([]);
  const [currentVoltage, setCurrentVoltage] = useState([]);

  const getCurrentDayData = async () => {
    startLoading();

    const apiUrlDay =
      urlLink.api.serverUrl + urlLink.api.getTotalKWhPerHourInOneDayV2
      + roomId + "/" + moment().format("YYYY-MM-DD");
    console.log({ apiUrlDay });

    const apiUrlMon = urlLink.api.serverUrl + urlLink.api.getTotalKWhPerDayInOneMonthV2
      + roomId + "/" + moment().format("YYYY-MM");
    console.log({ apiUrlMon });

    try {
      if (value === 0) {
        const responseDay = await axios.get(apiUrlDay);
        setCurrentKwh(responseDay.data.data.kWhData);
        const formattedTotalkWh = parseFloat(
          responseDay.data.data.totalkWhTime,
        ).toFixed(2);
        setTotalkWh(formattedTotalkWh);
        setCurrentVoltage(responseDay.data.data.voltageData);
        setCurrentCurrent(responseDay.data.data.currentData);

        setLabelLineChart(labelsInDay);

        console.log({ responseDay })

        setTitleKwhChart(`Total kWh today`);
      } else if (value === 1) {
        const responseMon = await axios.get(apiUrlMon);
        console.log({ responseMon });
        const formattedTotalkWh = parseFloat(
          responseMon.data.data.totalkWhTime,
        ).toFixed(2);
        setTotalkWh(formattedTotalkWh);
        setCurrentKwh(responseMon.data.data.kWhData);

        setLabelLineChart(labelsInMon);

        setTitleKwhChart(`Total kWh this month`);

        const responseDay = await axios.get(apiUrlDay);
        setCurrentVoltage(responseDay.data.data.voltageData);
        setCurrentCurrent(responseDay.data.data.currentData);
      } else if (value === 2) {
        // Đang thực hiện filter từ ngày tới ngày
        const apiGetDay = `${urlLink.api.serverUrl +
          urlLink.api.getTotalKWhPerDayForDayToDayV2 +
          roomId}/${startDateDisplay}/${endDateDisplay}`;

        const response = await axios.get(apiGetDay);

        const result = response.data.data;

        setInfo(result);

        // parseFloat(responseMon.data.data.totalkWhMon).toFixed(2);

        setTotalkWh(parseFloat(result.totalkWhTime).toFixed(2));
        setCurrentKwh(result.kWhData);
        setLabelLineChart(result.labelTime);

        const responseDay = await axios.get(apiUrlDay);
        setCurrentVoltage(responseDay.data.data.voltageData);
        setCurrentCurrent(responseDay.data.data.currentData);
      }
      // setCurrentDayData(responseDay.data.data);
    } catch (error) {
      setCurrentKwh([]);
      setCurrentVoltage([]);
      setCurrentCurrent([]);
      setTotalkWh(0);
      console.error('Error fetching data:', error);
      toast.error(
        error.response.data.errors[0].errorMessage,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        },
      );
    } finally {
      stopLoading();
      // reposLoaded();
    }
  };


  useEffect(() => {

    getCurrentDayData();

    const intervalId = setInterval(() => {
      getCurrentDayData();
    }, 1000 * 15);

    return () => clearInterval(intervalId);
  }, [value]);

  // Hàm tính toán totalPrice
  const calculateTotalPrice = (electricUsage, waterUsage) => {
    if (electricUsage === null) {
      electricUsage = 0;
    }
    if (waterUsage === null) {
      waterUsage = 0;
    }
    console.log('electricUsage', electricUsage, 'waterUsage', waterUsage);
    const electricUnitPrice = 3900; // Giá tiền cho mỗi đơn vị electricUsage
    const waterUnitPrice = 4400; // Giá tiền cho mỗi đơn vị waterUsage
    const totalPrice =
      electricUsage * electricUnitPrice + waterUsage * waterUnitPrice;
    return totalPrice.toFixed(2);
  };

  return (
    <>
      <Helmet>
        <title>Energy</title>
        <meta name="description" content="Description of Energy" />
      </Helmet>
      <div className="title-abc">Theo dõi năng lượng: {name}</div>

      {showAlert && (
        <Alert severity="error">
          Vui lòng nhập ngày sau lớn hơn ngày trước!
        </Alert>
      )}
      <br />

      {loading && <div className="loading-overlay" />}

      <div className="manage-container">
        <input
          type="date"
          id="startdate"
          value={startDateDisplay}
          onChange={handleStartDateDisplayChange}
        />
        <label htmlFor="enddate">
          <ArrowRightAlt />
        </label>
        <input
          type="date"
          id="enddate"
          value={endDateDisplay}
          onChange={handleEndDateDisplayChange}
        />
        <Button
          className="btn-filter"
          onClick={handleButtonFilter}
          variant="outlined"
        >
          <Search className="filter-icon" />
        </Button>
        <Button
          className="btn-export"
          id="btn-export-preview"
          variant="outlined"
          onClick={handleExportPreview}
        >
          <GetApp className="export-icon" />
          Export
        </Button>
        <Button
          hidden
          className="btn-cancel"
          id="btn-cancel"
          variant="outlined"
          onClick={handleCancel}
        >
          <Cancel className="cancel-icon" />
          Cancel
        </Button>

        <Button
          hidden
          id="btn-export"
          className="btn-export"
          onClick={handleExportPdf}
        >
          <GetApp className="export-icon" />
          Download
        </Button>
      </div>

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
      <div id="chart-container">
        <Grid container justify="center">
          {/* <Grid
            item
            xs={12}
            sm={7}
            md={5}
            style={{
              height: '300px',
              margin: '8px',
              borderRadius: '6px',
              boxShadow: '1px 1px 16px 2px rgba(0, 0, 0, 0.1)',
            }}
          >
            <LineChart
              textY="(kWh)"
              nameChart={`${titleKwhChart}: ${totalkWh}`}
              dataEnergy={currentKwh}
              labelsEnergy={labelLineChart}
            />
          </Grid> */}

          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            style={{
              height: '350px',
              margin: '8px',
              padding: '12px',
              borderRadius: '6px',
              boxShadow: '2px 2px 20px 6px rgba(0, 0, 0, 0.05)',
            }}
          >
            <LineChartHover
              textY="(kWh)"
              nameChart={`${titleKwhChart}: ${totalkWh}`}
              dataEnergy={currentKwh}
              labelsEnergy={labelLineChart}
              roomId={roomId}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            style={{
              height: '350px',
              margin: '8px',
              padding: '12px',
              borderRadius: '6px',
              boxShadow: '2px 2px 20px 6px rgba(0, 0, 0, 0.05)',
            }}
          >
            <LineChart
              textY="(V)"
              nameChart="Volt"
              dataEnergy={currentVoltage}
              labelsEnergy={labelsInDay}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            style={{
              height: '350px',
              margin: '8px',
              padding: '12px',
              borderRadius: '6px',
              boxShadow: '2px 2px 20px 6px rgba(0, 0, 0, 0.05)',
            }}
          >
            <LineChart
              textY="(A)"
              nameChart="Current"
              dataEnergy={currentCurrent}
              labelsEnergy={labelsInDay}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            style={{
              height: '350px',
              margin: '8px',
              padding: '12px',
              borderRadius: '6px',
              boxShadow: '2px 2px 20px 6px rgba(0, 0, 0, 0.05)',
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

      <div hidden id="pdf-export-container" className="total-info-container">
        <div className="bill-1">
          <div className="bill-1-component1">
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              style={{
                height: '350px',
                margin: '8px',
                padding: '12px',
                borderRadius: '6px',
                boxShadow: '2px 2px 20px 6px rgba(0, 0, 0, 0.05)',
              }}
            >
              <LineChart
                textY="(kWh)"
                nameChart={`${titleKwhChart}`}
                dataEnergy={currentKwh}
                labelsEnergy={labelLineChart}
              />
            </Grid>
          </div>

          <div className="bill-1-component2">
            <Grid
              className="total-info-content"
              item
              xs={12}
              sm={4}
              md={12}
              style={{
                height: '350px',
                margin: '8px',
                padding: '12px',
                borderRadius: '6px',
                boxShadow: '2px 2px 20px 6px rgba(0, 0, 0, 0.05)',
              }}
            >
              <span className="title" id="total-kwh-title">
                Tổng số điện
              </span>
              {info && info.labelTime && info.kWhData && (
                <div className="detail-container">
                  <span className="title">{`Tổng số điện từ ${formattedStartDate} đến ${formattedEndDate}`}</span>
                  <span className="content">
                    <Speed className="icon" />
                    Tổng kWh:{' '}
                    {info.kWhData && info.kWhData.length > 0
                      ? info.kWhData
                        .filter(value => value !== null)
                        .reduce((tổng, giáTrị) => tổng + parseFloat(giáTrị), 0)
                        .toFixed(2)
                      : '0.00'}{' '}
                    (kWh)
                  </span>

                  <span className="content">
                    {/* calculate total kWh */}
                    <br />
                    <Speed className="icon" />
                    Total water:{' '}
                    {info.waterData
                      ? info.waterData
                        .reduce(
                          (total, value) => total + parseFloat(value),
                          0,
                        )
                        .toFixed(2)(m3)
                      : 'Không có dữ liệu'}
                  </span>
                  <span className="content">
                    <AttachMoney className="icon" />
                    Total Cost:{' '}
                    {info.kWhData && info.kWhData.length > 0
                      ? (
                        info.kWhData
                          .filter(value => value !== null)
                          .reduce((total, value) => total + parseFloat(value), 0) * 3900
                      ).toLocaleString('vi-VN', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '0'}{' '}
                    (VND)
                  </span>

                </div>
              )}
            </Grid>
          </div>
        </div>

        <div className="bill-2">
          <Grid
            className="total-info-content"
            item
            xs={12}
            sm={4}
            md={12}
            style={{
              height: '400px',
              margin: '8px',
              borderRadius: '6px',
              boxShadow: '1px 1px 16px 2px rgba(0, 0, 0, 0.1)',
            }}
          >
            <span id="detail-kwh-title">Chi tiết số điện sử dụng</span>
            {info && info.labelTime && info.kWhData && (
              <table>
                <thead>
                  <tr>
                    <th>Thời gian</th>
                    <th>Số điện (kWh)</th>
                    <th>Số nước (mét khối)</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {info.labelTime.map((date, index) => (
                    <tr key={index}>
                      {date ? <td>{date}</td> : <td>Không có dữ liệu</td>}
                      {info.kWhData ? (
                        info.kWhData[index] !== null ? (
                          <td>{parseFloat(info.kWhData[index]).toFixed(2)}</td>
                        ) : (
                          <td>Không có dữ liệu</td>
                        )
                      ) : (
                        <td>Không có dữ liệu</td>
                      )}

                      {/* Check xem info có waterData không */}
                      {info.waterData ? (
                        // Nếu có, kiểm tra nếu waterData[index] đã được định nghĩa
                        info.waterData[index] !== null ? (
                          <td>
                            {parseFloat(info.waterData[index]).toFixed(2)}
                          </td>
                        ) : (
                          <td>Không có dữ liệu</td>
                        )
                      ) : (
                        // Nếu không có waterData, hiển thị cột trống
                        <td>Không có dữ liệu</td>
                      )}

                      {/* Tính toán thành tiền */}
                      <td>
                        {info.kWhData !== null &&
                          info.waterData !== undefined
                          ? info.kWhData[index] !== null &&
                            info.waterData[index] !== undefined
                            ? // Nếu cả hai giá trị đều tồn tại, tính toán thành tiền
                            calculateTotalPrice(
                              info.kWhData[index],
                              info.waterData[index],
                            )
                            : // Nếu một trong hai giá trị không tồn tại, truyền giá trị 0
                            calculateTotalPrice(
                              info.kWhData[index] !== null
                                ? info.kWhData[index]
                                : 0,
                              info.waterData[index] !== undefined
                                ? info.waterData[index]
                                : 0,
                            )
                          : // Nếu không có dữ liệu, truyền giá trị 0
                          info.kWhData !== null &&
                            info.waterData === undefined
                            ? calculateTotalPrice(info.kWhData[index], 0)
                            : calculateTotalPrice(0, info.waterData[index])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Grid>
        </div>
      </div>
    </>
  );
};

FollowEnergyUser.propTypes = {
  currentUser: PropTypes.object,
};
export default FollowEnergyUser;
