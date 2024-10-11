import React, { useContext, useEffect, useState } from 'react';
import { BoxWrapper } from '../../../style';
import arrowIcon from "../../../images/arrow.png";
import { FormWrapper } from '../../../components/loan/style';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';
import { getStateCityPincode, getDashboardData, savePerssonalAddress } from '../../../Utils/api';
import { useNavigate } from 'react-router-dom';
import { getStorage, goBack, isEmpty } from '../../../Utils/common';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { formValidation } from '../../../Utils/formValidation';
import ContextDashboard from '../../../Context/ContextDashboard';  // Correct default import
import ProgressBar from "../../../components/ProgressBar/ProgressBar";


const initialData = {
    pinCode: "",
    city: "",
    state: "",
    landmark: "",
    current_locality: "",
    address: "",
    residenceType: "",
};

const options = [
    { label: "Owned", value: "OWNED" },
    { label: "Rented", value: "RENTED" }
];

function CapturPersonalInformation() {
    const { message, setMessage, setps, logout } = useContext(ContextDashboard);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData);
    const [formDataError, setFormDataError] = useState(initialData);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [pinCodeList, setPinCodeList] = useState([]);
    const [showSteps, setShowSteps] = useState(-1);
    const [toggle, setToggle] = useState(true);
    const [progressBar, setProgressBar] = useState(0);

    // Accessing context values from ContextDashboard

    const navigate = useNavigate();

    const submit = () => {
        const error = formValidation(formData);
        setFormDataError({ ...formDataError, ...error });

        const param = {
            lead_id: getStorage("lead_id") || "",
            token: getStorage("token") || "",
            current_residence_type: formData.residenceType,
            current_landmark: formData.landmark,
            current_locality: formData.current_locality,
            current_house: formData.address,
            pincode: formData.pinCode,
            city_id: formData.city,
            state_id: formData.state
        };

        if (isEmpty(error)) {
            setLoading(true);
            savePerssonalAddress(param).then(resp => {
                setLoading(false);
                if (resp?.data?.Status === 1) {
                    setMessage({ type: 'success', msg: resp?.data?.Message, place: "global" });
                    navigate("/my-dashboard/captur-income-details");
                } else if (resp?.data?.Status === 5) {
                    logout();
                } else {
                    setMessage({ type: 'error', msg: resp?.data?.Message });
                }
            });
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setFormDataError(prev => ({
            ...prev,
            [name]: ""
        }));

        // Handle state and city change logic
        if (name === "state") {
            StateCityList("getcity", value);
            setFormData(prev => ({ ...prev, city: "", pinCode: "" })); // Reset city and pin code
        } else if (name === "city") {
            StateCityList("getpincode", value);
            setFormData(prev => ({ ...prev, pinCode: "" })); // Reset pin code
        }
    };

    const StateCityList = (type = "getstate", id = null) => {
        const param = { apiname: type };
        if (id) {
            param.id = id;
        }
        getStateCityPincode(param).then((resp) => {
            if (resp?.data?.data) {
                if (type === "getstate") {
                    const data = resp.data.data.map((value) => ({ label: value.name, value: value.id }));
                    setStateList(data);
                } else if (type === "getcity") {
                    const data = resp.data.data.map((value) => ({ label: value.m_city_name, value: value.m_city_id }));
                    setCityList(data);
                } else {
                    const data = resp.data.data.map((value) => ({ label: value.name, value: value.name }));
                    setPinCodeList(data);
                }
            }
        });
    };

    useEffect(() => {
        StateCityList(); // Fetch state list on mount

        const params = {
            lead_id: getStorage("lead_id") || "",
            token: getStorage("token") || "",
            mobile: getStorage("mobile") || "",
        };

        getDashboardData(params).then(resp => {
            if (resp?.data?.Status === 1) {
                const dashboardData = resp?.data?.Steps?.data || {};
                if (dashboardData) {
                    setFormData(prev => ({
                        ...prev,
                        address: dashboardData.current_house || "",
                        current_locality: dashboardData.current_locality || "",
                        landmark: dashboardData.current_landmark || "",
                        pinCode: dashboardData.pincode || "",
                        city: dashboardData.city_id || "",
                        state: dashboardData.state_id || "",
                        residenceType: dashboardData.current_residence_type || "",
                    }));

                    if (dashboardData.state) {
                        StateCityList("getcity", dashboardData.state);
                    }
                    if (dashboardData.city) {
                        StateCityList("getpincode", dashboardData.city);
                    }
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
        <>
            <ProgressBar value={`${progressBar}%`}>
        
          <div >
          </div>
         <></>
      </ProgressBar>
            <BoxWrapper className="w100">
                <div className="formmainBox flex">
                    <div className="left">
                        <div className='center gap4 pointer' onClick={() => goBack(navigate, "/my-dashboard/")}>
                            <img src={arrowIcon} alt="" /> <span>Back</span>
                        </div>
                    </div>
                    <div className="right">
                        <h2>Current Residence Address</h2>
                        <p>Ensure to provide correct residence address. No Surprise Visits, We Promise!</p>

                        <FormWrapper>
                            <Alert setMessage={setMessage} message={message} />
                            <div className="inputBox">
                                <Select
                                    label="Residence Type"
                                    name="residenceType"
                                    placeholder="Enter Residence"
                                    error={formDataError?.residenceType}
                                    onChange={onChange}
                                    value={formData?.residenceType}
                                    options={options}
                                    required={true}
                                />
                                <Input
                                    label="Address"
                                    name="address"
                                    error={formDataError?.address}
                                    onChange={onChange}
                                    value={formData?.address}
                                    required={true}
                                />
                                <Input
                                    label="Current Locality"
                                    name="current_locality"
                                    error={formDataError?.current_locality}
                                    onChange={onChange}
                                    value={formData?.current_locality}
                                    required={true}
                                />
                                <Input
                                    label="Landmark"
                                    name="landmark"
                                    error={formDataError?.landmark}
                                    onChange={onChange}
                                    value={formData?.landmark}
                                    required={true}
                                />
                                <Select
                                    label="State"
                                    name="state"
                                    placeholder="Select state"
                                    error={formDataError?.state}
                                    onChange={onChange}
                                    value={formData?.state}
                                    options={stateList}
                                    disabled={isEmpty(stateList)}
                                    required={true}
                                />
                                <Select
                                    label="City"
                                    name="city"
                                    placeholder="Select city"
                                    error={formDataError?.city}
                                    onChange={onChange}
                                    value={formData?.city}
                                    options={cityList}
                                    disabled={isEmpty(stateList) || isEmpty(cityList)}
                                    required={true}
                                />
                                <Select
                                    label="Pin Code"
                                    name="pinCode"
                                    placeholder="Select Pin Code"
                                    error={formDataError?.pinCode}
                                    onChange={onChange}
                                    value={formData?.pinCode}
                                    options={pinCodeList}
                                    disabled={isEmpty(stateList) || isEmpty(cityList) || isEmpty(pinCodeList)}
                                    required={true}
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

export default CapturPersonalInformation;