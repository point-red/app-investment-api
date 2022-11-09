const express = require("express");
const config = require("../config/config");
const router = express.Router();
const userRoute = require("../modules/master/user/routes");
const roleRoute = require("../modules/master/role/routes");
const bankRoute = require("../modules/master/bank/routes");
const ownerRoute = require("../modules/master/owner/routes");

router.get("/status", (req, res) => {
  res.status(200).send("OK");
});

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/role",
    route: roleRoute,
  },
  {
    path: "/bank",
    route: bankRoute,
  },
  {
    path: "/owner",
    route: ownerRoute,
  },
];

const devRoutes = [];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
