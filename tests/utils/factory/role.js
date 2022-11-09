const { RoleModel } = require("@src/modules/master/role/models");

async function create({ name }) {
  const role = await RoleModel.create({
    name: name || "Admin Supervisor",
  });

  return role;
}

module.exports = { create };
