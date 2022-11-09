const { UserModel } = require("@src/modules/master/user/models");

async function create({
  username,
  email,
  firstName,
  lastName,
  phone,
  role,
  image,
  status,
}) {
  const user = await UserModel.create({
    username: username || "johndoe",
    email: email || "johndoe@gmail.com",
    firstName: firstName || "John",
    lastName: lastName || "doe",
    phone: phone || "081395038967",
    role: role,
    image: image || "img.jpg",
    status: status || "active",
  });

  return user;
}

module.exports = { create };
