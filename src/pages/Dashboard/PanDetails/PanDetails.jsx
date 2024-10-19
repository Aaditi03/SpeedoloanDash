import React, { useContext, useEffect, useState, useRef } from 'react';
import { BoxWrapper } from '../../../style';
import arrowIcon from "../../../images/arrow.png";
import PanInput from '../../../components/OtpInput/PanInput';
import { FormWrapper } from '../../../components/loan/style';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';
import { verifyPan } from '../../../Utils/api'; // Import getDashboard
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import { getStorage, goBack, setStorage, isEmpty } from '../../../Utils/common';
import { regexPan } from '../../../Utils/formValidation';
import ContextDashboard from '../../../Context/ContextDashboard';
import ProgressBar from "../../../components/ProgressBar/ProgressBar";


function PanDetails() {
  const [pan, setPan] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [showSteps, setShowSteps] = useState(-1);
  const [toggle, setToggle] = useState(true);
  const [progressBar, setProgressBar] = useState("0");
  const { setps } = useContext(ContextDashboard);
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const { message, setMessage, logout } = useContext(ContextDashboard);

  const submit = () => {
    let panData = pan?.join("").toUpperCase();

    if (!regexPan.test(panData)) {
      setMessage({ type: 'error', msg: "Please enter a valid PAN number" });
      return;
    }

    const param = {
      event_name:"pancard_verification",
      pancard: panData,
      profile_id: getStorage("cust_profile_id") || "",         
    };

    setLoading(true);
    verifyPan(param).then(resp => {
      setLoading(false);
      if (resp?.data?.Status === 1) {
        setStorage("pancard", panData);
        setStorage("fullName", resp?.data?.Data?.full_name);
        setStorage("step_percent",resp?.data?.Data?.step_percentage)
        setStorage("next_step",resp?.data?.Data?.next_step)
        setResponse(resp?.data);
        setMessage({ type: 'success', msg: resp?.data?.Message, place: "globle" });
            navigate("/my-dashboard/captur-personal-information");
      } else if (resp?.data?.Status === 4) {
        logout();
      } else {
        setPan(["", "", "", "", "", "", "", "", "", ""]); 
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus(); 
        }
        setMessage({ type: 'error', msg: resp?.data?.Message });
      }
    });
  };

  

  const showSteps_ = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (!isEmpty(setps)) {
      checkStep(setps);
    }
  }, [setps]);

  function checkStep(data) {
    setProgressBar(data?.step_complete_percent);
    const steps = data?.step_stage - 1;
    if (data?.step_complete_percent === 100) {
      setToggle(false);
    }
    setShowSteps(steps);
  }

  return (
    <>
      <ProgressBar value={`${progressBar}%`}>
        <div></div>
        <></>
      </ProgressBar><br />
      <BoxWrapper className="w100">
        <div className="formmainBox flex">
          <div className="left">
            <div className='center gap4 pointer' onClick={() => goBack(navigate, "/my-dashboard/")}>
              <img src={arrowIcon} alt="" /> <span>Back</span>
            </div>
          </div>
          <div className="right">
            <h2>PAN Authentication <span style={{color:'red'}}>*</span></h2>
            <p>Please enter your PAN Card number. Your identity is secure with us.</p>

            <FormWrapper>
              <Alert setMessage={setMessage} message={message} />
              <div className="inputBox panBox">
                <PanInput
                  type="text"
                  setOtp={setPan}
                  otp={pan}
                  isDisable={false}
                  placeholder="*"
                  number={false}
                  inputRefs={inputRefs}
                />
              </div>
            
              <div className="button">
                <Button title="Continue" onClick={submit} loading={loading} />
              </div>
            </FormWrapper>
          </div>
        </div>
      </BoxWrapper>
    </>
  );
}

export default PanDetails;
