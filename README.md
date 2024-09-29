
# Employee Management System

This repository contains a full-stack Employee Management System with a **React (Vite)** frontend and a **Django** backend. The system allows administrators to perform CRUD (Create, Read, Update, Delete) operations on employee records, with validation and authentication mechanisms to ensure data security.

## Features
- **Frontend (React with Vite)**:
  - Modern, fast, and responsive user interface built with React.
  - Integrated with React Router for page navigation.
  - Context API used for state management.
  - Form handling for employee data input with validation.
  - Axios-based API calls to communicate with the Django backend.

- **Backend (Django)**:
  - RESTful API built with Django and Django REST Framework (DRF).
  - Secure authentication and user management.
  - CRUD operations for employee records.
  - Database management with SQLite (or switchable to other databases like MySQL/PostgreSQL).
  - Error handling and response validation.

## Technologies Used
- **Frontend**:
  - React (Vite)
  - Tailwind CSS (for styling)
  - Axios (for HTTP requests)
  - React Router (for navigation)
  
- **Backend**:
  - Django
  - Django REST Framework (DRF)
  - SQLite (can be changed to MySQL/PostgreSQL)

## Project Structure
- **Frontend**: Located in the `empfront/` folder, built using React and Vite.
- **Backend**: Located in the `empback/` folder, developed using Django and Django REST Framework.

## How to Run Locally

### Backend (Django)
1. Clone the repository:
   ```bash
   git clone https://github.com/KISHOREBM/Employee_Management.git
   cd Employee_Management/empbackend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run migrations:
   ```bash
   python manage.py migrate
   ```
4. Start the Django server:
   ```bash
   python manage.py runserver
   ```

### Frontend (React with Vite)
1. Navigate to the frontend folder:
   ```bash
   cd ../empfront
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Contribution
Feel free to submit issues or pull requests to improve the project.

## License
This project is licensed under the MIT License.

---

You can modify this description based on your specific project setup and requirements.
