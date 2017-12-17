//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");

var db = require("./models");

//Mongoose connection
mongoose.Promise = Promise;
var URL = process.env.MONGODB_URI || "mongodb://localhost/RuneScrape";
mongoose.connect(URL, {
  useMongoClient: true
});

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

//Require routes, pass in request and cheerio
var Routes = require("./routes/routes.js")(request, cheerio);

app.use("/", Routes);

app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});