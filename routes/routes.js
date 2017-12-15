var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function(req, res) {

	db.Article.find()
		.then(function(data) {
			console.log(data)

			var articlesObj = {
				articles: data
			}

			res.render("index", articlesObj);
		});
});

module.exports = router;