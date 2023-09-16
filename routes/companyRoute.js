const express = require('express');
const passport = require('passport');
const companyController = require('../controllers/companyController');
const router = express.Router();


// -------- Get requests ----------

// Route to the company home page, requires authentication
router.get('/home', passport.checkAuthentication, companyController.companyPage);

// Route to allocate interviews, requires authentication
router.get('/allocate', passport.checkAuthentication, companyController.allocateInterview);


// -------- Post Requests ---------

// Route to schedule an interview, requires authentication
router.post('/schedule-interview', passport.checkAuthentication, companyController.scheduleInterview);

// Route to update the status of an interview, requires authentication
router.post('/update-status/:id', passport.checkAuthentication, companyController.updateStatus);

// Export the router for use in other parts of the application
module.exports = router;
