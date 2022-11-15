const express = require("express");
const { celebrate } = require("celebrate");
// const multer = require("@src/utils/multer");
// const fileValidator = require("@src/utils/fileValidator");
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

// UPLOAD USER IMAGE
// router.route("/profile/upload").post(
//   multer({
//     options: {
//       limits: {
//         fileSize: 5 * 1024 * 1024, // no larger than 5MB.
//       },
//     },
//   }).single("image"),
//   fileValidator(),
//   controller.uploadProfile
// );

// GET ONE USER
router.route("/:userId").get(controller.findOne);

// UPDATE FORM USER
router.route("/:userId").patch(controller.updateForm);

// REQUEST DELETING USER
router.route("/:userId").delete(controller.deleteFormRequest);

module.exports = router;
