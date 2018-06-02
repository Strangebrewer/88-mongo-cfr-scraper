var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");

var exports = module.exports = {}

exports.home = function (req, res) {

  db.Article.find({ saved: false })
    .then(function (data) {

      var renderObject = {
        peels: data
      }

      res.render("index", renderObject);
    });

}

exports.saved = function (req, res) {

  db.Article.find({ saved: true })
    .then(function (data) {

      var renderObject = {
        peels: data,
        saved: true
      }

      res.render("index", renderObject);
    });

}

exports.peel = function (req, res) {

  var originalArticles;

  db.Article.find({ saved: false })
    .then(function (dbArticle) {
      originalArticles = dbArticle.length;
    });

  request("https://www.theonion.com/", function (error, response, html) {

    var articles = [];

    var $ = cheerio.load(html);

    $(".postlist__item").each(function (i, element) {

      var article = {};

      article.title = $(element).find(".headline").text();
      article.link = $(element).find("a.js_entry-link").attr("href");
      article.date = $(element).find(".js_publish_time").attr("title");
      article.summary = $(element).find(".entry-summary p").text();

      if (article.title !== "") {
        articles.push(article);
      }

    });

    db.Article.create(articles, function (err, newArticles) {
      if (err) console.log(err);
      else console.log(newArticles);
      db.Article.find({ saved: false }).then(function (data) {
        var articleObj = {
          new: data.length - originalArticles,
          peels: data
        }

        res.json(articleObj);
      })
    });

  });

}

exports.stick = function (req, res) {

  db.Article.update(req.body, { $set: { saved: true } })
    .then(function (result) {
      res.json(result);
    });

}

exports.seeComments = function (req, res) {

  db.Article.findOne(req.body)
    .populate("note")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });

}

exports.addComment = function (req, res) {

  console.log(req.body);

  db.Note.create({ body: req.body.note })
    .then(function (dbNote) {
      return db.Article.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { note: dbNote._id } },
        { new: true }
      )
    })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });

}

exports.clearDb = function (req, res) {

  db.Article.remove({}).then(function (results) {
    console.log(results);
  });

  db.Note.remove({}).then(function (result) {
    console.log(result);
  });

}

exports.discard = function (req, res) {

  db.Article.update(req.body, { $set: { saved: false } })
    .then(function (result) {
      db.Article.find({ saved: true })
        .then(function (data) {
          res.json(data);
        });
    });

}