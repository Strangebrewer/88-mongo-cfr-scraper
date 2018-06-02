var controller = require('../controllers/route_controller.js');

module.exports = function (app) {

  app.get("/", controller.home);

  app.get("/saved", controller.saved);

  app.get("/peel", controller.peel);

  app.post("/stick", controller.stick);

  app.post("/comments", controller.seeComments);

  app.post("/comment", controller.addComment);

  app.delete("/clear", controller.clearDb);

  app.put("/discard", controller.discard);
  //  This last one might need to be a put rather than delete
  //  Depends on whether I want "saved" to be:
    // a) its own collection, or
    // b)  a key in the articles collection

  //  I think it makes more sense to have it be its own collection rather than having to search the articles collection each time.
  
  //  Maybe I'll do it both ways just to see.

}