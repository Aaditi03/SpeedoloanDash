import React, { useContext, useEffect, useRef, useState } from 'react';

import { BoxWrapper } from '../../../style';
import arrowIcon from "../../../images/arrow.png"
import { FormWrapper } from '../../../components/loan/style';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';

import { useLocation, useNavigate } from 'react-router-dom';
import { getStorage, goBack, isEmpty } from '../../../Utils/common';

import { formValidation } from '../../../Utils/formValidation';
import PictureUpload from '../../../components/PictureUpload/PictureUpload';
import { ButtonWrapper } from '../../../components/ui/style';
import photoCapturIcon from "../../../images/photo-capture.svg";
import Webcam from 'react-webcam';
import TakeImage from '../../../components/TakeImage/TakeImage';
import ContextDashboard from '../../../Context/ContextDashboard';
import { saveProfile,getDashboardData } from '../../../Utils/api';
import ProgressBar from "../../../components/ProgressBar/ProgressBar";




function UploadPicture() {
    const [loading, setLoading] = useState(false);
    const [responce,setResponce] = useState({});

    const [openCamera, setOpenCamera] = useState(false)
    const [image,setImage] = useState("")
    const [base64,setBase64] = useState("")

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const [showSteps, setShowSteps] = useState(-1);
    const [toggle, setToggle] = useState(true);
    const [progressBar, setProgressBar] = useState(0);


  
    const {message,setMessage,logout,profileData,setps} = useContext(ContextDashboard);


    useEffect(() => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
          const base64 = reader.result;
          const data = base64.split(",");
          let img = data[data.length - 1];
          
          setBase64(img);
      };
  
      if (image) {
          if (typeof image === "string") {
              //const blob = new Blob([image]);
              //reader.readAsDataURL(blob);
              const data = image.split(",");
              let img = data[data.length - 1];
              setBase64(img);
          } else {
              reader.readAsDataURL(image);
          }
          console.log('ddd');
          console.log(image);
      }
  }, [image]);
  


    const submit = () =>{
     
   
      if((image === "") && (base64 === "")){
        setMessage({ type: 'error', msg:"Please select image", place:"local" });
         return;
      }else{
        setMessage({})
      }
      let ext  = "JPEG";
      if(typeof image === "object" ){
        let extArr = image.name.split('.');
        ext = extArr[extArr.length -1].toUpperCase();
      }
      
      console.log('san');
      console.log(base64);
     
      const param = {
        lead_id:getStorage("lead_id") || "",
        token:getStorage("token") || "",
        file:base64,
        ext:ext,
        password: "N/A",
        docs_id:"33"
     
    }


     
         setLoading(true);
         saveProfile(param).then(resp=>{
      setLoading(false);
      
      if(resp?.data?.Status === 1){
        setResponce(resp?.data);
        setMessage({ type: 'success', msg:resp?.data?.Message, place:"globle" });
  
        if(!isEmpty(state?.action)){
          navigate("/my-dashboard/")
        }else{
          navigate("/my-dashboard/profile-preview")
        }
        
      }else if(resp?.data?.Status === 5){
        logout();
      }else{
        setMessage({ type: 'error', msg: resp?.data?.Message, });
      }
      
      
  })

      }

  
  
      useEffect(()=>{
        if(isEmpty(profileData))return;
        if(!isEmpty(state?.action)){
         
         
          
        }
        
      },[profileData]);


      useEffect(() => {

        const params = {
            lead_id: getStorage("lead_id") || "",
            token: getStorage("token") || "",
            mobile: getStorage("mobile") || "",
        };

        getDashboardData(params).then(resp => {
            if (resp?.data?.Status === 1) {
                const dashboardData = resp?.data?.Steps?.data || {};
                if (dashboardData) {
                    setProgressBar(resp?.data?.Steps?.steps?.step_complete_percent);
                }
            } else if (resp?.data?.Status === 5) {
                logout();
            }
        });
    }, [logout]);

 
    useEffect(() => {
      if (!isEmpty(setps)) {
          checkStep(setps);
      }
  }, [setps]);

  const checkStep = (data) => {
      const steps = (data?.step_stage - 1);
      if (data?.step_complete_percent === 100) {
          setToggle(false);
      }
      setShowSteps(steps);
  };

  return (
    <><ProgressBar value={`${progressBar}%`}>
      <div >
      
      </div>
    <></>
  </ProgressBar>
            <br />
       <BoxWrapper  className="w100" >
     

        <div className="formmainBox flex">
          <div className="left">
            <div className='center gap4 pointer' onClick={()=>goBack(navigate,state?.action?"/my-dashboard/profile-preview":"/my-dashboard/")} >
                <img src={arrowIcon} alt="" /> <span>Back</span>
            </div>
          </div>
          <div className="right">
            <h2> {state?.action?"Update Upload Your Picture *":"Upload Your Picture *"}</h2>
            <p>Share you selfie and complete the registration.</p>
              
            <FormWrapper>
            <Alert setMessage={setMessage} message={message}  />
            {openCamera && <TakeImage setImage={setImage} close={setOpenCamera} />}
            <div className="inputBox">
            
              
             {!openCamera && <>
                <PictureUpload  setImage={setImage}  image={image}/>
             </>}
             

               
    
              </div>
              {!openCamera && <>
                <h3 style={{margin:"10px",color:"#082654", fontSize:"15px",maxWidth:"300px", textAlign:"center"}}>OR</h3>
              
              <ButtonWrapper className='selfyButton center' onClick={() =>setOpenCamera(true)}>
              <img src={photoCapturIcon} alt="" /> <span>Take a Selfie</span>
              </ButtonWrapper>
             </>}
              
             
              <div className="button">
              <Button title={state?.action?"Update":"Continue"} onClick={submit} loading={loading} />
              </div>
            </FormWrapper>
           
          </div>
        </div>

       </BoxWrapper>
       </>
  )
}

export default UploadPicture;