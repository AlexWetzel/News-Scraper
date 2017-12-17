/* Require:
/ 	-express
/		client-server connection
/	-express-handlebars
/		page rendering
/ 	-mongoose
/		orm
/	-body-parser
/		request/response parsing
/	-cheerio
/		For grabbing page elements
/	-request
/		For grabbing web pages
*/
var mongoose = require("mongoose");
// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

var db = require("./models");




mongoose.Promise = Promise;

// mongoose.connect("mongodb://localhost/RuneScrape", {
mongoose.connect("mongodb://heroku_7rxhz8xg:omp8f2mv5ho8veovujeugdu01s@ds159866.mlab.com:59866/heroku_7rxhz8xg", {
  useMongoClient: true
});

//Dependencies
var express = require("express");
var bodyParser = require("body-parser");

//Use the environment port or 3000
var PORT = process.env.PORT || 3000;

var app = express();

//Serve static files from the 'public' directory
app.use(express.static("public"));

//Use body parser
app.use(bodyParser.urlencoded({ extended: false }));

//Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Require routes
var Routes = require("./routes/routes.js")(request, cheerio);

app.use("/", Routes);

app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});