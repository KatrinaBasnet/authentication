 React + PHP Authentication System – Project Documentation

Project Overview:
~Frontend: React (Vite)
~Backend: PHP
~Database: MySQL
~Authentication: PHP Sessions
~Data Logs: Signup + Login + Logout + Logs Display


 Key Features:
~Signup form with real-time validation
~Login with session-based authentication
~Logout functionality
~Displays login logs in dashboard
~Unauthorized access handling
~Styled using Bootstrap


Database Structure:
Database Name : auth_system
~Table: users
id INT AUTO_INCREMENT PRIMARY KEY  
email VARCHAR
password VARCHAR
created_at Auto-filled with current timestamp
~Table: login_logs
id INT AUTO_INCREMENT PRIMARY KEY  
user_id INT  FOREIGN KEY users.id
email VARCHAR
login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP  


Backend (PHP API)
1.signup.php 
Accepts JSON POST (email, password)
Validates and inserts new user into DB
Returns success or error message

2.login.php
Accepts credentials, validates against DB
Starts session and logs login

3.logout.php
Destroys session and clears login state

4.get_logins.php
Requires active session
Returns all user login logs for dashboard
 
5.db.php
Establishes  connection between the backend PHP scripts and MySQL database (auth_system)


Frontend (React):
1.Signup.jsx 
Inputs for email and password
Axios POST to signup.php
Displays success or error messages

2.Login.jsx
Form input for email and password
Axios POST to login.php
On success, stores session ID and redirects to dashboard
Displays success or error messages 

3.Dashboard.jsx
Checks session and fetches login logs
Logout button calls logout.php