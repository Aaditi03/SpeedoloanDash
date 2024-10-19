
export default  {
   API_BASEPATH: 'https://api.salaryontime.in',
    // API_BASEPATH: 'https://api.salaryontime.co.in',
    // API_BASEPATH: '',//uat
    loan:{
       SEND_OTP: "/Api/Website/InstantJourneyController/appCustomerRegisteration",
       VERIFY_OTP: "/Api/Website/InstantJourneyController/appCustomerRegisteration",
       GET_DASHBOARD: "/Api/Website/InstantJourneyController/getDashboardData",
       VERIFY_PAN: "/Api/Website/InstantJourneyController/appCustomerRegisteration",
       PERSONAL_DETAILS: "/Api/Website/InstantJourneyController/appCustomerRegisteration",
       INCOME_DETAILS: "/Api/Website/InstantJourneyController/appCustomerRegisteration",
       ADDRESS_DETAILS: "/Api/Website/InstantJourneyController/appCustomerRegisteration",
       CUSTOMER_DOCUMENT: "/Api/Website/InstantJourneyController/saveleadDetails",
       STATE_CITY_PINCODE:"/Api/MasterController/masterAPI",
       UPLOAD_PROFILE_PIC:"/Api/Website/InstantJourneyController/appCustomerRegisteration",
       PROFILE_PIC:"/Api/Website/InstantJourneyController/appCustomerRegisteration",
       CHECK_ELIGIBILITY:"/Api/Website/InstantJourneyController/appCustomerRegisteration",
       ABOUT_COMPANY:"/Api/Website/InstantJourneyController/saveleadDetails",
       CALCULATE_LOAN:"/Api/Website/InstantJourneyController/saveleadDetails",
       USER_DATA:"/Api/Website/getUser",
       ALL_LEADS: "/Api/Website/getAllLeads",
       LOAN_DETAIL: "/Api/Website/getLeadDetail",
       GENERATE_LOAN:"/Api/Website/InstantJourneyController/saveleadDetails"
       
    }
}