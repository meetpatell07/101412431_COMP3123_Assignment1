const mongoose = require('mongoose') // Import Mongodb libraries

// UserSchema has been created
const userSchema = new mongoose.Schema({ 
    username: {type:String, required: true, unique: true},
    email: {type:String, required: true, unique: true },
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at:{ type: Date, default: Date.now}
})

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
