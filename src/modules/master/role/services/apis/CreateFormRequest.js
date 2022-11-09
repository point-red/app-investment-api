const httpStatus = require("http-status");
const ApiError = require("@src/utils/ApiError");
const { RoleModel } = require("../../models");

class CreateFormRequest {
  constructor({ createFormRequestDto }) {
    this.createFormRequestDto = createFormRequestDto;
  }

  async call() {
    const { name } = this.createFormRequestDto;

    await isRoleNameExist({ name });

    const role = await RoleModel.create({ name });

    return { role };
  }
}

async function isRoleNameExist({ name }) {
  const role = await RoleModel.find({
    name: { $regex: new RegExp(`^${name}$`), $options: "i" },
  });
  if (role.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Role Name is Exist");
  }
}

module.exports = CreateFormRequest;
