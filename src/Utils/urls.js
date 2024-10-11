
export default  {
  //  API_BASEPATH: 'https://api.salaryontime.in',
    API_BASEPATH: 'https://api.salaryontime.co.in',
    // API_BASEPATH: '',//uat
    loan:{
       SEND_OTP: "/Api/UserNewApi/SendOtp",
       VERIFY_OTP: "/Api/UserNewApi/VerifyOtp",
       GET_DASHBOARD: "/Api/UserNewApi/getDashboard",
       VERIFY_PAN: "/Api/UserNewApi/panVerification",
       PERSONAL_DETAILS: "/Api/UserNewApi/personalDetailsUpdate",
       INCOME_DETAILS: "/Api/UserNewApi/incomeDetailsUpdate",
       ADDRESS_DETAILS: "/Api/UserNewApi/currentAddressUpdate",
       CUSTOMER_DOCUMENT: "/Api/UserNewApi/saveCustomerDocument",
       STATE_CITY_PINCODE:"/Api/MasterController/masterAPI",
       UPLOAD_PROFILE_PIC:"/Api/UserNewApi/saveCustomerDocument",
       PROFILE_PIC:"/Api/UserNewApi/saveProfile",
       CHECK_ELIGIBILITY:"/Api/UserNewApi/checkEligibility",
       ABOUT_COMPANY:"/Api/UserNewApi/informAboutCompanyUpdate",
       CALCULATE_LOAN:"/Api/UserNewApi/loanDetailsUpdate",
       USER_DATA:"/Api/UserNewApi/getUser",
       ALL_LEADS: "/Api/UserNewApi/getAllLeads",
       LOAN_DETAIL: "/Api/UserNewApi/getLeadDetail"
       
    }
}