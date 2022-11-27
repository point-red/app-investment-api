import { faker } from '@faker-js/faker';
import { IUser } from './user.interfaces';
import User from './user.model';

describe('User model', () => {
  describe('User validation', () => {
    let newUser: IUser;
    beforeEach(() => {
      newUser = {
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number('62#########'),
      };
    });

    test('should correctly validate a valid user', async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });
  });
});
