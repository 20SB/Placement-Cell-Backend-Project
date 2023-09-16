// Import necessary models
const Company = require("../models/companySchema");
const Student = require("../models/studentSchema");

// Render the create student page
module.exports.createStudentPage = async function (req, res) {
    // Render the 'add_student' view
    return res.render("add_student");
};

// Create a new student
module.exports.createStudent = async function (req, res) {
    const { name, email, batch, college, placement, contactNumber, dsa, webd, react } = req.body;
    try {
        // Check if a student with the same email already exists
        const student = await Student.findOne({ email });

        if (student) {
            console.log("Email already exists");
            return res.redirect("back");
        }

        // Create and save the new student record
        const newStudent = await Student.create({
            name,
            email,
            college,
            batch,
            placement,
            contactNumber,
            dsa,
            webd,
            react,
        });
        await newStudent.save();

        // Redirect to the home page after creating the student
        return res.redirect("/");
    } catch (error) {
        console.log(`Error in creating student: ${error}`);
        return res.redirect("back");
    }
};

// Delete a student
module.exports.deleteStudent = async function (req, res) {
    const { id } = req.params;
    try {
        // Find the student using the ID provided in the URL params
        const student = await Student.findById(id);

        // Find the companies for which interviews are scheduled
        // and remove the student from the company's interviews list
        if (student && student.interviews.length > 0) {
            for (let item of student.interviews) {
                const company = await Company.findOne({ name: item.company });
                if (company) {
                    for (let i = 0; i < company.students.length; i++) {
                        if (company.students[i].student.toString() === id) {
                            company.students.splice(i, 1);
                            company.save();
                            break;
                        }
                    }
                }
            }
        }

        // Delete the student from the database
        await Student.findByIdAndDelete(id);

        // Redirect back to the previous page
        res.redirect("back");
    } catch (error) {
        console.log("Error in deleting student");
        return res.redirect("back");
    }
};
