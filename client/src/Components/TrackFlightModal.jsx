// src/Modal.js
import React from 'react';
import '../styles/TrackFlightModal.css';

const Modal = ({ isOpen, onClose, onSubmit }) => {
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
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
