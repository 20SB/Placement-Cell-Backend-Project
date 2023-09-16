// Import the Student model
const Student = require('../models/studentSchema');

// Render the home page
module.exports.homePage = async function (req, res) {
  // Retrieve all students from the database
  const students = await Student.find({});
  // Render the 'home' view with the list of students
  return res.render('home', { students });
};
