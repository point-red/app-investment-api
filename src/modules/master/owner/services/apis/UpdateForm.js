const { OwnerModel } = require("../../models");

class UpdateForm {
  constructor({ ownerId, updateFormDto }) {
    this.ownerId = ownerId;
    this.updateFormDto = updateFormDto;
  }

  async call() {
    const { firstName, lastName, email, phone, imgProfile } =
      this.updateFormDto;

    const owner = await OwnerModel.findOneAndUpdate(
      { _id: this.ownerId },
      {
        firstName,
        lastName,
        email,
        phone,
        imgProfile,
      },
      { new: true }
    );

    return { owner };
  }
}

module.exports = UpdateForm;
