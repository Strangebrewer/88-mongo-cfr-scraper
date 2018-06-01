var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");

var exports = module.exports = {}

exports.home = function (req, res) {
  // db.Article.find({})
  //   .then(function (data) {
  //     console.log(data);

  var renderObject = {

  }

  //     res.render("index", renderObject);
  //   });
  res.render("index", renderObject);
}

exports.peel = function (req, res) {

  request("https://www.theonion.com/", function (error, response, html) {

    var $ = cheerio.load(html);

    var results = [];

    $(".postlist__item").each(function (i, element) {
      var title = $(element).find(".headline").text();
      var link = $(element).find("a").attr("href");
      var date = $(element).find(".js_publish_time").attr("title");
      var summary = $(element).find(".entry-summary p").text();;

      results.push({
        title: title,
        link: link,
        date: date,
        summary: summary
      });

      //  instead of pushing these to an array to send to the page, they need to be put into the database
      //  Also, look at the results and figure out how to filter ads from teh results
      //  And, find a way to address videos, photos, and cartoons, all of which don't include a summary

    });

    console.log(results);

    res.json(results);

  });

}

exports.stick = function (req, res) {

  //  Save an article

}

exports.seeComments = function (req, res) {

  //  See comments

}

exports.addComment = function (req, res) {

  //  Add a comment
  //  comments are attached to saved articles

}

exports.discard = function (req, res) {

  //  Remove article from Saved collection

}