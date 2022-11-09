const { OwnerModel } = require("@src/modules/master/owner/models");

async function create({ firstName, lastName, email, phone, status }) {
  const owner = await OwnerModel.create({
    firstName: firstName || "John",
    lastName: lastName || "doe",
    email: email || "johndoe@gmail.com",
    phone: phone || "081395038967",
    status: status || "active",
  });

  return owner;
}

module.exports = { create };
