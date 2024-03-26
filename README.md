# Weather Dashboard Application ReadMe

## Overview

This Weather Dashboard application fetches weather data from a public API like OpenWeatherMap and displays it to users. The backend is responsible for retrieving the data, while the frontend presents it to the users. The app includes containerization for each service, orchestration with Kubernetes, a CI/CD pipeline for automated deployment, and is hosted on AWS, utilizing Elastic Beanstalk for the backend and S3 for the frontend. Monitoring and logging are also implemented to ensure performance and reliability.

## Technologies Used

- Backend: Python
- Frontend: HTML, JS and CSS
- Containerization: Docker
- Deployment: AWS Elastic Beanstalk for backend, AWS S3 for frontend
- CI/CD: Implementing a continuous integration and continuous deployment pipeline
- Monitoring: Setting up monitoring tools for performance tracking
- Logging: Configuring logging mechanisms for error tracking

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/geekymahar/Weather-Forcast-App
   ```

2. Install dependencies for backend and frontend:
   ```
   cd /backend/src
   pip install -r requirements.txt    # For Python backend

   ```

3. Start the backend server:
   ```
   cd /backend/src
   python app.py    # For Python backend
   ```

5. Access the application in your browser at `./frontend/index.html`.
