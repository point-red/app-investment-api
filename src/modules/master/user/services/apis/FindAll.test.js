const factory = require("@root/tests/utils/factory");
const FindAll = require("./FindAll");

describe("User - FindAll", () => {
  describe("success", () => {
    let user;
    beforeEach(async (done) => {
      const role = await factory.role.create({});
      user = await factory.user.create({
        role: role.id,
      });

      done();
    });

    it("return expected users", async () => {
      const { users } = await new FindAll({}).call();

      expect(users.length).toBe(1);
      expect(users[0].id).toBe(user.id);
      expect(users[0].username).toBe(user.username);
      expect(users[0].firstName).toBe(user.firstName);
      expect(users[0].lastName).toBe(user.lastName);
      expect(users[0].email).toBe(user.email);
      expect(users[0].phone).toBe(user.phone);
    });

    it("return expected users with page & limit query", async () => {
      let queries = {
        page: 1,
        limit: 10,
      };

      let { users } = await new FindAll(queries).call();

      expect(users.length).toBe(1);
      expect(users[0].id).toBe(user.id);
      expect(users[0].username).toBe(user.username);
      expect(users[0].firstName).toBe(user.firstName);
      expect(users[0].lastName).toBe(user.lastName);
      expect(users[0].email).toBe(user.email);
      expect(users[0].phone).toBe(user.phone);

      queries = {
        page: 2,
        limit: 10,
      };
      ({ users, currentPage } = await new FindAll(queries).call());

      expect(users.length).toBe(0);
      expect(currentPage).toBe(2);

      queries = {
        page: 1,
        limit: 5,
      };
      ({ users, maxItem } = await new FindAll(queries).call());

      expect(users.length).toBe(1);
      expect(maxItem).toBe(5);
    });

    it("return expected users with search query", async () => {
      queries = {
        search: user.username,
      };
      ({ users } = await new FindAll(queries).call());

      expect(users.length).toBe(1);
      expect(users[0].id).toBe(user.id);
      expect(users[0].username).toBe(user.username);
      expect(users[0].firstName).toBe(user.firstName);
      expect(users[0].lastName).toBe(user.lastName);
      expect(users[0].email).toBe(user.email);
      expect(users[0].phone).toBe(user.phone);

      queries = {
        search: "invalid-username",
      };
      ({ users } = await new FindAll(queries).call());

      expect(users.length).toBe(0);
    });

    it("return expected users with sort query", async () => {
      queries = {
        sort: "name,asc",
      };
      ({ users } = await new FindAll(queries).call());

      expect(users.length).toBe(1);
      expect(users[0].id).toBe(user.id);
      expect(users[0].username).toBe(user.username);
      expect(users[0].firstName).toBe(user.firstName);
      expect(users[0].lastName).toBe(user.lastName);
      expect(users[0].email).toBe(user.email);
      expect(users[0].phone).toBe(user.phone);

      queries = {
        sort: "name,desc",
      };
      ({ users } = await new FindAll(queries).call());

      expect(users.length).toBe(1);
      expect(users[0].id).toBe(user.id);
      expect(users[0].username).toBe(user.username);
      expect(users[0].firstName).toBe(user.firstName);
      expect(users[0].lastName).toBe(user.lastName);
      expect(users[0].email).toBe(user.email);
      expect(users[0].phone).toBe(user.phone);
    });
  });
});
