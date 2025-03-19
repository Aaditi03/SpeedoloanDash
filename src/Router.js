import React from "react";
import { Route, Routes } from "react-router-dom";
import LoanLayout from "./LoanLayout";
import Layout from "./Layout";
import ScrollToTop from "./components/ScrollTop";
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
import LendingPage from "./components/LendingPage";
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
import BankDetail from "./pages/Dashboard/BankDetail/BankDetail";
import Ghaziabad from "./pages/locations/Ghaziabad";
import Noida from "./pages/locations/Noida";
import Faridabad from "./pages/locations/Faridabad";
import GreaterNoida from "./pages/locations/GreaterNoida";
import Gurgaon from "./pages/locations/Gurgaon";
import RepayThankyou from "./pages/RepayThanku";
import CancellationRefundPolicy from "./pages/CancellationRefundPolicy";


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
          <Route path="about-us" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="lending" element={<LendingPage />} />
          <Route path="cancelation-refund" element={<CancellationRefundPolicy />} />
          <Route path="short-term-loan" element={<ShortLoan />} />
          <Route path="instant-loan" element={<InstantLoan />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="rateandterms" element={<RateandTerms />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="termsandconditions" element={<TermsandConditions />} />
          <Route path="Instant-Personal-Loan-for-Salaried-in-Delhi" element={<Delhi />} />
          <Route path="advance-loans-Online-in-Bangalore" element={<Banglore />} />
          <Route path="loan-agency-in-mumbai" element={<Mumbai />} />
          <Route path="instant-personal-loan-in-ahmedabad" element={<Ahmedabad />} />
          <Route path="instant-personal-loan-online-in-hyderabad" element={<Hyderabad />} />
          <Route path="personal-loan-in-Gurgaon" element={<Gurgaon />} />
          <Route path="Personal-loan-in-Noida" element={<Noida />} />
          <Route path="personal-loan-in-faridabad" element={<Faridabad />} />
          <Route path="instant-personal-loan-in-greater-noida" element={<GreaterNoida />} />
          <Route path="Instant-Personal-Loan-in-Ghaziabad" element={<Ghaziabad />} />
          <Route path="flexibility" element={<Flexibility />} />
          <Route path="debt-consolidation-loan" element={<DebtConsolidation />} />
          <Route path="minimalcommitment" element={<MinimalCommitment />} />
          <Route path="costeffective" element={<CostEffective />} />
          <Route path="thanku" element={<RepayThankyou/>}/>
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
          <Route path="/my-dashboard/about-your-company" element={<AboutCompany />}/>
          <Route path="/my-dashboard/bank-detail" element={<BankDetail />} />
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
          <Route path="/my-dashboard/details" element={<LoanDetail />} />
          {/* <Route path="/my-dashboard/eligibility" element={<Eligibility />} /> */}
       
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



