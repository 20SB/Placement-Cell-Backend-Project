// Import the necessary Mongoose module
const mongoose = require("mongoose");

// Define the MongoDB connection string
const DB = `mongodb+srv://subhabiswal100:QAMqOf8ja2GW9oBL@cluster0.piyhowh.mongodb.net/placement-cell`;

// Connect to the MongoDB database using Mongoose
mongoose.connect(DB, {
    useNewUrlParser: true, // Option to use the new URL parser
    useUnifiedTopology: true, // Option to use the new Server Discovery and Monitoring engine
});

// Get a reference to the MongoDB connection
const db = mongoose.connection;

// Event handler for connection errors
db.on("error", console.error.bind(console, "Error in connecting to MongoDB"));

// Event handler for a successful connection
db.once("open", function () {
    console.log("Connected to Database :: Mongodb"); // Log a success message when the connection is opened
});

// Export the Mongoose instance for use in other parts of the application
module.exports = mongoose;
