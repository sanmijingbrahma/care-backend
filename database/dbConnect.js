const mongoose = require("mongoose");
const {DB_NAME} = require("../constants");

const connectDB = async () =>{
    try {
       const connectionInstance = await mongoose.connect(
        `${process.env.MONGO_URI}/${DB_NAME}`
       ) 
       console.log(`\n MongoDB connected! DB Host: ${connectionInstance.connection.host} `);
       
    } catch (err) {
        console.log("MongoDB connection error ", err);
        process.exit(1);
        
    }
};

module.exports = connectDB