const express = require('express');
const mongoose = require('mongoose'); // Mongoose for MongoDB connection
const employeeRoutes = require('./routes/empmanagement')
const userRoutes = require('./routes/usermanagement')
const dotenv = require('dotenv'); // dotenv to load environment variables
const cors = require('cors');
dotenv.config(); // Load variables from .env file


const SERVER_PORT = process.env.port || 3000;
const MONGO_URI = process.env.MONGO_URI;


const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Assignment_01!');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error('An error occurred:', err); // Log the error
    res.status(500).json({ message: 'Internal Server Error' }); // Send a generic error response
});

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,  
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Error connecting to MongoDB:', error));

// MongoDB connection
// mongoose.connect('mongodb://localhost:27017/comp3123_assignment1', {
//     useNewUrlParser: true,  
//     useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((error) => console.log('Error connecting to MongoDB:', error));

// Use Employee Routes
app.use('/api/v1/emp', employeeRoutes);
app.use('/api/v1/user', userRoutes )

app.listen(SERVER_PORT, () => {
    console.log("The server is running is on port 3000")
})