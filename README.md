# LuxeClean-appp
Muhammad Hasnain Sohail

Project Name: LuxeClean

## Installation
To set up and run LuxeClean, follow these steps to get everything up and running.

1. Install Node.js Dependencies
First, install the required Node.js dependencies by running the following command in your project directory:

npm install
npm install express
npm install ejs
npm install mysql
npm install dotenv
npm install bcryptjs

This will install all the necessary packages for the Node.js backend, including the server setup, database connection, and encryption utilities.

2. Set up the Python Flask API
LuxeClean uses a Python Flask API for AI-based recommendations and backend interactions. To get the API up and running, follow these steps:

## Install Python Dependencies
If you haven't already, you need to install Python and pip (Python's package manager). Then, you can install the required Python libraries:

pip install flask
pip install flask-cors
pip install scikit-learn  # For the machine learning model
pip install numpy pandas  # For data handling in the model
Set up the Flask Environment
Make sure you have your Flask app ready. The main file should be something like recommendation_api.py. Make sure this file is in the correct directory.

Add a .env file to configure environment variables like the port, database credentials, or any secrets needed for the model:

Example .env file:

FLASK_APP=recommendation_api.py
FLASK_ENV=development
DATABASE_URL=your-database-url
Run the Flask API
To run the Flask API locally, use this command:

flask run
The Flask server will be available on http://127.0.0.1:5050.

## Usage
Here’s how to get LuxeClean running:

1. Set up the MySQL Database
You’ll need to set up a MySQL database to store user data and service information. Run these SQL files:

Log into MySQL:

sudo mysql
Create the database:

source create_db.sql;
Insert test data :

source insert_test_data.sql;
2. Start the Server
Node.js Backend
Once the database is set up, you can start the Node.js backend with this command:


node index.js
This will launch the main server and allow users to interact with the app at http://localhost:8000 (or whatever port you have configured).

Flask API
To start the Flask API, navigate to your recommendation_api.py file directory and run:


flask run
This starts the Flask server, typically on http://127.0.0.1:5050.

Alternative Deployment (For Virtual Servers)
If you want to deploy LuxeClean on a virtual server, follow these steps:

Clone the Repository:

git clone https://github.com/husnainnn1/LuxeClean-appp.git
cd luxeclean
Install Dependencies for Node.js:

npm install
Set up MySQL Database (run create_db.sql and insert_test_data.sql as described earlier).

Run the Node.js Server:

node index.js
Run the Flask API :

flask run
Now, LuxeClean should be up and running on your virtual server!

## Features
1. User Registration
LuxeClean provides a secure way for new users to register for an account and access personalized services.

2. User Login and Logout
Users can easily log in and log out of their accounts. The system uses secure password hashing to ensure privacy.

3. Homepage with Navigation
The app features a clean and intuitive homepage, allowing users to navigate to different pages, including services and pricing.

4. Pricing Page with eco-friendly options
LuxeClean’s pricing page includes all the service options, including eco-friendly options and special services, along with detailed pricing for each item.

5. AI-based Cleaning Recommendation
LuxeClean’s AI-driven recommendation system helps users pick the right service for their specific needs. It’s powered by the Python Flask API, which uses machine learning to analyze user input and recommend the best services.

6. Service Search
Users can search for specific services within the app, making it easy to find what they need quickly.

7. Order Management
Users can manage their orders, track status, and view delivery or pickup schedules from their dashboard.

8. Public API Integration
The app can access publicly available APIs to enhance features, such as providing real-time weather data or fetching promotions and discounts.

9. MySQL Database Storage
All user and application data is stored in a MySQL database, ensuring data is reliable and accessible at all times.
