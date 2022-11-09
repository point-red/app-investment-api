const { RoleModel } = require("../../models");

class DeleteFormRequest {
  constructor({ roleId }) {
    this.roleId = roleId;
  }

  async call() {
    const role = await RoleModel.deleteOne({ _id: this.roleId });

    return { role };
  }
}

module.exports = DeleteFormRequest;
