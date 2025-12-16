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
import { interestVsPrincipal } from "./Api/calculatorApi";
import "../src/App.css"
// import Header from "./Components/Header";
import Triangle from "./assets/rt.jpg";
import Footer from "./Components/Footer";
import closeBar from "./assets/close_small.png"


const InterestVsPrincipal = () => {
  const [location, setLocation] = useState("");
  const [house_cost, setCostOfHouse] = useState(2);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [loan_tenure, setLoanTenure] = useState(10);
  const [down_payment, setDownPayment] = useState(25);
  const [loan_rate, setLoanRatePerYear] = useState(8);
  const [loan_ratio, setLoanRatio] = useState(75);
  // const [Monthly_emi, setMonthlyEmi] = useState("65,249");
  const [cumulative_interest, setCumulative_interest] =
    useState("68,38,967");
  const [total_principal, setTotal_principal] = useState("1,50,00,000");
  const [openModal, setOpenModal] = useState(false);

  const isDesktop = useMediaQuery("(min-width:1200px)");

  // Handler for toggling assumptions
  const toggleAssumptions = () => {
    setShowAssumptions((prev) => !prev);
  };

  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue); // Real-time value update while dragging
  };

  const handleSliderChangeCommitted = (apiTriggerFunc) => (event, newValue) => {
    apiTriggerFunc(); // Trigger API after slider is done
  };

  const handleLoanTenureChange = handleSliderChange(setLoanTenure);
  const handleDownPaymentChange = (event, newValue) => {
    setDownPayment(newValue); // Set down payment value
    setLoanRatio(100 - newValue); // Update loan ratio value
  };
  const handleLoanRatePerYearChange = handleSliderChange(setLoanRatePerYear);
  const handleCostOfHouseChange = handleSliderChange(setCostOfHouse);
  const handleLoanRatioChange = (event, newValue) => {
    setLoanRatio(newValue); // Set loan ratio value
    setDownPayment(100 - newValue); // Update down payment value
  };

  // Function to handle modal open and close
  const handleOpenModal = () => {
    setOpenModal(true);
  };


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInterestApi = () => {
    const actualHouseCost = house_cost * 10000000;
    const Response = interestVsPrincipal(
      actualHouseCost,
      loan_ratio,
      loan_rate,
      loan_tenure
    );

    if (Response.status_code) {
      // setMonthlyEmi(
      //   Response.Monthly_emi.toLocaleString("en-IN", {
      //     maximumFractionDigits: 0,
      //   })
      // );
      setTotal_principal(
        Response.total_principal.toLocaleString("en-IN", {
          maximumFractionDigits: 0,
        })
      );
      setCumulative_interest(
        Response.cumulative_interest.toLocaleString("en-IN", {
          maximumFractionDigits: 0,
        })
      );
    }
  };

  return (
    <>
    {/* <Header/> */}
    <Container
      maxWidth="lg"
      // className="calculator-container"
      sx={{
        backgroundColor: { xs: "#11202E", md: "white" },
        paddingX: { xs: 0 },
        paddingY: { xs: 0, md: 2 },
        fontFamily: '"poppins", sans-serif !important'

      }}
    >

      {isDesktop ? (
        <Grid container sx={{ padding: "16px" }}>
          <h2 class="calculator-subhead mt-2">Explore our calculators designed to simplify your journey to ownership</h2>
          {/* Left Side: Title, Description, Location Selector, Cost of House Slider */}
          <Grid item 
          xs={12} md={6} lg={6} xl={6}
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
            <Box textAlign="left" my={4} padding="0px 15% 0px 0px" className="Emi-calc-box">
              <Typography
                variant="h4"
                fontWeight="bold"
                fontSize={32}
                gutterBottom
                sx={{ color: { sx: "white", md: "black" } }}
                    fontFamily= '"poppins", sans-serif !important'

              >
                Interest vs Principal
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: { sx: "white", md: "black" } }}
                    fontFamily= '"poppins", sans-serif !important'

              >
                This calculator reveals how much of your EMI goes towards interest and principal each year, helping you strategize prepayments and save on interest.
              </Typography>
            </Box>


            {/* Location Selector */}
            {/* <Typography gutterBottom>Where Would You Want To Stay?</Typography>
            <TextField
              variant="outlined"
              fullWidth
              select
              SelectProps={{
                native: true,
              }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{
                mb: 3,
                fontFamily: "poppins",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            >
              <option value="">Enter Location</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Bangalore">Gurgaon</option>
              <option value="Bangalore">Noida</option>
            </TextField> */}

            {/* Cost of House Slider */}
            <Typography gutterBottom><b>Cost Of House Today</b></Typography>
            <Box sx={{ paddingLeft: "0px", paddingRight: "15%",   marginTop:"6%" }}>
            <Slider
              value={house_cost}
              onChange={handleCostOfHouseChange}
              onChangeCommitted={handleSliderChangeCommitted(handleInterestApi)}
              min={1}
              max={3}
              step={0.25}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `${value} Cr`}
              sx={{
                "& .MuiSlider-track": {
                  backgroundColor: "#11AD99",
                  height: 18,
                  border: "none",
                  
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#99BCC5",
                  height: 18,
                  
                },
                "& .MuiSlider-thumb": {
                  backgroundColor: "#11AD99",
                  border: "2px solid white",
                  width: 20,
                  height: 20,
                  
                  "&:hover, &:focus, &.Mui-active": {
                    boxShadow: "none",
                  },
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "#DCF7FF",
                  color: "black",
                  fontWeight: "bold",
                  top: -5,
                  borderRadius: "20px",
                  padding: "8px",
                  paddingX: "16px",
                  
                  "&:before": {
                    display: "none",
                  },
                  "& *": {
                    transform: "none",
                  },
                },
                marginTop:"30px"
              }}
            />

            {/* Slider Labels */}
            <Grid
              container
              justifyContent="space-between"
              sx={{ mt: "-8px", mb: "16px" }}
            >
              <Grid item>
                <Typography>1 Cr</Typography>
              </Grid>
              <Grid item>
                <Typography>3 Cr</Typography>
              </Grid>
            </Grid>
            </Box>
          </Grid>

          {/* Right Side: Cost Display, Assumptions, Learn More, etc. */}
          <Grid item
           xs={12} md={6} lg={6} xl={6}
          sx={{
                width: '100%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '50%',
                  // Ensure padding/margins are also respected in the grid layout
                  paddingLeft: '16px', 
                },
              }}
           >
            <Box mt={3} textAlign="center" onClick={handleOpenModal}>
              <Typography
                variant="body1"
                align="end"
                sx={{ textDecoration: "underline", fontWeight: "bold",cursor:"pointer" }}
              >
                  <b className="calculator-sub-title">Learn How We Calculate</b> 
              </Typography>
            </Box>
            {/* Cost Display Section */}
            <Box
              height={270}
              width={626}
              mt={3}
              p={2}
            
              sx={{
                backgroundColor: "#ffeed2",
                borderRadius: "50px",
                display: { md: "flex" },
                justifyContent: "space-evenly",
                alignItems:"stretch"
              }}
            >
              {/* Monthly Estimated Rent */}
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
                  Total Interest
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
                  {cumulative_interest}
              
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
                  Total Principal
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
                  {total_principal}
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
            <Grid item
             xs={12} md={12} lg={12} xl={12}
         sx={{
          // display:"flex",
          // justifyContent:"flex-end",
          width: '100%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '100%',
                  
                },
        }}
            //  sx={{display:"flex",justifyContent:"flex-end"}}
             
             
             >
            <Box mt={3} textAlign="right"  className="assumed-val">
              <Button
                variant="text"
                color="inherit"
                endIcon={
                  showAssumptions ? (
                    <MdOutlineExpandLess />
                  ) : (
                    <MdOutlineExpandMore />
                  )
                }
                onClick={toggleAssumptions}
                sx={{ fontWeight: "bold"}}
              >
                <Typography
                color="black"
                fontWeight="normal"
                textAlign="left"
                textTransform="none" // This will prevent uppercase transformation
              >
               <b className="calculator-sub-title"> View Assumed Values</b>
              </Typography>
              </Button>
            </Box>

            <Grid 
            // maxWidth="lg" xs={12} md={12} lg={12}
            xs={12} md={12} lg={12} xl={12}
         sx={{
          // display:"flex",
          // justifyContent:"flex-end",
          width: '100%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '100%',
                  
                }
              }}
            >
              {showAssumptions && (
                <Box
                  mt={2}
                  sx={{
                    padding: "4px",
                    // gridColumn: isDesktop ? "1 / -1" : "auto", // Span across entire width for desktop mode
                  width: '100%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '100%',
                  
                },
                  }}
                >

<Typography variant="body2" sx={{ marginBottom: "16px" }}>
                  <Typography variant="body1">
      <b className="calculator-sub-title">Assumptions</b>
      <br />
      &nbsp;• Fixed interest rate for entire tenure
      <br />
      &nbsp;• No missed payments
      <br />
      &nbsp;• Standard amortization schedule
    </Typography>
                  </Typography>

                  {/* Mortgage Section */}
                  <Typography  gutterBottom>
                  <b className="calculator-sub-title"> Mortgage</b>
                  </Typography>
                  <Box  
                  sx={{
                    padding: "4px",
                    gridColumn: isDesktop ? "1 / -1" : "auto", // Span across entire width for desktop mode
                  display:"flex",
                  justifyContent:"space-between",
                 
                  }}>
                  <CustomSlider
                    title="Down Payment"
                    value={down_payment}
                    trackColor="#595959"
                    thumbColor="#595959"
                    railColor="#DEDEDE"
                    valueLabelColor="#DEDEDE"
                    onChange={handleDownPaymentChange}
                    onChangeCommitted={handleSliderChangeCommitted(
                      handleInterestApi
                    )}
                    min={25}
                    max={75}
                    step={5}
                    percent={true}
                  />

                  <CustomSlider
                    title="Loan Rate (per year)"
                    trackColor="#595959"
                    thumbColor="#595959"
                    railColor="#DEDEDE"
                    valueLabelColor="#DEDEDE"
                    value={loan_rate}
                    onChange={handleLoanRatePerYearChange}
                    onChangeCommitted={handleSliderChangeCommitted(
                      handleInterestApi
                    )}
                    min={8}
                    max={10}
                    step={0.25}
                    percent={true}
                  />

                  <CustomSlider
                    title="Loan Tenure"
                    trackColor="#595959"
                    thumbColor="#595959"
                    railColor="#DEDEDE"
                    valueLabelColor="#DEDEDE"
                    onChange={handleLoanTenureChange}
                    onChangeCommitted={handleSliderChangeCommitted(
                      handleInterestApi
                    )}
                    value={loan_tenure}
                    min={10}
                    max={20}
                    step={5}
                    percent={false}
                    
                  />

                  <CustomSlider
                    title="Loan to Value"
                    value={loan_ratio}
                    trackColor="#595959"
                    thumbColor="#595959"
                    railColor="#DEDEDE"
                    valueLabelColor="#DEDEDE"
                    onChange={handleLoanRatioChange}
                    onChangeCommitted={handleSliderChangeCommitted(
                      handleInterestApi
                    )}
                    min={25}
                    max={75}
                    step={5}
                    percent={true}
                  />
                </Box>
                </Box>
              )}
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
          <Box textAlign="center" my={4}  sx={{ padding: { xs: "16px" } ,marginTop:"1%"}}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              color="white"
                fontSize={24}
                marginTop={5}
                fontFamily= '"poppins", sans-serif !important'
            >
              Interest vs Principal
            </Typography>
            <Typography variant="body1" color="white" fontFamily= '"poppins", sans-serif !important'>
            This calculator reveals how much of your EMI goes towards interest and principal each year, helping you strategize prepayments and save on interest.
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
            {/* Location Selector */}
            {/* <Typography gutterBottom>Where Would You Want To Stay?</Typography>
            <TextField
              variant="outlined"
              fullWidth
              select
              SelectProps={{
                native: true,
              }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{
                mb: 3,
                fontFamily: "poppins",
                "& .MuiNativeSelect-select": {
                  // backgroundColor: "#11AD99",
                  height: 18,
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            >
              <option value="">Enter Location</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Bangalore">Gurgaon</option>
              <option value="Bangalore">Noida</option>
            </TextField> */}

            {/* Cost of House Slider */}
            <Typography gutterBottom><b>Cost Of House Today</b></Typography>
            <Box sx={{ paddingLeft: "8px", paddingRight: "12px" }}>
            <Slider
              value={house_cost}
              onChange={handleCostOfHouseChange}
              onChangeCommitted={handleSliderChangeCommitted(handleInterestApi)}
              min={1}
              max={3}
              step={0.25}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `${value} Cr`}
              sx={{
                "& .MuiSlider-track": {
                  backgroundColor: "#11AD99",
                  height: 8,
                  border: "none",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#99BCC5",
                  height: 8,
                },
                "& .MuiSlider-thumb": {
                  backgroundColor: "#11AD99",
                  border: "2px solid white",
                  width: 20,
                  height: 20,
                  "&:hover, &:focus, &.Mui-active": {
                    boxShadow: "none",
                  },
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "#DCF7FF",
                  color: "black",
                  fontWeight: "bold",
                  top: -5,
                  borderRadius: "20px",
                  padding: "8px",
                  paddingX: "16px",
                  "&:before": {
                    display: "none",
                  },
                  "& *": {
                    transform: "none",
                  },
                },
              }}
            />
</Box>
            {/* Slider Labels */}
            <Grid
              container
              justifyContent="space-between"
              sx={{ mt: "-8px", mb: "16px" }}
            >
              <Grid item>
                <Typography>1 Cr</Typography>
              </Grid>
              <Grid item>
                <Typography>3 Cr</Typography>
              </Grid>
            </Grid>

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
                Total Interest
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
                {cumulative_interest}
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
                Total Principal
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
                {total_principal}
              </Typography>
              {/* <Typography variant="body2" align="center" color="text.secondary">
                Know More
              </Typography> */}
            </Box>

            {/* Assumptions Toggle Button */}
            <Box mt={3} textAlign="center">
              <Button
                variant="text"
                color="inherit"
                endIcon={
                  showAssumptions ? (
                    <MdOutlineExpandLess />
                  ) : (
                    <MdOutlineExpandMore />
                  )
                }
                onClick={toggleAssumptions}
                sx={{ fontWeight: "bold" }}
              >
<Typography
                color="black"
                fontWeight="normal"
                textAlign="left"
                textTransform="none" // This will prevent uppercase transformation
              >
               <b className="calculator-sub-title"> View Assumed Values</b>
              </Typography>              </Button>
            </Box>

            {showAssumptions && (
              <Box mt={2} sx={{ padding: "4px" }}>
               <Typography variant="body2" sx={{ marginBottom: "16px" }}>
                  <Typography variant="body1">
      <b className="calculator-sub-title">Assumptions</b>
      <br />
      &nbsp;• Fixed interest rate for entire tenure
      <br />
      &nbsp;• No missed payments
      <br />
      &nbsp;• Standard amortization schedule
    </Typography>
                  </Typography>

                {/* Mortgage Section */}
                <Typography gutterBottom>
                <b className="calculator-sub-title"> Mortgage</b>
                </Typography>
                <CustomSlider
                  title="Down Payment"
                  value={down_payment}
                  trackColor="#595959"
                  thumbColor="#595959"
                  railColor="#DEDEDE"
                  valueLabelColor="#DEDEDE"
                  onChange={handleDownPaymentChange}
                  onChangeCommitted={handleSliderChangeCommitted(
                    handleInterestApi
                  )}
                  min={25}
                  max={75}
                  step={5}
                  percent={true}
                   width="100%"
                   fontFamily= '"poppins", sans-serif !important'
                />

                <CustomSlider
                  title="Loan Rate (per year)"
                  trackColor="#595959"
                  thumbColor="#595959"
                  railColor="#DEDEDE"
                  valueLabelColor="#DEDEDE"
                  value={loan_rate}
                  onChange={handleLoanRatePerYearChange}
                  onChangeCommitted={handleSliderChangeCommitted(
                    handleInterestApi
                  )}
                  min={8}
                  max={10}
                  step={0.25}
                  percent={true}
                   width="100%"
                   fontFamily= '"poppins", sans-serif !important'
                />

                <CustomSlider
                  title="Loan Tenure"
                  trackColor="#595959"
                  thumbColor="#595959"
                  railColor="#DEDEDE"
                  valueLabelColor="#DEDEDE"
                  onChange={handleLoanTenureChange}
                  onChangeCommitted={handleSliderChangeCommitted(
                    handleInterestApi
                  )}
                  value={loan_tenure}
                  min={10}
                  max={20}
                  step={5}
                  percent={false}
                   width="100%"
                />

                <CustomSlider
                  title="Loan to Value"
                  value={loan_ratio}
                  trackColor="#595959"
                  thumbColor="#595959"
                  railColor="#DEDEDE"
                  valueLabelColor="#DEDEDE"
                  onChange={handleLoanRatioChange}
                  onChangeCommitted={handleSliderChangeCommitted(
                    handleInterestApi
                  )}
                  min={25}
                  max={75}
                  step={5}
                  percent={true}
                   width="100%"
                />
              </Box>
            )}

            {/* Learn How We Calculate */}
            <Box mt={3} textAlign="center" onClick={handleOpenModal}>
              <Typography
                variant="body1"
                sx={{ textDecoration: "underline", fontWeight: "bold" }}
              >
              <b className="calculator-sub-title">Learn How We Calculate</b> 
              </Typography>
            </Box>
          </Box>
        </>
      )}

      {/* Modal Implementation */}
      <Dialog
        sx={{ zIndex: 9999999999, borderRadius: "50px", width: "100vw" }}
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogActions sx={{ 
    position: "absolute",
    right: 16,
    top: 16,
    padding: 0
  }}>
    <IconButton
      onClick={handleCloseModal}
      sx={{ 
        color: "black",
        '&:hover': {
          backgroundColor: "rgba(0, 0, 0, 0.04)"
        }
      }}
    >
      
    <img src={closeBar} alt="" />
    </IconButton>
  </DialogActions>
        <DialogContent sx={{ pt: 6, px: 4, pb: 3 }}>
           <Typography ><strong className="calculator-sub-title">Learn How We Calculate</strong></Typography>
          <Typography variant="body1" className="calculator-p" paragraph>
        <br />  We break down your amortization schedule to show: <br />
1. Annual interest paid (higher in early years) <br />
2. Principal repaid (increases over time) <br />
3. Total interest burden over loan tenure

{/* EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
Where:
P = Principal loan amount
R = Monthly interest rate (annual rate/12)
N = Loan tenure in months
Key assumptions:
Interest calculated on reducing balance
Processing fees excluded
Prepayment charges not included */}

          </Typography>
          {/* <Typography variant="body1"className="calculator-p d-none" paragraph>
            Gain: After 3 years, if you buy, your home will have $51,844 in
            equity (available to you when you sell). However, if you instead
            rent and invest your down payment and the other money you save, at a
            6% return rate it will earn around $6,450 in 3 years.
          </Typography>
          <Typography variant="body1" className="calculator-p d-none">
            Bottom line: Looking at your gross costs, equity, and investment
            potential, it's better for you to buy than rent if you plan to live
            in your home more than 10 years and 11 months.
          </Typography> */}
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
    {/* <Footer/> */}
    </>
  );
};

export default InterestVsPrincipal;
