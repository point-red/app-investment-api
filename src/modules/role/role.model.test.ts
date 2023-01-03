import { faker } from '@faker-js/faker';
import { IRole } from './role.interfaces';
import Role from './role.model';

describe('Role model', () => {
  describe('Role validation', () => {
    let newRole: IRole;
    beforeEach(() => {
      newRole = {
        name: faker.name.firstName(),
        permissions: [],
      };
    });

    test('should correctly validate a valid role', async () => {
      await expect(new Role(newRole).validate()).resolves.toBeUndefined();
    });
  });
});
