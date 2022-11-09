const { OwnerModel } = require("../../models");

class DeleteFormRequest {
  constructor({ ownerId, deleteFormRequestDto }) {
    this.ownerId = ownerId;
    this.deleteFormRequestDto = deleteFormRequestDto;
  }

  async call() {
    const owner = await OwnerModel.deleteOne({ _id: this.ownerId });

    return { owner };
  }
}

module.exports = DeleteFormRequest;
