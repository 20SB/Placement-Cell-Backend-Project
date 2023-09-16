// Import necessary models
const Student = require('../models/studentSchema');
const Company = require('../models/companySchema');

// Render the company page
module.exports.companyPage = async function (req, res) {
  try {
    // Retrieve all students from the database
    const students = await Student.find({});
    // Render the 'company' view with the list of students
    return res.render('company', { students, interviews });
  } catch (error) {
    console.log(`Error in rendering page: ${error}`);
    return res.redirect('back');
  }
};

// Allocate an interview
module.exports.allocateInterview = async function (req, res) {
  try {
    // Retrieve all students from the database
    const students = await Student.find({});
    
    let array = [];

    for (let student of students) {
      // Collect unique batch values
      array.push(student.batch);
    }
    // Filter out duplicate batch values
    array = [...new Set(array)];

    // Render the 'allocateInterview' view with students and unique batches
    return res.render('allocateInterview', { students, array });
  } catch (error) {
    console.log(`Error in allocating interview: ${error}`);
    return res.redirect('back');
  }
};

// Schedule an interview
module.exports.scheduleInterview = async function (req, res) {
  const { id, company, date } = req.body;
  try {
    // Check if the company already exists in the database
    const existingCompany = await Company.findOne({ name: company });
    const obj = {
      student: id,
      date,
      result: 'Pending',
    };

    // If the company doesn't exist, create a new company entry
    if (!existingCompany) {
      const newCompany = await Company.create({
        name: company,
      });
      newCompany.students.push(obj);
      newCompany.save();
    } else {
      // Check if the student ID already exists in the company's students list
      for (let student of existingCompany.students) {
        if (student.student._id === id) {
          console.log('Interview with this student already scheduled');
          return res.redirect('back');
        }
      }
      existingCompany.students.push(obj);
      existingCompany.save();
    }

    // Update the student's interview information
    const student = await Student.findById(id);

    if (student) {
      const interview = {
        company,
        date,
        result: 'Pending',
      };
      student.interviews.push(interview);
      student.save();
    }
    console.log('Interview Scheduled Successfully');
    return res.redirect('/company/home');
  } catch (error) {
    console.log(`Error in scheduling Interview: ${error}`);
    return res.redirect('back');
  }
};

// Update the status of an interview
module.exports.updateStatus = async function (req, res) {
  const { id } = req.params;
  const { companyName, companyResult } = req.body;
  try {
    // Find the student by ID
    const student = await Student.findById(id);
    if (student && student.interviews.length > 0) {
      for (let company of student.interviews) {
        if (company.company === companyName) {
          // Update the interview result for the specified company
          company.result = companyResult;
          student.save();
          break;
        }
      }
    }
    
    // Find the company by name
    const company = await Company.findOne({ name: companyName });

    if (company) {
      for (let std of company.students) {
        // Compare student IDs to update the result
        if (std.student.toString() === id) {
          std.result = companyResult;
          company.save();
        }
      }
    }
    console.log('Interview Status Changed Successfully');
    return res.redirect('back');
  } catch (error) {
    console.log(`Error in updating status: ${error}`);
    res.redirect('back');
  }
};
