const mongodb = require('mongodb') // Import Mongodb libraries
const bcrypt = require('bcrypt'); // Import bcrypt libraries

// UserSchema has been created
const userSchema = new mongodb.Schema({ 
    username: {type:String, required: true},
    email: {type:String, required: true, unique: true },
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at:{ type: Date, default: Date.now}
})


// Hash the password before saving the user
userSchema.pre('save', async function(next){
    if(this.isModified('password')){ // Checks if the password is modified or been created for the first time
        this.password = await bcrypt.hash(this.password, 10); // Hash the password using bcrypt
    }
    next(); // Moves on to the next middleWare
})

// Exporting the user model based on the defined schema so it can be used in other parts of the application
module.exports = mongodb.model('User', userSchema);
