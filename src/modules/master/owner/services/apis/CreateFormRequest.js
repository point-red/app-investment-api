const httpStatus = require("http-status");
const ApiError = require("@src/utils/ApiError");
const { OwnerModel } = require("../../models");

class CreateFormRequest {
  constructor({ createFormRequestDto }) {
    this.createFormRequestDto = createFormRequestDto;
  }

  async call() {
    const { firstName, lastName, email, phone } = this.createFormRequestDto;

    await isOwnerEmailExist({ email });

    const owner = await OwnerModel.create({
      firstName,
      lastName,
      email,
      phone,
    });

    return { owner };
  }
}

async function isOwnerEmailExist({ email }) {
  const role = await OwnerModel.find({
    email: { $regex: new RegExp(`^${email}$`), $options: "i" },
  });
  if (role.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Owner Email is Exist");
  }
}

module.exports = CreateFormRequest;
