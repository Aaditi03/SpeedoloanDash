import React, { useState } from 'react'
import ContextDashboard from './Context/ContextDashboard';
import Alert from './components/ui/Alert';
import { useNavigate } from 'react-router-dom';
import { getStorage } from './Utils/common';
import { getDashboardData } from './Utils/api';


function LoanLayoutContext({children}) {
    const [profileData, setProfileData] = useState({});
    const [outdata, setOutData] = useState({});
    const [message, setMessage] = useState({});
    const [eligibilityStatus, setEligibilityStatus] = useState({});
    const [usertype, setUserType] = useState({});
    const [loader,setLoader] = useState(false);
    const [setps, setSetps] = useState({});
    const navigate = useNavigate();

    const logout = () =>{
      sessionStorage.clear(); 
      navigate('/apply-now');
    }
    const getProfileDaital = ()=>{

      const params ={
        lead_id:getStorage("lead_id") || "",
        mobile:getStorage("mobile") || "",
        token:getStorage("token") || "",
      }
      setLoader(true)
      getDashboardData(params).then((resp)=>{
        setLoader(false)
            if(resp?.data?.Status === 1){
              setSetps(resp?.data?.Steps?.steps);
             const  profileData = resp?.data?.Steps?.data || {};
             const repaymentData = resp?.data?.Steps?.outstanding || {};
             
              setProfileData(profileData)
              setOutData(repaymentData)
              setEligibilityStatus(resp?.data?.Steps?.steps?.eligibility_status)
              setUserType(resp?.data?.Steps?.data.user_type)
            
            }else if(resp?.data?.Status === 4){
              logout();
            }else{
              let msg = "";
              if(resp?.data?.Message){
                msg = resp?.data?.Message;
              }else{
                msg = resp?.data?.error;
              }
                setMessage({ type: 'error', msg: msg, });
            }
      })
    }
  
  return (
    <ContextDashboard.Provider value={{setMessage,message ,logout,setProfileData,setOutData,profileData,outdata,setps,setSetps,getProfileDaital,eligibilityStatus,usertype,setUserType,loader}}>
      <Alert setMessage={setMessage} message={message}  />
    {children}
</ContextDashboard.Provider>
  )
}

export default LoanLayoutContext;