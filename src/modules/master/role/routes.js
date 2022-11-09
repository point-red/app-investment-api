const express = require("express");
const { celebrate } = require("celebrate");
const requestValidations = require("./requestValidations");
const controller = require("./controller");

const router = express.Router();

// ------------------------------PERMISSION---------------------------------- //

// GET ALL PERMISSIONS
router.route("/permission").get(controller.findAllPermission);

// CREATE PERMISSION
router
  .route("/permission")
  .post(
    celebrate(requestValidations.createPermissionFormRequest),
    controller.createFormRequestPermission
  );

// GET ONE PERMISSION
router.route("/permission/:permissionId").get(controller.findOnePermission);

// UPDATE FORM PERMISSION
router
  .route("/permission/:permissionId")
  .patch(controller.updateFormPermission);

// REQUEST DELETING PERMISSION
router
  .route("/permission/:permissionId")
  .delete(controller.deleteFormRequestPermission);

// ------------------------------ROLE---------------------------------- //

// GET ALL ROLES
router.route("/").get(controller.findAll);

// CREATE ROLE
router
  .route("/")
  .post(
    celebrate(requestValidations.createFormRequest),
    controller.createFormRequest
  );

// GET ONE ROLE
router.route("/:roleId").get(controller.findOne);

// UPDATE FORM ROLE
router.route("/:roleId").patch(controller.updateForm);

// REQUEST DELETING ROLE
router.route("/:roleId").delete(controller.deleteFormRequest);

// REQUEST ASSIGN PERMISSION
router
  .route("/:roleId/permission")
  .post(controller.assignPermissionFormRequest);

module.exports = router;
