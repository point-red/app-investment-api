const httpStatus = require("http-status");
const ApiError = require("@src/utils/ApiError");
const { PermissionModel } = require("../../../models");

class CreateFormRequest {
  constructor({ createFormRequestDto }) {
    this.createFormRequestDto = createFormRequestDto;
  }

  async call() {
    const { name } = this.createFormRequestDto;

    await isPermissionNameExist({ name });

    const permission = await PermissionModel.create({ name });

    return { permission };
  }
}

async function isPermissionNameExist({ name }) {
  const permission = await PermissionModel.find({
    name: { $regex: new RegExp(`^${name}$`), $options: "i" },
  });
  if (permission.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Permission Name is Exist");
  }
}

module.exports = CreateFormRequest;
