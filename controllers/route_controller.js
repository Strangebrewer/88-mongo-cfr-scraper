var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");

var exports = module.exports = {}

exports.home = function (req, res) {

  db.Article.find({ saved: false })
    .then(function (data) {

      var renderObject = {
        articles: data
      }

      res.render("index", renderObject);
    });

}

exports.saved = function (req, res) {

  db.Article.find({ saved: true })
    .then(function (data) {

      var renderObject = {
        articles: data,
        saved: true
      }

      res.render("index", renderObject);
    });

}

exports.scrape = function (req, res) {

  var originalArticles;

  db.Article.find({ saved: false })
    .then(function (dbArticle) {
      originalArticles = dbArticle.length;
    });

  request("https://www.cfr.org/in-the-news", function (error, response, html) {

    var articles = [];

    var $ = cheerio.load(html);

    $(".landing-cards-grid__list-item").each(function (i, element) {

      var article = {};

      article.title = $(element).find(".card-article__title").text();
      article.link = $(element).find(".card-article__link").attr("href");
      article.date = $(element).find(".card-article__date").text().trim();
      article.topic = $(element).find(".card-article__topic-tag").text().trim();
      article.topic_link = $(element).find(".card-article__topic-tag-link").attr("href");

      console.log(article);

      if (article.title !== "") {
        articles.push(article);
      }

    });

    db.Article.create(articles, function (err, newArticles) {
      if (err) console.log(err);
      else console.log(newArticles);
      db.Article.find({ saved: false })
        .then(function (data) {
          var articleObj = {
            new: data.length - originalArticles,
            articles: data
          }

          res.json(articleObj);
        })
    });

  });

}

exports.sticky = function (req, res) {

  db.Article.update(req.body, { $set: { saved: true } })
    .then(function (result) {
      res.json(result);
    });

}

exports.seeComments = function (req, res) {
  console.log(req.query);

  db.Article.findOne(req.query)
    .populate("notes")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });

}

exports.addComment = function (req, res) {

  db.Note.create({ body: req.body.note })
    .then(function (dbNote) {
      return db.Article.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { notes: dbNote._id } },
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

exports.deleteComment = function (req, res) {

  db.Note.deleteOne({ _id: req.body.noteId })
    .then(function (err, dbNote) {
      return db.Article.findOneAndUpdate(
        { _id: req.body.articleId },
        { $pull: { notes: req.body.noteId } },
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