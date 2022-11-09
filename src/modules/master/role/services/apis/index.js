const FindAll = require("./FindAll");
const CreateFormRequest = require("./CreateFormRequest");
const FindOne = require("./FindOne");
const UpdateForm = require("./UpdateForm");
const DeleteFormRequest = require("./DeleteFormRequest");
const AssignPermissionFormRequest = require("./AssignPermissionFormRequest");

const FindAllPermission = require("./permission/FindAll");
const CreateFormRequestPermission = require("./permission/CreateFormRequest");
const FindOnePermission = require("./permission/FindOne");
const UpdateFormPermission = require("./permission/UpdateForm");
const DeleteFormRequestPermission = require("./permission/DeleteFormRequest");

module.exports = {
  FindAll,
  CreateFormRequest,
  FindOne,
  UpdateForm,
  DeleteFormRequest,
  AssignPermissionFormRequest,

  FindAllPermission,
  CreateFormRequestPermission,
  FindOnePermission,
  UpdateFormPermission,
  DeleteFormRequestPermission,
};
