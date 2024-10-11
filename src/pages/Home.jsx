import React, { useState } from "react";
import Banner from "../components/Banner";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { VscCombine } from "react-icons/vsc";
import features_img from "../images/features_img.png";
import process_line from "../images/process_line.svg";
import bg_shape from "../images/service_grid_bg.png";
import Number_Statistics from "../components/Number_Statistics";
import { AiOutlineFileDone } from "react-icons/ai";
import { VscOpenPreview } from "react-icons/vsc";
import { IoMdDoneAll } from "react-icons/io";
import LoanCalculator from "../components/LoanCalculator";
import ChatButton from "../components/ChatButton";
import underlay_img from "../images/get_started_underlay.jpg";
import overlay_img from "../images/get_started_overlay.jpg";
import { FaApple } from "react-icons/fa";
import { DiAndroid } from "react-icons/di";
import { BiSolidCustomize } from "react-icons/bi";
import { SiFsecure } from "react-icons/si";
import { FaStrava } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { FaDroplet } from "react-icons/fa6";
import { SiWebmoney } from "react-icons/si";
import {
  MdOutlineFileDownload,
  MdOutlineFileUpload,
  MdOutlineDone,
} from "react-icons/md";
import step_2_img from "../images/step_2.png";
import step_3_img from "../images/step_3.png";

const Home = () => {
  const [step, setStep] = useState(1);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const advantages = [
    {
      title: "Easy Application",
      content: "Gone are the days when the loan application process was itself a headache. Now, you need not visit a bank and sign a bundle of documents because we allow online paperless loan applications with minimum documentation. Don’t stand in the long queue at your nearest bank, instead open the SalaryOnTime app and complete the application process in the blink of an eye."
    },
    {
      title: "Prompt Approval",
      content: "As soon as we receive a loan application, we immediately swing into action. We meticulously review the loan application and if everything is good to go, we instantly approve it in a flash. SalaryOnTime understands how important your time is, which is why we believe in prompt approval and super-fast bank transfers."
    },
    {
      title: "Ultrafast Loan Disbursal",
      content: "The reason why SalaryOnTime has made a special name for itself is its ultrafast loan disbursal feature. We are as fast as a lightning bolt in transferring the loan amount directly to your bank account. Once the loan is approved by our team, we waste no time in disbursing the amount."
    },
    {
      title: "No Hidden Charges",
      content: "Hidden charges may come as a shock, making you sceptical about whether to take the loan or not. At SalaryOnTime, we aim to simplify your financial complications with our 'No Hidden Charges' policy that makes things transparent."
    },
    {
      title: "Easy-to-Repay Options",
      content: "We want to be the helping hand in your lean patch. Therefore, customer satisfaction is at the top of our priority list. We offer personalized loan terms and flexible repayment options to ensure that repaying the loan amount never feels like a burden."
    },
    {
      title: "Customized Personal Loans",
      content: "We know that circumstances may differ from person to person. Therefore, loan requirements may significantly vary. Keeping this in mind, we offer a wide range of loan options to fit every loan requirement."
    }
  ];
  
  return (
    <>
      <div className="page_wrapper">
        <Banner />

        <div className="about_us ">
          <div className="about_us_content">
            <div className="title_section">
              <p className="sub_title flex flex-center">
                <span>
                  <BsFillGrid1X2Fill
                    className="mr10"
                    style={{ marginBottom: "-2px" }}
                  />
                </span>
                <span>About SalaryOnTime</span>
              </p>
              <h2 className="mt20">
                SalaryOnTime: Your Trusted <span>Finance Company</span>
              </h2>
            </div>
            <div className="about_para">
              <p style={{textAlign:"justify"}}>
              We are an RBI-registered non-banking financial company(NBFC), offering instant personal loans without CIBIL checks to help you deal with urgent financial situations effectively. Whether you seek an instant personal loan online to pay medical bills, credit card repayment, travel expenses, monthly expenses, instant school/college fees, etc, we are always there to help you escape such tricky financial circumstances with ease. Apply to a variety of loans, such as emergency loans, short-term loans, long-term loans, etc from our website and get the loan amount disbursed in your account in 10 minutes. {" "}
                <span className="hide_content">
                  At SalaryOnTime, our goal is to offer seamless financial
                  solutions that cater to your urgent requirements. Experience
                  the convenience and reliability of our services as we strive
                  to be your go-to finance company for all your cash loan needs.
                </span>
                <Link to="/about">Read More</Link>
              </p>
            </div>
          </div>
          <LoanCalculator />
        </div>
        {/* <div className="float_content">
    <p className="marquee">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam voluptate quibusdam omnis quasi quos nesciunt facilis dolorem soluta similique voluptates ad vero ipsa corporis dolores distinctio illo minima, dicta fugiat.</p>
</div><br/><br/> */}


        <div className="services_section">
          <div className="flex flex-center info_content space-between">
            <div className="title_section">
              <p className="sub_title flex flex-center">
                <span>
                  <BsFillGrid1X2Fill
                    className="mr10"
                    style={{ marginBottom: "-2px" }}
                  />
                </span>
                <span>What We do</span>
              </p>

              <h2 className="mt20">
                Tailored Financial Solutions for
                <span> your financial needs</span>
              </h2>
            </div>
          </div>
          <div className="services_card_container">
            <div className="services_card">
              <div className="services_icon_container flex flex-center justify-center">
                <GiPayMoney className="service_icon" />
              </div>
              <div className="title full-width text-center mb10">
                <h4>Instant Loan</h4>
              </div>
              <div className="card_content">
                <p>
                  We offer instant loans to help you tackle unexpected financial
                  needs swiftly and efficiently. Our streamlined application
                  process ensures that you get the funds you need without delay.
                </p>

                <div className="btn_container mt30">
                  <Link to="/instantloan">Read More</Link>
                </div>
              </div>

              <div className="bg_shape">
                <img src={bg_shape} alt="" />
              </div>
            </div>
            <div className="services_card">
              <div className="services_icon_container flex flex-center justify-center">
                <GiTakeMyMoney className="service_icon" />
              </div>
              <div className="title full-width text-center mb10">
                <h4>Short Loans</h4>
              </div>
              <div className="card_content">
                <p>
                  Discover the convenience of short loans at SalaryOnTime,
                  designed to meet your immediate financial needs with ease. Our
                  quick approval process ensures that you can access the funds
                  you need.
                </p>

                <div className="btn_container mt30">
                  <Link to="/shortloan">Read More</Link>
                </div>
              </div>

              <div className="bg_shape">
                <img src={bg_shape} alt="" />
              </div>
            </div>
            <div className="services_card">
              <div className="services_icon_container flex flex-center justify-center">
                <VscCombine className="service_icon" />
              </div>
              <div className="title full-width text-center mb10">
                <h4>Debt Consolidation</h4>
              </div>
              <div className="card_content">
                <p>
                  Take control of your finances with our debt consolidation
                  services. Consolidate multiple debts into one manageable
                  payment and simplify your financial journey.
                </p>

                <div className="btn_container mt30">
                  <Link to="/services">Read More</Link>
                </div>
              </div>

              <div className="bg_shape">
                <img src={bg_shape} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="features_section">
          <div className="features_section_content ">
            <div>
              <div className="title_section">
                <p className="sub_title flex flex-center">
                  <span>
                    <BsFillGrid1X2Fill
                      className="mr10"
                      style={{ marginBottom: "-2px" }}
                    />
                  </span>
                  <span>Why Choose Us</span>
                </p>

                <h2 className="mt20">
                  Providing personal loans designed to{" "}
                  <span>secure your future success</span>
                </h2>
              </div>

              <div className="features_section_content_description mt20">
                <p>
                  Choosing SalaryOnTime as your finance company ensures that you
                  receive exceptional service tailored to your financial needs.
                  Specializing in personal loans, we offer a seamless process
                  for obtaining cash loans online, allowing you to secure funds
                  quickly and efficiently. Whether you need an urgent loan
                  online or an urgent money loan, SalaryOnTime provides reliable
                  and fast solutions to help you manage your financial
                  challenges with ease. Trust SalaryOnTime for your personal
                  loan requirements and experience the convenience, peace of
                  mind that comes with our expert financial services.
                </p>
              </div>
            </div>
            <div className="features_image">
              <img src={features_img} alt="" />
            </div>
          </div>
          <Number_Statistics />

          <div className="general_working">
            <div className="title_section">
              <p className="sub_title flex flex-center justify-center">
                <span>
                  {/* <BsFillGrid1X2Fill
                    className="mr10"
                    style={{ marginBottom: "-2px" }}
                  /> */}
                </span>
                {/* <span>Why Choose Us</span> */}
              </p>

              <h2 className="mt20 full-width text-center">
                How We <span>Work ?</span>
              </h2>
            </div>
            <div className="process_card_area mt50">
              <div className="process_line">
                <img src={process_line} alt="" />
              </div>
              <div className="process_row">
                <div className="process_card">
                  <div className="process_card_icon flex flex-center justify-center mb20">
                    <AiOutlineFileDone className="process_icon" />
                  </div>
                  <div className="process_card_number">01</div>
                  <h2 className="mb10">Application Submission</h2>
                  <p className="full-width text-center">
                    Fillout and submit a loan application with necessary
                    documents and details on our website
                  </p>
                </div>
                <div className="process_card">
                  <div className="process_card_icon flex flex-center justify-center mb20">
                    <VscOpenPreview className="process_icon" />
                  </div>
                  <div className="process_card_number">02</div>
                  <h2 className="mb10">Application Review</h2>
                  <p className="full-width text-center">
                    SalaryOnTime reviews your application, conducts credit
                    checks, and verifies your documents.
                  </p>
                </div>
                <div className="process_card">
                  <div className="process_card_icon flex flex-center justify-center mb20">
                    <IoMdDoneAll className="process_icon" />
                  </div>
                  <div className="process_card_number">03</div>
                  <h2 className="mb10">Application Approval</h2>
                  <p className="full-width text-center">
                    Once verified, receive loan approval along with the terms
                    and conditions and loan repayment date
                  </p>
                </div>
                <div className="process_card">
                  <div className="process_card_icon flex flex-center justify-center mb20">
                    <GiTakeMyMoney className="process_icon" />
                  </div>
                  <div className="process_card_number">04</div>
                  <h2 className="mb10">Disbursal Initiation</h2>
                  <p className="full-width text-center">
                    Upon acceptance of the terms, the loan amount is disbursed
                    to your account directly. No hassle.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="advantages_wrapper">
      <div className="title_section">
        <h2 className="mt20 full-width text-center">
          Why Should You Choose <span>SalaryOnTime</span>
        </h2>
        <p className="mt5 text-center">
          Multiple features make SalaryOnTime stand out from the rest. Let’s have a look at the features in detail.
        </p>
      </div>
      <div className="advantages_section">
        <div className="container">
          <div className="advantages_section_row">
            {advantages.map((advantage, index) => (
              <div className="advantage_section_card" key={index}>
                <div className="advantage_section_icon_container">
                  <BiSolidCustomize className="advantage_icon" />
                </div>
                <div className="content">
                  <h3>{advantage.title}</h3>
                  <p style={{ textAlign: "justify" }}>
                    {advantage.content.split('. ').slice(0, 1)}{' '}
                    <a
                      style={{ color: "#26b9db", cursor: 'pointer' }}
                      onClick={() => handleToggle(index)}
                    >
                      {expandedIndex === index ? ' Read Less' : ' Read More'}
                    </a>
                  </p>
                  {expandedIndex === index && (
                    <div className="additional_content">
                      <p style={{ textAlign: "justify" }}>
                        {advantage.content.split('. ').slice(1).join('. ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
        </div>
        <div className="get_started_section">
          <div className="title_section ">
            <h2 className="mt20 full-width text-center">
              Get Started <span>Instantly</span>
            </h2>
            <p className="full-width text-center mt5">
              Download the SalaryOnTime app and get moving
            </p>
          </div>
          <div className="get_started_row">
            {step === 1 ? (
              <>
                <div className="image_section">
                  <img src={underlay_img} alt="" className="underlay_img" />
                  <img src={overlay_img} className="overlay_img" />
                </div>
              </>
            ) : step === 2 ? (
              <>
                <div className="image_section">
                  <img src={step_2_img} alt="" />
                </div>
              </>
            ) : step === 3 ? (
              <>
                <div className="image_section">
                  <img src={step_3_img} alt="" />
                </div>
              </>
            ) : (
              ""
            )}
            <div className="steps_section">
              <h3 className="mb50">How does this App Work ?</h3>
              <div
                className={
                  step === 1 ? "step_item flex step_active" : "step_item flex"
                }
              >
                <div
                  className={
                    step === 1
                      ? "step_icon_container icon_active"
                      : "step_icon_container"
                  }
                  onClick={(e) => setStep(1)}
                >
                  <MdOutlineFileDownload className="step_icon" />
                </div>
                <div className="step_content">
                  <h4 className="content_title">Download the App and Apply</h4>
                  <p>
                    Head over to apply for loan section and fill your basic
                    details to get started
                  </p>
                </div>
              </div>
              <div
                className={
                  step === 2 ? "step_item flex step_active" : "step_item flex"
                }
              >
                <div
                  className={
                    step === 2
                      ? "step_icon_container icon_active"
                      : "step_icon_container"
                  }
                  onClick={(e) => setStep(2)}
                >
                  <MdOutlineFileUpload className="step_icon" />
                </div>
                <div className="step_content">
                  <h4 className="content_title">Upload Documents</h4>
                  <p>
                    Upload KYC Documents (PAN and Aadhar Card) income proof &
                    wait for verification
                  </p>
                </div>
              </div>
              <div
                className={
                  step === 3
                    ? "step_item flex step_active last_item"
                    : "step_item flex last_item"
                }
              >
                <div
                  className={
                    step === 3
                      ? "step_icon_container icon_active"
                      : "step_icon_container"
                  }
                  onClick={(e) => setStep(3)}
                >
                  <MdOutlineDone className="step_icon" />
                </div>
                <div className="step_content">
                  <h4 className="content_title">Get Approved Instantly</h4>
                  <p>
                    Post verification the disbursal process is Initiated
                    instantly
                  </p>
                </div>
              </div>
              <div className="app_download_button_container ml70">
                <p className="mb10">Download the app now</p>
                <div className="flex flex-center button_wrapper">
                  <Link to="https://apps.apple.com/in/app/salaryontime/id6503283983">
                    <FaApple className="app_download_icon" />
                  </Link>
                  <Link
                    to="https://play.google.com/store/apps/details?id=com.salaryontime.salaryontime"
                    target="_blank"
                  >
                    <DiAndroid className="app_download_icon" />
                  </Link>
                  
                </div>
              </div>
              
            </div>
            
          </div>
          
        </div>
       
      </div>
      <ChatButton />
    </>
  );
};

export default Home;
