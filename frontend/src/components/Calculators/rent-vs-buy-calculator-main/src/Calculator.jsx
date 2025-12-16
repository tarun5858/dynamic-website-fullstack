import React, { useEffect, useState ,useMemo} from "react";
import { Line } from "react-chartjs-2";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Slider,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import CustomSlider from "./Components/CustomSlider";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
// import { rentvsbuy } from "./Api/calculatorApi";
import Header from "./Components/Header";
import "./assets/css/App.css"
import Footer from "./Components/Footer";
import closeBar from "./assets/close_small.png"


// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  
  Legend
);
const generateYearLabels = (years) => {
  const arr = [];
  const currentYear = new Date().getFullYear(); // Get the current year
  for (let i = 0; i < years; i++) {
    arr.push(`${currentYear + i}`); // Add each year starting from the current year
  }
  return arr;
};



const Calculator = () => {
    const isDesktop = useMediaQuery("(min-width:1200px)");

    
  const [location, setLocation] = useState("");
  const [tax_Bracket, setTaxBracket] = useState(30);
  const [reinvestment, setReinvestment] = useState("yes");
  const [property_inflation, setPropertyInflation] = useState(6);
  const [opportunity_cost_interest, setOpportunityCost] = useState(7);
  const [buy_closing_cost, setClosingCost] = useState(1);
  const [maintenance_cost, setMaintenanceCost] = useState(1);
  const [home_insurance, setHomeInsurance] = useState(100);
  const [rent_inflation, setRentInflation] = useState(9);
  const [security_deposit, setSecurityDeposit] = useState(2);
  const [rent_closing_cost, setclosingCostRent] = useState(1);
  const [average_shifting_home, setAverageShifting] = useState(3);
  const [shifting_cost, setShiftingCost] = useState(1);
  const [STCG, setSTCG] = useState(20);
  const [saturationYear, setSaturationYear] = useState(-1);
  const [loan_ratio, setLoanRatio] = useState(75);
  const [yearlyBuyCosts, setYearlyBuyCosts] = useState([]);
const [yearlyRentCosts, setYearlyRentCosts] = useState([]);

  const [rentArray, setRentArray] = useState([
    1590509, 2181101, 2742806, 3263883, 3731418, 4131547, 4449268, 4668344,
    4771203, 4738829, 4550733, 4184531, 3616198, 2819613, 1766596,
  ]);
  const [buyArray, setBuyArray] = useState([
    502388, 1754248, 3116673, 4538249, 5948247, 7531781, 9221959, 10926855,
    12885849, 15011943, 17185698, 19716705, 22491855, 25356008, 28709597,
  ]);

  const [house_cost, setCostOfHouse] = useState(2); // default value of 2.25Cr
  const [monthly_rent, setCostOfMonthlyRent] = useState(73); // default value of 2.25Cr
  const [loan_tenure, setLoanTenure] = useState(20);
  const [down_payment, setDownPayment] = useState(25);
  // const [down_payment, setDownPayment] = useState(35);
  const [loan_rate, setLoanRatePerYear] = useState(8.5);
  const [showAssumptions, setShowAssumptions] = useState(false); // State for showing/hiding assumptions
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const [error, setError] = useState(null); // State to handle any errors
  const [loading, setLoading] = useState(false); // State to handle loading
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [yearlyCostVersion, setYearlyCostVersion] = useState(0);
  const [intersectionPoint, setIntersectionPoint] = useState(null);
const [chartRenderKey, setChartRenderKey] = useState(0);



  const triggerDebouncedApiCall = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      handleRentApi();
    }, 1500); // Adjust the delay time as needed
    setDebounceTimer(newTimer);
  };

  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue); // Real-time value update while dragging
  };

  const handleSliderChangeCommitted = (apiTriggerFunc) => (event, newValue) => {
    apiTriggerFunc(); // Trigger API after slider is done
  };

  const handleCostOfHouseChange = handleSliderChange(setCostOfHouse);
  const handleMonthlyChange = handleSliderChange(setCostOfMonthlyRent);
  const handleLoanTenureChange = handleSliderChange(setLoanTenure);
  const handleDownPaymentChange = (event, newValue) => {
    setDownPayment(newValue); // Set down payment value
    setLoanRatio(100 - newValue); // Update loan ratio value
  };
  const handleLoanRatePerYearChange = handleSliderChange(setLoanRatePerYear);
  const handlePropertyInflationChange =
    handleSliderChange(setPropertyInflation);
  const handleOpportunityCostIntChange = handleSliderChange(setOpportunityCost);
  const handleClosingCostChange = handleSliderChange(setClosingCost);
  const handleMaintenanceCostChange = handleSliderChange(setMaintenanceCost);
  const handleHomeInsuranceChange = handleSliderChange(setHomeInsurance);
  const handleRentInflationChange = handleSliderChange(setRentInflation);
  const handleSecurityDepositChange = handleSliderChange(setSecurityDeposit);
  const handleClosingCostRentChange = handleSliderChange(setclosingCostRent);
  const handleAverageShiftingChange = handleSliderChange(setAverageShifting);
  const handleShiftingCostChange = handleSliderChange(setShiftingCost);
  const handleLoanRatioChange = (event, newValue) => {
    setLoanRatio(newValue); // Set loan ratio value
    setDownPayment(100 - newValue); // Update down payment value
  };

  useEffect(() => {
    // Calculate the minimum and maximum monthly rent based on house_cost
    const minMonthlyRent = ((2.5 / 100) * (house_cost * 10000000)) / 12 / 1000; // Convert to thousands
    const maxMonthlyRent = ((3.5 / 100) * (house_cost * 10000000)) / 12 / 1000; // Convert to thousands

    // Update the monthly_rent state if it's outside the new range
    if (monthly_rent < minMonthlyRent || monthly_rent > maxMonthlyRent) {
      setCostOfMonthlyRent((minMonthlyRent + maxMonthlyRent) / 2); // Set to the midpoint of the range
    }
  }, [house_cost]); // Trigger this effect whenever house_cost changes

  // Toggle function for assumptions
  const increaseHeight = document.querySelector("mobile-screen-container");
  const toggleAssumptions = () => {
    setShowAssumptions((prev) => !prev);
    increaseHeight.style.height = "calc(100vh - 50px)"
  };

  // Function to handle modal open and close
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


//     try {
//       setError(null);
//       setLoading(true);

//       // Convert house_cost from crores to actual value (1 crore = 10,000,000)
//       const actualHouseCost = house_cost * 10000000;

//       // Convert monthly_rent from thousands to actual value
//       const actualMonthlyRent = monthly_rent * 1000; // Convert to rupees

//       let loan_ratio = 100 - down_payment;
//       let LTCG = 12.5;


//       const response = await rentvsbuy(
//         tax_Bracket,
//         reinvestment,
//         property_inflation,
//         opportunity_cost_interest,
//         buy_closing_cost,
//         maintenance_cost,
//         home_insurance,
//         rent_inflation,
//         security_deposit,
//         rent_closing_cost,
//         average_shifting_home,
//         shifting_cost,
//         actualHouseCost, // Send converted house cost
//         actualMonthlyRent, // Send converted monthly rent
//         loan_tenure,
//         loan_ratio,
//         loan_rate,
//         STCG,
//         LTCG,
//         down_payment
//       );

      
//   const rentArr = yearly.cumulativeRentCosts;
//   const buyArr = yearly.cumulativeBuyCosts;
//   let saturation = buyArr.length - 1;
//   for (let i = 0; i < rentArr.length; i++) {
//     const diff = rentArr[i] - buyArr[i];
//     if (diff < 0) {
//       saturation = i+1;
//       break;
//     }
//   }
//   setSaturationYear(saturation);
// setRentArray([0, ...response.cumulative_array]);
//       setBuyArray([0, ...response.rent_comulative_array]);
      
//     } catch (error) {
//       setError("An error occurred. Please try again.");
//     } finally {
//       setLoading(false); // Set loading to false after the API call is done
//     }
//   };
const rentData = rentArray;
    const buyData = buyArray;

    const rent = rentData.map((data)=>{
   
    })
    const buy = buyData.map((data)=>{
     
    })

// function to calculate intersection point of two lines
//     const prevDiff = rentArr[i - 1] - buyArr[i - 1];
//     const currentDiff = rentArr[i] - buyArr[i];

//     // Check for actual line crossing
//     if ((prevDiff < 0 && currentDiff > 0) || (prevDiff > 0 && currentDiff < 0)) {
//       const slopeRent = rentArr[i] - rentArr[i - 1];
//       const slopeBuy = buyArr[i] - buyArr[i - 1];
//       const slopeDifference = slopeRent - slopeBuy;
//       const t = (buyArr[i - 1] - rentArr[i - 1]) / slopeDifference;
//       const x = i - 1 + t;
//       const y = rentArr[i - 1] + slopeRent * t;
//       return { x, y };
//     }

//     // If no crossover but divergence starts
//     if (currentDiff > 0 && prevDiff <= 0) {
//       // Apply your formula: i + (Buy - Rent) / Rent
//       const mappedX = i + (buyArr[i] - rentArr[i]) / rentArr[i];
//       return {
//         x: mappedX,
//         y: rentArr[i],
//       };
//     }
//   }

//   // No crossover or divergence
//   return null;
// };
// const getIntersection = (rentArr, buyArr) => {
//   for (let i = 1; i < rentArr.length; i++) {
//     if (rentArr[i] > 0 && buyArr[i] > rentArr[i]) {
//       const x = i + (buyArr[i] - rentArr[i]) / rentArr[i];
//       const y = rentArr[i];
//       return { x, y };
//     }
//   }
//   return null;
// };
const getIntersection = (rentArr, buyArr) => {
  if (!rentArr || !buyArr || rentArr.length !== buyArr.length || rentArr.length < 2) {
    console.warn("Invalid or insufficient data for intersection calculation", { rentArr, buyArr });
    return null;
  }

  console.debug("getIntersection inputs:", { rentArr, buyArr });
  let prevDiff = rentArr[0] - buyArr[0];
  for (let i = 1; i < rentArr.length; i++) {
    const currDiff = rentArr[i] - buyArr[i];
    console.debug(`Year ${i}: rent=${rentArr[i]}, buy=${buyArr[i]}, diff=${currDiff}`);
    if (prevDiff * currDiff <= 0 && Math.abs(prevDiff) > 0) {
      const slopeRent = rentArr[i] - rentArr[i - 1];
      const slopeBuy = buyArr[i] - buyArr[i - 1];
      const slopeDiff = slopeRent - slopeBuy || 1e-8;
      const t = (buyArr[i - 1] - rentArr[i - 1]) / slopeDiff;
      const x = i - 1 + t;
      const y = rentArr[i - 1] + slopeRent * t;
      if (x >= 0 && x <= rentArr.length - 1) {
        console.debug(`Intersection found at year=${x.toFixed(2)}, cost=${y.toFixed(2)}`);
        return { x, y };
      }
    }
    prevDiff = currDiff;
  }
  console.warn("No valid intersection found");
  return null;
};



 
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
  };
}
const intersectionPlugin = {
  id: "intersectionCircle",
  afterDatasetsDraw(chart) {
    const { ctx, scales, width: canvasWidth, height: canvasHeight } = chart;
    const isMobile = window.innerWidth < 600;

    // Debug log
    // console.log("intersectionPoint:", intersectionPoint);
    // console.log("saturationYear:", saturationYear);
    // console.log("yearlyRentCosts length:", yearlyRentCosts?.length);
    // console.log("yearlyBuyCosts length:", yearlyBuyCosts?.length);
 console.log("saturationYear updated:", saturationYear);
    const noValidIntersection =
      !intersectionPoint ||
      saturationYear >= 20 ||
      !Array.isArray(yearlyRentCosts) ||
      !Array.isArray(yearlyBuyCosts) ||
      yearlyRentCosts.length < 2 ||
      yearlyBuyCosts.length < 2;

    const drawCircle = intersectionPoint && intersectionPoint.x >= 1.5 && !noValidIntersection;

    let xCoord, yCoord;

    if (drawCircle) {
      xCoord = scales.x.getPixelForValue(intersectionPoint.x);
      yCoord = scales.y.getPixelForValue(intersectionPoint.y);
    } else {
      // fallback position for annotation box if no intersection point
      xCoord = canvasWidth / 2;
      yCoord = canvasHeight - (isMobile ? 80 : 100);
    }

    if (drawCircle) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(Math.round(xCoord), Math.round(yCoord), isMobile ? 6 : 8, 0, 2 * Math.PI);
      ctx.fillStyle = "#DFDFDF";
      ctx.fill();
      ctx.restore();
      // console.log("Circle drawn");
    } else {
      // console.log("Circle NOT drawn");
    }

    const fontSize = isMobile ? 10 : 14;
    const padding = isMobile ? 8 : 14;
    const lineHeight = fontSize + 4;

    const textLines = noValidIntersection
      ? [
          "If you wish to stay in",
          "this house for more",
          "than 20 years,",
          "Buying is more profitable.",
        ]
      : [
          "If you wish to stay in",
          "this house for more",
          `than ${saturationYear} years,`,
          "Buying is more profitable.",
        ];

    ctx.font = `bold ${fontSize}px Poppins, sans-serif`;
    const textWidths = textLines.map(line => ctx.measureText(line).width);
    const maxWidth = Math.max(...textWidths);
    const boxWidth = maxWidth + padding * 2;
    const boxHeight = lineHeight * textLines.length + padding * 2;

    let boxX = Math.max(0, Math.min(xCoord - boxWidth / 2, canvasWidth - boxWidth));

    let boxY = yCoord - boxHeight - 20;
    if (boxY < 10) boxY = yCoord + 20;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 14);
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#000000";
    ctx.font = `bold ${fontSize}px Poppins, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    let textY = boxY + padding;
    const textCenterX = boxX + boxWidth / 2;

    textLines.forEach((line) => {
      ctx.fillText(line, textCenterX, textY);
      textY += lineHeight;
    });

    ctx.restore();

    // console.log("Annotation drawn with text:", textLines);
  },
};



const effectiveYears = saturationYear < 10
  ? 10
  : saturationYear < 15
    ? 15
    : 20;

const data = {
  labels: generateYearLabels(effectiveYears),
  datasets: [
    {
      data: yearlyRentCosts.slice(0, effectiveYears),
      borderColor: "#f5a623",
      backgroundColor: "rgba(245, 166, 35, 0.2)",
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      label: "Renting",
    },
    {
      data: yearlyBuyCosts.slice(0, effectiveYears),
      borderColor: "#00a0df",
      backgroundColor: "rgba(0, 160, 223, 0.2)",
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      label: "Buying",
    },
  ],
};


 
 
const formatNumber = (num) => {
  return (num / 1.0e7).toFixed(1) + " Cr";  // Always show in Cr with 1 decimal
};

  // Calculate the maximum and minimum Y values for the chart
const allYValues = [
  ...yearlyRentCosts.slice(0, effectiveYears),
  ...yearlyBuyCosts.slice(0, effectiveYears),
];
const maxYValue = Math.max(...allYValues);
const minYValue = Math.min(...allYValues);
console.log("maxYValue", maxYValue);
console.log("minYValue", minYValue);
const yPadding = (maxYValue - minYValue) * 0.1;

const roughMax = maxYValue + yPadding;
const roundedMax = Math.ceil(roughMax / 5e6) * 5e6;
const yAxisMax = Math.min(roundedMax, maxYValue * 1.2);  // Soft cap at 120% of max

const yAxisMin = Math.max(0, Math.floor((minYValue - yPadding) / 5e6) * 5e6);

// 5 or 6 ticks max
const approxStep = Math.ceil((yAxisMax - yAxisMin) / 6 / 1e5) * 1e5;


//  Chart.js options

  const options = {
  devicePixelRatio: window.devicePixelRatio || 2,
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 30, // Increase left padding to accommodate the text
      },
    },
    scales: {
 x: {
  grid: {
    display: false,
  },
  border: {
    display: false,
  },
  ticks: {
    callback: function (value) {
      const label = this.getLabelForValue(value);
      return label === "Year 0" || !label ? "" : label;
    },
    font: {
      size: window.innerWidth < 600 ? 10 : 12,
    },
  },
},


y: {
  min: yAxisMin,
  max: yAxisMax,
  ticks: {
    stepSize: approxStep,
    callback: (value) => value === 0 ? "" : formatNumber(value),
    font: {
      size: window.innerWidth < 600 ? 10 : 12,
    },
  },
  grid: {
    display: false,
  },
  border: {
    color: "#000",
    width: 0,
    display: true,
  },
  maxTicksLimit: 5, // Limit to 5 or 6 ticks max
}


,
    },
    plugins: {
      legend: {
        display: false,
      },
      customTitle: {
        id: "customTitle",
        afterDatasetsDraw(chart) {
          const {
            ctx,
            chartArea: { top, bottom, left, right },
          } = chart;

          // Draw vertical line on y-axis
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(left - 50, top - 50);
          ctx.lineTo(left - 50, bottom - 50);
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.restore();

          // Draw vertical text
          ctx.save();
          ctx.font = "bold 16px Poppins, Arial, sans-serif";
          ctx.fillStyle = "#333";
          ctx.translate(left - 60, (top + bottom) / 2); // Position text to left of y-axis
          ctx.rotate(-Math.PI / 2); // Rotate 90 degrees counter-clockwise
          ctx.textAlign = "center";
          ctx.fillText("Total Cost Incurred", 0, 0);
          ctx.restore();
        },
      },
    },
  };

  // Utility to calculate yearly costs for buying and renting
// REVISED Rent vs Buy calculation logic based on Excel sheet

const calculateYearlyCosts = ({
  house_cost,
  monthly_rent,
  loan_tenure,
  loan_rate,
  down_payment,
  property_inflation,
  maintenance_cost,
  home_insurance,
  buy_closing_cost,
  rent_inflation,
  security_deposit,
  average_shifting_home,
  shifting_cost,
  rent_closing_cost,
  opportunity_cost_interest,
  tax_Bracket,
}) => {
  const years = 20;
  const propertyBase = house_cost * 1e7;
  const oppCostRate = opportunity_cost_interest / 100;
  const taxRate = tax_Bracket / 100;
  const downPaymentAmt = (down_payment / 100) * propertyBase;
  const monthlyRate = loan_rate /100/ 12;
    const numberOfPayments = loan_tenure * 12;
    const loanAmount = propertyBase * loan_ratio/100;
    
    // PMT calculation
    const monthlyPayment = loanAmount * monthlyRate * 
                          Math.pow(1 + monthlyRate, numberOfPayments) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    // Convert to annual payment and return positive value
    const emi = Math.abs(monthlyPayment * 12); // Annual EMI
   
  
  const emiArr = Array(20).fill(emi);


  const principalRepaidArr = [];
let balance = loanAmount;

for (let year = 1; year <= 20; year++) {
  let principalRepaidThisYear = 0;

  for (let month = 1; month <= 12; month++) {
    const interestForMonth = balance * monthlyRate;
    const principalForMonth = monthlyPayment - interestForMonth;
    balance -= principalForMonth;
    principalRepaidThisYear += principalForMonth;
  }

  principalRepaidArr.push(principalRepaidThisYear);
}








  const houseValueArr = [propertyBase];
  const capitalGainsArr = [0];
   const oppCostOnSD_DP = [0];
  for(let i=1; i<=20;i++){
    const x= houseValueArr[i-1] * (property_inflation / 100);
    capitalGainsArr.push(x);
    oppCostOnSD_DP .push(x);
    houseValueArr.push(houseValueArr[i-1] + x);
   
  }
 
  let rent = monthly_rent * 1000 *12;
 
  const netRentArr = [];
  const netBuyArr = [];
  let cumulativeRent = 0;
  let cumulativeBuy = 0;
  let cumulativeEmi = 0;
  let cumulativeNetRentArr = [];
  let cumulativeNetBuyArr = [];
  let cumulativeRentPaid = 0;
  let netRent =0;
  let netBuy =0;
  const Year=1;
 let isShifting = average_shifting_home && (Year % average_shifting_home === 0);
    let shiftingCostYear = isShifting ? (rent / 12) * shifting_cost : 0;
      let rentClosingCost = (Year === 1 || (Year - 1) % average_shifting_home === 0) ? (rent / 12) * rent_closing_cost : 0;
 let totalRentCost = rent + shiftingCostYear + rentClosingCost;
 let oppCostSecDep= (rent/12) * security_deposit * oppCostRate;
let Savings = (emi-rent) * oppCostRate;

let SavingsOnTaxation =(rent * taxRate);
 cumulativeRentPaid =rent;
netRent += totalRentCost + oppCostSecDep -Savings -SavingsOnTaxation;
cumulativeRent +=netRent;
cumulativeNetRentArr.push(cumulativeRent);



let interestPaid = emi - principalRepaidArr[0];
let buyClosing = propertyBase * (buy_closing_cost / 100);
 let maintenance = (maintenance_cost / 100) * houseValueArr[0];
let insurance = home_insurance * Math.floor(houseValueArr[0] / 1e5);
let totalBuyCost=interestPaid + buyClosing + maintenance + insurance;

 Savings = (emi-rent) * oppCostRate;


netBuy = totalBuyCost + Savings;
  
cumulativeBuy +=netBuy;
   
cumulativeNetBuyArr.push(cumulativeBuy);

  for (let year = 2; year <= 20; year++) {
    rent =rent *(1 + rent_inflation/100);
    cumulativeRentPaid +=rent;

    const isShifting = average_shifting_home && (year % average_shifting_home === 0);
     shiftingCostYear = isShifting ? (rent / 12) * shifting_cost : 0;
     rentClosingCost = (year === 1 || (year - 1) % average_shifting_home === 0) ? (rent / 12) * rent_closing_cost : 0;
     totalRentCost = rent  + shiftingCostYear + rentClosingCost;
   
     oppCostSecDep = (year - 1) % average_shifting_home === 0 ? (rent/12) * security_deposit * oppCostRate : oppCostSecDep*(1+oppCostRate);

    const oppCostOnDP = oppCostOnSD_DP[year - 1] || 0;
    const capitalGains = capitalGainsArr[year - 1] || 0;
     Savings = ((emi * year) - cumulativeRentPaid) * oppCostRate;
     SavingsOnTaxation= rent * taxRate;
    let SavingsOnDp = downPaymentAmt *( (1+ property_inflation/100)**( year -1) * oppCostRate);
   
     netRent = totalRentCost + oppCostSecDep + oppCostOnDP - Savings  -SavingsOnTaxation-SavingsOnDp;
   
   cumulativeRent +=netRent;
    cumulativeNetRentArr.push(cumulativeRent);


 

  
    // Buy Side Calculation
     interestPaid = emi - principalRepaidArr[year - 1];
    
     maintenance = (maintenance_cost / 100) * houseValueArr[year - 1];
     insurance = home_insurance * Math.floor(houseValueArr[year - 1] / 1e5);
     totalBuyCost=interestPaid  + maintenance + insurance;
       Savings = ((emi * year) - cumulativeRentPaid) * oppCostRate;
       SavingsOnDp = downPaymentAmt *( (1+property_inflation/100 )**(year-1)) * oppCostRate;
   

    const netBuy = totalBuyCost + Savings + SavingsOnDp -capitalGainsArr[year-1] ;
   

    cumulativeBuy += netBuy;
  
    cumulativeNetBuyArr.push(cumulativeBuy);

  
  }
 
 
  return {
    cumulativeRentCosts: cumulativeNetRentArr,
    cumulativeBuyCosts: cumulativeNetBuyArr,
  };
};

// Find the first year where buying becomes more profitable than renting

//  const xx = getSaturationYear(cumulativeNetBuyArr, cumulativeNetRentArr);


const saveYearlyCostsToLocalStorage = () => {
  const yearly = calculateYearlyCosts({
    house_cost,
    monthly_rent,
    loan_tenure,
    loan_rate,
    down_payment,
    property_inflation,
    maintenance_cost,
    home_insurance,
    buy_closing_cost,
    rent_inflation,
    security_deposit,
    average_shifting_home,
    shifting_cost,
    rent_closing_cost,
    opportunity_cost_interest,
    tax_Bracket,
  });

  const rentArr = [...yearly.cumulativeRentCosts];
  const buyArr = [...yearly.cumulativeBuyCosts];

  localStorage.setItem("buyingCosts", JSON.stringify(buyArr));
  localStorage.setItem("rentingCosts", JSON.stringify(rentArr));

let saturation = buyArr.length;
for (let i = 0; i < rentArr.length; i++) {
  if (buyArr[i] < rentArr[i]) {
    saturation = i;
    break;
  }
}
if (saturation === buyArr.length) {
  saturation = 20; // Explicitly set to 20 if never found
}
setSaturationYear(prev => {
  if (prev !== saturation) return saturation;
  return prev;
});

  // ✅ NEW: Calculate and log difference array (Buy - Rent)
  const differenceArray = buyArr.map((buyCost, index) => {
    const rentCost = rentArr[index] || 0;
    return buyCost - rentCost;
  });
  console.log("Year-wise Difference (Buy - Rent):", differenceArray);

  // Update state
  setYearlyBuyCosts(buyArr);
  setYearlyRentCosts(rentArr);

  console.log(saturation, "saturation year");
 
  const intersection = getIntersection(rentArr, buyArr);
 if (saturation === 20) {
  setIntersectionPoint(null);
} else {
  setIntersectionPoint(getIntersection(rentArr, buyArr));
}

  setYearlyCostVersion(prev => prev + 1); // Trigger re-render if needed
};



// Example: call after any slider/input change
useEffect(() => {

  saveYearlyCostsToLocalStorage();
}, [
  house_cost,
  monthly_rent,
  loan_tenure,
  loan_rate,
  down_payment,
  property_inflation,
  maintenance_cost,
  home_insurance,
  buy_closing_cost,
  rent_inflation,
  security_deposit,
  average_shifting_home,
  shifting_cost,
  rent_closing_cost,
]);

useEffect(() => {
  if (yearlyRentCosts.length > 0 && yearlyBuyCosts.length > 0) {
    const intersection = getIntersection(yearlyRentCosts, yearlyBuyCosts);
    setIntersectionPoint(intersection);
  }
}, [yearlyRentCosts, yearlyBuyCosts]);

useEffect(() => {
   setChartRenderKey(prev => prev + 1);
}, [intersectionPoint]);


  return (
    <>
    {/* <Header/> */}
    <Container className="calculator-container" maxWidth="lg" sx={{ padding: "16px", backgroundColor: "white",textAlign:"left",marginTop:"1%",fontFamily: '"poppins", sans-serif !important' }}>
  <Typography
    variant="h1"
    mb={1}
    sx={{ 
      fontWeight: "bold", 
      color: "black",
      fontSize: { xs: 20, md: 32 }
    }}
    fontFamily= '"poppins", sans-serif !important'
  >
    Rent vs Buy Calculator
  </Typography>
  <Typography 
    component="p"  // Changed from variant="p" to component="p" for proper HTML semantics
    sx={{ 
      fontSize: { xs: 12, md: "16px" }, 
      color: "black",
      lineHeight: 1.5 , // Added for better readability
      fontFamily:'"poppins", sans-serif !important'
    }}
  >
    Should you rent or buy a home? Our simple rent vs buy calculator compares the long-term costs of renting versus purchasing a property, helping you make an informed financial decision.
  </Typography>
      <Grid container>
      {/* <Grid item md={12} sx={{ display: { xs: "block", md: "block" }, textAlign: "left", px: { md: 3 },ml:3,marginTop:"5%" }}>
</Grid> */}
        {/* Chart Section */}
        <Grid item
         xs={12} md={8} lg={8} xl={8}
        sx={{
                width: '100%',
                
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '65%',
                  marginTop:"4%"
                  // Ensure padding/margins are also respected in the grid layout
                  // paddingLeft: '16px', 
                },
              }}
        >
          <Box
            height={{ xs: 280, md: 400 }}
            mb={2}
            p={1}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              marginBottom: "16px",
              marginRight:"5%",
                            paddingLeft: { xs: 0, },
            }}
          >
            <Line
              key={chartRenderKey}
              data={data}
              options={options}
              plugins={[intersectionPlugin, options.plugins.customTitle]}
            />
          </Box>

          <Grid
  container
  px={5}
  mb={2}
  sx={{
    display: { xs: "none", md: "flex" },
    justifyContent: "center",
    alignItems: "center",
    maxWidth: '800px', // Optional: constrain max width for better centering
    margin: '0 auto', // This centers the entire container
                width: '100%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '100%',
                  // Ensure padding/margins are also respected in the grid layout
                  // paddingLeft: '16px', 
                },
              }}
  
>
  <Grid item xs={6}
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
    <Box 
      display="flex" 
      alignItems="center"
      justifyContent="center" // Add this to center the content within the Grid item
    >
      <Box
        sx={{
          width: "50%",
          height: 7,
          borderRadius:"7px",
          backgroundColor: "#f5a623",
          marginRight: "8px",
      fontFamily:'"poppins", sans-serif !important'

        }}
      />
      <Typography variant="h6" className="sub-headings" sx={{ fontFamily:'"poppins", sans-serif !important' }}>Renting</Typography>
    </Box>
  </Grid>
  <Grid item xs={6}
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
    <Box 
      display="flex" 
      alignItems="center"
      justifyContent="center" // Add this to center the content within the Grid item
    >
      <Box
        sx={{
          width: "50%",
          height: 7,
          borderRadius:"7px",
          backgroundColor: "#00a0df",
          marginRight: "8px",
          fontFamily:'"poppins", sans-serif !important'
        }}
      />
      <Typography variant="h6" className="sub-headings" sx={{ fontFamily:'"poppins", sans-serif !important' }}>Buying</Typography>
    </Box>
  </Grid>
</Grid>

   {/* Legend */}
           <Grid
            container
            spacing={2}
            mb={2}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 80,
                    height: 2,
                    backgroundColor: "#f5a623",
                    marginRight: "8px",
                  }}
                />
                <Typography sx={{ color: { xs: "#505050",fontWeight:"bold" } }}>Renting</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 80,
                    height: 2,
                    backgroundColor: "#00a0df",
                    marginRight: "8px",
                    
                  }}
                />
                <Typography  sx={{ color: { xs: "#505050",fontWeight:"bold" } }}>Buying</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Right-Side Content Section */}
        <Grid item 
        xs={12} md={4} lg={4} xl={4}
        // sx={{
                
        //       }}
        
        className="mobile-screen-container"
         sx={{
          width: '100%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '28%',
                  // Ensure padding/margins are also respected in the grid layout
                  // paddingLeft: '16px', 
                },
    border: { xs: "none", md: "1px solid black" },
    borderRadius: { xs: "none", md: "25px" },
    position:{xs:"none",md:"absolute"},
    right: "8%",
    // width: "28%",
    top: "35%",
    paddingRight: { md: "24px" },
    // marginTop: { md: "24px" },
    padding:"22px",
    height: {
      md: showAssumptions
        ? "calc(100vh - 64px + 500px)"
        : "calc(100vh - 100px)",
    },
    transition: "height 0.3s ease", // Smooth animation
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "8px",
      display: "none",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f0f0f0",
      borderRadius: "8px",
      display: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#0086AD",
      borderRadius: "8px",
      border: "2px solid #f0f0f0",
      display: "none",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#005f73",
      display: "none",
    },
  }}
>
         

          {/* Learn How We Calculate */}
          <Typography
            variant="body1"
            textAlign="left"
            fontWeight="bold"
            sx={{ mb: "16px",fontFamily: '"poppins", sans-serif !important', color: "#505050", textDecoration: "underline",cursor: "pointer",textAlign:{xs:'center',md:'left'} }}
            onClick={handleOpenModal}
          >
            Learn How We Calculate
          </Typography>


          {/* Cost Of House Today */}
          <Typography gutterBottom textAlign="left" sx={{ fontWeight: "bold",fontFamily: '"poppins", sans-serif !important',fontSize:{xs:'16px',md:'16px'} }}>
            Cost Of House Today
          </Typography>
          <Slider
          trackColor="#"
          thumbColor="#"
          railColor="#"
          valueLabelColor="#"
            value={house_cost}
            onChange={handleCostOfHouseChange}
            onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
            min={1}
            max={3}
            step={0.25}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => `${value} Cr`}

            sx={{
              "& .MuiSlider-track": {
                backgroundColor: "#0086AD",
                height: 8, // Adjust track thickness
                border: "none",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#DEDEDE",
                height: 8, // Adjust rail thickness
              },
              "& .MuiSlider-thumb": {
                backgroundColor: "#0086AD",
                border: "2px solid white",
                width: 20, // Adjust thumb size (width)
                height: 20, // Adjust thumb size (height)
                "&:hover, &:focus, &.Mui-active": {
                  boxShadow: "none", // Remove the expanded color effect
                },
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#DCF7FF",
                color: "black",
                fontWeight: "bold",
                top: "-2px",
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

          {/* Slider Labels */}
          <Grid
            container
            justifyContent="space-between"
            sx={{ mt: "-8px", mb: "16px" ,fontFamily: '"poppins", sans-serif !important'}}
          >
            <Grid item>
              <Typography>1 Cr</Typography>
            </Grid>
            <Grid item>
              <Typography>3 Cr</Typography>
            </Grid>
          </Grid>

          {/* Monthly Rent */}
          <Typography gutterBottom textAlign="left" sx={{ fontWeight: "bold",fontFamily: '"poppins", sans-serif !important',fontSize:{xs:'16px',md:'16px'} }}>
            Monthly Rent
          </Typography>
          <Slider
            value={monthly_rent}
            onChange={handleMonthlyChange}
            onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
            min={((2.5 / 100) * (house_cost * 10000000)) / 12 / 1000} // Minimum value in thousands
            max={((3.5 / 100) * (house_cost * 10000000)) / 12 / 1000} // Maximum value in thousands
            step={1} // Adjust step size as needed
            valueLabelDisplay="on"   valueLabelFormat={(value) =>`${value.toFixed(0)} K`} 
         // Display value in thousands
            sx={{
              "& .MuiSlider-track": {
                backgroundColor: "#EF9C00",
                height: 8, // Adjust track thickness
                border: "none",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#DEDEDE",
                height: 8, // Adjust rail thickness
              },
              "& .MuiSlider-thumb": {
                backgroundColor: "#EF9C00",
                border: "2px solid white",
                width: 20, // Adjust thumb size (width)
                height: 20, // Adjust thumb size (height)
                "&:hover, &:focus, &.Mui-active": {
                  boxShadow: "none", // Remove the expanded color effect
                },
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#FFF4D3",
                color: "black",
                fontWeight: "bold",
                top: "-2px",
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

          {/* Slider Labels */}
          <Grid
            container
            justifyContent="space-between"
            sx={{ mt: "-8px", mb: "16px" }}
          >
            <Grid item>
              <Typography>
                {(((2.5 / 100) * (house_cost * 10000000)) / 12 / 1000).toFixed(
                  0
                )}{" "}
                K
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {(((3.5 / 100) * (house_cost * 10000000)) / 12 / 1000).toFixed(
                  0
                )}{" "}
                K
              </Typography>
            </Grid>
          </Grid>

          {/* Stats */}
           {/* spacing={2} */}
          <Grid container mb={2} >
            <Grid item 
            sx={{
              p: "8px",
                width: '50%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '50%',
                  // Ensure padding/margins are also respected in the grid layout
                  // paddingLeft: '16px', 
                },
              }}
            xs={6} 
          
            >
              <Card>
                <CardContent sx={{ paddingX: "8px", background:"#ececec" }}>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 16, // Set font size to 20px
                     fontFamily: '"poppins", sans-serif !important'
                    }}
                  >
                    {loan_tenure}
                  </Typography>
                  <Typography textAlign="center">Years</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item 
            xs={6}
            sx={{
              p: "8px",
                width: '50%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '50%',
                  // Ensure padding/margins are also respected in the grid layout
                  // paddingLeft: '16px', 
                },
              }}
            // sx={{ p: "8px" }}
            >
              <Card sx={{ backgroundColor: "#FFF5D7" }}>
                <CardContent sx={{ paddingX: "8px" }}>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    sx={{
                      fontFamily: '"poppins", sans-serif !important',
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    INR {monthly_rent.toFixed(0)}
                    {"k"}
                  </Typography>
                  <Typography textAlign="center">Rent</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item 
            xs={12}
            sx={{
              p: "8px",
                width: '100%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '100%',
                  // Ensure padding/margins are also respected in the grid layout
                  // paddingLeft: '16px', 
                },
              }}
             >
              <Card sx={{ backgroundColor: "#D7EFFF" }}>
                <CardContent
                  sx={{
                    paddingX: "8px",
                    textAlign: "center", // Add this to center all content
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"poppins", sans-serif !important',
                      fontWeight: "bold",
                      fontSize: 16,
                      textAlign: "inherit", // Inherits from CardContent
                    }}
                  >
                    INR {house_cost}
                    {" Cr"}
                  </Typography>
                  <Typography sx={{ textAlign: "inherit" }}>Buy</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Toggle Button for Assumptions */}
          <Grid container justifyContent="end" alignItems="center">
            <Button variant="text" onClick={toggleAssumptions}>
              <Typography
                color="#505050"
                fontWeight="bold"
                textAlign="left"
                textTransform="none" 
                fontSize="16px"// This will prevent uppercase transformation
                fontFamily= '"poppins", sans-serif !important'
              >
                View Assumed Values
              </Typography>
              <IconButton
                size="small"
                sx={{
                  marginLeft: "4px",
                  padding: "4px",
                }}
              >
                {showAssumptions ? (
                  <MdOutlineExpandLess />
                ) : (
                  <MdOutlineExpandMore />
                )}
              </IconButton>
            </Button>
          </Grid>

          {/* Assumptions Section */}
          {showAssumptions && (
            <Box mt={2} sx={{ padding: "4px" }}>
              <Typography
               variant="h6"
               gutterBottom
               textAlign="left"
               fontWeight="bold"
                className="sub-headings"
                fontFamily= '"poppins", sans-serif !important'
              >
                Assumptions
              </Typography>
              {/* <Typography variant="body2" sx={{ marginBottom: "16px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus.
              </Typography> */}

              {/* Mortgage Section */}
              <Typography
                variant="h6"
                gutterBottom
                textAlign="left"
                fontWeight="bold"
                className="sub-headings"
                fontFamily= '"poppins", sans-serif !important'
              >
                Mortgage
              </Typography>
              <CustomSlider
              className="rent-buy-slider"
                title="Down Payment"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                value={down_payment}
                onChange={handleDownPaymentChange}
                onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
                min={25}
                max={75}
                step={5}
                percent={true}
                width={100}
              />

              <CustomSlider
              className="rent-buy-slider"
                title="Loan to Value"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                value={loan_ratio}
                onChange={handleLoanRatioChange}
                onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
                min={25}
                max={75}
                step={5}
                percent={true}
              />

              <CustomSlider
              className="rent-buy-slider"
                title="Loan Rate (per year)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                value={loan_rate}
                onChange={handleLoanRatePerYearChange}
                onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
                min={8}
                max={10}
                step={0.25}
                percent={true}
              />
              <CustomSlider
              className="rent-buy-slider"
                title="Loan Tenure"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleLoanTenureChange}
                onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
                value={loan_tenure}
                min={10}
                max={20}
                step={5}
                percent={false}
              />

              {/* Mortgage Section */}
              <Typography variant="h6" gutterBottom textAlign="left">
                Tax
              </Typography>
              <Typography >Tax Bracket</Typography>
              {/* Location Input */}
              <TextField
                // variant="outlined"
                fullWidth
                select
                SelectProps={{
                  native: true,
                }}
                value={tax_Bracket}
                onChange={(e) => setTaxBracket(e.target.value)}
                sx={{ mb: "16px",    borderRadius: "15px",
                  border: "1px solid black" }}
              >
                <option value="10">10%</option>
                <option value="20">20%</option>
                <option value="30" selected>
                  30%
                </option>
              </TextField>

              <Typography textAlign="left">Reinvestment</Typography>
              {/* Location Input */}
              <TextField
                variant="outlined"
                fullWidth
                select
                SelectProps={{
                  native: true,
                }}
                value={reinvestment}
                onChange={(e) => setReinvestment(e.target.value)}
                sx={{ mb: "16px", borderRadius: "15px",
                  border: "1px solid black" }}
              >
                <option value="yes" selected>
                  Yes
                </option>
                <option value="no">No</option>
              </TextField>

              <Box sx={{ paddingY: "8px" }}>
                <Typography gutterBottom>STCG</Typography>
                <Box
                  sx={{
                    backgroundColor: "#f0f0f0",
                    padding: "8px",
                    textAlign: "center",
                    borderRadius: "8px",
                  }}
                >
                  20%
                </Box>
              </Box>

              <Box sx={{ paddingY: "8px" }}>
                <Typography gutterBottom>LTCG</Typography>
                <Box
                  sx={{
                    backgroundColor: "#f0f0f0",
                    padding: "8px",
                    textAlign: "center",
                    borderRadius: "8px",
                  }}
                >
                  12.50%
                </Box>
              </Box>

              <Typography
                fontWeight="bold"
                variant="h6"
                gutterBottom
                sx={{ paddingTop: "8px", textAlign: "left" }}
              >
                Buy
              </Typography>
              <CustomSlider
                title="Property Inflation (per year)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handlePropertyInflationChange}
                onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
                value={property_inflation}
                min={4.5}
                max={7}
                step={0.5}
                percent={true}
              />
              <CustomSlider
                title="Opportunity Cost Interest (per year)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleOpportunityCostIntChange}
                value={opportunity_cost_interest}
                min={7}
                max={10}
                step={1}
                percent={true}
              />
              <CustomSlider
                title="Closing Costs (% of property value)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleClosingCostChange}
                onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
                value={buy_closing_cost}
                min={1}
                max={3}
                step={1}
                percent={true}
              />
              <CustomSlider
                title="Maintenance Cost (per year)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleMaintenanceCostChange}
                onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
                value={maintenance_cost}
                min={0.5}
                max={1.5}
                step={0.5}
                percent={true}
              />
              <CustomSlider
                title="Home Insurance (per lakh)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleHomeInsuranceChange}
                onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
                value={home_insurance}
                min={100}
                max={200}
                step={50}
              />

              <Typography
                fontWeight="bold"
                variant="h6"
                gutterBottom
                sx={{ paddingTop: "8px", textAlign: "left" }}
              >
                Rent
              </Typography>
              <CustomSlider
                title="Rent Inflation (per year)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleRentInflationChange}
                onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
                value={rent_inflation}
                min={8}
                max={10}
                step={0.5}
                percent={true}
              />
              <CustomSlider
                title="Security Deposit (x months rent)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleSecurityDepositChange}
                onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
                value={security_deposit}
                min={2}
                max={8}
                step={2}
              />
              <CustomSlider
                title="Closing Costs (x months rent)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleClosingCostRentChange}
                onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
                value={rent_closing_cost}
                min={1}
                max={3}
                step={1}
              />
              <CustomSlider
                title="Average Shifting of Homes (years)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleAverageShiftingChange}
                onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
                value={average_shifting_home}
                min={2}
                max={4}
                step={1}
              />
              <CustomSlider
                title="Shifting Costs / Misc (x months rent)"
                trackColor="#595959"
                thumbColor="#595959"
                railColor="#DEDEDE"
                valueLabelColor="#DEDEDE"
                onChange={handleShiftingCostChange}
                onChangeCommitted={handleSliderChangeCommitted(saveYearlyCostsToLocalStorage)}
                value={shifting_cost}
                min={1}
                max={2}
                step={0.5}
              />
            </Box>
          )}
          {/* Modal Implementation */}
          <Dialog
  sx={{ 
    zIndex: 9999999999,
    '& .MuiDialog-paper': {
      borderRadius: "12px", // Changed from 50px for better aesthetics
      width: { xs: "90vw", md: "600px" }, // Better responsive width
      maxWidth: "none",
      position: "relative" // Needed for absolute positioning of close button
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
  
  <DialogContent sx={{ paddingTop: "40px" }}> {/* Added padding to prevent content overlap */}
    <Typography variant="body1" paragraph>
      <strong>Methodology & Key Assumptions</strong>
      <br></br> Our calculator performs a
      year-by-year comparison of total ownership costs versus renting
      expenses. 
      
      <br /><br />For buying scenarios, we calculate: EMI payments
      (principal + interest), maintenance (0.6% of property value
      annually), property taxes, insurance (₹100 per lakh), and
      closing costs (1% of home value). 
      <br /><br />For renting, we account for
      monthly rent (with 9% annual escalation), security deposits (2
      months' rent), and shifting costs (1 month's rent every 3
      years). 
      <br /><br />The model incorporates opportunity costs - your down
      payment and monthly savings (EMI minus rent difference) are
      assumed to earn 7% if invested elsewhere. Home value appreciates
      at 6% annually while accounting for capital gains tax upon sale.
    </Typography>
  </DialogContent>
</Dialog>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item 
        xs={12} md={8} 
        sx={{
          fontFamily: '"poppins", sans-serif !important'  ,
                width: '100%',
                // Force 50% width explicitly for desktop sizes (MUI 'md' breakpoint starts at 900px)
                '@media (min-width: 900px)': {
                  width: '65%',
                  // Ensure padding/margins are also respected in the grid layout
                  // paddingLeft: '16px', 
                },
              }}

        marginTop={"8%"} >
                    {/* Text Below the Chart */}
          <Box sx={{ display: { xs: "block", md: "block",textAlign:'left'}, mt: 1, mr: 1,ml:1 }}>
        
            <Typography variant="h6" mb={2} textAlign={"left"} sx={{  fontSize:{xs:"14px", md:"20px",color:"#000", fontFamily: '"poppins", sans-serif !important' } }}>
              How to Use This Rent vs. Buy Calculator
            </Typography>
            <>
              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000", fontFamily: '"poppins", sans-serif !important' } }}
              >
                Deciding whether to rent or buy a home in India isn't just about
                comparing monthly costs—it's about long-term wealth, opportunity
                costs, and lifestyle goals. Our calculator goes deeper than most
                by factoring in:
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000",fontFamily: '"poppins", sans-serif !important'  } }}
              >
                • Hidden ownership costs (stamp duty, maintenance, shifting
                charges)
                <br />
                • Loan realities (pre-EMI interest, partial prepayments, tax
                benefits)
                <br />
                • Rent inflation (9% average in metros)
                <br />• Opportunity costs (what your down payment could earn if
                invested)
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                fontWeight="bold"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000",fontFamily: '"poppins", sans-serif !important'} }}
              >
                General Assumptions
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000",fontFamily: '"poppins", sans-serif !important'} }}
              >
                The analysis uses these baseline parameters which you can
                customize:
                <br />
                • Loan terms: 25% down payment, 8% interest rate, 20-year tenure
                <br />
                • Property costs: 1% closing fees, 0.6% maintenance, ₹100/lakh
                insurance
                <br />
                • Rent parameters: 9% yearly increase, 2-month deposit, 3-year
                shifting cycle
                <br />
                • Growth rates: 6% home appreciation, 7% investment returns
                <br />
                • Tax treatment: 30% income tax bracket with applicable
                deductions
                <br />• Transaction costs: 1 month's rent for rental agreements,
                1% of home value for buyer closing
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000", fontFamily: '"poppins", sans-serif !important' } }}
              >
                All currency values are inflation-adjusted to present-day terms.
                The break-even point identifies when cumulative buying costs
                (including lost investment income) become lower than lifetime
                renting expenses.
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                fontWeight="bold"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000",fontFamily: '"poppins", sans-serif !important'} }}
              >
                Beyond the Numbers: Key Lifestyle Factors to Consider
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000",fontFamily: '"poppins", sans-serif !important'} }}
              >
                While financial calculations are crucial, your personal
                circumstances play an equally important role in the rent vs. buy
                decision. Here are the human factors to weigh:
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                fontWeight="bold"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000", fontFamily: '"poppins", sans-serif !important'} }}
              >
                1. Stability vs. Flexibility
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000", fontFamily: '"poppins", sans-serif !important'} }}
              >
                <strong>• Buying makes sense if:</strong>
                <br />
                &nbsp; &nbsp;• You plan to stay in the city for 5+ years
                <br />
                &nbsp; &nbsp;• Want to customize your living space (renovations/pets)
                <br />
                &nbsp; &nbsp;• Seek long-term community roots (schools/neighbors)
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000", fontFamily: '"poppins", sans-serif !important'} }}
              >
                <strong>• Renting works better if:</strong>
                <br />
                &nbsp; &nbsp;• Your job requires frequent relocation
                <br />
                &nbsp; &nbsp;• You value hassle-free maintenance (landlord handles repairs)
                <br />
                &nbsp; &nbsp;• Prefer testing neighborhoods before committing
              </Typography>

            </>




            <Typography
                mb={2}
                variant="body1"
                fontWeight="bold"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000", fontFamily: '"poppins", sans-serif !important'} }}
              >
                2. Emotional Value
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000", fontFamily: '"poppins", sans-serif !important'} }}
              >
                <strong>Owning </strong>provides:
                <br />
                &nbsp; &nbsp;• Sense of pride/permanence
                <br />
                &nbsp; &nbsp;• Freedom to decorate without restrictions
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000", fontFamily: '"poppins", sans-serif !important'} }}
              >
                <strong>• Renting </strong>offers:
                <br />
                &nbsp; &nbsp;• Less stress about market fluctuations
                <br />
                &nbsp; &nbsp;• Ability to upgrade/downgrade as needs change
              </Typography>




              <Typography
                mb={2}
                variant="body1"
                fontWeight="bold"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000", fontFamily: '"poppins", sans-serif !important'} }}
              >
                3. Hidden Efforts
              </Typography>

              <Typography
                mb={2}
                variant="body1"
               sx={{  fontSize:{xs:"12px", md:"16px",color:"#000", fontFamily: '"poppins", sans-serif !important'} }}
              >
                <strong>• Homeownership </strong>means:
                <br />
                &nbsp; &nbsp;• Time spent on maintenance/paperwork
                <br />
                &nbsp; &nbsp;• Responsibility for sudden repairs (plumbing, electrical)
              </Typography>

              <Typography
                mb={2}
                variant="body1"
sx={{  fontSize:{xs:"12px", md:"16px",color:"#000", fontFamily: '"poppins", sans-serif !important'} }}
              >
                <strong>• Renting </strong>involves:
                <br />
                &nbsp; &nbsp;• Annual lease negotiations
                <br />
                &nbsp; &nbsp;• Risk of rent hikes or owner selling the property
              </Typography>

              <Typography
                mb={2}
                variant="body1"
                fontWeight="bold"
                sx={{  fontSize:{xs:"12px", md:"16px",color:"#000", fontFamily: '"poppins", sans-serif !important'} }}
              >
                4. Future Life Plans
              </Typography>

              <Typography
                mb={2}
                variant="body1"
sx={{  fontSize:{xs:"12px", md:"16px",color:"#000", fontFamily: '"poppins", sans-serif !important'} }}
              >
                Consider:
                <br />
                &nbsp; &nbsp;• Family expansion (more space needed?)
                <br />
                &nbsp; &nbsp;• Aging parents (accessibility requirements?)
                <br />
                &nbsp; &nbsp;• Retirement goals (will property help or hinder?)
                <br />
                <strong>Pro Tip: </strong>Even if buying wins financially, ask: "Does this align with my next 5 years?" A ₹20L savings means little if you’re transferred abroad next year!
              </Typography>

          </Box>

        
        </Grid>
      </Grid>
    </Container>

    {/* <Footer/> */}
    </>
  );
};

export default Calculator;


