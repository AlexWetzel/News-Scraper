var express = require("express");
var router = express.Router();
var db = require("../models");


module.exports = function (request, cheerio) {



router.get("/", function(req, res) {

	db.Article.find()
		.then(function(data) {
			// console.log(data)

			var articlesObj = {
				articles: data
			}

			res.render("index", articlesObj);
		});
});

router.get("/myarticles", function(req, res) {

	db.Article.find()
		.populate("note")
		.then(function(data) {
			console.log("request data:", data[0].note)

			var articlesObj = {
				articles: data
			}

			res.render("myArticles", articlesObj);
		});
});

router.get("/scrape", function(req, res) {

	var count = 0
	// First, tell the console what server.js is doing
	console.log("\n==================================\n" +
	            "Welcome to RuneScrape!\n" +
	            "Attempting to scrape atricles from the RuneScape official site...\n");

	// Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
	request("http://services.runescape.com/m=news/a=13/", function(error, response, html) {
		if (error) throw error;

		// console.log(html)
	  // Load the HTML into cheerio and save it to a variable
	  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
	  var $ = cheerio.load(html);

	  // With cheerio, find each p-tag with the "title" class
	  // (i: iterator. element: the current element)


	  $("#newsContent").find("article").each(function(i, element) {
	    // Save the text of the element in a "title" variable
	    var title = $(element).find("h4").children().text().trim();

	    // In the currently selected element, look at its child elements (i.e., its a-tags),
	    // then save the values for any "href" attributes that the child elements may have
	    var link = $(element).find("p").children().attr("href");

	    var summary = $(element).find("p").children().remove(".readMore").end().text().trim();

	    var article = {
	    	title: title,
	    	summary: summary,
	    	link: link
	    }

	    console.log(article);
	 
	    db.Article.findOne({title: article.title}).then(function(foundArticle) {
	    	console.log(foundArticle)
	    	if (foundArticle) {
	    		console.log("article found");
	    		console.log(foundArticle);
	    		return
	    	}
	    	else {
	    		db.Article.create(article).then(function(newArticle) {
	    			// console.log(newArticle)
	    			count++;
			    }).catch(function(err){
			    	console.log(err);
			    });
	    	}
	    });

	  });
	  console.log("Scraping complete");
	  console.log(count)
	  res.json({count: count});
	});
});

router.put("/save", function(req, res) {

	var id = req.body.id;

	console.log(id);

	db.Article.findByIdAndUpdate(id, {isSaved: true}).then(function(dbChange) {
		res.send("Article Saved")
	}).catch(function(err) {
		console.log(err);
	});

});

router.post("/note", function(req, res) {

	console.log(req.body)
	db.Note.create({body: req.body.note})

	.then(function(newNote){
		return db.Article.findOneAndUpdate({ _id: req.body.id}, {$push: {note: newNote._id}}, {new: true});
	}).then(function(articleChange) {
		console.log("Update:", articleChange);
	}).catch(function(err) {
		res.json(err);
	})
});

return router;

};

// module.exports = router;