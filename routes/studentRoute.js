const express = require('express');
const passport = require('passport');
const router = express.Router();
const studentController = require('../controllers/studentController');


// ------------------ Get requests ------------

// Route to create a new student, requires authentication
router.get('/create', passport.checkAuthentication, studentController.createStudentPage);

// Route to delete a student by ID, requires authentication
router.get('/delete/:id', passport.checkAuthentication, studentController.deleteStudent);


// ------------------- Posts Requests ----------

// Route to handle the creation of a new student, requires authentication
router.post('/create-student', passport.checkAuthentication, studentController.createStudent);

// Export the router for use in other parts of the application
module.exports = router;
