import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

import { whtspImage } from "./Imagepath";

const GetInTouchForm = () => {
    // CRITICAL: Hook for internal navigation in React Router
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', 
        contact: '', 
        location: '', 
        message: '', 
    });
    
    const [company] = useState('Default company');
    const [leadSource] = useState('Get in Touch'); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        // Simple validation
        if (!formData.name || !formData.contact || !formData.message) {
            alert("Please fill out your Name, Contact, and Message.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Payload matches the data structure in your original JS script
            const payload = {
                name: formData.name,
                contact: formData.contact,
                location: formData.location, 
                message: formData.message, 
                // Including static fields in case the schema requires them
                company: company,
                lead_source: leadSource, 
            };
            
            console.log("Submitting payload to /submit-form:", payload);

            // API Call: Using the specific /submit-form endpoint
            const response = await axios.post(
                "https://prehome-website-backend-service.onrender.com/submit-form", 
                payload
            );
            
            // Check if response status is successful (e.g., 200, 201)
            if (response.status >= 200 && response.status < 300) {
                console.log("API Success Response Received. Redirecting internally to /thank-you...");
                // CRITICAL FIX: Use useNavigate for internal routing
                navigate('/thank-you'); 
            } else {
                // Handle non-2xx status codes returned by the server
                 console.error("Server returned non-success status:", response.status, response.data);
                 alert(response.data.message || "Submission failed with a server error.");
            }

        } catch (error) {
            // CRITICAL: Logging for the 500 error
            console.error("--- Submission Failed. Check Render Logs for Backend Stack Trace ---");
            
            if (error.response) {
                // Server responded with an error status (500)
                console.error("Server Error (Status:", error.response.status, ") Details:", error.response.data);
            } else {
                // Network or other local error
                console.error("Network Error:", error.message);
            }
            
            alert("Sorry, we couldn't submit your form due to a server error. Please check the console for details.");
            
        } finally {
            setIsSubmitting(false); 
        }
    };

      // 1. Create a function to push the event
const trackButtonClick = (buttonName) => {
  // Check if the dataLayer exists before pushing (safety check)
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'custom_button_click', // <-- 🚨 This is the Custom Event name GTM must listen for
      button_name: buttonName,      // Optional: Pass context like the button name
      page_path: window.location.pathname
    });
    console.log(`DataLayer push: custom_button_click - ${buttonName}`); // For debugging
  }
};

    return (
        <section className="speak-to-expert headertop-border">
            <div className="container container-lg">
                <div className="row"> 
                    {/* Left Side: Contact Info */}
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="section-title getin-text" style={{display: "flex",flexDirection: "column",justifyContent: "start",alignItems: "self-start"}}>
                            <h2>Get in Touch</h2>
                            <p className="mb-4">Let's understand each other better !! </p>
                            <p className="mb-2"><i className="fa fa-envelope-open pe-2" aria-hidden="true"></i> contact@prehome.in</p>
                            <p className="mb-2"><i className="fa fa-phone pe-2" aria-hidden="true"></i> +91 88006 58299</p>
                            <p className="mb-4"><i className="fa fa-map-marker pe-2" aria-hidden="true"></i> Coming Soon Near You</p>
                            <p className="mb-2 whatsApp-link">
                                <img className="pe-2" src={whtspImage} alt="WhatsApp Icon"/> 
                                <a href="https://api.whatsapp.com/send/?phone=918800658299&text&app_absent=0" target="_blank" rel="noopener noreferrer">
                                    Click here to chat with us on WhatsApp
                                </a>
                            </p>
                        </div>
                    </div>
                    
                    {/* Right Side: Contact Form - Attached onSubmit={handleSubmit} */}
                    <div className="col-md-8 col-sm-6 col-12 contact-form">
                        <form id="contact-form" className="row" onSubmit={handleSubmit}>

                            <input type="hidden" name="oid" value="00DC40000026yrZ"/>
                            <input type="hidden" id="company" name="company" value={company}/>
                            <input type="hidden" name="lead_source" value={leadSource}/>
                            {/* The old retURL is not needed as navigation is done via React */}
                            
                            <div className="col-md-6 col-12">
                                <div className="single-personal-info">
                                    <label htmlFor="fname3">Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        id="fname3" 
                                        className="border-only" 
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div> 
                            <div className="col-md-6 col-12">
                                <div className="single-personal-info">
                                    <label htmlFor="email3">Email/Phone Number</label>
                                    <input 
                                        type="text" 
                                        name="contact" 
                                        id="email3" 
                                        className="border-only" 
                                        required
                                        value={formData.contact}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-12">
                                <div className="single-personal-info">
                                    <label htmlFor="location3">My Preferred Home Location</label>
                                    <input 
                                        type="text" 
                                        name="location" 
                                        id="location3" 
                                        className="border-only" 
                                        placeholder="ex. Golf Course road"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-12">
                                <div className="single-personal-info">
                                    <label htmlFor="message3">Message</label>
                                    <textarea 
                                        id="message3" 
                                        name="message" 
                                        className="border-only" 
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div> 
                            
                            <div className="col-md-12 col-12">
                                <button 
                                    type="submit" 
                                    className="submit-btn"
                                    disabled={isSubmitting} 
                                    onClick={() => trackButtonClick('Submit general_inquiries Form')}
                                >
                                    {isSubmitting ? 'Sending...' : 'Go !'}
                                </button>
                            </div> 
                        </form>
                    </div> 
                </div>
            </div>
        </section>
    );
};

export default GetInTouchForm;