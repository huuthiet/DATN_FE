export const urlLink = {
  // AUTHENTICATE
  api: {
    // serverUrl: 'https://api.homeskeys.net/api',
    // serverUrl: 'http://115.73.215.28:5502/api',
    serverUrl: 'http://localhost:5502/api',
    auth: {
      sign_up: '/v1/auth/signUp',
      sign_in: '/v1/auth/signIn',
      log_out: '/v1/auth/logout',
      changePassword: '/v1/auth/changePassword',
      profile: '/v1/user/profile',
      confirmOTP: '/v1/auth/verifyUser/confirmOTP',
      resendOTP: '/v1/auth/verifyUser/resendOTP',
      forgotPassword: '/v1/auth/forgotPassword',
      sendmailactive: '/v1/auth/sendmailactive',
      passwordReissue: '/v1/auth/passwordReissue',
      updateWallet: '/v1/auth/updateWallet',
      activeUser: '/v1/auth/activeUser',
      resetPassword: '/v1/auth/resetPassword',
    },
    profile: '/v1/user/profile',
    profileDetail: '/v1/admin/user',
    about: '/v1/about/signUpAbout',
    motelList: '/v1/homeKey/motelRoom/list',
    motelPdf: '/v1/homeKey/motelRoom/pdf',
    reportProblem: '/v1/homeKey/reportProblem/',
    transactionsHost: '/v1/homeKey/host/transactions/host',
    bill: '/v1/homeKey/bill',
    Adminbill: '/v1/homeKey/admin/bill',
    AdminReportProblem: '/v1/homeKey/admin/reportProblem',
    AdminReportProblemHost: '/v1/homeKey/host/reportProblem/host',
    AdminReportProblemAdmin: '/v1/homeKey/admin/reportProblem/admin',
    motelListAdmin: '/v1/homeKey/motelRoom/list/admin',
    motelListDetail: '/v1/homeKey/motelRoom',
    motelDetail: '/v1/homeKey/motelRoom/',
    roomDetail: '/v1/homeKey/room/',
    createRoom: '/v1/homeKey/room/',
    getListRoom: '/v1/homeKey/room/',
    createMotel: '/v1/homeKey/motelRoom',
    getRoomList: '/v1/user/motelRoom/list',
    getRoomListAdmin: '/v1/user/admin/motelRoom/list',
    getRoomListRoom: '/v1/user/motelRoom/room',
    createFloor: '/v1/homeKey/floor',
    job: '/v1/homeKey/job',
    jobs: '/v1/homeKey/job/list',
    getJobByRoom: '/v1/homeKey/job/getJobByRoom/', // + idRoom
    pay: '/v1/payment/order/pay',
    adminDeleteJobByRoom: '/v1/admin/homeKey/deleteJobByIdRoom/', // +idRoom
    // adminDeleteJobOnlyInUser: '/v1/admin/homeKey/deleteJobOnlyInUser/', // +idRoom
    adminUser: '/v1/admin/user',
    adminJobList: '/v1/admin/homeKey/job/list',
    adminJobListUser: '/v1/admin/homeKey/job/user/list',
    adminJobDetail: '/v1/admin/homeKey/job/',
    adminJobListView: '/admin/job/list',
    adminGetOrderList: '/v1/admin/homeKey/order/list/admin',
    monthlyGetOrderList: '/v1/admin/homeKey/monthly-order/list',
    hostGetOrderList: '/v1/admin/homeKey/order/list/host',
    adminGetOrderDetail: '/v1/admin/homeKey/order/',
    getOrderDetail: '/v1/admin/order/',
    getTransactionPaymentList: '/v1/admin/transactions/',
    getTransactionPaymentUserList: '/v1/admin/transactions/user/',
    getResetPassWord: '/v1/admin/resetPassword/',
    postBank: '/v1/admin/bank/',
    postBankNameList: '/v1/admin/bankname',
    uploading: '/v1/uploading',
    getuploadimg: '/v1/uploading/img',
    editStatus: '/v1/homeKey/room/',
    updateUtilities: '/v1/homeKey/room',
    searchRoomfromAddress: '/v1/homeKey/room/search',
    searchMotelRoomfromAddress: '/v1/homeKey/motelRoom/search/',
    // note
    getListDeviceEnergy: '/v1/homeKey/energy/devices',
    getLatestDataDeviceEnergy: '/v1/homeKey/energy/device/latestData/',
    getDataEnergyPerHour: '/v1/homeKey/energy/device/currentDayDataPerHour/',
    getDataEnergyInDayPerHour:
      '/v1/homeKey/energy/device/dataInDayPerHourByTime/', // +/:id/:time
    getDataEnergyPerDay: '/v1/homeKey/energy/device/currentMonDataPerDay/',
    getNameRoomByIdDevice: '/v1/homeKey/energy/device/getNameRoomById/',
    getAllData: '/v1/homeKey/energy/device/getAllDataByYearMonth',
    getLastRecordsOfPreviousMonth:
      '/v1/homeKey/energy/device/getLastRecordsOfPreviousMonth',
    clearData: '/v1/homeKey/energy/devices/clearData', // + /:startTime/:endTime
    backupData: '/v1/homeKey/energy/devices/backUpData', // + /:startTime/:endTime
    exportBillRoom: '/v1/homeKey/energy/device/exportBillRoom/', // + /:idMotel/:idRoom/:startTime/:endTime
    exportBillAllRoom: '/v1/homeKey/energy/device/exportBillAllRoom/', // + /:idMotel/:startTime/:endTime
    getUserBill: 'v1/homeKey/bill/customer',
    getDataEnergyPerDayByTime:
      '/v1/homeKey/energy/device/getDataPerDayTimeToTime/' /* + id/:startTime/:endTime */,
    getDataEnergyPerMonth: '/v1/homeKey/energy/device/historyDataPerMon/',
    getListIdMetterElectric:
    '/v1/homeKey/energy/device/getListIdMetterElectricByRoom/', //+idRoom
    addIdMetterElectric:
    '/v1/homeKey/energy/device/addIdMetterElectricForRoom/', //+:id/:time/:newIdMetter
    getBankUser: '/v1/user/bank',
    postRequestWithdraw: '/v1/user/requestWithdraws/',
    getRequestWithdrawUserList: '/v1/user/requestWithdraws/list',
    getRequestWithdrawList: '/v1/admin/requestWithdraws/',
    getUserBill: '/v1/admin/order', // + /:id
    deleteBankUser: '/v1/user/bank/' /* + id */,
    postBankUser: '/v1/user/bank/' /* + id */,
    getBankNameList: '/v1/user/bankname',
    getBankMasterList: '/v1/user/bankmastername',
    adminHost: '/v1/admin/host',
    getListMotelByHost: '/v1/admin/listMotel/host/',
    exportBill: '/v1/homeKey/energy/device/exportBillRoom/',
    // /v1/homeKey/energy/device/exportBillRoom/:idMotel/:idRoom/2024-03-01/2024-03-15
    exportAllBill: '/v1/homeKey/energy/device/exportBillAllRoom/',
    // /v1/homeKey/energy/device/exportBillAllRoom/:idMotel/2024-03-01/2024-03-15
    exportBillBuilding: '/v1/homeKey/energy/device/exportBillBuilding/', // + /:idMotel/:startTime/:endTime
    buildingRevenue: '/v1/homeKey/energy/device/buildingRevenue/', // +/:idMotel/:startTime/:endTime
    // -------
  },
  auth: {
    sign_in: '/auth/login',
    sign_up: '/auth/sign-up',
    active_user: '/auth/active_user/:email',
    forgot_password: '/auth/forgot_password',
    password_reissue: '/auth/password_reissue/:email',
  },
  home: '/',
  orderList: '/admin/order/list',
  profile: '/profile',
  change_password: '/profile/change-password',
  infor_profile: '/profile/infor-profile',
};
