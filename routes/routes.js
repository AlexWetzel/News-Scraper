// Dependencies
var express = require("express");
var router = express.Router();
var db = require("../models");

// Routes
module.exports = function (request, cheerio) {
	// Home page
	router.get("/", function(req, res) {
		// Get all articles
		// Note: currently handlebars parses the saved articles
		db.Article.find()
			.sort({ _id: -1 })
			.then(function(data) {
				// Store articles in an object
				var articlesObj = {
					articles: data
				}
				// Render the home page with the articles

				res.render("index", articlesObj);
			});
	});
	// Saved articles page
	router.get("/myarticles", function(req, res) {
		// Find all articles
		// Note: currently handlebars parses the saved articles
		db.Article.find()
			.populate("note")
			.then(function(data) {
				console.log("request data:", data[0].note)

				var articlesObj = {
					articles: data
				}
				//Render the "myarticles" page with saved articles
				res.render("myArticles", articlesObj);
			});
	});
	// Route to handle scrape request
	router.get("/scrape", function(req, res) {
		console.log("This is working");
		// Counts the new articles. Currently unused
		var count = 0
	
		console.log("\n==================================\n" +
		            "Welcome to RuneScrape!\n" +
		            "Attempting to scrape atricles from the RuneScape official site...\n");

		// Request to grab the Runescape news page
		request("http://services.runescape.com/m=news/", function(error, response, html) {
			if (error) throw error;

		  // Load the HTML into cheerio and save it to a variable
		  var $ = cheerio.load(html);

		  // Find each article in the "newsContent" div and parse their contents
		  $("#newsContent").find("article").each(function(i, element) {
		    // Article title
		    var title = $(element).find("h4").children().text().trim();
		    // Article link
		    var link = $(element).find("p").children().attr("href");
		    // Article summary
		    var summary = $(element).find("p").children().remove(".readMore").end().text().trim();

		    // Store the data in an object
		    var article = {
		    	title: title,
		    	summary: summary,
		    	link: link
		    }
		 	
		 	// Try to find the article in the database
		    db.Article.findOne({title: article.title}).then(function(foundArticle) {
		    	// If the article is found, do nothing
		    	if (foundArticle) {
		    		console.log("article found");
		    		console.log(foundArticle);
		    		return
		    	}
		    	// If no article is found, add the scraped article to the database
		    	else {
		    		db.Article.create(article).then(function(newArticle) {

		    			count++;
				    }).catch(function(err){
				    	console.log(err);
				    });
		    	}
		    });

		  });
		  console.log("Scraping complete");
		  console.log(count)
		  // Send number of new articles back once the process is complete
		  res.json({count: count});
		});
	});
	// Save article route
	router.put("/save", function(req, res) {
		//Get the article id from the body
		var id = req.body.id;
		//Update the value of "isSaved" to true for the selected article
		db.Article.findByIdAndUpdate(id, {isSaved: true}).then(function(dbChange) {
			res.send("Article Saved")
		}).catch(function(err) {
			console.log(err);
		});

	});
	// Post new note route
	router.post("/note", function(req, res) {
		// Create the note in the database
		db.Note.create({body: req.body.note}).then(function(newNote){
			// Find the article with the request id, and push the id of the new note
			return db.Article.findOneAndUpdate({ _id: req.body.id}, {$push: {note: newNote._id}}, {new: true});
		}).then(function(articleChange) {
			res.send("Note added");
		}).catch(function(err) {
			res.json(err);
		})
	});

	return router;
};