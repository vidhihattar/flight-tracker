# flight-tracker

This Flight Tracker application allows users to monitor the status of flights in real-time. Users can track flights, receive notifications about flight updates, and get real-time information via email.

Key Features

Flight Status Display:
Home Page: Displays a list of flights with their statuses (e.g., on time, delayed, cancelled), departure and arrival gates, scheduled and actual departure/arrival times.
Flight Details: Provides detailed information about each flight, including airline, flight ID, status, departure and arrival gates, scheduled and actual times.
Real-Time Tracking:
Users can track a flight by clicking a "Track this Flight" button associated with each flight.
Email Notifications:
Users receive email notifications about flight updates. When tracking a flight, users can input their email address, which is then used to send notifications about changes to the flight’s status.
Backend:
APIs:
GET /flights: Fetches a list of all flights and their statuses.
POST /get-updates: Allows users to track a flight by sending their email address and receiving updates about the flight via email.
Database:
Flight Collection: Stores information about flights.
Notification Collection: Stores notification messages related to flights.
Email Service Integration:
Utilizes SendGrid to send email notifications to users.

Technical Details

Frontend:
Built with React.
Displays flight information in a user-friendly format.
Modal implementation for user email input when tracking a flight.
Backend:
Implemented with Node.js and Express.
Connects to MongoDB for data storage.
Uses dotenv for environment variable management.
Sends email notifications using SendGrid API.
Database:
Flight Schema: Stores flight details such as flight ID, airline, status, departure and arrival gates, and scheduled times.
Notification Schema: Stores notification details like notification ID, flight ID, message, timestamp, method, and recipient email.
The project is managed via Git branches, and sensitive data is protected with .gitignore to avoid accidental pushes.
Security:
Sensitive information such as API keys is kept out of version control using environment variables and .gitignore.

Steps to Get It Running

Clone the Repository:
sh
Copy code
git clone https://github.com/vidhihattar/flight-tracker.git
cd flight-tracker
Install Dependencies:
sh
Copy code
npm install
Configure Environment Variables:
Create a .env file in the root directory.
Add the environment variables for MongoDB URI and SendGrid API key.
Run the Application:
Start the backend server:
npm run dev
Start the frontend application:
npm start


