# E-Services for Gram Panchayat

## Overview
The E-Services for Gram Panchayat project aims to streamline and digitize the delivery of citizen services in villages by creating a web application that facilitates online applications, real-time tracking, Payments and efficient management of Gram Panchayat services. This system empowers citizens to access government services conveniently while enabling staff and officers to manage applications effectively.

---

## Features

### **User**
- **Register**: Sign up to create a user account.
- **Login**: Securely log in to the system.
- **Search Services**: Browse available Gram Panchayat services.
- **Apply Services**: Submit applications for services online.
- **Make Payment**: Make payment using secure stripe payment system.
- **Profile Application **: Track the status of submitted applications.
- **Logout**: Log out from the system.

### **Staff**
- **Login**: Securely log in to the system.
- **View Services**: Access a list of available services.
- **Update Application Status**: Manage and update the status of citizen applications.

### **Officer/Admin**
- **Login**: Securely log in to the system.
- **Create Services**: Add new services for public access.
- **Update/Delete Services**: Modify or remove existing services.
- **Update Application Status**: Manage and track the status of user applications.
- **Logout**: Log out from the system.

### Additional Features
- **Search Feature**: Users can search for services easily.
- **Role-Based View and Features**: Tailored access and features for Users, Staff, and Admin roles.
- **Responsive Design**: Fully optimized for various devices.
- **Authentication**: Firebase for secure login and session management.
- **State Management**: React-Redux Toolkit for efficient state handling.
- **Document Upload**: Integration with Cloudinary for file uploads.

---

## Technologies Used

### **Frontend**
- **React.js**: For building the user interface.
- **React-Router**: For routing and navigation.
- **React-Redux Toolkit**: For state management.

### **Backend**
- **Firebase**: For database, authentication, and backend services.
- **Nodejs**: For Payment related tasks.
  
### **Other Tools**
- **Stripe**: For Payment System integration.
- **Cloudinary**: For document upload and storage.
- **CSS/Responsive Design**: For a user-friendly interface.

---

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/username/e-services-gram-panchayat.git
   cd e-services-gram-panchayat
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Firebase**
   - Create a Firebase project.
   - Enable authentication and Firestore.
   - Add your Firebase configuration in a `.env` file:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

4. **Set Up Cloudinary**
   - Create a Cloudinary account.
   - Add your Cloudinary API details in the `.env` file:
     ```env
     REACT_APP_CLOUDINARY_URL=your_cloudinary_url
     ```

5. **Run the Application**
   ```bash
   npm start
   ```

6. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

```plaintext
src/
|-- components/        # Reusable React components
|-- pages/             # Page-level components (e.g., Login, Dashboard)
|-- redux/             # Redux slices and store configuration
|-- services/          # API service functions
|-- utils/             # Utility functions
|-- features/          # React-readux toolkit states
|-- App.js             # Main application component
|-- index.js           # Entry point
```

---

## Usage

1. **Users**: Register or log in to apply for services and track applications.
2. **Staff**: Log in to view and update application statuses.
3. **Officers/Admins**: Manage services and oversee application progress.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push your changes:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.
   
