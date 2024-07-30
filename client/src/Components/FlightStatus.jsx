import React, { useEffect, useState } from 'react';
import Modal from './TrackFlightModal';
import '../styles/FlightStatus.css';

function FlightStatus() {
    const [flights, setFlights] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/flights')
            .then(response => response.json())
            .then(data => setFlights(data))
            .catch(error => console.error('Error fetching flight data:', error));
    }, []);

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'on time':
                return 'status-on-time';
            case 'delayed':
                return 'status-delayed';
            case 'cancelled':
                return 'status-cancelled';
            default:
                return '';
        }
    };

    const handleTrackClick = (flight) => {
        setSelectedFlight(flight);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFlight(null);
    };

    const handleSubmitEmail = async (email) => {
        if (!selectedFlight) return;

        try {
            const response = await fetch('http://localhost:3000/get-updates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    flightId: selectedFlight.flight_id,
                    userEmail: email,
                }),
            });

            const data = await response.json();
            console.log(data);
            handleCloseModal();
        } catch (error) {
            console.error('Error submitting email:', error);
        }
    };

    return (
        <div>
            <header>
                <h1>Flight Status</h1>
            </header>
            <div className="container">
                {flights.length > 0 ? (
                    <ul>
                        {flights.map(flight => (
                            <li key={flight.flight_id} className={getStatusClass(flight.status)}>
                                <strong className='airline-name'>
                                    <span>Airline</span>
                                    <span>{flight.airline}</span>
                                </strong>
                                <strong className='flight-id'>
                                    <span>Flight ID</span>
                                    <span>{flight.flight_id}</span>
                                </strong>
                                <strong className={`flight-status ${getStatusClass(flight.status)}`}>
                                    <span>Status</span>
                                    <span>{flight.status}</span>
                                </strong>
                                <strong className='departure-gate'>
                                    <span>Departure Gate</span>
                                    <span>{flight.departure_gate}</span>
                                </strong>
                                <strong className='arrival-gate'>
                                    <span>Arrival Gate</span>
                                    <span>{flight.arrival_gate}</span>
                                </strong>
                                <strong className='scheduled-departure'>
                                    <span>Scheduled Departure</span>
                                    <span>{new Date(flight.scheduled_departure).toLocaleString()}</span>
                                </strong>
                                <strong className='scheduled-arrival'>
                                    <span>Scheduled Arrival</span>
                                    <span>{new Date(flight.scheduled_arrival).toLocaleString()}</span>
                                </strong>
                                <strong className='actual-departure'>
                                    <span>Actual Departure</span>
                                    <span>{flight.actual_departure ? new Date(flight.actual_departure).toLocaleString() : 'N/A'}</span>
                                </strong>
                                <strong className='actual-arrival'>
                                    <span>Actual Arrival</span>
                                    <span>{flight.actual_arrival ? new Date(flight.actual_arrival).toLocaleString() : 'N/A'}</span>
                                </strong>
                                <strong className='track-flight'>
                                    <button onClick={() => handleTrackClick(flight)}>Track this Flight</button>
                                </strong>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No flight data available.</p>
                )}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitEmail}
                selectedFlight={selectedFlight}
            />
        </div>
    );
}

export default FlightStatus;
