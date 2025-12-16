import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Added onAppointmentChange prop
const DateTimeDropdowns = ({ onAppointmentChange }) => {

    const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
    // Use empty string '' for state tracking, which simplifies validation in the parent
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    // Helper to generate the next 7 days' dates
    const getNext7Days = useMemo(() => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            dates.push(d.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
            }));
        }
        return dates;
    }, []);
    
    // Time options data
    const timeSlots = [
        '10:00 am', '10:30 am', '11:00 am', '11:30 am', '12:00 pm', 
        '12:30 pm', '01:00 pm', '01:30 pm', '02:00 pm', '02:30 pm', 
        '03:00 pm', '03:30 pm', '04:00 pm'
    ];

    // --- Date Dropdown handlers ---
    const toggleDateDropdown = () => {
        setIsDateDropdownOpen(prev => !prev);
        if (!isDateDropdownOpen) setIsTimeDropdownOpen(false);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setIsDateDropdownOpen(false);
        // CRITICAL: Notify parent with the new date and current time
        if (onAppointmentChange) {
            onAppointmentChange({ date: date, time: selectedTime });
        }
    };

    // --- Time Dropdown handlers ---
    const toggleTimeDropdown = () => {
        setIsTimeDropdownOpen(prev => !prev);
        if (!isTimeDropdownOpen) setIsDateDropdownOpen(false);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        setIsTimeDropdownOpen(false);
        // CRITICAL: Notify parent with the current date and new time
        if (onAppointmentChange) {
            onAppointmentChange({ date: selectedDate, time: time });
        }
    };


    const handleClickOutside = useCallback((event) => {
        // We need robust checks since IDs are used for existing styles/scripts
        const isDateClick = event.target.closest('#next7DaysDropdown');
        const isTimeClick = event.target.closest('#customDropdown');
        
        if (!isDateClick) {
            setIsDateDropdownOpen(false);
        }
        if (!isTimeClick) {
            setIsTimeDropdownOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    // Derived values for display
    const dateDisplay = selectedDate || 'Block a date';
    const timeDisplay = selectedTime || 'Block a timeslot';

    return (
        <div className="row">
            {/* Date Dropdown Column */}
            <div className="col-md-6">
                <div className="single-personal-info">
                    <label htmlFor="next7Days">Date:</label>
                    <div 
                        className="dropdown-date relative" 
                        id="next7DaysDropdown" // Used for outside click detection
                    >
                        {/* Button: Displays selected date or default text */}
                        <div 
                            className="dropdown-button-1 border-only w-full text-left p-2 cursor-pointer" 
                            id="msg_date" 
                            onClick={toggleDateDropdown}
                        >
                            {dateDisplay}
                        </div>
                        
                        {/* Dropdown Content: Visibility controlled by state */}
                        <div 
                
                            className={`dropdown-content-1 text-center p-2 ${isDateDropdownOpen ? 'show' : ''}`}
                            id="next7DaysDropdownContent"
                            style={{ display: isDateDropdownOpen ? 'block' : 'none' }} 
                        >
                            {getNext7Days.map((date) => (
                                <div
                                    key={date}
                                    // className="p-2 cursor-pointer hover:bg-gray-100"
                                    className="dropdown-option-1 mt-1 mb-2"
                                    onClick={() => handleDateSelect(date)}

                                    
                                >
                                    {date}
                                </div>
                            ))}
                        </div>
                    </div> 
                </div>
            </div>

            {/* Time Dropdown Column */}
            <div className="col-md-6">
                <div className="single-personal-info">
                    <label htmlFor="time">Time:</label>
                    <div 
                        className="dropdown-time relative" 
                        id="customDropdown" // Used for outside click detection
                    >
                        
                        <div 
                            className="dropdown-button-2 border-only w-full text-left p-2 cursor-pointer" 
                            id="msg_time" 
                            onClick={toggleTimeDropdown}
                        >
                            {timeDisplay}
                        </div>
                        
                        <div 
                            
                            className={`dropdown-content-2 text-justify p-4 mw-50 ${isTimeDropdownOpen ? 'show' : ''}`} 
                            id="dropdownContents"
                            style={{ display: isTimeDropdownOpen ? 'block' : 'none' }} 
                        >
                            {timeSlots.map((time) => (
                                <div
                                    key={time}
                                    className="dropdown-option-1 mt-1 mb-2"
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    {time}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateTimeDropdowns;
