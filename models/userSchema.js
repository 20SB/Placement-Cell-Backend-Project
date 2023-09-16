const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the User model
const userSchema = new mongoose.Schema(
	{
		// User's name, required field
		name: {
			type: String,
			required: true,
		},
		// User's email, must be unique and required
		email: {
			type: String,
			unique: true,
			required: true,
		},
		// Hashed password, required field
		passwordHash: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true } // Automatic timestamps for createdAt and updatedAt fields
);

// Create a virtual property to set the hashed password
userSchema.virtual('password').set(function (value) {
	// Hash the provided password using bcrypt with a salt factor of 12
	this.passwordHash = bcrypt.hashSync(value, 12);
});

// Function to compare a hashed password with a provided password
userSchema.methods.isPasswordCorrect = function (password) {
	// Use bcrypt to compare the provided password with the stored hashed password
	return bcrypt.compareSync(password, this.passwordHash);
};

// Create the 'User' model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
