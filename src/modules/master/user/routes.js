const express = require("express");
const { celebrate } = require("celebrate");
const requestValidations = require("./requestValidations");
const controller = require("./controller");

const router = express.Router();

// GET ALL USERS
router.route("/").get(controller.findAll);

// CREATE USER
router
  .route("/")
  .post(
    celebrate(requestValidations.createFormRequest),
    controller.createFormRequest
  );

// GET ONE USER
router.route("/:userId").get(controller.findOne);

// UPDATE FORM USER
router.route("/:userId").patch(controller.updateForm);

// REQUEST DELETING USER
router.route("/:userId").delete(controller.deleteFormRequest);

module.exports = router;
