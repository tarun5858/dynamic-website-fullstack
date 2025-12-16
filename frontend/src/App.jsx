import "./App.css";
import "./assets/css/App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Routes, Route } from "react-router-dom";
import BlogPage from "./screens/BlogPage";
import Blogdetails from "./components/Blogdetails";
import "./assets/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/whatsappButton";
import Home from "./screens/Home";
import SuccessStories from "./screens/SuccessStories";
import HowItWorks from "./screens/HowItWorks";
import OurStoryPage from "./screens/OurStoryPage";
import ContactUs from "./screens/ContactUs";
import TermsConditions from "./components/TermsConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Calculators from "./screens/Calculators";
import MonthlyBudgetCalculator from "./components/Calculators/monthly-budget-calculator-main/src/MonthlyBudgetCalculator";
import InterestVsPrincipal from "./components/Calculators/interest-vs-principal-calc-main/src/InterestVsPrincipal";
import Calculator from "./components/Calculators/rent-vs-buy-calculator-main/src/Calculator";
import EmiVsRentCalculator from "./components/Calculators/EmiCalculatorUpdated/src/EmiVsRentCalculator";
import CalculatorRouteWrapper from "./components/Calculators/CalculatorRouteWrapper";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ThankYou from "./components/ThankYou";


function App() {
  const ScrollToTop = () => {
    // Get the current location object (which updates on navigation)
    const { pathname } = useLocation();

    useEffect(() => {
      // Scroll to the top of the page when the pathname changes
      window.scrollTo(0, 0);
    }, [pathname]); // This effect re-runs every time the URL path changes

    // This component renders nothing, it only handles the side effect (scrolling)
    return null;
  };

  return (
    <>
      <Header></Header>
      <WhatsAppButton></WhatsAppButton>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/faq" element={<ContactUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/termsandconditions" element={<TermsConditions />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<Blogdetails />} />

        <Route element={<CalculatorRouteWrapper />}>
          <Route
            path="/monthly-budget-calculator"
            element={<MonthlyBudgetCalculator />}
          />
          <Route
            path="/interest-principal-calculator"
            element={<InterestVsPrincipal />}
          />
          <Route path="/rent-vs-buy" element={<Calculator />} />
          <Route path="/emi-calculator" element={<EmiVsRentCalculator />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Route>
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
