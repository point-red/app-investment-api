import { faker } from '@faker-js/faker';
import { IBank } from './bank.interfaces';
import Bank from './bank.model';

describe('Bank model', () => {
  describe('Bank validation', () => {
    let newBank: IBank;
    beforeEach(() => {
      newBank = {
        name: faker.name.firstName(),
        branch: faker.address.city(),
        address: faker.address.streetAddress(),
        phone: faker.phone.number('62#########'),
        fax: faker.name.firstName(),
        code: faker.name.firstName(),
        notes: faker.name.firstName(),
      };
    });

    test('should correctly validate a valid bank', async () => {
      await expect(new Bank(newBank).validate()).resolves.toBeUndefined();
    });
  });
});
