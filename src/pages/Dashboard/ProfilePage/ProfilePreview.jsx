import React, { useContext, useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import Button from "../../../components/ui/Button";
import DetailBox from "./DetailBox";
import { ProfilePreviewWrapper } from "./style";
import { useNavigate } from "react-router-dom";
import ContextDashboard from "../../../Context/ContextDashboard";
import { getStorage, isEmpty, setStorage } from "../../../Utils/common";
import { ckeckEligibility, getDashboardData, getStateCityPincode } from "../../../Utils/api";
import Modal from "../../../components/Modal/Modal";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

function ProfilePreview() {
  const navigate = useNavigate();
  const [state,setState] = useState("");
  const [city,setCity] = useState("");
  const [modelOpen,setModelOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const [responce,setResponce] = useState(false);
  const[status,setStatus]=useState();
  const{eligibilityStatus}=useContext(ContextDashboard);
  const {setps} = useContext(ContextDashboard);
  const [progressBar,setProgressBar] = useState(getStorage("step_percent"))
  const [toggle, setToggle] = useState(true);
  const [showSteps, setShowSteps] = useState(-1);
  const[dashboard,setDashboard]=useState([]);

  const { message, setMessage, profileData,logout,getProfileDaital } = useContext(ContextDashboard);

  const redirect = (link) => {
    navigate(link);
  };

  useEffect(()=>{
    const params={
      profile_id: getStorage("cust_profile_id") || "", 
    };

    getDashboardData(params).then(resp=>{
      if(resp?.data?.Status===1){
        setStorage("eligibility",resp?.data?.Data?.registration_successful)
        const dashboardData=resp?.data || {};
        setDashboard(dashboardData);
      }
    });
  },[]);

  // const StateCityList = (type="getstate",id=null)=>{
  //   const param ={
  //     apiname:type,
  //   }
  //   if(!isEmpty(id)){
  //     param.id = id;
  //   }
  //   getStateCityPincode(param).then((resp) =>{
  
  //       if(resp?.data?.data){
          
  //          if(type === "getstate"){
  //           const data = resp.data.data.map((value) =>{
  //             if(value.id === profileData.state_id){
  //               setState(value.name);
  //               return;
  //                 }
  //           })
       
  //          }else if(type === "getcity"){
  //           resp.data.data.map((value) =>{
  //               if(value.m_city_id === profileData.city_id){
  //             setCity(value.m_city_name);
  //             return;
  //               }
              
  //           })
         
  //          } 
           
  //       }
  //   }) 
  // }

  // useEffect(() =>{
  //   if(isEmpty(profileData)) return;
  //   StateCityList("getstate");
  //   StateCityList("getcity",profileData.state_id);
  // },[profileData]);


  useEffect(()=>{
    console.log("setps",setps)
    if(!isEmpty(setps)){
      checkStep(setps);
    }
   
  },[setps]);

  function checkStep(data){
 
    setProgressBar(data?.step_complete_percent);
    const steps = (data?.step_stage - 1) ;
    if(data?.step_complete_percent === 100){
      setToggle(false)
    }
    setShowSteps(steps);
    
   

}

  const submit = () =>{
     
    const param = {
      "profile_id":getStorage("cust_profile_id") || "",
      "event_name": "register_now"
  }


       setLoading(true);
       ckeckEligibility(param).then(resp=>{
    setLoading(false);
    if(resp?.data?.Status === 1){
      setModelOpen(true);
      // getProfileDaital();
      setResponce(resp?.data?.Message);
      setStatus(resp?.data?.Status);
      
    }else if(resp?.data?.Status === 4){
      logout();
    }else{
        setModelOpen(true);
        setResponce(resp?.data?.Message);
        setStatus(resp?.data?.Status);
    //   setMessage({ type: 'error', msg: resp?.data?.Message, place:"globle" });
    }
    
    
})


    


}


// useEffect(() =>{
//     if(isEmpty(profileData)) return;
//     getProfileDaital()
// },[]);


  return (
    
    <ProfilePreviewWrapper>
      <h2 style={{marginLeft:'20px'}}>Check Eligibility for Further Process</h2><br/>
      <ProgressBar value={`${progressBar}%`}>
        
          <div >
           
          </div>
        <></>
      </ProgressBar><br/>
      <ProfileHeader>
        <Button title="Check Eligibility" onClick={submit} loading={loading}/>
      </ProfileHeader>
      <div className="detailBox">
        
        <DetailBox
          heading="Basic Details"
          onClock={() => navigate("/my-dashboard/captur-personal-information", { state: { action: 'update' } })
          
          }
        >
          <table>
            <tr>
              <td>Your Name</td>
              <td>{dashboard?.Data?.full_name || "NA"}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{dashboard?.Data?.gender || "NA"}</td>
            </tr>
            <tr>
              <td>DOB</td>
              <td>{profileData?.dob || "NA"}</td>
            </tr>
            <tr>
              <td>Marital Status</td>
              <td>
                {profileData?.marital_status
                  ? profileData?.marital_status === "1"
                    ? "Single"
                    : "Married"
                  : "Divorced"}
              </td>
            </tr>
            <tr>
              <td>Personal Email</td>
              <td>
                {profileData?.email ? profileData?.email.toLowerCase() : "NA"}
              </td>
            </tr>
          </table>
        </DetailBox>

        <DetailBox
          heading="Residence Address"
          onClock={() => {
            navigate("/my-dashboard/captur-address",{ state: { action: 'update' }});
          }}
        >
          <table>
            <tr>
              <td>Address</td>
              <td>{profileData?.current_house || "NA"}</td>
            </tr>
            <tr>
              <td>Residence Type</td>
              <td>{profileData?.current_residence_type || "NA"}</td>
            </tr>
            <tr>
              <td>Current Locality</td>
              <td>{profileData?.current_locality || "NA"}</td>
            </tr>
            <tr>
              <td>Landmark</td>
              <td>{profileData?.current_landmark || "NA"}</td>
            </tr>
            <tr>
              <td>State</td>
              <td>{state || "NA"}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{city || "NA"}</td>
            </tr>
            <tr>
              <td>Pincode</td>
              <td>{profileData?.pincode || "NA"}</td>
            </tr>
          </table>
        </DetailBox>

        <DetailBox
          heading="Income Details"
          onClock={() => {
            navigate("/my-dashboard/captur-income-details",{ state: { action: 'update' }});
          }}
        >
    
          <table>
            <tr>
              <td>Employment Type</td>
              <td>{profileData?.employee_type || "NA" }</td>
            </tr>
            <tr>
              <td>Organization Name</td>
              <td>{profileData?.company_name || "NA"}</td>
            </tr>
            <tr>
              <td>Monthy Income</td>
              <td>{profileData?.monthly_salary || "NA"}</td>
            </tr>
            <tr>
              <td>Mode Income Received</td>
              <td>{profileData?.salary_mode || "NA"}</td>
            </tr>
          </table>
        </DetailBox>
      </div>
     {modelOpen && <Modal onClose={()=>setModelOpen(false)} msg={responce} state={status} onConfirm={()=>navigate("/my-dashboard/eligibility")} />}
    </ProfilePreviewWrapper>
  );
}

export default ProfilePreview;