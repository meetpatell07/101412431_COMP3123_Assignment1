const express = require('express');
const SERVER_PORT = process.env.port || 3000;
const employeeRoutes = require('./routes/empmanagement')

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/comp3123_assignment1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Error connecting to MongoDB:', error));

// Use Employee Routes
app.use('/api/v1/emp', employeeRoutes);

app.listen(SERVER_PORT, () => {
    console.log("The server is running is on port 3000")
})