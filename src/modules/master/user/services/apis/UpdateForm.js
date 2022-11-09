const { UserModel } = require("../../models");

class UpdateForm {
  constructor({ userId, updateFormDto }) {
    this.userId = userId;
    this.updateFormDto = updateFormDto;
  }

  async call() {
    const { username, email, firstName, lastName, phone, role } =
      this.updateFormDto;

    const user = await UserModel.findOneAndUpdate(
      { _id: this.userId },
      {
        username,
        email,
        firstName,
        lastName,
        phone,
        role,
      },
      { new: true }
    );

    return { user };
  }
}

module.exports = UpdateForm;
