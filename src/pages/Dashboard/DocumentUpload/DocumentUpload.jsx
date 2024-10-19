import React, { useContext, useEffect, useState } from "react";

import { BoxWrapper } from "../../../style";
import arrowIcon from "../../../images/arrow.png";
import { FormWrapper2 } from "../../../components/loan/style";
import Button from "../../../components/ui/Button";
import Alert from "../../../components/ui/Alert";

import { useNavigate } from "react-router-dom";
import { getStorage, goBack, isEmpty, setStorage } from "../../../Utils/common";

import PictureUpload from "../../../components/PictureUpload/PictureUpload";
import { saveDocuments } from "../../../Utils/api";
import ContextDashboard from "../../../Context/ContextDashboard";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

function DocumentUpload() {
    const [loading, setLoading] = useState(false);
    const [responce, setResponce] = useState({});
    
    // Aadhar Upload states
    const [aadharFront, setAadharFront] = useState("");
    const [aadharFront64, setAadharFront64] = useState("");
    const [aadharBack, setAadharBack] = useState("");
    const [aadharBack64, setAadharBack64] = useState("");
    
    // PAN Upload states
    const [panImage, setPanImage] = useState("");
    const [panBase64, setPanBase64] = useState("");

    const [bankImage, setBankImage] = useState("");
    const [bankBase64, setBankBase64] = useState("");

    const [salaryImage, setSalaryImage] = useState("");
    const [salaryBase64, setSalaryBase64] = useState("");
    
    const [utilityImage, setUtilityImage] = useState("");
    const [utilityBase64, setUtilityBase64] = useState("");
    // Other states
    const [message, setMessage] = useState("");
    const [progressBar, setProgressBar] = useState(getStorage("step_percent"));

    const navigate = useNavigate();
    const { logout, getProfileDaital } = useContext(ContextDashboard);

    // Handle Aadhar front and back image conversions to base64
    useEffect(() => {
        if (aadharFront) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result.split(",").pop();
                setAadharFront64(base64);
            };
            reader.readAsDataURL(aadharFront);
        }
    }, [aadharFront]);

    useEffect(() => {
        if (aadharBack) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result.split(",").pop();
                setAadharBack64(base64);
            };
            reader.readAsDataURL(aadharBack);
        }
    }, [aadharBack]);

    // Handle PAN image conversion to base64
    useEffect(() => {
        if (panImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result.split(",").pop();
                setPanBase64(base64);
            };
            reader.readAsDataURL(panImage);
        }
    }, [panImage]);

    useEffect(() => {
      if (bankImage) {
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64 = reader.result.split(",").pop();
              setBankBase64(base64);
          };
          reader.readAsDataURL(bankImage);
      }
  }, [bankImage]);

  useEffect(() => {
    if (utilityImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result.split(",").pop();
            setUtilityBase64(base64);
        };
        reader.readAsDataURL(utilityImage);
    }
}, [utilityImage]);

  useEffect(() => {
    if (salaryImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result.split(",").pop();
            setSalaryBase64(base64);
        };
        reader.readAsDataURL(salaryImage);
    }
}, [salaryImage]);

    // Submit both Aadhar and PAN documents in a single function
    const submitDocuments = async () => {
        if (!aadharFront64 || !aadharBack64 || !panBase64 || !bankBase64 || !salaryBase64 || !utilityBase64) {
            setMessage({ type: "error", msg: "Please upload all required documents", place: "local" });
            return;
        }

        setLoading(true);
        try {
            // Upload Aadhar Front
            await uploadDocument("aadhaar_upload","aadhaar_front", aadharFront64, aadharFront);
            // Upload Aadhar Back
            await uploadDocument("aadhaar_upload","aadhaar_back", aadharBack64, aadharBack);
            // Upload PAN Card
            await uploadDocument("pan_upload","", panBase64, panImage);

            await uploadDocument("bank_statement_upload","", bankBase64, bankImage);

            await uploadDocument("pay_slip_upload","", salaryBase64,salaryImage);

            await uploadDocument("residence_proof_upload","electricity_bill", utilityBase64, utilityImage);

            // After both uploads succeed
            // getProfileDaital();
            navigate("/my-dashboard/bank-detail");
        } catch (error) {
            setMessage({ type: "error", msg: "An error occurred during upload. Please try again." });
        }
        setLoading(false);
    };

    const uploadDocument = (event,doc_type ,fileBase64, fileObj) => {
        return new Promise((resolve, reject) => {
            let ext = "JPEG";
            if (typeof fileObj === "object") {
                ext = fileObj.name.split('.').pop().toUpperCase();
            }

            const param = {
                profile_id: getStorage("cust_profile_id") || "", 
                file_ext: ext,
                password: "N/A",
                event_name: event,
                doc_type:doc_type || "",
                file: fileBase64,
            };

            saveDocuments(param).then(resp => {
                if (resp?.data?.Status === 1) {
                    setResponce(resp?.data);
                    setMessage({ type: 'success', msg: resp?.data?.Message, place: "global" });
                    resolve();
                } else if (resp?.data?.Status === 4) {
                    logout();
                    reject(new Error('Session expired.'));
                } else {
                    setMessage({ type: 'error', msg: resp?.data?.Message });
                    reject(new Error(resp?.data?.Message));
                }
            }).catch(err => {
                reject(err);
            });
        });
    };

    // Fetch progress bar data
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
    //                 setProgressBar(resp?.data?.Steps?.steps?.step_complete_percent);
    //             }
    //         } else if (resp?.data?.Status === 5) {
    //             logout();
    //         }
    //     });
    // }, [logout]);

    return (
        <>
            <ProgressBar value={`${progressBar}%`} />
            <br />
            <BoxWrapper className="w100">
                <div className="formmainBox flex">
                    <div className="left">
                        <div className='center gap4 pointer' onClick={() => goBack(navigate, "/my-dashboard/about-your-company")}>
                            <img src={arrowIcon} alt="" /> <span>Back</span>
                        </div>
                    </div>
                    <div className="right">
                        <h2>Upload Your Documents</h2>
                        <p>Upload your Documents to verify your details</p>

                        <FormWrapper2>
                            <Alert setMessage={setMessage} message={message} />

                            <div className="inputBox">
                                <h2 className='subheading small'>Aadhar front side</h2>
                                <PictureUpload setImage={setAadharFront} image={aadharFront} />

                                <h2 className='subheading small'>Aadhar back side</h2>
                                <PictureUpload setImage={setAadharBack} image={aadharBack} />
                                
                            </div>

                            <div className="inputBox">

                            <h2 className='subheading small'>PAN card</h2>
                            <PictureUpload setImage={setPanImage} image={panImage} />

                            <h2 className='subheading small'>Bank statement (6 months)</h2>
                            <PictureUpload setImage={setBankImage} image={bankImage} accept="application/pdf" type="file"  />

                            </div>

                            <div className="inputBox">

                            <h2 className='subheading small'>Salary slip</h2>
                            <PictureUpload setImage={setSalaryImage} image={salaryImage} accept="application/pdf" type="file" />

                            <h2 className='subheading small'>Utility bill</h2>
                            <PictureUpload setImage={setUtilityImage} image={utilityImage} />

                            </div>

                            <div className="button">
                                <Button title="Continue" onClick={submitDocuments} loading={loading} />
                            </div>
                        </FormWrapper2>
                    </div>
                </div>
            </BoxWrapper>
        </>
    );
}

export default DocumentUpload;
