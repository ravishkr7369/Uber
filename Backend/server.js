const app=require("./index");
const port=process.env.PORT||3000;
const connectDB=require("./config/dbConnect")

const { initializeSocket } = require('./socket');


connectDB();
const server=app.listen(port,()=>{
	console.log(`port is listen at ${port}`)
});


initializeSocket(server);



