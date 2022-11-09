const { PermissionModel } = require("../../../models");

class UpdateForm {
  constructor({ permissionId, updateFormDto }) {
    this.permissionId = permissionId;
    this.updateFormDto = updateFormDto;
  }

  async call() {
    const { name } = this.updateFormDto;

    const permission = await PermissionModel.findOneAndUpdate(
      { _id: this.permissionId },
      { name },
      { new: true }
    );

    return { permission };
  }
}

module.exports = UpdateForm;
