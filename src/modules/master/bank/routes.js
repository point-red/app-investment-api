const express = require("express");
const { celebrate } = require("celebrate");
const requestValidations = require("./requestValidations");
const controller = require("./controller");

const router = express.Router();

// GET ALL BANKS
router.route("/").get(controller.findAll);

// CREATE BANK
router
  .route("/")
  .post(
    celebrate(requestValidations.createFormRequest),
    controller.createFormRequest
  );

// GET ONE BANK
router.route("/:bankId").get(controller.findOne);

// UPDATE FORM BANK
router.route("/:bankId").patch(controller.updateForm);

// REQUEST DELETING BANK
router.route("/:bankId").delete(controller.deleteFormRequest);

// REQUEST DELETING BANK ACCOUNT
router
  .route("/:bankId/:bankAccountId")
  .delete(controller.deleteAccountFormRequest);

module.exports = router;
