const { PermissionModel } = require("../../../models");

class FindOne {
  constructor(permissionId) {
    this.permissionId = permissionId;
  }

  async call() {
    const permission = await PermissionModel.findOne({
      _id: this.permissionId,
    }).exec();

    return { permission };
  }
}

module.exports = FindOne;
