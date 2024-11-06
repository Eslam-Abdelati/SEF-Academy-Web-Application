# SEF Academy Web Application

## Overview
This project is a web application developed for *SEF Academy*, designed to provide a comprehensive set of tools for both students and instructors. The platform includes course management, academic progress tracking, interactive quizzes, job listings, internship opportunities, and access to scientific articles across various fields.

*Technologies Used:*
- *Node.js*  
- *Express.js*  
- *MongoDB*  
- *RESTful APIs*  
- *JWT Authentication & Authorization*

## Features
- *Course Management*: Students can view and manage their courses, and instructors can create and edit courses.
- *Progress Tracking*: Students can track their academic progress.
- *Interactive Quizzes*: The platform allows students to take quizzes and get feedback.
- *Job Listings & Internships*: Provides students with internship and job opportunities to apply for.
- *Scientific Articles*: Access to educational content and scientific articles across various disciplines.

## Installation & Setup

### Prerequisites:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (or MongoDB Atlas)

### Installation Steps:
1. Clone the repository:
    bash
    git clone https://github.com/Eslam-Abdelati/sef-academy-web-app.git
    cd sef-academy-web-app
    

2. Install dependencies:
    bash
    npm install
    

3. Configure environment variables:
    - Create a .env file in the root directory and set the following environment variables:
    bash
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/sef-academy
    JWT_SECRET=your_jwt_secret_key
    

4. Start the application:
    bash
    npm start
    

### Running Tests:
To run tests for the application:
```bash
npm test
