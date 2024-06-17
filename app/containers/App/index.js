/**
 *
 * App
 *
 */

import 'bootstrap/dist/css/bootstrap.css';
import AddMoney from 'containers/AddMoney/Loadable';
import Auth from 'containers/Auth/Loadable';
import ChangePassword from 'containers/ChangePassword/Loadable';
import CreateMotel from 'containers/CreateMotel/Loadable';
import CreateRoom from 'containers/CreateRoom/Loadable';
import HistoryFloorsRoomHost from 'containers/HistoryFloorsRoomHost/Loadable';
import HistoryRoomHostDetail from 'containers/HistoryFloorsRoomHostDetail/Loadable';
import HistoryRoomHost from 'containers/HistoryRoomHost/Loadable';
import HistoryRoomHostAdmin from 'containers/HistoryRoomHostAdmin/Loadable';
import HostMotelRoom from 'containers/HostMotelRoom/Loadable';
import HostMotelRoomDetail from 'containers/HostMotelRoomDetail/Loadable';
import HostMotelRoomDetailUser from 'containers/HostMotelRoomDetailUser/Loadable';
import HostRevenue from 'containers/HostRevenue/Loadable';
import HostRevenueManageAdmin from 'containers/HostRevenueManageAdmin/Loadable';
import ProcessWithdrawAdmin from 'containers/ProcessWithdrawAdmin/Loadable';
import HistoryEnergyUser from 'containers/HistoryEnergyUser/Loadable';
import HistoryEnergyHost from 'containers/HistoryEnergyHost/Loadable';
// import HostMotelRoomUser from 'containers/HostMotelRoomUser/Loadable';
import BillList from 'containers/BillList/Loadable';
import BillListAdmin from 'containers/BillListAdmin/Loadable';
import Job from 'containers/Job/Loadable';
import MapsPage from 'containers/MapsPage/Loadable';
import Motel from 'containers/Motel/Loadable';
import MotelDetail from 'containers/MotelDetail/Loadable';
import MotelDetailV2 from 'containers/MotelDetailV2/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import OrderDetail from 'containers/OrderDetail/Loadable';
import OrderList from 'containers/OrderList/Loadable';
import OrderListHost from 'containers/OrderListHost/Loadable';
import OrderPay from 'containers/OrderPay/Loadable';
import Payment from 'containers/Payment/Loadable';
import PaymentReturn from 'containers/PaymentReturn/Loadable';
import Profile from 'containers/Profile/Loadable';
import ProfileUpdate from 'containers/ProfileUpdate/Loadable';
import ReportProblem from 'containers/ReportProblem/Loadable';
import ReportProblemList from 'containers/ReportProblemList/Loadable';
import ReportProblemListAdmin from 'containers/ReportProblemListAdmin/Loadable';
import RoomDetail from 'containers/RoomDetail/Loadable';
import RoomDetailUpdate from 'containers/RoomDetailUpdate/Loadable';
import RoomDetailUpdateAdmin from 'containers/RoomDetailUpdateAdmin/Loadable';
import TransactionLog from 'containers/TransactionLog/Loadable';
import TransactionPayMentList from 'containers/TransactionPayMentList/Loadable';
import TransactionPayMentListHost from 'containers/TransactionPayMentListHost/Loadable';
import TransactionPayMentUserList from 'containers/TransactionPayMentUserList/Loadable';
import UpdateMotel from 'containers/UpdateMotel/Loadable';
import UpdateRoom from 'containers/UpdateRoom/Loadable';
import EnergyBillingManage from 'containers/EnergyBillingManage/Loadable';
import RoomManagePage from 'containers/EnergyBillingManage/RoomManage/Loadable';
import RoomBillingManage from 'containers/EnergyBillingManage/RoomBillingManage/Loadable';
import EnergyRoomsBillUser from 'containers/EnergyRoomsBillUser/Loadable';
import MonthlyOrderList from 'containers/MonthlyOrderList/Loadable';
import ManagerPayDepositHost from 'containers/ManagerPayDepositHost/Loadable';
import ManagerPayDepositUser from 'containers/ManagerPayDepositUser/Loadable';
import ListOrderNoPayOfPayDeposit from 'containers/ListOrderNoPayOfPayDeposit/Loadable';
import HistoryDepositAfterCheckInCost from 'containers/HistoryDepositAfterCheckInCost/Loadable';
import OrderDepositRoomListByMotel from 'containers/OrderDepositRoomListByMotel/Loadable';
import OrderMonthlyRoomListByMotel from 'containers/OrderMonthlyRoomListByMotel/Loadable';
import HistoryMonthly from 'containers/HistoryMonthly/Loadable';
import ManageDeposit from 'containers/ManageDeposit/Loadable';
import ManageMonthly from 'containers/ManageMonthly/Loadable';
import ManagerAcceptMonthlyHost from 'containers/ManagerAcceptMonthlyHost/Loadable';
import OrderMonthlyPendingPayment from 'containers/OrderMonthlyPendingPayment/Loadable';

// note
import ManagerEnergyRooms from 'containers/ManagerEnergyRooms/Loadable';
import ManagerEnergyBuildings from 'containers/ManagerEnergyBuildings/Loadable';
import EnergyDetail from 'containers/EnergyDetail/Loadable';
import ScadaElectricEMS from 'containers/ScadaElectricEMS/Loadable';
import FollowEnergyAdmin from 'containers/FollowEnergyAdmin/Loadable';
import FollowEnergyHost from 'containers/FollowEnergyHost/Loadable';
import FollowEnergyUser2 from 'containers/FollowEnergyUser2/Loadable';
import FollowEnergyUser from 'containers/FollowEnergyUser/Loadable';
import Withdraw from 'containers/Withdraw/Loadable';
import RequestWithdrawUserList from 'containers/RequestWithdrawUserList/Loadable';
import RequestWithdrawList from 'containers/RequestWithdrawList/Loadable';
import ManagerEnergyBuildingsHost from 'containers/ManagerEnergyBuildingsHost/Loadable';
import ManagerEnergyRoomsHost from 'containers/ManagerEnergyRoomsHost/Loadable';
import ManagerEnergyBuildingSummaryReport from 'containers/ManagerEnergyBuildingSummaryReport/Loadable';
import ManagerEnergyRoomsUser from 'containers/ManagerEnergyRoomsUser/Loadable';
import ManagerAcceptDepositHost from 'containers/ManagerAcceptDepositHost/Loadable';
import CensorMotels from 'containers/CensorMotels/Loadable';
import CensorHosts from 'containers/CensorHosts/Loadable';
import ManagerAcceptAfterCheckInCostHost from 'containers/ManagerAcceptAfterCheckInCostHost/Loadable';
import OrderDepositAfterCheckInCostPendingPayment from 'containers/OrderDepositAfterCheckInCostPendingPayment/Loadable';

import ManagerEnergyHostAdmin from 'containers/ManagerEnergyHostAdmin/Loadable';
import ManageMotelListAdmin from 'containers/ManageMotelListAdmin/Loadable';
import ManageDepositAdmin from 'containers/ManageDepositAdmin/Loadable';
import ManageMonthlyAdmin from 'containers/ManageMonthlyAdmin/Loadable';
import ManagerEnergyBuildingsAdmin from 'containers/ManagerEnergyBuildingsAdmin/Loadable';
import ManagerEnergyRoomsAdmin from 'containers/ManagerEnergyRoomsAdmin/Loadable';
import TransactionBankingCashLog from 'containers/TransactionBankingCashLog/Loadable';
import OrdersPendingPayUser from 'containers/OrdersPendingPayUser/Loadable';

//----------------------------
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import axios from 'axios';
import About from 'containers/About/Loadable';
import AdminUsers from 'containers/AdminUsers/Loadable';
import AdminUsersDetail from 'containers/AdminUsersDetail/Loadable';
import JobDetail from 'containers/JobDetail/Loadable';
import JobDetailUser from 'containers/JobDetailUser/Loadable';
import JobList from 'containers/JobList/Loadable';
import JobListUser from 'containers/JobListUser/Loadable';
import JobVerify from 'containers/JobVerify/Loadable';
import MoneyInformation from 'containers/MoneyInformation/Loadable';
import MoneyInformationDetail from 'containers/MoneyInformationDetail/Loadable';
import RoomBill from 'containers/RoomBill/Loadable';
import ExportBillRoom from 'containers/ExportBillRoom/Loadable';
import RoomManage from 'containers/RoomManager/Loadable';
import Terms from 'containers/Terms/Loadable';
import localStore from 'local-storage';
import { FormattedMessage } from 'react-intl';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import LoadingIndicator from '../../components/LoadingIndicator';
import Navbar from '../../components/Navbar';
import messages from '../../components/Navbar/messages';
import WarningPopup from '../../components/WarningPopup';
import { changeLocale } from '../LanguageProvider/actions';
import {
  Search_Addresses,
  changeAppStoreData,
  getLogout,
  saveCurrentUser,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectApp from './selectors';
import './style.scss';
import { WarningOutlined } from '@material-ui/icons';
import WithdrawRequestListHost from 'containers/WithdrawRequestListHost/Loadable';
import { address } from 'ip';

axios.defaults.headers.common.Authorization = `Bearer ${localStore.get(
  'token',
)}`;
export function App(props) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });
  const {
    loading,
    currentUser,
    showLogout,
    showAlert = false,
    alert = {},
    listroom,
  } = props.app;
  useEffect(() => {
    props.saveCurrentUser(localStore.get('user') || {});
  }, []);

  // const [inputValue, setInputValue] = useState({ lat: 10.856866, lng: 106.763324 });
  const [inputValue, setInputValue] = useState('');
  const [valueFilter, setValueFilter] = useState({
    address: 'Viet Nam',
    minPrice: 0,
    maxPrice: 100000000,
    utilities: ["wifi","bon_cau", "dieu_hoa", "truyen_hinh", "voi_hoa_sen",
      "giat_ui", "giu_xe", "gac_lung", "bon_rua_mat", "don_phong",
      "san_go", "tu_quan_ao", "gio_giac_tu_do", "loi_di_rieng"]
  });
  // const [positionFilter, setPositionFilter] = userState();

  return (
    <div className="app-wrapper">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar
        currentUser={currentUser}
        changeStoreData={props.changeStoreData}
        changeLocale={props.changeLocale}
        Search_Addresses={props.Search_Addresses}
        listroom={listroom}
        onInputChange={setInputValue}
        onFilterChange={setValueFilter}
      />
      <Switch>
        {/* <Route exact path="/" component={MapsPage} /> */}
        <Route exact path="/" render={() => <MapsPage inputValue={inputValue} valueFilter={valueFilter} />} />
        <Route path="/auth" component={Auth} />
        <Route path="/bill-list" component={BillList} />
        <Route path="/report-problem/:id" component={ReportProblem} />
        <Route path="/admin/bill-list" component={BillListAdmin} />
        <Route
          path="/admin/report-problem-list"
          component={ReportProblemListAdmin}
        />
        <Route path="/report-problem-list" component={ReportProblemList} />
        <Route path="/motel/:id" component={Motel} />
        <Route path="/motel-detail/:id" component={MotelDetail} />
        <Route path="/motel-detail-v2/:id" component={MotelDetailV2} />
        <Route path="/room-detail/:id" component={RoomDetail} />
        <Route
          path="/room-detail-update-admin/:id"
          component={RoomDetailUpdateAdmin}
        />
        <Route path="/room-detail-update/:id" component={RoomDetailUpdate} />
        <Route path="/create-motel" component={CreateMotel} />
        <Route path="/update-room/:id" component={UpdateRoom} />
        <Route path="/update-motel/:id" component={UpdateMotel} />
        <Route path="/payment" component={Payment} />
        <Route path="/recharge" component={AddMoney} />
        <Route path="/job/:id" component={Job} />
        <Route path="/terms" component={Terms} />
        <Route path="/about" component={About} />
        <Route path="/roomManage" component={RoomManage} />
        <Route path="/job-detail/:id/:idRoom" component={JobDetailUser} />
        <Route path="/job-verify/:id/:idElectricMetter" component={JobVerify} />
        <Route path="/payment-return" component={PaymentReturn} />
        <Route path="/order-pay/:id" component={OrderPay} />
        <Route path="/admin/users/:id" component={AdminUsersDetail} />
        <Route path="/admin/users" component={AdminUsers} />
        <Route
          path="/money-information/:id"
          component={MoneyInformationDetail}
        />
        {/* <Route
          path="/admin/money-information/:id"
          component={MoneyInformationDetail}
        /> */}
        <Route path="/money-information" component={MoneyInformation} />
        <Route path="/admin/job/list" component={JobList} />
        <Route path="/admin/user/job/list/:id" component={JobListUser} />
        <Route path="/admin/job/detail/:id" component={JobDetail} />
        <Route path="/admin/order/list" component={OrderList} />
        <Route path="/admin/monthly-order/list" component={MonthlyOrderList} />
        <Route path="/monthly-order/list" component={MonthlyOrderList} />
        <Route path="/order/list" component={OrderListHost} />
        <Route
          path="/host/transaction/list"
          component={TransactionPayMentListHost}
        />
        <Route
          path="/admin/transaction/list"
          component={TransactionPayMentList}
        />
        <Route
          path="/transaction/user/list"
          component={TransactionPayMentUserList}
        />
        <Route path="/admin/order/detail/:id" component={OrderDetail} />
        <Route path="/profile/:id" component={ProfileUpdate} />
        <Route path="/profile" component={Profile} />
        <Route path="/changePassword" component={ChangePassword} />
        <Route
          path="/bill/motel/:id/room/:idroom/user/:idUser"
          component={RoomBill}
        />
        <Route
          path="/exportBillRoom/motel/:id/room/:idroom/user/:idUser"
          component={ExportBillRoom}
        />
        <Route path="/createroom/:id" component={CreateRoom} />
        <Route path="/transactionLog" component={TransactionLog} />
        <Route
          path="/transaction-banking-cash-log"
          component={TransactionBankingCashLog}
        />
        <Route
          path="/orders-pending-pay-user"
          component={OrdersPendingPayUser}
        />
        {/* <Route path="/user/hostMotelRoom" component={HostMotelRoomUser} /> */}
        <Route path="/admin/hostMotelRoom" component={HostMotelRoom} />
        <Route path="/hostMotelRoom/:id" component={HostMotelRoomDetail} />
        <Route path="/user/hostMotelRoom" component={HostMotelRoomDetailUser} />
        <Route path="/user/hostRevenue/:id" component={HostRevenue} />
        <Route path="/admin/hostRevenue/:id" component={HostRevenueManageAdmin} />
        <Route path="/admin/withdrawRequest/:userId" component={ProcessWithdrawAdmin} />
        <Route path="/user/history-energy/:id" component={HistoryEnergyUser} />
        <Route path="/history-energy/:id/:name" component={HistoryEnergyHost} />
        <Route
          path="/historyRoomHost/room/:id/roomdetail/:idroom"
          component={HistoryRoomHostDetail}
        />
        <Route
          path="/historyRoomHost/room/:id"
          component={HistoryFloorsRoomHost}
        />

        <Route path="/historyRoomHost" component={HistoryRoomHost} />
        <Route path="/admin/historyRoomHost" component={HistoryRoomHostAdmin} />

        {/* note */}
        <Route
          path="/admin/manager-energy-rooms"
          component={ManagerEnergyRooms}
        />

        <Route
          path="/admin/manager-energy-buildings"
          component={ManagerEnergyBuildings}
        />

        <Route path="/admin/manager-energy-detail" component={EnergyDetail} />
        <Route path="/admin/scada-electric-ems" component={ScadaElectricEMS} />
        <Route
          path="/admin/follow-energy/:id/:roomId/:name"
          component={FollowEnergyAdmin}
        />
        <Route
          path="/host/follow-energy/:id/:roomId/:name"
          component={FollowEnergyHost}
        />
        <Route path="/follow-energy-2/" component={FollowEnergyUser2} />

        <Route
          path="/follow-energy/:roomId/:name"
          component={FollowEnergyUser}
        />
        <Route
          path="/manage-deposit/pay-deposit/:id/list-order-no-pay/:idPayDeposit"
          component={ListOrderNoPayOfPayDeposit}
        />
        <Route
          path="/manage-deposit/pay-deposit/:id"
          component={ManagerPayDepositHost}
        />
        <Route path="/pay-deposit-user/" component={ManagerPayDepositUser} />
        <Route
          path="/manage-deposit/history-deposit-aftercheckincost/motel/:idMotel/:nameMotel/room/:idRoom/:nameRoom"
          component={HistoryDepositAfterCheckInCost}
        />
        <Route
          path="/manage-deposit/history-deposit-aftercheckincost/motel/:idMotel/:nameMotel"
          component={OrderDepositRoomListByMotel}
        />
        <Route
          path="/manage-deposit/accept-deposit/:id"
          component={ManagerAcceptDepositHost}
        />
        <Route path="/admin/censor-motels/" component={CensorMotels}/>
        <Route path="/admin/censor-hosts/" component={CensorHosts}/>
        <Route
          path="/withdraw-request/list/:userId/:motelName"
          component={WithdrawRequestListHost}
        />
        <Route
          path="/manage-deposit/accept-after-check-in-cost/:id"
          component={ManagerAcceptAfterCheckInCostHost}
        />
        <Route
          path="/manage-deposit/order-deposit-pending-payment/:idMotel/:nameMotel"
          component={OrderDepositAfterCheckInCostPendingPayment}
        />
        <Route path="/manage-deposit/" component={ManageDeposit} />
        <Route
          path="/manage-monthly-order/history-monthly/motel/:idMotel/:nameMotel/room/:idRoom/:nameRoom"
          component={HistoryMonthly}
        />
        <Route
          path="/manage-monthly-order/history-monthly/motel/:idMotel/:nameMotel"
          component={OrderMonthlyRoomListByMotel}
        />
        <Route
          path="/manage-monthly-order/manage-order-pending-payment/:idMotel/:nameMotel"
          component={OrderMonthlyPendingPayment}
        />
        <Route
          path="/manage-monthly-order/manage-accept-order/:id"
          component={ManagerAcceptMonthlyHost}
        />
        <Route path="/manage-monthly-order/" component={ManageMonthly} />
        <Route path="/withdraw" component={Withdraw} />

        <Route
          path="/requestWithdraw/user/list"
          component={RequestWithdrawUserList}
        />
        <Route
          path="/admin/requestWithdraw/list"
          component={RequestWithdrawList}
        />

        <Route
          path="/manager-energy-buildings-host"
          component={ManagerEnergyBuildingsHost}
        />

        <Route
          path="/manager-energy-rooms-host/:id/:name"
          component={ManagerEnergyRoomsHost}
        />

        <Route
          path="/manager-energy-building-summary-report/:id/:name"
          component={ManagerEnergyBuildingSummaryReport}
        />

        <Route
          path="/manager-energy-rooms-user"
          component={ManagerEnergyRoomsUser}
        />

        <Route
          path="/admin/manager-energy-host"
          component={ManagerEnergyHostAdmin}
        />

        <Route
          path="/admin/manage-motel-list/:id/:name"
          component={ManageMotelListAdmin}
        />
        <Route
          path="/admin/manage-deposit/:id/:name"
          component={ManageDepositAdmin}
        />
        <Route
          path="/admin/manage-monthly/:id/:name"
          component={ManageMonthlyAdmin}
        />

        <Route
          path="/admin/manager-energy-buildings-host/:id/:name"
          component={ManagerEnergyBuildingsAdmin}
        />

        <Route
          path="/admin/manager-energy-rooms-admin/:id/:name"
          component={ManagerEnergyRoomsAdmin}
        />

        {/* Enegy billing manage */}
        <Route
          path="/energy-billing-manage/:id/rooms/:roomId"
          component={RoomBillingManage}
        />

        <Route path="/energy-rooms-bill-user" component={EnergyRoomsBillUser} />
        <Route
          path="/energy-billing-manage/:id/rooms"
          component={RoomManagePage}
        />
        <Route path="/energy-billing-manage" component={EnergyBillingManage} />

        {/* <Route
          path="/money-information/:id"
          component={MoneyInformationDetail}
        /> */}

        {/* /////////////////////// */}

        <Route component={NotFoundPage} />
      </Switch>
      {loading && <LoadingIndicator />}
      <WarningPopup
        visible={showLogout}
        content={
          <div className="logout-content">
            <WarningOutlined className="icon" />
            <FormattedMessage {...messages.question_logout} />
          </div>
        }
        callBack={() => props.getLogout()}
        toggle={() => {
          props.changeStoreData('showLogout', false);
        }}
      />
    </div>
  );
}

App.propTypes = {
  getLogout: PropTypes.func,
  saveCurrentUser: PropTypes.func,
  changeStoreData: PropTypes.func,
  app: PropTypes.object,
  changeLocale: PropTypes.func,
  Search_Addresses: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLogout: () => {
      dispatch(getLogout());
    },
    saveCurrentUser: user => {
      dispatch(saveCurrentUser(user));
    },
    changeStoreData(key, value) {
      dispatch(changeAppStoreData(key, value));
    },
    changeLocale: value => {
      dispatch(changeLocale(value));
    },
    Search_Addresses: value => {
      dispatch(Search_Addresses(value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
