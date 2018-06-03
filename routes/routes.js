var controller = require('../controllers/route_controller.js');

module.exports = function (app) {

  app.get("/", controller.home);

  app.get("/saved", controller.saved);

  app.get("/scrape", controller.scrape);

  app.post("/stick", controller.sticky);

  app.get("/comments", controller.seeComments);

  app.post("/add/comment", controller.addComment);

  app.delete("/delete/comment", controller.deleteComment);

  app.delete("/clear", controller.clearDb);

  app.put("/discard", controller.discard);

}