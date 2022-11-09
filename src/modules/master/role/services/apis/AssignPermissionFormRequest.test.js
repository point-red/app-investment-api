const factory = require("@root/tests/utils/factory");
const AssignPermissionFormRequest = require("./AssignPermissionFormRequest");

describe("Role - FindOne", () => {
  describe("success", () => {
    let role, permission, assignPermissionFormRequestDto;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ role, permission } = recordFactories);

      assignPermissionFormRequestDto = generateAssignPermissionFormRequestDto({
        permissions: [permission.id],
      });

      done();
    });

    it("return expected assign permissions", async () => {
      const { role: updateRole } = await new AssignPermissionFormRequest({
        roleId: role.id,
        assignPermissionFormRequestDto,
      }).call();

      expect(updateRole.permissions.length).toBe(1);
      expect(updateRole.permissions[0].toString()).toBe(permission.id);
    });
  });
});

const generateRecordFactories = async ({ role } = {}) => {
  role = await factory.role.create({});
  permission = await factory.permission.create({});

  return {
    role,
    permission,
  };
};

const generateAssignPermissionFormRequestDto = ({ permissions }) => ({
  permissions,
});
