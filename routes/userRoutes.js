const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userControllers');


// ------------------------- Get Requests -----------------------

// Route to the sign-up page
router.get('/signup', userController.signup);

// Route to the sign-in page
router.get('/signin', userController.signin);

// Route to sign out, requires authentication
router.get('/signout', passport.checkAuthentication, userController.signout);

// Route to download a CSV file, requires authentication
router.get('/download-csv', passport.checkAuthentication, userController.downloadCsv);


// ------------------------- Post Request -----------------------

// Route to create a new user
router.post('/create', userController.createUser);

// Route to create a user session using local authentication strategy
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/users/signin' }), userController.createSession);

// Export the router for use in other parts of the application
module.exports = router;
