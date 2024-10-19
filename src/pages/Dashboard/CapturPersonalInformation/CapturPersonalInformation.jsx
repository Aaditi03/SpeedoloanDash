import React, { useEffect, useContext, useState } from 'react';
import { BoxWrapper } from '../../../style';
import arrowIcon from "../../../images/arrow.png";
import { FormWrapper } from '../../../components/loan/style';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';
import {  savePerssonalDetails } from '../../../Utils/api';
import { useNavigate } from 'react-router-dom';
import { formateDate, getStorage, goBack, isEmpty, setStorage } from '../../../Utils/common';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { formValidation } from '../../../Utils/formValidation';
import RadioButtons from '../../../components/ui/RadioButtons';
import ContextDashboard from '../../../Context/ContextDashboard';
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

const initialData = {
    dob: "",
    maritalStatus: "",
    email: "",
    gender: "",
    spouseName: "", 
};

const options = [
    { label: "Male", value: "1", name: "gender" },
    { label: "Female", value: "2", name: "gender" },
];

const marriedOptions = [
    { label: "Single", value: "1" },
    { label: "Married", value: "2" },
    { label: "Divorced", value: "3" },
];

function CapturPersonalInformation() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({});
    const [formData, setFormData] = useState(initialData);
    const [formDataError, setFormDataError] = useState(initialData);
    const [progressBar, setProgressBar] = useState(getStorage("step_percent"));
    const [showSteps, setShowSteps] = useState(-1);
    const [toggle, setToggle] = useState(true);
    const navigate = useNavigate();
    const { message, setMessage, logout, setps } = useContext(ContextDashboard);

    const submit = () => {
        const error = formValidation(formData);
        setFormDataError({ ...formDataError, ...error });

        const param = {
            profile_id: getStorage("cust_profile_id") || "", 
            event_name:"personal_details",
            gender: formData.gender,
            personal_email: formData.email,
            dob: formateDate(formData.dob),
            marital_status_id: formData.maritalStatus,
            spouse_name: formData.maritalStatus === "2" ? formData.spouseName : undefined,
        };

        if (formData.maritalStatus !== "2") {
            delete error.spouseName;
        }

        if (isEmpty(error)) {
            setLoading(true);
            savePerssonalDetails(param).then(resp => {
                setLoading(false);
                if (resp?.data?.Status === 1) {
                    setResponse(resp?.data);
                    setStorage("next_step",resp?.data?.Data?.next_step)
                    setStorage("step_percent",resp?.data?.Data?.step_percentage)
                    setMessage({ type: 'success', msg: resp?.data?.Message, place: "global" });
                    navigate("/my-dashboard/captur-address");
                } else if (resp?.data?.Status === 4) {
                    logout();
                } else {
                    setMessage({ type: 'error', msg: resp?.data?.Message });
                }
            });
        }
    };

    // Helper function to calculate age based on DOB
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const onChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (formDataError[name]) {
            setFormDataError({ ...formDataError, [name]: "" });
        }
    };

    const onChangeDate = (date) => {
        const age = calculateAge(date);

        if (age < 18) {
            setFormDataError({ ...formDataError, dob: "You must be at least 18 years old." });
        } else {
            setFormData({ ...formData, dob: date });
            setFormDataError({ ...formDataError, dob: "" });
        }
    };

    // useEffect(() => {
    //     const params = {
    //         lead_id: getStorage("lead_id") || "",
    //         token: getStorage("token") || "",
    //         mobile: getStorage("mobile") || "",
    //     };

    //     getDashboardData(params).then(resp => {
    //         if (resp?.data?.Status === 1) {
    //             const dashboardData = resp?.data?.Steps?.data || {};
    //             if (dashboardData) {
    //                 setFullName(dashboardData.full_name); // Set the full name for display
    //                 setFormData(prev => ({
    //                     ...prev,
    //                     dob: dashboardData.dob || "",
    //                     maritalStatus: dashboardData.marital_status || "",
    //                     email: dashboardData.email || "",
    //                     gender: dashboardData.gender || "",
    //                 }));

    //                 setProgressBar(resp?.data?.Steps?.steps?.step_complete_percent);
    //             }
    //         } else if (resp?.data?.Status === 5) {
    //             logout();
    //         }
    //     });
    // }, [logout]);

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
        <>
            <ProgressBar value={`${progressBar}%`}>
                <div></div>
            </ProgressBar><br />
            <BoxWrapper className="w100">
                <div className="formmainBox flex">
                    <div className="left">
                        <div className='center gap4 pointer' onClick={() => goBack(navigate, "/my-dashboard/")}>
                            <img src={arrowIcon} alt="" /> <span>Back</span>
                        </div>
                    </div>
                    <div className="right">
                        <h2>Personal Information *</h2>
                        <p>Share with us a bit about yourself.</p>
                        <FormWrapper>
                            <Alert setMessage={setMessage} message={message} />
                            <div className="inputBox">
                                <Input
                                    label="Your Full Name"
                                    name="full_name"
                                    value={getStorage("fullName")}
                                    readOnly
                                />
                                <Input
                                    label="Personal Email"
                                    name="email"
                                    error={formDataError?.email}
                                    onChange={onChange}
                                    value={formData?.email}
                                    required={true}
                                />
                                <Input
                                    label="DOB"
                                    name="dob"
                                    type='date'
                                    error={formDataError?.dob}
                                    onChange={onChangeDate}
                                    value={formData?.dob}
                                    required={true}
                                />
                                <Select
                                    label="Your Marital Status"
                                    name="maritalStatus"
                                    placeholder="--Select--"
                                    error={formDataError?.maritalStatus}
                                    onChange={onChange}
                                    value={formData?.maritalStatus}
                                    options={marriedOptions}
                                    required={true}
                                />
                                {formData.maritalStatus === "2" && (
                                    <Input
                                        label="Spouse Name"
                                        name="spouseName"
                                        onChange={onChange}
                                        value={formData.spouseName}
                                    />
                                )}
                                <RadioButtons title='Select Gender' options={options} className="flex" value={formData.gender} error={formDataError.gender} onChange={onChange} required={true} />
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

export default CapturPersonalInformation;
