# Simplified Dropbox Backend

This is the backend service for the Simplified Dropbox project. It provides RESTful APIs to handle file uploads, downloads, and file metadata management.

## Features
- Upload files (supports `image/png`, `image/jpeg`, `text/plain`, `application/json`).
- Get a list of all uploaded files.
- Download files by their unique ID.
- View file details (metadata such as name, type, size, etc.).

## Technologies Used
- **Framework**: Node.js with Express.js
- **Database**: MongoDB (with Mongoose)
- **Storage**: Local filesystem
- **Others**: Multer for file uploads, Path for file management

## API Endpoints

### 1. **Upload File**
   - **Endpoint**: `/upload`
   - **Method**: `POST`
   - **Description**: Uploads a file and saves its metadata to the database.
   - **Headers**: 
     - `Content-Type: multipart/form-data`
   - **Request Body**:
     - `file` (required): File to upload.
   - **Response**:
     ```json
     {
       "message": "File uploaded successfully",
       "file": {
         "name": "example.txt",
         "mimetype": "text/plain",
         "size": 12345
       }
     }
     ```

### 2. **Get List of Files**
   - **Endpoint**: `/getfiles`
   - **Method**: `GET`
   - **Description**: Retrieves metadata of all uploaded files.
   - **Response**:
     ```json
     [
       {
         "_id": "63b2c9e4...",
         "name": "example.txt",
         "mimetype": "text/plain",
         "size": 12345,
         "createdAt": "2024-12-15T10:00:00Z"
       }
     ]
     ```

### 3. **Download File**
   - **Endpoint**: `/download/:id`
   - **Method**: `GET`
   - **Description**: Downloads a file by its ID.
   - **Response**: File is downloaded to the client.

### 4. **Get File Details**
   - **Endpoint**: `/download/:id`
   - **Method**: `GET`
   - **Description**: Fetches metadata of a specific file by its ID.
   - **Response**:
     ```json
     {
       "id": "63b2c9e4...",
       "name": "example.txt",
       "mimetype": "text/plain",
       "size": 12345,
       "createdAt": "2024-12-15T10:00:00Z",
       "updatedAt": "2024-12-15T10:00:00Z"
     }
     ```

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB instance running.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Mallikarjuna-naik/dropbox-backend.git
   cd dropbox-backend

### Directory Structure
dropbox-clone-backend
│
├── uploads  # Folder for storing uploaded files (create this manually or programmatically)
├── src      # Source code
│   ├── controllers
│   │   └── fileController.ts
│   ├── middleware
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   ├── fileTypeValidator.ts
│   │   └── logger.ts
│   ├── models
│   │   └── fileModel.ts
│   ├── routes
│   │   └── fileRoutes.ts
│   ├── services
│   │   └── dbService.ts
│   ├── .env    # Environment variables
│   ├── app.ts  # Express app setup
│   └── server.ts  # Server entry point
├── tsconfig.json  # TypeScript config
└── package.json  # Project metadata

# Dropbox Clone Backend

## Installation

### Install Dependencies
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dropbox-backend.git
   cd dropbox-backend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

### Create an `.env` File
1. Create a `.env` file in the root directory of your project and add the following environment variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/simplified-dropbox
   UPLOAD_DIR=uploads
   ```

2. Update the `MONGO_URI` if you are using a hosted MongoDB service such as MongoDB Atlas.

### Start the Server
1. Start the backend server:
   ```bash
   npm start
   ```

2. The backend service will be available at:
   ```
   http://localhost:3000
   ```

---

### Directory Structure
```
dropbox-clone-backend
│
├── uploads  # Folder for storing uploaded files (create this manually or programmatically)
├── src      # Source code
│   ├── controllers
│   │   └── fileController.ts
│   ├── middleware
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   ├── fileTypeValidator.ts
│   │   └── logger.ts
│   ├── models
│   │   └── fileModel.ts
│   ├── routes
│   │   └── fileRoutes.ts
│   ├── services
│   │   └── dbService.ts
│   ├── .env    # Environment variables
│   ├── app.ts  # Express app setup
│   └── server.ts  # Server entry point
├── tsconfig.json  # TypeScript config
└── package.json  # Project metadata
```

