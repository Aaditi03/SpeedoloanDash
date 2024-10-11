


import React, { useEffect,useContext, useState } from 'react';

import { BoxWrapper } from '../../../style';
import arrowIcon from "../../../images/arrow.png"
import { FormWrapper } from '../../../components/loan/style';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';
import {getDashboardData, getIncomeDetails, verifyPan } from '../../../Utils/api';
import { useNavigate } from 'react-router-dom';
import { getStorage, goBack, isAlphabet, isEmpty, isNumber } from '../../../Utils/common';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { formValidation } from '../../../Utils/formValidation';
import RadioButtons from '../../../components/ui/RadioButtons';
import ContextDashboard from '../../../Context/ContextDashboard';
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

const initialData = {
    employmentType:"",
    // monthlyIncome:"",
    organization:"",
    nextSalaryDate:"",
    ModeIncomeReceived:"",
    obligations:"",
}

const options =[
    {
        label:"Salaried",
        value:"salaried",
        name:"employmentType",
    },
    {
      label:"Self-Employed",
      value:"selfemployee",
      name:"employmentType",
  }

     
]
const options2 =[
    {
        label:"Bank",
        value:"BANK",
        name:"ModeIncomeReceived",
    },
    {
        label:"NEFT",
        value:"NEFT",
        name:"ModeIncomeReceived",
    },
    {
        label:"Cash",
        value:"CASH",
        name:"ModeIncomeReceived",
    },
     
]

function CapturIncomeDetails() {
    const [loading, setLoading] = useState(false);
    const [responce,setResponce] = useState({});
    const [formData, setFormData] = useState(initialData);
    const [formDataError, setFormDataError] = useState(initialData);
    const [showSteps, setShowSteps] = useState(-1);
    const [toggle, setToggle] = useState(true);
    const [progressBar, setProgressBar] = useState(0);

    const navigate = useNavigate();

    const {message,setMessage, logout,setps} = useContext(ContextDashboard);
  


    const submit = () =>{
     

        const error = formValidation(formData);
  
        console.log("error",error)
        setFormDataError({...formDataError,...error});
        const param = {
          lead_id:getStorage("lead_id") || "",
          token:getStorage("token") || "",
          employee_type:formData.employmentType,
          salary_mode:formData.ModeIncomeReceived,
          company_name:formData.organization,
          nextSalaryDate:formData.nextSalaryDate,
          // monthly_salary:formData.monthlyIncome,
          obligations:formData.obligations,
       
      }
  
        if(isEmpty(error)){
           setLoading(true);
           getIncomeDetails(param).then(resp=>{
        setLoading(false);
        console.log(resp?.data)
        if(resp?.data?.Status === 1){
          setResponce(resp?.data);
          setMessage({ type: 'success', msg:resp?.data?.Message, place:"globle" });
          navigate("/my-dashboard/upload-picture")
        }else if(resp?.data?.Status === 5){
          logout();
        }else{
          setMessage({ type: 'error', msg: resp?.data?.Message, });
        }
        
        
    })
  
        }
  
    
    }
  
const onChange = (e)=>{
  let {name, value} = e.target;  
  setFormData({...formData,[name]:value});
  setFormDataError({...formDataError,[name]:""});
}

const onChangeDate = (date) =>{
    console.log("date",date)
    setFormData({...formData,nextSalaryDate:date});
    setFormDataError({...formDataError,nextSalaryDate:""});
}

useEffect(() => {

  // Fetch dashboard data on mount
  const params = {
      lead_id: getStorage("lead_id") || "",
      token: getStorage("token") || "",
      mobile: getStorage("mobile") || "",
  };

  getDashboardData(params).then(resp => {
      if (resp?.data?.Status === 1) {
          const dashboardData = resp?.data?.Steps?.data || {};
          if (dashboardData) {
              // Update form data with fetched dashboard data
              setFormData(prev => ({
                  ...prev,
                  employmentType: dashboardData.employee_type || "",
                  // monthlyIncome: dashboardData.monthly_salary || "",
                  organization: dashboardData.company_name || "",
                  ModeIncomeReceived: dashboardData.salary_mode || "", 
                  nextSalaryDate:dashboardData.nextSalaryDate || "",
                  obligations: dashboardData.obligations || "", 
            
              }));

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
  </ProgressBar><br/>
       <BoxWrapper  className="w100" >
        <div className="formmainBox flex">
          <div className="left">
            <div className='center gap4 pointer' onClick={()=>goBack(navigate,"/my-dashboard/")} >
                <img src={arrowIcon} alt="" /> <span>Back</span>
            </div>
          </div>
          <div className="right">
            <h2>Income Details</h2>
            <p>Share with us a bit about yourself.</p>
         
            <FormWrapper>
            <Alert setMessage={setMessage} message={message}  />
            <div className="inputBox" style={{marginBottom:"25px"}}>
            <RadioButtons  title='Select Employment Type' options={options} className="flex 5" cls={"margin-25"} value={formData.employmentType} error={formDataError.employmentType} onChange={onChange} required={true} />
           
            {/* <Input
                  label="Net Monthly Income *"
                  name="monthlyIncome"
                  error={formDataError?.monthlyIncome}
                  onChange={onChange}
                  value={formData?.monthlyIncome}
                  required={true}
                  type='number'
                  
                /> */}


            <Input
                  label="Organization Name"
                  name="organization"
                   className='min-w100'
                  error={formDataError?.organization}
                  onChange={onChange}
                  value={formData?.organization}
                  required={true}
                  
                />

                
            <Input
                  label="Salary Date"
                  name="nextSalaryDate"
                  type='date'
                  error={formDataError?.nextSalaryDate}
                  onChange={onChangeDate}
                  value={formData?.nextSalaryDate}
                  required={true}
                  
                />
               
               <Input
                  label="Obligations"
                  name="obligations"
                  placeholder="Please enter your monthly rent, bills"
                  type='number'
                  error={formDataError?.obligations}
                  onChange={onChange}
                  value={formData?.obligations}
                  required={true}
                  
                />
                

           <RadioButtons  title='Mode of Salary Received' options={options2} className="flex "  value={formData.ModeIncomeReceived} error={formDataError.ModeIncomeReceived} onChange={onChange} required={true}/>
       
          
               
              </div>
              <div>
              
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

export default CapturIncomeDetails;