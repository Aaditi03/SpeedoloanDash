



import React, { useContext, useEffect, useRef, useState } from 'react';

import { BoxWrapper } from '../../../style';
import arrowIcon from "../../../images/arrow.png"
import { FormWrapper } from '../../../components/loan/style';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';

import { useNavigate } from 'react-router-dom';
import { goBack, isEmpty,setStorage ,getStorage} from '../../../Utils/common';
import PictureUpload from '../../../components/PictureUpload/PictureUpload';
import { ButtonWrapper } from '../../../components/ui/style';
import { uploadProfilePhoto,getDashboardData } from '../../../Utils/api';
import ContextDashboard from '../../../Context/ContextDashboard';
import photoCapturIcon from "../../../images/photo-capture.svg";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";



function UploadBankStatement() {
    const [loading, setLoading] = useState(false);
    const [responce,setResponce] = useState({});
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [base64, setBase64] = useState("");
    const [showSteps, setShowSteps] = useState(-1);
    const [toggle, setToggle] = useState(true);
    const [progressBar, setProgressBar] = useState(0);

    const {logout,profileData,getProfileDaital,setps} = useContext(ContextDashboard);
  
    useEffect(()=>{
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
             const data = base64.split(",");
              let img = data[data.length -1];
              setBase64(img)
       
      };

      if (image) {
        if (typeof image === "string") {
          const blob = new Blob([image]);
          reader.readAsDataURL(blob);
        } else {
          reader.readAsDataURL(image);
        }
      }
    }, [image]);
    const submit = () =>{
     
      if (image === "" && base64 === "") {
        setMessage({
          type: "error",
          msg: "Please select  pan image",
          place: "local",
        });
        return;
      } else {
        setMessage({});
      }
        
      let ext = "PDF";
      if (typeof image === "object") {
        let extArr = image.name.split(".");
        ext = extArr[extArr.length - 1].toUpperCase();
      }
      const param = {
        lead_id: getStorage("lead_id") || "",
        token: getStorage("token") || "",
        file: base64,
        ext: ext,
        password: "N/A",
        docs_id: "6",
      };
      setLoading(true);
      uploadProfilePhoto(param).then((resp) => {
        setLoading(false);
        console.log(resp?.data);
        if (resp?.data?.Status === 1) {
          setResponce(resp?.data);
          setMessage({
            type: "success",
            msg: resp?.data?.Message,
            place: "globle",
          });
          getProfileDaital();
          navigate("/my-dashboard/upload-salaryslip");
        } else if (resp?.data?.Status === 5) {
          logout();
        } else {
          setMessage({ type: "error", msg: resp?.data?.Message });
        }
      });

    
    };

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
            <div className='center gap4 pointer' onClick={()=>goBack(navigate,"/my-dashboard/pan-upload")} >
                <img src={arrowIcon} alt="" /> <span>Back</span>
            </div>
          </div>
          <div className="right">
            <h2>Upload Your Bank statement <span style={{color:"red"}}>*</span></h2>
            <p>Upload last six month statement</p>
              
            <FormWrapper>
            <Alert setMessage={setMessage} message={message}  />
 
            <div className="inputBox">
             <div >
                <h2 className='subheading small'>Bank statement</h2>
                 <PictureUpload  setImage={setImage}  image={image} accept="application/pdf" type="file" />
            
             </div>
             {/* <div>
             <h2 className='subheading small'>Aadhar back side</h2>
                 <PictureUpload  setImage={setAadharBack}  image={aadharBack}/>
            
             </div> */}
              </div>
             
              
             
              <div className="button">
              <Button title="Continue" onClick={submit} loading={loading} />
              </div>
            </FormWrapper>
           
          </div>
        </div>

       </BoxWrapper>
    </>
  )
}

export default UploadBankStatement;