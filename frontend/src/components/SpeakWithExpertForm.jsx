import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import DateTimeDropdowns from './DateTimeDropdowns';
const SpeakWithExpertForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', 
        contact: '', // Holds Email or Phone Number
        // Stores date and time selections from the dropdown component
        appointment: { date: '', time: '' }, 
    });
    
    // Static values
    const [company] = useState('Default company');
    const [leadSource] = useState('Speak with our expert');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }, []);
    
    // Updates the appointment object when a dropdown selection is made
    const handleAppointmentChange = useCallback(({ date, time }) => {
         setFormData(prevData => ({
            ...prevData,
            appointment: { date, time }
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        // Validation matching your original JS logic
        if (!formData.name || !formData.contact || !formData.appointment.date || !formData.appointment.time) {
            alert("Please fill out your Name, Contact, and select a valid date and time.");
            return;
        }

        setIsSubmitting(true);

        try {
            // CRITICAL: Payload must match the keys from your original working JS code
            const payload = {
                name: formData.name, // Matches last_name in your original HTML, assumed to be 'name' for this endpoint
                contact: formData.contact, // Matches 00NC4000001IArm in your original HTML, assumed to be 'contact' for this endpoint
                date: formData.appointment.date, // Matches 'date' key in your original JS payload
                time: formData.appointment.time, // Matches 'time' key in your original JS payload
                
                // Static fields
                company: company,
                lead_source: leadSource,
            };
            
            console.log("Submitting payload to /submit-appointment:", payload);

            // API Call: Using the specific /submit-appointment endpoint
            const response = await axios.post(
                "https://prehome-website-backend-service.onrender.com/submit-appointment", 
                payload
            );
            
            // Check for success status (200, 201)
            if (response.status >= 200 && response.status < 300) {
                console.log("API Success Response Received. Redirecting internally to /thank-you...");
                // CRITICAL FIX: Use useNavigate for internal routing
                navigate('/thank-you'); 
            } else {
                 console.error("Server returned non-success status:", response.status, response.data);
                 alert(response.data.error || "Failed to submit appointment.");
            }

        } catch (error) {
            console.error("--- Submission Failed. Check Render Logs for Backend Stack Trace ---");
            
            if (error.response) {
                console.error("Server Error (Status:", error.response.status, ") Details:", error.response.data);
            } else {
                console.error("Network Error:", error.message);
            }
            
            alert("Sorry, we couldn't submit your form due to a server error. Please try again later.");
            
        } finally {
            setIsSubmitting(false); 
        }
    };

    return (
        <section className="speak-to-expert pt-20" id="speak">
            <div className="container container-lg">
                <div className="row"> 
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="section-title" style={{display: "flex",flexDirection: "column",justifyContent: "start",alignItems: "self-start",textAlign: "left"}}>
                            <h2>Speak with our expert</h2>
                        </div>
                    </div>
                    
                    <div className="col-md-8 col-sm-6 contact-form">
                        <form id="appointment-form" className="row" onSubmit={handleSubmit}>
                            
                            {/* Hidden fields for external compatibility (data is primarily sent via payload) */}
                            <input type="hidden" name="oid" value="00DC40000026yrZ"/>
                            <input type="hidden" id="company" name="company" value={company}/>
                            <input type="hidden" name="lead_source" value={leadSource}/>
                            
                            {/* Fields from your original HTML */}
                            <div className="col-md-6">
                                <div className="single-personal-info">
                                    <label htmlFor="fname1">Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        id="fname1" 
                                        className="border-only" 
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    /> 
                                </div>
                            </div> 
                            <div className="col-md-6">
                                <div className="single-personal-info">
                                    <label htmlFor="text1">Email or Phone number</label>
                                    <input 
                                        type="text" 
                                        name="contact" 
                                        id="text1" 
                                        className="border-only"
                                        required
                                        value={formData.contact}
                                        onChange={handleChange}
                                    /> 
                                </div>
                            </div>
                            
                            {/* Integrated DateTimeDropdowns */}
                            <div className="col-md-12 mb-3">
                                
                                <DateTimeDropdowns onAppointmentChange={handleAppointmentChange} />
                            </div>
                            
                            <div className="col-md-12 col-12 mb-3">
                                <button 
                                    type="submit" 
                                    className="submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'SCHEDULING...' : 'SCHEDULE'}
                                </button>
                            </div>
                            
                            {/* Modal HTML kept for reference */}
                            <div className="modal fade" id="exampleModal55" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                {/* ... Modal Content ... */}
                            </div>
                        </form>
                    </div> 
                </div>
            </div>
        </section>
    );
};

export default SpeakWithExpertForm;
