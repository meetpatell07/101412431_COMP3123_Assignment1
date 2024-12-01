const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const router = express.Router(); // a new router object created
const jwt = require('jsonwebtoken'); // Import JWT for token generation
const { validationResult } = require('express-validator');

const SECRET_KEY='3b8e7f5cbe0de89f5b5375e60f739d5463c8c60f8923462039ccf8d09c4f31c2';


router.post('/signup', async (req, res) => {

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
    }
    
    const { username, email, password } = req.body; // Destruct the request body to get username, email and pssword from the request body
    try {

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword }); // Create a new instance with provided username, email and password
        await newUser.save(); // Save it to database

        res.status(201).json({ message: 'User created successfully.', user_id: newUser._id }); 
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error }); // Throws an error while creation
    }
});

router.post('/login', async (req, res) => {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ status: false, errors: errors.array() });
      }
  
      const { email, password } = req.body; // Get the login details from the request bodt
      try {

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            SECRET_KEY, // Secret key
            { expiresIn: '1h' } // Token expiration
        );
  
        //   const ulser = await User.findOne({ email }); // Find the user using the username  
  
        // Compare the provided password with the hashed password in the database

        //   if (!user || !(await bcrypt.compare(password, user.password))) {
        //       return res.status(400).json({ status: false, message: 'Invalid Username or password' });
        //   }
          
          res.status(200).json({ message: 'Login successful.', token });
      } catch (error) {
          res.status(500).json({ message: 'Error logging in', error });
      }
});


// Middleware for Protected Routes
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) {
        return res.status(403).json({ message: 'Access denied.' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }

        req.user = user; // Attach the user object to the request
        next();
    });
};

// Example Protected Route
router.get('/protected', authenticateToken, async (req, res) => {
    res.status(200).json({ message: 'Access granted to protected route.', user: req.user });
});

module.exports = router;


// SignUp Function
// router.signup = async (req, res) => {

//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ status: false, errors: errors.array() });
//     }
    
//     const { username, email, password } = req.body; // Destruct the request body to get username, email and pssword from the request body
//     try {
//         const newUser = new User({ username, email, password }); // Create a new instance with provided username, email and password

//         await newUser.save(); // Save it to database

//         res.status(201).json({ message: 'User created successfully.', user_id: newUser._id }); 
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating user', error }); // Throws an error while creation
//     }
// };