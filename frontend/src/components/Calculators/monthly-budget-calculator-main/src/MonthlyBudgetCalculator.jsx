import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Slider,
  Button,
  IconButton,
  DialogActions,
  Dialog,
  DialogContent,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import CustomSlider from "./Components/CustomSlider";
import "../src/App.css";
import Header from "./Components/Header";
import Triangle from "./assets/rt.jpg";
import Footer from "./Components/Footer";
import closeBar from "./assets/close_small.png";
import { BiFontFamily } from "react-icons/bi";

const MonthlyBudgetCalculator = () => {
  const [openModal, setOpenModal] = useState(false);

  const isDesktop = useMediaQuery("(min-width:1200px)");

  // Function to handle modal open and close
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleOpenModal1 = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [income, setIncome] = useState("");
  const [breakdown, setBreakdown] = useState({
    needs: `20,000`,
    wants: `12,000`,
    savings: `8,000`,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);

    setIncome(value);

    if (!isNaN(numericValue)) {
      setBreakdown({
        needs: Number((numericValue * 0.5).toFixed(0)).toLocaleString(),
        wants: Number((numericValue * 0.3).toFixed(0)).toLocaleString(),
        savings: Number((numericValue * 0.2).toFixed(0)).toLocaleString(),
      });
    } else {
      setBreakdown({ needs: 0, wants: 0, savings: 0 });
    }
  };

  const thStyle = {
    border: "1px solid grey",
    padding: "12px",
    textAlign: "left",
    fontSize: isDesktop ? "16px" : "12px",
    backgroundColor:"#ececec",
  };

  const tdStyle = {
    border: "1px solid grey",
    padding: "12px",
    verticalAlign: "top",
    fontSize: isDesktop ? "16px" : "12px",
  };

  const trStyle = {
    border: "1px solid grey",
    padding: "12px",
    verticalAlign: "top",
    fontSize: isDesktop ? "16px" : "12px",
    height: isDesktop ? "" : "59px",
  };


  return (
    <>
      {/* <Header /> */}
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: { xs: "#11202E", md: "white" },
          paddingX: { xs: 0 },
          paddingY: { xs: 0, md: 2 },
         fontFamily: '"poppins", sans-serif !important',
        }}
      >
{/* spacing={4} */}
        {isDesktop ? (
          <Grid container  sx={{ padding: "10px" }}>
            <h2 className="calculator-subhead mb-3 mt-2">Explore our calculators designed to simplify your journey to ownership</h2>
            {/* Left Side: Title, Description, Location Selector, Cost of House Slider */}
            <Grid  item xs={12} md={6} lg={6} xl={6}
            // xs={12} 
              // Removed md={6} and lg={6} and replaced with explicit SX style
              sx={{
                width: '100%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '50%',
                  // Ensure padding/margins are also respected in the grid layout
                  // paddingLeft: '16px', 
                },
              }}
            
            >
              {/* Title and Description */}
              <Box
                textAlign="left"
                my={4}
                padding="0px 16% 0px 0px"
                className="Emi-calc-box"
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  fontSize={26}
                  gutterBottom
                  sx={{ color: { sx: "white", md: "black" } }}
                    fontFamily= '"poppins", sans-serif !important'

                >
                  Monthly budget Calculator
                </Typography>
                <Typography
                  variant="body1"
                  marginBottom="10px"
                  sx={{ color: { sx: "white", md: "black" }, marginBottom:"10px",fontFamily:'"poppins", sans-serif !important' }}
                >
                  This simple calculator helps you split your monthly income
                  into three easy-to-manage categories:
                </Typography>
                <Typography
                  variant="body1"
                  marginBottom="10px"
                  sx={{ color: { sx: "white", md: "black",fontFamily:'"poppins", sans-serif !important' } }}
                >
                  It’s an effective budgeting method for anyone looking to take
                  control of their finances without overcomplicating things.
                </Typography>
                <Typography
                  variant="body1"
                  marginBottom="10px"
                  sx={{ color: { sx: "white", md: "black",fontFamily:'"poppins", sans-serif !important' } }}
                >
                  Before you start, you’ll just need one number-Your monthly
                  take-home income — the amount that gets credited to your bank
                  account after taxes, EPF, and other deductions
                </Typography>
                <TextField
                  // variant="outlined"
                  fullWidth
                  
                  placeholder="Ex - INR 40,000"
                  value={income}
                  onChange={handleChange}
                  sx={{
                    mb: "16px",
                    borderRadius: "15px",
                    border: "1px solid black",
                    outline: "none",
                  }}
                ></TextField>
              </Box>
            </Grid>

            {/* Right Side: Cost Display, Assumptions, Learn More, etc. */}
            <Grid item xs={12} md={6} lg={6} xl={6}
             sx={{
                width: '100%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint is 900px)
                '@media (min-width: 900px)': {
                  width: '50%',
                },
              }}
              >
              <Box mt={3} textAlign="center" onClick={handleOpenModal}>
                <Typography
                  variant="body1"
                  align="end"
                  sx={{
                    textDecoration: "underline",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  <b className="calculator-sub-title">Learn How We Calculate</b>
                </Typography>
              </Box>
              {/* Cost Display Section */}
              <Box
                height={270}
                width={660}
                mt={3}
                p={2}
                sx={{
                  backgroundColor: "#ffeed2",
                  borderRadius: "50px",
                  display: { md: "flex" },
                  justifyContent: "space-evenly",
                  alignItems: "stretch",
                }}
              >
                {/* Monthly Estimated Rent */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    fontFamily: '"poppins", sans-serif !important'

                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    align="center"
                    fontFamily= '"poppins", sans-serif !important'

                  >
                    Needs(50%)
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="#0086AD"
                    align="center"
                    mb={1}
                    fontFamily= '"poppins", sans-serif !important'

                  >
                    {"INR "}
                    {breakdown.needs}
                  </Typography>
                  {/* <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  Know More
                </Typography> */}
                </Box>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ borderRightWidth: 2 }}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    align="center"
                    fontFamily= '"poppins", sans-serif !important'

                  >
                    Wants(30%)
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="#0086AD"
                    align="center"
                    mb={1}
                    fontFamily= '"poppins", sans-serif !important'

                  >
                    {"INR "}
                    {breakdown.wants}
                  </Typography>
                  {/* <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  Know More
                </Typography> */}
                </Box>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ borderRightWidth: 2 }}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  {/* Earnings Over Next 2 Years */}
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    align="center"
                    fontFamily= '"poppins", sans-serif !important'

                  >
                    Savings(20%)
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="#0086AD"
                    align="center"
                    mb={1}
                    fontFamily= '"poppins", sans-serif !important'

                  >
                    {"INR "}
                    {breakdown.savings}
                  </Typography>
                  {/* <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  Know More
                </Typography> */}
                </Box>
              </Box>
            </Grid>

            {/* Assumptions Toggle Button */}
            <Grid
              container
              xs={12}
              md={12}
              lg={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid maxWidth="lg" xs={12} md={12} lg={12} marginTop={"5%"}>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "16px", fontWeight: "bold" ,fontFamily:'"poppins", sans-serif !important'}}
                >
                  Plan better. Spend smarter. Save consistently.
                </Typography>

                <Typography
                  variant="body1"
            
                  marginBottom="10px"
                  sx={{ color: { sx: "white", md: "black" , fontSize: "16px", marginTop: "10px",fontFamily: '"poppins", sans-serif !important'} }}
                >
                  Think of it as a healthy balance — one that lets you cover
                  your essentials, enjoy life, stay on top of your dues, and
                  build a safety net for the future. It’s not about being
                  perfect — it’s about having a clear direction for your money.
                  Here’s how each part breaks down, along with examples of what
                  typically fits where:
                </Typography>

                <Typography
                variant="body1"
            
                  marginBottom="10px"
                  sx={{ color: { sx: "white", md: "black" , fontSize: "16px", marginTop: "10px",fontFamily: '"poppins", sans-serif !important'} }}
                >
                  This structure is simple but powerful — it ensures your basics
                  are covered, your lifestyle is enjoyable, and your future is
                  protected.
                </Typography>

                

                <div style={{ overflowX: "auto", marginTop: "24px" }}>
                  <table
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      border: "1px solid black",
                    }}
                  >
                    <thead>
                      <tr className="table-head">
                        <th style={thStyle}>Needs (50%)</th>
                        <th style={thStyle}>Wants (30%)</th>
                        <th style={thStyle}>Savings (20%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdStyle}>
                          <>
                            Essentials you must pay for each month
                          </>
                        </td>
                        <td style={tdStyle}>
                          <>Lifestyle choices and non-essentials</>
                        </td>
                        <td style={tdStyle}>
                          <>Your future goals and safety net</>
                        </td>
                      </tr>
                      <tr>
                            <td style={trStyle}>Rent/home loan EMI</td>
                            <td style={trStyle}>Dining out</td>
                            <td style={trStyle}>SIPs</td>
                            </tr>

                            <tr>
                            <td style={trStyle}>Groceries</td>
                            <td style={trStyle}>Streaming subscriptions</td>
                            <td style={trStyle}>Mutual funds</td>
                        </tr>
                        <tr>
                            <td style={trStyle}>Utilities</td>
                            <td style={trStyle}>Shopping</td>
                            <td style={trStyle}>Emergency fund</td>
                            {/* <td style={tdStyle}>&nbsp;</td> */}
                      </tr>
                        <tr>
                            <td style={trStyle}>Insurance</td>
                            <td style={trStyle}>Vacations</td>
                            <td style={trStyle}>Retirement plans</td>
                            {/* <td style={tdStyle}>&nbsp;</td> */}
                      </tr>
                        <tr>
                            <td style={trStyle}>School fees</td>
                            <td style={trStyle}></td>
                            <td style={trStyle}></td>
                            {/* <td style={tdStyle}>&nbsp;</td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Grid>

              {/* Learn How We Calculate */}
              <Box
                sx={{ display: { md: "none" } }}
                mt={3}
                textAlign="center"
                onClick={handleOpenModal}
              >
                <Typography
                  variant="body1"
                  sx={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  Learn How We Calculate
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <>
            {/* Mobile View */}
            <Box textAlign="center" my={1} sx={{ padding: { xs: "20px" } }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                color="white"
                fontFamily='"poppins", sans-serif !important'
              >
                Monthly Budget Calculator
              </Typography>
              <Typography variant="body1" color="white" marginTop={"5%"} sx={{fontFamily:'"poppins", sans-serif !important'}}>
                Before you start, you’ll just need one number-Your monthly
                take-home income — the amount that gets credited to your bank
                account after taxes, EPF, and other deductions.
              </Typography>
            </Box>

            <Box
              sx={{
                position: "relative",
                textAlign: "center", // Ensures the image stays centered
                marginLeft: "-6px", // Adjust this value to shift the image left
              }}
            >
              <img
                src={Triangle}
                alt="Triangle"
                style={{
                  width: "110%", // Ensures the image scales properly
                  height: "auto", // Maintains aspect ratio
                }}
              />
            </Box>

            <Box
              sx={{
                backgroundColor: "white",
                padding: { xs: "16px" },
              }}
            >
              {/* input Section */}
              <Typography variant="subtitle1" sx={{fontFamily:'"poppins", sans-serif !important'}} gutterBottom>
                Your Monthly Income
              </Typography>
              <TextField
                // variant="outlined"
                fullWidth
                placeholder="Ex - INR 40,000"
                SelectProps={
                  {
                    // native: true,
                  }
                }
                value={income}
                onChange={handleChange}
                // value={tax_Bracket}
                // onChange={(e) => setTaxBracket(e.target.value)}
                sx={{
                  mb: "16px",
                  borderRadius: "10px",
                  border: "1px solid black",
                }}
              ></TextField>

              {/* input Section */}

              {/* Cost Display Section */}
              <Box
                mt={3}
                p={2}
                sx={{ backgroundColor: "#FEF5E7", borderRadius: "16px" }}
              >
                {/* Monthly Estimated Rent */}
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  align="center"
                  fontFamily= '"poppins", sans-serif !important'
                >
                  Needs(50%)
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#0086AD"
                  align="center"
                  mb={1}
                  fontFamily= '"poppins", sans-serif !important'
                >
                  {"INR "}
                  {breakdown.needs}
                </Typography>
                <Box my={3} sx={{ borderBottom: "1px solid #D3D3D3" }} />

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  align="center"
                  fontFamily= '"poppins", sans-serif !important'
                >
                  Wants(30%)
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#0086AD"
                  align="center"
                  mb={1}
                  fontFamily= '"poppins", sans-serif !important'
                >
                  {"INR "}
                  {breakdown.wants}
                </Typography>
                {/* <Typography variant="body2" align="center" color="text.secondary">
                Know More
              </Typography> */}

                <Box my={3} sx={{ borderBottom: "1px solid #D3D3D3" }} />

                {/* Future Sale Price */}
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  align="center"
                  fontFamily= '"poppins", sans-serif !important'
                >
                  Savings(20%)
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#0086AD"
                  align="center"
                  mb={1}
                  fontFamily= '"poppins", sans-serif !important'
                >
                  {"INR "}
                  {breakdown.savings}
                </Typography>
                {/* <Typography variant="body2" align="center" color="text.secondary">
                Know More
              </Typography> */}
              </Box>

              {/* Learn How We Calculate */}
              <Box mt={3} textAlign="center" onClick={handleOpenModal}>
                <Typography
                  variant="body1"
                  sx={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  <b className="calculator-sub-title">Learn How We Calculate</b>
                </Typography>
                
              </Box>

              <Grid maxWidth="lg" xs={12} md={12} lg={12} marginTop={"10%"}>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "16px", fontWeight: "bold",marginTop: "10%",fontFamily:'"poppins", sans-serif !important' }}
                >
                  Plan better. Spend smarter. Save consistently.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ fontSize: "16px", marginTop: "10%",fontFamily:'"poppins", sans-serif !important' }}
                >
                  Think of it as a healthy balance — one that lets you cover
                  your essentials, enjoy life, stay on top of your dues, and
                  build a safety net for the future. It’s not about being
                  perfect — it’s about having a clear direction for your money.
                  Here’s how each part breaks down, along with examples of what
                  typically fits where:
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ fontSize: "16px", marginTop: "10%" ,fontFamily:'"poppins", sans-serif !important'}}
                >
                  This structure is simple but powerful — it ensures your basics
                  are covered, your lifestyle is enjoyable, and your future is
                  protected.
                </Typography>

               

                <div style={{ overflowX: "auto", marginTop: "24px" }}>
                   <table
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      border: "1px solid black",
                      fontFamily:'"poppins", sans-serif !important'
                    }}
                  >
                    <thead>
                      <tr className="table-head">
                        <th style={thStyle}>Needs (50%)</th>
                        <th style={thStyle}>Wants (30%)</th>
                        <th style={thStyle}>Savings (20%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdStyle}>
                          <>
                            Essentials you must pay for each month
                          </>
                        </td>
                        <td style={tdStyle}>
                          <>Lifestyle choices and non-essentials</>
                        </td>
                        <td style={tdStyle}>
                          <>Your future goals and safety net</>
                        </td>
                      </tr>
                      <tr>
                            <td style={trStyle}>Rent/home loan EMI</td>
                            <td style={trStyle}>Dining out</td>
                            <td style={trStyle}>SIPs</td>
                            </tr>

                            <tr>
                            <td style={trStyle}>Groceries</td>
                            <td style={trStyle}>Streaming subscriptions</td>
                            <td style={trStyle}>Mutual funds</td>
                        </tr>
                        <tr>
                            <td style={trStyle}>Utilities</td>
                            <td style={trStyle}>Shopping</td>
                            <td style={trStyle}>Emergency fund</td>
                            {/* <td style={tdStyle}>&nbsp;</td> */}
                      </tr>
                        <tr>
                            <td style={trStyle}>Insurance</td>
                            <td style={trStyle}>Vacations</td>
                            <td style={trStyle}>Retirement plans</td>
                            {/* <td style={tdStyle}>&nbsp;</td> */}
                      </tr>
                        <tr>
                            <td style={trStyle}>School fees</td>
                            <td style={trStyle}></td>
                            <td style={trStyle}></td>
                            {/* <td style={tdStyle}>&nbsp;</td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Grid>
            </Box>
          </>
        )}

        {/* Modal Implementation */}
        <Dialog
          sx={{ zIndex: 9999999999, borderRadius: "50px", width: "100vw" }}
          open={openModal}
          onClose={handleCloseModal}
        >
          <DialogActions sx={{ position: "fixed", right:{ xs:"4%",md:"30%"} }}>
            <Button
              sx={{ fontWeight: "bold", color: "black" }}
              onClick={handleCloseModal}
            >
              <img src={closeBar} alt="" />
            </Button>
          </DialogActions>
          <DialogContent sx={{ pt: 3, px: 4, pb: 3 }}>
            <Typography>
              <strong className="calculator-sub-title">
                Learn How We Calculate
              </strong>
            </Typography>
            <Typography variant="body1" className="calculator-p" paragraph>
              <br /> The 50/30/20 rule is a simple, popular way to manage your
              money. It helps you divide your take-home income into three broad
              categories: <br />
              1. 50% for needs <br />
              2. 30% for wants
              <br />
              3. 20% for savings and debt repayment
            </Typography>
          </DialogContent>
        </Dialog>
      </Container>
      {/* Mobile "Join our waitlist" Button */}
      {/* {!isDesktop && (
        <div
          className="mobile-waitlist-btn"
          onClick={openModal}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Join our waitlist
        </div>
      )} */}
      {/* <Footer /> */}
    </>
  );
};

export default MonthlyBudgetCalculator;
