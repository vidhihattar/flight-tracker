import React, { useEffect, useState } from 'react';
import '../styles/TrackFlightModal.css';

const Modal = ({ isOpen, onClose, onSubmit, selectedFlight }) => {
    const [flightId, setFlightId] = useState('');

    useEffect(() => {
        if (selectedFlight) {
            setFlightId(selectedFlight.flight_id);
        }
    }, [selectedFlight]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        onSubmit(email);
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Track Flight</h2>
                <h3>{flightId}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <input type="email" id="email" name="email" required placeholder="johnSmith@xyz.com" />
                            <div className="svg-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
