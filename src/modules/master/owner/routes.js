const express = require("express");
const { celebrate } = require("celebrate");
const requestValidations = require("./requestValidations");
const controller = require("./controller");

const router = express.Router();

// GET ALL OWNERS
router.route("/").get(controller.findAll);

// CREATE OWNER
router
  .route("/")
  .post(
    celebrate(requestValidations.createFormRequest),
    controller.createFormRequest
  );

// GET ONE OWNER
router.route("/:ownerId").get(controller.findOne);

// UPDATE FORM OWNER
router.route("/:ownerId").patch(controller.updateForm);

// REQUEST DELETING OWNER
router.route("/:ownerId").delete(controller.deleteFormRequest);

module.exports = router;
