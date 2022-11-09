const httpStatus = require("http-status");
const ApiError = require("@src/utils/ApiError");
const { UserModel } = require("../../models");

class CreateFormRequest {
  constructor({ createFormRequestDto }) {
    this.createFormRequestDto = createFormRequestDto;
  }

  async call() {
    const { username, email, firstName, lastName, phone, role, image } =
      this.createFormRequestDto;

    await isUsernameExist({ username });

    const user = await UserModel.create({
      username,
      email,
      firstName,
      lastName,
      phone,
      role,
      image,
    });

    return { user };
  }
}

async function isUsernameExist({ username }) {
  const user = await UserModel.find({
    username: { $regex: new RegExp(`^${username}$`), $options: "i" },
  });
  if (user.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username is Exist");
  }
}

module.exports = CreateFormRequest;
