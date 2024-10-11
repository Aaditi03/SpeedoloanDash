import React, { useContext, useEffect, useState } from 'react';
import { BoxWrapper } from '../../../style';
import arrowIcon from "../../../images/arrow.png";
import congratulations from "../../../images/congratulations.gif";
import { useNavigate } from 'react-router-dom';
import { getDashboardData } from '../../../Utils/api';
import ContextDashboard from '../../../Context/ContextDashboard';
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { getStorage, goBack, isEmpty } from '../../../Utils/common';

function ThankYou() {
  const navigate = useNavigate();
  const [showSteps, setShowSteps] = useState(-1);
  const [toggle, setToggle] = useState(true);
  const [progressBar, setProgressBar] = useState(0);
  const { setps, logout } = useContext(ContextDashboard);
  
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
    <div >
      <ProgressBar value={`${progressBar}%`} title="Loan Application" />
      <br />
      <BoxWrapper className="w100 gray">
        <div className="formmainBox flex" style={{ backgroundImage: `url(${congratulations})`, backgroundSize: 'cover', height: '400px' ,  width: '100%',backgroundPosition:'center', backgroundRepeat:'no-repeat'
  
    }}>
          <div className="left">
            <div className='center gap4 pointer' onClick={() => goBack(navigate, "/my-dashboard/eligibility")}>
              <img src={arrowIcon} alt="" /> <span>Back</span>
            </div>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

export default ThankYou;
