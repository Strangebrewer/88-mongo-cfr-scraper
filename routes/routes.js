var controller = require('../controllers/route_controller.js');

module.exports = function (app) {

  app.get("/", controller.home);

  app.get("/saved", controller.saved);

  app.get("/peel", controller.peel);

  app.post("/stick", controller.stick);

  app.get("/comments", controller.seeComments);

  app.post("/comment", controller.addComment);

  app.delete("/clear", controller.clearDb);

  app.put("/discard", controller.discard);

}