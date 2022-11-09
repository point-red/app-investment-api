const { UserModel } = require("../../models");

class FindOne {
  constructor(userId) {
    this.userId = userId;
  }

  async call() {
    const user = await UserModel.findOne({ _id: this.userId })
      .populate({
        path: "role",
        populate: {
          path: "permissions",
        },
      })
      .exec();

    return { user };
  }
}

module.exports = FindOne;
