const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const controllerOlddevice = require("../controllers/olddevicePlus");
module.exports =  function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept"
      )
    next();
  });
  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get("/api/ssh",
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  controller.getssh);
   app.get("/api/fakeinfo",[authJwt.verifyToken, authJwt.isModeratorOrAdmin],controller.SELECT);
   app.post("/api/fakeinfo/PostoldDevice",[authJwt.verifyToken, authJwt.isModeratorOrAdmin],controller.createoldDevice);
   app.post("/api/fakeinfo/coverold",[authJwt.verifyToken, authJwt.isModeratorOrAdmin],controller.coveroldDevice);
   app.get("/api/fakeinfo/oldDevice",[authJwt.verifyToken, authJwt.isModeratorOrAdmin],controllerOlddevice.getoldDevice);

};