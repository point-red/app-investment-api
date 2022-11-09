const { PermissionModel } = require("../../../models");

class DeleteFormRequest {
  constructor({ permissionId, deleteFormRequestDto }) {
    this.permissionId = permissionId;
    this.deleteFormRequestDto = deleteFormRequestDto;
  }

  async call() {
    const permission = await PermissionModel.deleteOne({
      _id: this.permissionId,
    });

    return { permission };
  }
}

module.exports = DeleteFormRequest;
