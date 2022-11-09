const { RoleModel } = require("../../models");

class FindOne {
  constructor(roleId) {
    this.roleId = roleId;
  }

  async call() {
    const role = await RoleModel.findOne({ _id: this.roleId })
      .populate("permissions")
      .exec();

    return { role };
  }
}

module.exports = FindOne;
