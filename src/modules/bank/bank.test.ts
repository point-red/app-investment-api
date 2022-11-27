import mongoose from 'mongoose';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import app from '../../app';
import setupTestDB from '../jest/setupTestDB';
import Bank from './bank.model';
import { IBank } from './bank.interfaces';

setupTestDB();

const bankOne = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.firstName(),
  branch: faker.address.city(),
  address: faker.address.streetAddress(),
  phone: faker.phone.number('62#########'),
  fax: faker.name.firstName(),
  code: faker.name.firstName(),
  notes: faker.name.firstName(),
  accounts: [
    {
      accountName: faker.name.firstName(),
      accountNumber: faker.random.numeric(10),
      notes: faker.lorem.lines(),
    },
  ],
};

const bankTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.firstName(),
  branch: faker.address.city(),
  address: faker.address.streetAddress(),
  phone: faker.phone.number('62#########'),
  fax: faker.name.firstName(),
  code: faker.name.firstName(),
  notes: faker.name.firstName(),
  accounts: [
    {
      accountName: faker.name.firstName(),
      accountNumber: faker.random.numeric(10),
      notes: faker.lorem.lines(),
    },
  ],
};

const bankThree = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.firstName(),
  branch: faker.address.city(),
  address: faker.address.streetAddress(),
  phone: faker.phone.number('62#########'),
  fax: faker.name.firstName(),
  code: faker.name.firstName(),
  notes: faker.name.firstName(),
  accounts: [
    {
      accountName: faker.name.firstName(),
      accountNumber: faker.random.numeric(10),
      notes: faker.lorem.lines(),
    },
  ],
};

const insertBanks = async (banks: Record<string, any>[]) => {
  await Bank.insertMany(banks.map((bank) => ({ ...bank })));
};

describe('Bank routes', () => {
  describe('POST /v1/banks', () => {
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
        accounts: [
          {
            accountName: faker.name.firstName(),
            accountNumber: faker.random.numeric(10),
            notes: faker.lorem.lines(),
          },
        ],
      };
    });

    test('should return 201 and successfully create new bank if data is ok', async () => {
      await insertBanks([bankThree]);

      const res = await request(app).post('/v1/banks').send(newBank).expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        name: newBank.name,
        branch: newBank.branch,
        address: newBank.address,
        phone: newBank.phone,
        fax: newBank.fax,
        code: newBank.code,
        notes: newBank.notes,
        accounts: expect.any(Array),
        createdAt: expect.anything(),
      });

      const dbBank = await Bank.findById(res.body.id);
      expect(dbBank).toBeDefined();
      if (!dbBank) return;
      expect(dbBank).toMatchObject({
        name: newBank.name,
        branch: newBank.branch,
        address: newBank.address,
        phone: newBank.phone,
        fax: newBank.fax,
        code: newBank.code,
        notes: newBank.notes,
      });
    });
  });

  describe('GET /v1/banks', () => {
    test('should return 200 and apply the default query options', async () => {
      await insertBanks([bankOne, bankTwo, bankThree]);

      const res = await request(app).get('/v1/banks').send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0]).toEqual({
        id: bankOne._id.toHexString(),
        name: bankOne.name,
        branch: bankOne.branch,
        address: bankOne.address,
        phone: bankOne.phone,
        fax: bankOne.fax,
        code: bankOne.code,
        notes: bankOne.notes,
        accounts: expect.any(Array),
        createdAt: expect.anything(),
      });
    });

    test('should correctly apply search on field', async () => {
      await insertBanks([bankOne, bankTwo, bankThree]);

      const res = await request(app).get('/v1/banks').query({ search: bankOne.name }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(bankOne._id.toHexString());
    });

    test('should correctly sort the returned array if ascending sort param is specified', async () => {
      await insertBanks([bankOne, bankTwo, bankThree]);

      const res = await request(app).get('/v1/banks').query({ sortBy: 'createdAt:asc' }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0].id).toBe(bankOne._id.toHexString());
      expect(res.body.results[1].id).toBe(bankTwo._id.toHexString());
      expect(res.body.results[2].id).toBe(bankThree._id.toHexString());
    });

    test('should limit returned array if limit param is specified', async () => {
      await insertBanks([bankOne, bankTwo, bankThree]);

      const res = await request(app).get('/v1/banks').query({ limit: 2 }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 2,
        totalPages: 2,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(bankOne._id.toHexString());
      expect(res.body.results[1].id).toBe(bankTwo._id.toHexString());
    });

    test('should return the correct page if page and limit params are specified', async () => {
      await insertBanks([bankOne, bankTwo, bankThree]);

      const res = await request(app).get('/v1/banks').query({ page: 2, limit: 2 }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 2,
        limit: 2,
        totalPages: 2,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(bankThree._id.toHexString());
    });
  });

  describe('GET /v1/banks/:bankId', () => {
    test('should return 200 and the bank object if data is ok', async () => {
      await insertBanks([bankOne]);

      const res = await request(app).get(`/v1/banks/${bankOne._id}`).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: bankOne._id.toHexString(),
        name: bankOne.name,
        branch: bankOne.branch,
        address: bankOne.address,
        phone: bankOne.phone,
        fax: bankOne.fax,
        code: bankOne.code,
        notes: bankOne.notes,
        accounts: expect.any(Array),
        createdAt: expect.anything(),
      });
    });

    test('should return 400 error if bankId is not a valid mongo id', async () => {
      await insertBanks([bankThree]);

      await request(app).get('/v1/banks/invalidId').send().expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if bank is not found', async () => {
      await insertBanks([bankThree]);

      await request(app).get(`/v1/banks/${bankOne._id}`).send().expect(httpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /v1/banks/:bankId', () => {
    test('should return 204 if data is ok', async () => {
      await insertBanks([bankOne]);

      await request(app).delete(`/v1/banks/${bankOne._id}`).send().expect(httpStatus.NO_CONTENT);

      const dbBank = await Bank.findById(bankOne._id);
      expect(dbBank).toBeNull();
    });

    test('should return 400 error if bankId is not a valid mongo id', async () => {
      await insertBanks([bankThree]);

      await request(app).delete('/v1/banks/invalidId').send().expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if bank already is not found', async () => {
      await insertBanks([bankThree]);

      await request(app).delete(`/v1/banks/${bankOne._id}`).send().expect(httpStatus.NOT_FOUND);
    });
  });

  describe('PATCH /v1/banks/:bankId', () => {
    test('should return 200 and successfully update bank if data is ok', async () => {
      await insertBanks([bankOne]);
      const updateBody = {
        name: faker.name.firstName(),
        branch: faker.address.city(),
        address: faker.address.streetAddress(),
        phone: faker.phone.number('62#########'),
        fax: faker.name.firstName(),
        code: faker.name.firstName(),
        notes: faker.name.firstName(),
      };

      const res = await request(app).patch(`/v1/banks/${bankOne._id}`).send(updateBody).expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: bankOne._id.toHexString(),
        name: updateBody.name,
        branch: updateBody.branch,
        address: updateBody.address,
        phone: updateBody.phone,
        fax: updateBody.fax,
        code: updateBody.code,
        notes: updateBody.notes,
        accounts: expect.any(Array),
        createdAt: expect.anything(),
      });

      const dbBank = await Bank.findById(bankOne._id);
      expect(dbBank).toBeDefined();
      if (!dbBank) return;
      expect(dbBank).toMatchObject({
        name: updateBody.name,
      });
    });

    test('should return 400 error if bankId is not a valid mongo id', async () => {
      await insertBanks([bankThree]);
      const updateBody = { name: faker.name.firstName() };

      await request(app).patch(`/v1/banks/invalidId`).send(updateBody).expect(httpStatus.BAD_REQUEST);
    });
  });
});
