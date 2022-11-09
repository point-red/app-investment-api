const { RoleModel } = require("../../models");

class UpdateForm {
  constructor({ roleId, updateFormDto }) {
    this.roleId = roleId;
    this.updateFormDto = updateFormDto;
  }

  async call() {
    const { name } = this.updateFormDto;

    const role = await RoleModel.findOneAndUpdate(
      { _id: this.roleId },
      { name },
      { new: true }
    );

    return { role };
  }
}

module.exports = UpdateForm;
