const httpStatus = require("http-status");
const ApiError = require("@src/utils/ApiError");
const factory = require("@root/tests/utils/factory");
const CreateFormRequest = require("./CreateFormRequest");

describe("User - CreateFormRequest", () => {
  describe("validation", () => {
    let createFormRequestDto, role;
    beforeEach(async (done) => {
      role = await factory.role.create({});
      user = await factory.user.create({
        role: role.id,
      });
      createFormRequestDto = generateCreateFormRequestDto({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: role.id,
        image: user.image,
      });

      done();
    });

    it("can't create when user is exist", async () => {
      await expect(async () => {
        await new CreateFormRequest({ createFormRequestDto }).call();
      }).rejects.toThrow(
        new ApiError(httpStatus.BAD_REQUEST, "Username is Exist")
      );
    });
  });

  describe("success create", () => {
    let createFormRequestDto, userForm, role;
    beforeEach(async (done) => {
      role = await factory.role.create({});
      createFormRequestDto = generateCreateFormRequestDto({
        username: "user_testing",
        email: "user_testing@gmail.com",
        firstName: "user",
        lastName: "testing",
        phone: "0812312123",
        role: role.id,
        image: "user_testing.jpg",
      });
      ({ user: userForm } = await new CreateFormRequest({
        createFormRequestDto,
      }).call());

      done();
    });

    it("create form with correct data", () => {
      expect(userForm).toBeDefined();
      expect(userForm.username).toEqual(createFormRequestDto.username);
      expect(userForm.email).toEqual(createFormRequestDto.email);
      expect(userForm.firstName).toEqual(createFormRequestDto.firstName);
      expect(userForm.lastName).toEqual(createFormRequestDto.lastName);
      expect(userForm.phone).toEqual(createFormRequestDto.phone);
      expect(userForm.image).toEqual(createFormRequestDto.image);
    });
  });
});

const generateCreateFormRequestDto = ({
  username,
  email,
  firstName,
  lastName,
  phone,
  role,
  image,
}) => ({
  username,
  email,
  firstName,
  lastName,
  phone,
  role,
  image,
});
