const { OwnerModel } = require("../../models");

class FindOne {
  constructor(ownerId) {
    this.ownerId = ownerId;
  }

  async call() {
    const owner = await OwnerModel.findOne({ _id: this.ownerId }).exec();

    return { owner };
  }
}

module.exports = FindOne;
