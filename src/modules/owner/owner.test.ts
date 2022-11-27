import mongoose from 'mongoose';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import app from '../../app';
import setupTestDB from '../jest/setupTestDB';
import Owner from './owner.model';
import { IOwner } from './owner.interfaces';

setupTestDB();

const ownerOne = {
  _id: new mongoose.Types.ObjectId(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.number('62#########'),
};

const ownerTwo = {
  _id: new mongoose.Types.ObjectId(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.number('62#########'),
};

const ownerThree = {
  _id: new mongoose.Types.ObjectId(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.number('62#########'),
};

const insertOwners = async (owners: Record<string, any>[]) => {
  await Owner.insertMany(owners.map((owner) => ({ ...owner })));
};

describe('Owner routes', () => {
  describe('POST /v1/owners', () => {
    let newOwner: IOwner;

    beforeEach(() => {
      newOwner = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number('62#########'),
      };
    });

    test('should return 201 and successfully create new owner if data is ok', async () => {
      await insertOwners([ownerThree]);

      const res = await request(app).post('/v1/owners').send(newOwner).expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        firstName: newOwner.firstName,
        lastName: newOwner.lastName,
        email: newOwner.email,
        phone: newOwner.phone,
        createdAt: expect.anything(),
      });

      const dbOwner = await Owner.findById(res.body.id);
      expect(dbOwner).toBeDefined();
      if (!dbOwner) return;
      expect(dbOwner).toMatchObject({
        firstName: newOwner.firstName,
        lastName: newOwner.lastName,
        email: newOwner.email,
        phone: newOwner.phone,
      });
    });

    test('should return 400 error if email is invalid', async () => {
      await insertOwners([ownerThree]);
      newOwner.email = 'invalidEmail';

      await request(app).post('/v1/owners').send(newOwner).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if email is already used', async () => {
      await insertOwners([ownerThree, ownerOne]);
      newOwner.email = ownerOne.email;

      await request(app).post('/v1/owners').send(newOwner).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /v1/owners', () => {
    test('should return 200 and apply the default query options', async () => {
      await insertOwners([ownerOne, ownerTwo, ownerThree]);

      const res = await request(app).get('/v1/owners').send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0]).toEqual({
        id: ownerOne._id.toHexString(),
        firstName: ownerOne.firstName,
        lastName: ownerOne.lastName,
        email: ownerOne.email,
        phone: ownerOne.phone,
        createdAt: expect.anything(),
      });
    });

    test('should correctly apply search on field', async () => {
      await insertOwners([ownerOne, ownerTwo, ownerThree]);

      const res = await request(app).get('/v1/owners').query({ search: ownerOne.firstName }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(ownerOne._id.toHexString());
    });

    test('should correctly sort the returned array if ascending sort param is specified', async () => {
      await insertOwners([ownerOne, ownerTwo, ownerThree]);

      const res = await request(app).get('/v1/owners').query({ sortBy: 'createdAt:asc' }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0].id).toBe(ownerOne._id.toHexString());
      expect(res.body.results[1].id).toBe(ownerTwo._id.toHexString());
      expect(res.body.results[2].id).toBe(ownerThree._id.toHexString());
    });

    test('should limit returned array if limit param is specified', async () => {
      await insertOwners([ownerOne, ownerTwo, ownerThree]);

      const res = await request(app).get('/v1/owners').query({ limit: 2 }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 2,
        totalPages: 2,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(ownerOne._id.toHexString());
      expect(res.body.results[1].id).toBe(ownerTwo._id.toHexString());
    });

    test('should return the correct page if page and limit params are specified', async () => {
      await insertOwners([ownerOne, ownerTwo, ownerThree]);

      const res = await request(app).get('/v1/owners').query({ page: 2, limit: 2 }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 2,
        limit: 2,
        totalPages: 2,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(ownerThree._id.toHexString());
    });
  });

  describe('GET /v1/owners/:ownerId', () => {
    test('should return 200 and the owner object if data is ok', async () => {
      await insertOwners([ownerOne]);

      const res = await request(app).get(`/v1/owners/${ownerOne._id}`).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: ownerOne._id.toHexString(),
        firstName: ownerOne.firstName,
        lastName: ownerOne.lastName,
        email: ownerOne.email,
        phone: ownerOne.phone,
        createdAt: expect.anything(),
      });
    });

    test('should return 400 error if ownerId is not a valid mongo id', async () => {
      await insertOwners([ownerThree]);

      await request(app).get('/v1/owners/invalidId').send().expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if owner is not found', async () => {
      await insertOwners([ownerThree]);

      await request(app).get(`/v1/owners/${ownerOne._id}`).send().expect(httpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /v1/owners/:ownerId', () => {
    test('should return 204 if data is ok', async () => {
      await insertOwners([ownerOne]);

      await request(app).delete(`/v1/owners/${ownerOne._id}`).send().expect(httpStatus.NO_CONTENT);

      const dbOwner = await Owner.findById(ownerOne._id);
      expect(dbOwner).toBeNull();
    });

    test('should return 400 error if ownerId is not a valid mongo id', async () => {
      await insertOwners([ownerThree]);

      await request(app).delete('/v1/owners/invalidId').send().expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if owner already is not found', async () => {
      await insertOwners([ownerThree]);

      await request(app).delete(`/v1/owners/${ownerOne._id}`).send().expect(httpStatus.NOT_FOUND);
    });
  });

  describe('PATCH /v1/owners/:ownerId', () => {
    test('should return 200 and successfully update owner if data is ok', async () => {
      await insertOwners([ownerOne]);
      const updateBody = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number('62#########'),
      };

      const res = await request(app).patch(`/v1/owners/${ownerOne._id}`).send(updateBody).expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: ownerOne._id.toHexString(),
        firstName: updateBody.firstName,
        lastName: updateBody.lastName,
        email: updateBody.email,
        phone: updateBody.phone,
        createdAt: expect.anything(),
      });

      const dbOwner = await Owner.findById(ownerOne._id);
      expect(dbOwner).toBeDefined();
      if (!dbOwner) return;
      expect(dbOwner).toMatchObject({
        firstName: updateBody.firstName,
        lastName: updateBody.lastName,
        email: updateBody.email,
        phone: updateBody.phone,
      });
    });

    test('should return 400 error if ownerId is not a valid mongo id', async () => {
      await insertOwners([ownerThree]);
      const updateBody = { firstName: faker.name.firstName() };

      await request(app).patch(`/v1/owners/invalidId`).send(updateBody).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if email is invalid', async () => {
      await insertOwners([ownerOne]);
      const updateBody = { email: 'invalidEmail' };

      await request(app).patch(`/v1/owners/${ownerOne._id}`).send(updateBody).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if email is already taken', async () => {
      await insertOwners([ownerOne, ownerTwo]);
      const updateBody = { email: ownerTwo.email };

      await request(app).patch(`/v1/owners/${ownerOne._id}`).send(updateBody).expect(httpStatus.BAD_REQUEST);
    });

    test('should not return 400 if email is my email', async () => {
      await insertOwners([ownerOne]);
      const updateBody = { email: ownerOne.email };

      await request(app).patch(`/v1/owners/${ownerOne._id}`).send(updateBody).expect(httpStatus.OK);
    });
  });
});
