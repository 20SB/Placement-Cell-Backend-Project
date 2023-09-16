const mongoose = require('mongoose');

// Define the schema for the Student model
const studentSchema = new mongoose.Schema(
	{
		// Name of the student, required field
		name: {
			type: String,
			required: true,
		},
		// Email of the student, must be unique and required
		email: {
			type: String,
			unique: true,
			required: true,
		},
		// College of the student, required field
		college: {
			type: String,
			required: true,
		},
		// Placement status of the student, must be one of two values
		placement: {
			type: String,
			required: true,
			enum: ['Placed', 'Not Placed'],
		},
		// Contact number of the student, required field
		contactNumber: {
			type: Number,
			required: true,
		},
		// Batch of the student, required field
		batch: {
			type: String,
			required: true,
		},
		// Scores for various fields, all required
		dsa: {
			type: Number,
			required: true,
		},
		webd: {
			type: Number,
			required: true,
		},
		react: {
			type: Number,
			required: true,
		},
		// Array of interview details, including company, date, and result
		interviews: [
			{
				company: {
					type: String,
				},
				date: {
					type: String,
				},
				result: {
					type: String,
					enum: ['On Hold', 'Selected', 'Pending', 'Not Selected', 'Did not Attempt'], // Possible interview result values
				},
			},
		],
	},
	{ timestamps: true } // Automatic timestamps for createdAt and updatedAt fields
);

// Create the 'Student' model using the schema
const Student = mongoose.model('Student', studentSchema);

// Export the Student model for use in other parts of the application
module.exports = Student;
