const express = require('express');
const router = express.Router();

// Import routes for different parts of the application
const userRoutes = require('./userRoutes'); 
const studentRoutes = require('./studentRoute');
const homeController = require('../controllers/homeController');
const companyRoutes = require('./companyRoute');
const passport = require('passport');

// Route to the home page, requires authentication
router.get('/', passport.checkAuthentication, homeController.homePage);

// Use the imported routes for user, student, and company routes
router.use('/users', userRoutes);
router.use('/students', studentRoutes);
router.use('/company', companyRoutes);

// Export the router for use in other parts of the application
module.exports = router;
