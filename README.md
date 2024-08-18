##TechNest Backend
This repository contains the backend code for the TechNest e-commerce platform. Built using the MERN stack, the backend handles data management, API endpoints, authentication, and other server-side functionalities required to power the TechNest platform.

##Features
- RESTful API: Provides endpoints for product data, user authentication, and more.
- Data Management: Handles CRUD operations for products, including creating, reading, updating, and deleting products in the MongoDB database.
- Pagination Support: Efficiently loads product data with pagination to enhance performance and user experience.
- Search and Filtering: Supports search functionality by product name and filtering by category, brand, and price range.
- Sorting: Allows sorting of products by price and date added.
- Authentication: Implements user authentication via Firebase, including Google and email/password login.
- Clean Codebase: Organized and well-commented code following best practices to ensure maintainability and scalability.

##Setup Instructions
**Clone the Repository**:
- Clone the repository to your local machine using Git.Navigate to the project directory after cloning.
**Install Dependencies**:
- Install all the required dependencies using npm install.
**Environment Variables**:
- Create a .env file in the root directory.
Add the following environment variables:
MONGO_URI: Your MongoDB connection string.
FIREBASE_API_KEY: Your Firebase API key.
FIREBASE_AUTH_DOMAIN: Your Firebase auth domain.
PORT: The port number for the server (default: 5000).

##Run the Server:

Start the server using npm start.

##API Endpoints
- GET /api/products: Fetch all products with pagination, sorting, and filtering.
