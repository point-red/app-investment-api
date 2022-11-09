const { RoleModel } = require("../../models");

class AssignPermissionFormRequest {
  constructor({ roleId, assignPermissionFormRequestDto }) {
    this.roleId = roleId;
    this.assignPermissionFormRequestDto = assignPermissionFormRequestDto;
  }

  async call() {
    const { permissions } = this.assignPermissionFormRequestDto;

    const role = await RoleModel.findOneAndUpdate(
      { _id: this.roleId },
      { permissions },
      { new: true }
    );

    return { role };
  }
}

module.exports = AssignPermissionFormRequest;
