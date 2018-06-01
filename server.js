// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/onionPeeler";

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var db = require("./models");
var PORT = 3000;
var app = express();

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, 'public')));

require("./routes/routes.js")(app);

// Set Handlebars as the default templating engine.
app.engine("hbs", exphbs({extname: 'hbs', defaultLayout: "main" }));
app.set("view engine", "hbs");

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});