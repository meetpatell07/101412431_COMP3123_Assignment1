const mongoose =  require('mongoose')

// Model/ Database for Employee 
const empSchema = new mongoose.Schema({
    empid : {type:mongoose.ObjectId, required: true},
    first_name : {type: String, requried: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    position: {type: String, required: true},
    salary: {type: Number, required: true},
    date_of_joining: {type: Date, required: true},
    department: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}

})

// Export the Employee model to use in other parts of application
const Employee = mongoose.model('Employee', empSchema)
module.exports = Employee;
