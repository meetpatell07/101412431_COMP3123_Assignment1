const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee'); // Import Employee Model


// GET all employees
/*
    This endpoint (GET /employees) retrieves all employee records from the database and sends them in the response.
    If the operation fails, an error message is sent back.
 */
router.get('/employees', async (req, res) => {

    try{
        const employees = await Employee.find() // Get all the employees from Database schema
        res.status(200).json(employees); // return the employee data as JSON with 200 status code.
    } catch(error){
        res.status(500).json({message: 'Error', error})
    }
});

// POST to create a employee
/*
    This endpoint (POST/ employees create a empoyee record in the database. )
    so, it extracts the employee details from the rrquest body and return a created employee
*/
router.post('/employees', async (req, res) => {
    const {first_name, last_name, email, position, salary, date_of_joining, department } = req.body

    try{
        const newEmployee = new Employee({ // create a new instane of employee model with the given data
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        })

        const empcreated = await newEmployee.save(); // Save the created employee to the database
        res.status(201).json({message: 'Employee Created Successfully', Employee: empcreated }) // Respond with status code and Employee JSON DATA
    }catch(error){
        res.status(400).json({ message: 'Error', error }); // return status 400 (Bad Request) with an error message
    }
})

/*
    This endpoint fethces a employee with a specific ID
    If it was a success then return a data, otherwise error
*/
router.get('/employees/:eid', async (req, res) => {
    const {eid} = req.params; // Get the employee ID from the route parameter
    try{
        const employee = await Employee.findById(eid); // Find the employee by ID
        if(employee){ // If the employee id exists, then return the employee 
            res.status(200).json(employee);
        } else{// Else throw an error
            res.status(404).json({message: 'Employee not found'});
        }
    } catch(error){
        res.status(500).json({ message: 'Error fetching employee', error });
    }
})

/*
    This endpoint upates a employee details with a specific ID
    It takes the updated data from the request body and ID from the parameter and return the updaed employee
*/
router.put('/employees/:eid', async (req, res) => {
    const {eid} = req.params;
    const updatedData = req.body; // Get the updated Data

    try{
        const EmployeeUpdated = await Employee.findByIdAndUpdate(eid, updatedData, {new: true}); // FInd the Employee and Update it

        if(EmployeeUpdated){
            res.status(200).json({message: ' Employee Update Sucessfully'})
        } else{
            res.status(404).json({message: 'Employee Not Found'})
        }
    } catch(error){
        res.status(500).json({ message: 'Error updating employee', error });    }
});

/*
    This endpoint Delete the employee from the Database using the empId
    It returns a 204 status if successful, and 404 if the employee isn't found.

*/
router.delete('/employees/:eid', async (req, res) => {
    const {eid} = req.params;

    try{
        const deleteEmployee = await Employee.findByIdAndDelete(eid);
        if(deleteEmployee){
            res.status(204).json({ message: 'Employee deleted successfully' }); // Return status 204 (No Content) if the deletion is successful
        }else{
            res.status(404).json({message: 'Employee Not Found'});
        }
    } catch(error){
        res.status(500).json({ message: 'Error deleting employee', error }); 
    }
})
module.exports = router;
