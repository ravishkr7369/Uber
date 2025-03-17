const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookie=require("cookie-parser");
dotenv.config();

const userRoutes=require("./routes/user")
const captainRoutes=require("./routes/captain")
const mapsRoutes = require('./routes/map');
const rideRoutes = require('./routes/ride');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookie());


app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

module.exports=app;


