import React from "react";
import { Route, Routes } from "react-router-dom";
import LoanLayout from "./LoanLayout";
import Layout from "./Layout";
import ScrollToTop from "./components/ScrollTop";

// Import your pages
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ApplyForLoan from "./pages/ApplyForLoan";
import ShortLoan from "./pages/ShortLoan";
import InstantLoan from "./pages/InstantLoan";
import FAQ from "./pages/FAQ";
import RateandTerms from "./pages/RateandTerms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsandConditions from "./pages/TermsandConditions";
import Ahmedabad from "./pages/locations/Ahmedabad";
import Hyderabad from "./pages/locations/Hyderabad";
import Mumbai from "./pages/locations/Mumbai";
import Banglore from "./pages/locations/Banglore";
import Delhi from "./pages/locations/Delhi";
import RepayLoan from "./pages/RepayLoan";
import Flexibility from "./pages/Flexibility";
import DebtConsolidation from "./pages/DebtConsolidation";
import MinimalCommitment from "./pages/MinimalCommitment";
import CostEffective from "./pages/CostEffective";
import Home from "./pages/Home";
import DashBoard from "./pages/Dashboard/DashBoard";
import PanDetails from "./pages/Dashboard/PanDetails/PanDetails";
import CapturAddress from "./pages/Dashboard/CapturAddress/CapturAddress";
import CapturPersonalInformation from "./pages/Dashboard/CapturPersonalInformation/CapturPersonalInformation";
import CapturIncomeDetails from "./pages/Dashboard/CapturIncomeDetails/CapturIncomeDetails";
import UploadPicture from "./pages/Dashboard/UploadPicture/UploadPicture";
import ProfilePage from "./pages/Dashboard/ProfilePage/ProfilePage";
import ProfilePreview from "./pages/Dashboard/ProfilePage/ProfilePreview";
import CalculateLoan from "./pages/Dashboard/CalculateLoan/CalculateLoan";
import AboutCompany from "./pages/Dashboard/AboutCompany/AboutCompany";
import Ekyc from "./pages/Dashboard/Ekyc/Ekyc";
import UploadBankStatement from "./pages/Dashboard/UploadBankStatement/UploadBankStatement";
import Eligibility from "./pages/Dashboard/Eligibility/Eligibility";
import ProtectedRoute from "./components/ProtectedRoute";
import PanUpload from "./pages/Dashboard/PanUpload/PanUpload";
import DocumentUpload from "./pages/Dashboard/DocumentUpload/DocumentUpload";
import ThankYou from "./pages/Dashboard/ThankYou/ThankYou";
import UploadSalaryslip from "./pages/Dashboard/UploadSalaryslip/UploadSalaryslip";
import UploadUtilitybill from "./pages/Dashboard/UploadUtilitybill/UploadUtilitybill";
import LeadPreview from "./pages/Dashboard/ProfilePage/LeadPreview";
import LoanHistory from "./pages/LoanHistory/LoanHistory";
import LoanDetail from "./pages/LoanHistory/LoanDetail"
import RepayPage from "./pages/Dashboard/ProfilePage/RepayPage";

const showmessage = async (message) => {
  try {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText = message;
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  } catch (error) {
    console.log(error);
  }
};

function Router() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="shortloan" element={<ShortLoan />} />
          <Route path="instantloan" element={<InstantLoan />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="rateandterms" element={<RateandTerms />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="termsandconditions" element={<TermsandConditions />} />
          <Route path="delhi" element={<Delhi />} />
          <Route path="banglore" element={<Banglore />} />
          <Route path="mumbai" element={<Mumbai />} />
          <Route path="ahmedabad" element={<Ahmedabad />} />
          <Route path="hyderabad" element={<Hyderabad />} />
          <Route path="flexibility" element={<Flexibility />} />
          <Route path="debtconsolidation" element={<DebtConsolidation />} />
          <Route path="minimalcommitment" element={<MinimalCommitment />} />
          <Route path="costeffective" element={<CostEffective />} />
          <Route path="apply-now" element={<ApplyForLoan showmessage={showmessage} />} />
          <Route path="repayloan" element={<RepayLoan showmessage={showmessage} />} />
        </Route>

        <Route path="/my-dashboard" element={<LoanLayout />}>
          <Route path="/my-dashboard/" element={<DashBoard showmessage={showmessage} />} />
          <Route path="/my-dashboard/pan-details" element={<PanDetails />} />
          <Route path="/my-dashboard/captur-address" element={<CapturAddress />} />
          <Route path="/my-dashboard/captur-personal-information" element={<CapturPersonalInformation />} />
          <Route path="/my-dashboard/captur-income-details" element={<CapturIncomeDetails />} />
          <Route path="/my-dashboard/upload-picture" element={<UploadPicture />} />
          <Route path="/my-dashboard/user-profile" element={<ProfilePage />} />
          <Route path="/my-dashboard/profile-preview" element={<ProfilePreview />} />
          <Route path="/my-dashboard/calculate-loan" element={<CalculateLoan />} />
          <Route path="/my-dashboard/about-your-company" element={<AboutCompany />} />
          <Route path="/my-dashboard/kyc" element={<Ekyc />} />
          <Route path="/my-dashboard/bank-upload" element={<UploadBankStatement />} />
          <Route path="/my-dashboard/pan-upload" element={<PanUpload />} />
          <Route path="/my-dashboard/adhar-upload" element={<DocumentUpload />} />
          <Route path="/my-dashboard/congratulations" element={<ThankYou />} />
          <Route path="/my-dashboard/upload-salaryslip" element={<UploadSalaryslip />} />
          <Route path="/my-dashboard/upload-utilitybill" element={<UploadUtilitybill />} />
          <Route path="/my-dashboard/lead-preview" element={<LeadPreview />} />
          <Route path="/my-dashboard/leads" element={<LoanHistory />} />
          <Route path="/my-dashboard/repayment" element={<RepayPage />} />
          <Route path="/my-dashboard/details/:lead_id" element={<LoanDetail />} />

          
          <Route
            path="/my-dashboard/eligibility"
            element={
              <ProtectedRoute
                redirectTo="/my-dashboard"
                element={<Eligibility />}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default Router;



