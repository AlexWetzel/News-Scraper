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
mongoose.connect("mongodb://localhost/RuneScrape", {
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
var routes = require("./routes/routes.js");

app.use("/", routes);

app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});







// // First, tell the console what server.js is doing
// console.log("\n==================================\n" +
//             "Welcome to RuneScrape!\n" +
//             "Attempting to scrape atricles from the RuneScape official site...\n");

// // Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
// request("http://services.runescape.com/m=news/a=13/", function(error, response, html) {
// 	if (error) throw error;

// 	// console.log(html)
//   // Load the HTML into cheerio and save it to a variable
//   // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//   var $ = cheerio.load(html);

//   // With cheerio, find each p-tag with the "title" class
//   // (i: iterator. element: the current element)


//   $("#newsContent").find("article").each(function(i, element) {
//     // Save the text of the element in a "title" variable
//     var title = $(element).find("h4").children().text().trim();

//     // In the currently selected element, look at its child elements (i.e., its a-tags),
//     // then save the values for any "href" attributes that the child elements may have
//     var link = $(element).find("p").children().attr("href");

//     var summary = $(element).find("p").children().remove(".readMore").end().text().trim();

//     var article = {
//     	title: title,
//     	summary: summary,
//     	link: link
//     }
 
//     console.log(article);

//     db.Article.create(article).then(function(dbArticle) {
//       	// res.send("Rune Scraped!");
//     }).catch(function(err) {
//     	console.log(err);
//     	// res.json(err);
//     });
//   });
//   console.log("Scraping complete");
// });
