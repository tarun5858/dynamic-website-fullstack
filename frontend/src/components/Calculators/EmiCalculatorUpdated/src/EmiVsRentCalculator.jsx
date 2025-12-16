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
} from "@mui/material";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import CustomSlider from "./Components/CustomSlider";
import { emiCalculator } from "./Api/calculatorApi";
import "./assets/css/App.css"
import Header from "./Components/Header"
import Triangle from "./assets/rt.jpg";
import closeBar from "./assets/close_small.png"
import Footer from "./Components/Footer";
import "./EmiVsRentCalculator.css";



const EmiVsRentCalculator = () => {
  const [location, setLocation] = useState("");
  const [cost_of_house, setCostOfHouse] = useState(2);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [loan_tenure, setLoanTenure] = useState(20);
  const [down_payment, setDownPayment] = useState(30);
  const [loan_rate, setLoanRatePerYear] = useState(9.5);
  // const [Monthly_emi, setMonthlyEmi] = useState("65,249");
  const [Monthly_emi, setMonthlyEmi] = useState("1,30,498");
  const [totalCumulativeInterest, setTotalCumulativeInterest] =
    useState("86,59,804");
  const [total_principal, settotal_principal] = useState("70,00,000");

  const [loan_to_value, setLoanRatio] = useState(70);

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

  const handlEmiVsRentApi = () => {
    try {
      const actualHouseCost = cost_of_house * 10000000;
      // console.log()

      const emiVsRent = emiCalculator(
        actualHouseCost,
        loan_rate,
        loan_tenure,
        loan_to_value
      );
      if (emiVsRent.status_code) {
        setMonthlyEmi(
          emiVsRent.Monthly_emi.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })
        );
        setTotalCumulativeInterest(
          emiVsRent.totalCumulativeInterest.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })
        );
        settotal_principal(
          emiVsRent.total_principal.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })
        );
      }
    } catch(e){console.log(e)}
  }
  

  return (
    <>
   
    {/* <Header /> */}
    <Container
    // className="calculator-container"
      maxWidth="lg"
      sx={{
        backgroundColor: { xs: "#11202E", md: "white" },
        paddingX: { xs: 0 },
        paddingY: { xs: 3, md: 2 },
        marginTop: { xs: -4 }, // Top margin
        // marginBottom: { xs: 2 }, // Bottom margin
        fontFamily: '"poppins", sans-serif !important'

      }}
    >
      {/* spacing={4} */}
      <h2 className="calculator-subhead mt-5">Explore our calculators designed to simplify your journey to ownership</h2>
      {isDesktop ? (
        <Grid container  sx={{ padding: "0px" }}>
          {/* Left Side: Title, Description, Location Selector, Cost of House Slider */}
          <Grid item 
          xs={12} md={5} lg={5} xl={5}
          sx={{
                width: '100%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '42%',
                  // Ensure padding/margins are also respected in the grid layout
                  // paddingLeft: '16px', 
                },
              }}
          >
            {/* Title and Description */}

            <Box textAlign="left" my={4} padding="0px 57px 0px 0px" className="Emi-calc-box">
              <Typography
                variant="h4"
                fontWeight="bold"
                fontSize={32}
                gutterBottom
                sx={{ color: { sx: "white", md: "black" } }}
                    fontFamily= '"poppins", sans-serif !important'

              >
                EMI Calculator
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: { sx: "white", md: "black" } }}
                    fontFamily= '"poppins", sans-serif !important'

              >
                Our EMI calculator instantly shows your monthly installments,
                total interest payable, and principal breakdown - helping you
                budget smarter for your future home.
              </Typography>
            </Box>

            {/* Cost of House Slider */}
            <Typography gutterBottom><b>Cost Of House Today</b></Typography>
            <Box sx={{ paddingLeft: "0px", paddingRight: "22%",   marginTop:"6%" }}>
              <Slider
                value={cost_of_house}
                onChange={handleCostOfHouseChange}
                onChangeCommitted={handleSliderChangeCommitted(
                  handlEmiVsRentApi
                )}
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
                }}
              />

              <Grid
                container
                justifyContent="space-between"
                
                sx={{ mt: "-8px", mb: "16px", }}
              >
                <Grid item>
                  <Typography>1 Cr</Typography>
                </Grid>
                <Grid item>
                  <Typography>3 Cr</Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Slider Labels */}
          </Grid>

          {/* Right Side: Cost Display, Assumptions, Learn More, etc. */}
          <Grid item 
          xs={12} md={7} lg={7} xl={7}
          sx={{
                width: '100%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '58%',
                  // Ensure padding/margins are also respected in the grid layout
                  paddingLeft: '16px', 
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
  width={725}
  mt={3}
  p={2}
  sx={{
    backgroundColor: "#ffeed2",
    borderRadius: "50px",
   
    display: { md: "flex" },
    justifyContent: "space-evenly",
    alignItems: "center", // Added to vertically center all items
  }}
>
  {/* Monthly EMI */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly", // Changed to center
      alignItems: "center", // Added to center horizontally
      paddingX: 2,
      borderRight: "1px solid black",
      flex: 1,
      height: "100%", // Ensure full height for proper centering
    }}
  >
    <Typography
      variant="subtitle1"
      fontWeight="bold"
      gutterBottom
      align="center"
      fontFamily= '"poppins", sans-serif !important'

    >
      Monthly EMI
    </Typography>
    <Typography
      variant="h6"
      fontWeight="bold"
      color="#0086AD"
      align="center"
      fontFamily= '"poppins", sans-serif !important'

    >
      {"INR "}
      {Monthly_emi}
    </Typography>
  </Box>

  {/* Total Interest */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingX: 2,
      borderRight: "1px solid black",
      flex: 1,
      height: "100%",
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
      {/* {loan_tenure} Years */}
    </Typography>
    <Typography
      variant="h6"
      fontWeight="bold"
      color="#0086AD"
      align="center"
                    fontFamily= '"poppins", sans-serif !important'

    >
      {"INR "} {totalCumulativeInterest}
    </Typography>
  </Box>

  {/* Total Principal */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingX: 2,
      flex: 1,
      height: "100%",
    }}
  >
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
                    fontFamily= '"poppins", sans-serif !important'

    >
      {"INR "}
      {total_principal}
    </Typography>
  </Box>
</Box>
</Grid>
       
            {/* Assumptions Toggle Button */}
{/* container */}
         <Grid  item
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
      
         > 
            <Box mt={3} textAlign="right" className="assumed-val">
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
                fontFamily = '"poppins", sans-serif !important'
                sx={{ fontWeight: "bold", }}
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
                  
                  <Typography variant="body2" sx={{ marginBottom: "16px",fontFamily:'"poppins", sans-serif !important' }}>
                  <Typography variant="body1" sx={{fontFamily:'"poppins", sans-serif !important'}}>
      <b className="calculator-sub-title">Assumptions</b>
      <br />
      &nbsp;• Interest calculated on reducing balance
      <br />
      &nbsp;• Processing fees excluded
      <br />
      &nbsp;• Prepayment charges not included
    </Typography>
                  </Typography>

                  {/* Mortgage Section */}
                    <Typography  gutterBottom>
                     <b className="calculator-sub-title"> Mortgage</b>
                    </Typography>
                  <Box  
                  sx={{
                    padding: "4px",
                    gridColumn: isDesktop ? "4 / -1" : "auto", // Span across entire width for desktop mode
                  display:"flex",
                  justifyContent:"space-between",
                    fontFamily: '"poppins", sans-serif !important',
                   width:"100%"
                  }}>
                  <CustomSlider
                    title="Down Payment"
                    value={down_payment}
                    trackColor="#595959"
                    thumbColor="#595959"
                    railColor="#DEDEDE"
                    valueLabelColor="#DEDEDE"
                    fontFamily= '"poppins", sans-serif !important'
                    onChange={handleDownPaymentChange}
                    onChangeCommitted={handleSliderChangeCommitted(
                      handlEmiVsRentApi
                    )}
                    
                    min={25}
                    max={75}
                    step={5}
                    percent={true}
                

                  />

                  <CustomSlider
                  className="slider-container"
                    title="Loan Rate (per year)"
                    trackColor="#595959"
                    thumbColor="#595959"
                    railColor="#DEDEDE"
                    valueLabelColor="#DEDEDE"
                    value={loan_rate}
                    onChange={handleLoanRatePerYearChange}
                    onChangeCommitted={handleSliderChangeCommitted(
                      handlEmiVsRentApi
                    )}
                    min={8}
                    max={10}
                    step={0.25}
                    percent={true}
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
                      handlEmiVsRentApi
                    )}
                    value={loan_tenure}
                    min={10}
                    max={20}
                    step={5}
                    percent={false}
                    leftLabelSuffix=" years" // Add suffix for left label
                    rightLabelSuffix=" years" // Add suffix for right label
                  />

                  <CustomSlider
                    title="Loan to Value"
                    value={loan_to_value}
                    trackColor="#595959"
                    thumbColor="#595959"
                    railColor="#DEDEDE"
                    valueLabelColor="#DEDEDE"
                    onChange={handleLoanRatioChange}
                    onChangeCommitted={handleSliderChangeCommitted(
                      handlEmiVsRentApi
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
          <Box textAlign="center" my={4} sx={{ padding: { xs: "16px" },marginTop:"10%" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              color="white"
              fontSize={24}
              fontFamily= '"poppins", sans-serif !important'
            >
              EMI Calculator
            </Typography>
            <Typography variant="body1" color="white" fontFamily= '"poppins", sans-serif !important'>
            Our EMI calculator instantly shows your monthly installments,
                total interest payable, and principal breakdown - helping you
                budget smarter for your future home.
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
            {/* <Typography gutterBottom>Where Would You Want To Stay?</Typography> */}
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
               display:"none"
              }}
            >
              <option value="">Enter Location</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Bangalore">Gurgaon</option>
              <option value="Bangalore">Noida</option>
            </TextField>

            {/* Cost of House Slider */}
            <Typography gutterBottom><b>Cost Of House Today</b></Typography>
            <Box sx={{ paddingLeft: "8px", paddingRight: "12px" }}>
              <Slider
                value={cost_of_house}
                onChange={handleCostOfHouseChange}
                onChangeCommitted={handleSliderChangeCommitted(
                  handlEmiVsRentApi
                )}
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
              sx={{ mt: "-8px", mb: "16px", }}
              fontFamily= '"poppins", sans-serif !important'
              
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
                 Monthly EMI
      
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#0086AD"
                align="center"
                mb={1}
                fontFamily= '"poppins", sans-serif !important'

              >
                {"INR "} {Monthly_emi}
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
                {totalCumulativeInterest}
              </Typography>
              {/* <Typography variant="body2" align="center" color="text.secondary">
                Know More
              </Typography> */}

              <Box my={3} sx={{ borderBottom: "1px solid #D3D3D3" }} />

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
                {"INR "} {total_principal}
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
                fontFamily= '"poppins", sans-serif !important'

                endIcon={
                  showAssumptions ? (
                    <MdOutlineExpandLess />
                  ) : (
                    <MdOutlineExpandMore />
                  )
                }
                onClick={toggleAssumptions}
                sx={{ fontWeight: "bold", textDecoration: "underline"}}
              >
                
             <Typography
                  color="black"
                  fontWeight="normal"
                  textAlign="left"
                  textTransform="none"
                  fontFamily= '"poppins", sans-serif !important' // This will prevent uppercase transformation
                >
                 <b className="calculator-sub-title" sx={{fontFamily: '"poppins", sans-serif !important'}}> View Assumed Values</b>
                </Typography>
              </Button>
            </Box>

            {showAssumptions && (
              <Box mt={2} sx={{ padding: "4px" }}>
                <Typography variant="body2" sx={{ marginBottom: "16px" }}>
                  <Typography variant="body1">
      <b className="calculator-sub-title" >Assumptions</b>
      <br />
      &nbsp;• Interest calculated on reducing balance
      <br />
      &nbsp;• Processing fees excluded
      <br />
      &nbsp;• Prepayment charges not included
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
                  fontFamily='"poppins", sans-serif !important'
                  onChange={handleDownPaymentChange}
                  onChangeCommitted={handleSliderChangeCommitted(
                    handlEmiVsRentApi
                  )}
                  min={25}
                  max={75}
                  step={5}
                  percent={true}
                  width="100%"
                />

                <CustomSlider
                  title="Loan Rate (per year)"
                  trackColor="#595959"
                  thumbColor="#595959"
                  railColor="#DEDEDE"
                  valueLabelColor="#DEDEDE"
                  fontFamily='"poppins", sans-serif !important'
                  value={loan_rate}
                  onChange={handleLoanRatePerYearChange}
                  onChangeCommitted={handleSliderChangeCommitted(
                    handlEmiVsRentApi
                  )}
                  min={8}
                  max={10}
                  step={0.25}
                  percent={true}
                  width="100%"
                />

                <CustomSlider
                  title="Loan Tenure"
                  trackColor="#595959"
                  thumbColor="#595959"
                  railColor="#DEDEDE"
                  valueLabelColor="#DEDEDE"
                  onChange={handleLoanTenureChange}
                  onChangeCommitted={handleSliderChangeCommitted(
                    handlEmiVsRentApi
                  )}
                  value={loan_tenure}
                  min={10}
                  max={20}
                  step={5}
                  percent={false}
                  leftLabelSuffix=" years" // Add suffix for left label
  rightLabelSuffix=" years"
  width="20%" // Add suffix for right label
                />

                <CustomSlider
                  title="Loan to Value"
                  value={loan_to_value}
                  trackColor="#595959"
                  thumbColor="#595959"
                  railColor="#DEDEDE"
                  valueLabelColor="#DEDEDE"
                  onChange={handleLoanRatioChange}
                  onChangeCommitted={handleSliderChangeCommitted(
                    handlEmiVsRentApi
                  )}
                  min={25}
                  max={75}
                  step={5}
                  percent={true}
                  width="20%"
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
  sx={{ 
    zIndex: 9999999999,
    '& .MuiDialog-paper': {
      borderRadius: "12px",
      width: { xs: "90vw", sm: "80vw", md: "700px" },
      maxWidth: "800px",
      position: "relative",
      overflow: "visible"
    }
  }}
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
    <Typography mb={2}><strong className="calculator-sub-title">Learn How We Calculate</strong></Typography>
    <Typography variant="body1" paragraph>
      We compute
      your Equated Monthly Installment (EMI) using the standard formula:
      EMI = [P x R x (1+R)^N]/[(1+R)^N-1] 
      <br /><br />
      Where:
      <br />
      &nbsp;• P = Principal loan amount
      <br />
      &nbsp;• R = Monthly interest rate (annual rate/12) 
      <br />
      &nbsp;• N = Loan tenure in months
    </Typography>

    
  </DialogContent>
</Dialog>
    </Container>
    {/* Mobile "Join our waitlist" Button */}
{!isDesktop && (
  <div
    className="mobile-waitlist-btn"
    onClick={openModal}
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Join our waitlist
  </div>
)}


    {/* <Footer/> */}
    </>
  );
};

export default EmiVsRentCalculator;
