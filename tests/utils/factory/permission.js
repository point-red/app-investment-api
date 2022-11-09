const { PermissionModel } = require("@src/modules/master/role/models");

async function create({ name }) {
  const permission = await PermissionModel.create({
    name: name || "view user",
  });

  return permission;
}

module.exports = { create };
