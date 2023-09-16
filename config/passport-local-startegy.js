// Import necessary modules
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Import the User model from the userSchema file
const User = require("../models/userSchema");

// Define a local strategy for authentication
const local = new LocalStrategy({ usernameField: "email" }, function (email, password, done) {
    // Find a user with the provided email in the database
    User.findOne({ email }, function (error, user) {
        if (error) {
            console.log(`Error in finding user: ${error}`);
            return done(error);
        }

        // Check if the user doesn't exist or the password is incorrect
        if (!user || !user.isPasswordCorrect(password)) {
            console.log("Invalid Username/Password");
            return done(null, false);
        }

        // If user exists and password is correct, return the user
        return done(null, user);
    });
});

// Tell Passport to use the local strategy with the name 'local'
passport.use("local", local);

// Serialize user information for session management
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("Error in finding user--> Passport");
            return done(err);
        }
        return done(null, user);
    });
});

// Middleware to check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/users/signin"); // Redirect to the sign-in page if not authenticated
};

// Middleware to set the authenticated user in views
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
};
