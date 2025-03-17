const mongoose = require("mongoose");

const connectDB = async () => {

	try {
		await mongoose.connect(process.env.DB_Url);
		console.log("Database is connected")
	} catch (error) {
		console.log(error.message)
	}

}

module.exports=connectDB;