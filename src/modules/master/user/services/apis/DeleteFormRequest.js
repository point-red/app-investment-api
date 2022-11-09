const { UserModel } = require("../../models");

class DeleteFormRequest {
  constructor({ userId, deleteFormRequestDto }) {
    this.userId = userId;
    this.deleteFormRequestDto = deleteFormRequestDto;
  }

  async call() {
    const user = await UserModel.deleteOne({ _id: this.userId });

    return { user };
  }
}

module.exports = DeleteFormRequest;
