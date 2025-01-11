Financial Data Filtering App
A responsive web application for filtering, sorting, and displaying financial data for companies using the Financial Modeling Prep (FMP) API. The app allows users to interact with data by filtering it based on revenue, net income, and date ranges, and also provides sorting functionality for ease of analysis.


Features
Fetches real-time financial data from the FMP API.
Displays data in an elegant, responsive table.
Filtering options:
Date Range (using a calendar picker).
Revenue and Net Income (user-specified ranges).
Sorting options:
Sort by Date, Revenue, or Net Income (ascending/descending).
Fully responsive design with a beautiful UI built using Tailwind CSS.
Demo
Check out the live application: [Financial Data Filtering App](https://calm-mandazi-18aac2.netlify.app/)

Run the Project Locally
Prerequisites
Ensure you have the following installed:

Node.js (v16 or later)
npm (comes with Node.js)
Steps
Clone the Repository

git clone https://github.com/krishhhr/Financial-Data-Filtering-App.git  
cd Financial-Data-Filtering-App  
Set Up Environment Variables
Create a .env file in the root of the project and add your FMP API key:

REACT_APP_API_KEY=your-api-key-here  
Install Dependencies
Run the following command to install all necessary packages:

npm install  
Run the Application
Start the development server:

npm start  
The application will be available at http://localhost:3000.

Build for Production
To create an optimized build for deployment:

npm run build  
Tech Stack
Frontend: React, Tailwind CSS
API: Financial Modeling Prep (FMP) API
Deployment: [[Netlify](https://www.netlify.com/)]
Deployed App
You can access the deployed app here: [Financial Data Filtering App](https://calm-mandazi-18aac2.netlify.app/)

Screenshots
Home Screen
<img width="1710" alt="image" src="https://github.com/user-attachments/assets/f69365a6-db37-47aa-af57-66e481e69fb1" />


Filter and Sort Options
<img width="1710" alt="image" src="https://github.com/user-attachments/assets/a5e5cda9-e0ee-4760-8ba7-20f8a0d6923e" />


License
This project is licensed under the MIT License.
