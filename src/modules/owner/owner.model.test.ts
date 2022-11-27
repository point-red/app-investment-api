import { faker } from '@faker-js/faker';
import { IOwner } from './owner.interfaces';
import Owner from './owner.model';

describe('Owner model', () => {
  describe('Owner validation', () => {
    let newOwner: IOwner;
    beforeEach(() => {
      newOwner = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number('62#########'),
      };
    });

    test('should correctly validate a valid owner', async () => {
      await expect(new Owner(newOwner).validate()).resolves.toBeUndefined();
    });
  });
});
