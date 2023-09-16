const mongoose = require('mongoose');

// Define the schema for the Company model
const companySchema = new mongoose.Schema(
	{
		// Name of the company, must be unique
		name: {
			type: String,
			unique: true,
		},
		// Array of students associated with the company
		students: [
			{
				student: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Student', // Reference to the 'Student' model
				},
				date: {
					type: Date,
					required: true, // Date of the interview, required field
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

// Create the 'Company' model using the schema
const Company = mongoose.model('Company', companySchema);

// Export the Company model for use in other parts of the application
module.exports = Company;
