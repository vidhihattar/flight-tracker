// src/App.js
import React from 'react';
import './App.css';
import FlightStatus from "./Components/FlightStatus";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <FlightStatus />
            </header>
        </div>
    );
}

export default App;
