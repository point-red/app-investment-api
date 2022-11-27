import { faker } from '@faker-js/faker';
import { IPermission } from './permission.interfaces';
import Permission from './permission.model';

describe('Permission model', () => {
  describe('Permission validation', () => {
    let newPermission: IPermission;
    beforeEach(() => {
      newPermission = {
        name: faker.internet.userName(),
      };
    });

    test('should correctly validate a valid permission', async () => {
      await expect(new Permission(newPermission).validate()).resolves.toBeUndefined();
    });
  });
});
