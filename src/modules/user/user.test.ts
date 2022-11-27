import mongoose from 'mongoose';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import app from '../../app';
import setupTestDB from '../jest/setupTestDB';
import User from './user.model';
import { IUser } from './user.interfaces';
import { Role } from '../role';

setupTestDB();

const userOne = {
  _id: new mongoose.Types.ObjectId(),
  username: faker.internet.userName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.number('62#########'),
};

const userTwo = {
  _id: new mongoose.Types.ObjectId(),
  username: faker.internet.userName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.number('62#########'),
};

const userThree = {
  _id: new mongoose.Types.ObjectId(),
  username: faker.internet.userName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.number('62#########'),
};

const roleOne = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.firstName(),
};

// const roleTwo = {
//   _id: new mongoose.Types.ObjectId(),
//   name: faker.name.firstName(),
// };

const insertUsers = async (users: Record<string, any>[]) => {
  await User.insertMany(users.map((user) => ({ ...user })));
};

const insertRoles = async (roles: Record<string, any>[]) => {
  await Role.insertMany(roles.map((role) => ({ ...role })));
};

describe('User routes', () => {
  describe('POST /v1/users', () => {
    let newUser: IUser;

    beforeEach(async () => {
      await insertRoles([roleOne]);

      newUser = {
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number('62#########'),
        role: roleOne._id.toHexString(),
      };
    });

    test('should return 201 and successfully create new user if data is ok', async () => {
      await insertUsers([userThree]);

      const res = await request(app).post('/v1/users').send(newUser).expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        role: expect.any(Object),
        createdAt: expect.anything(),
      });

      const dbUser = await User.findById(res.body.id);
      expect(dbUser).toBeDefined();
      if (!dbUser) return;
      expect(dbUser).toMatchObject({
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
      });
    });

    test('should return 400 error if email is invalid', async () => {
      await insertUsers([userThree]);
      newUser.email = 'invalidEmail';

      await request(app).post('/v1/users').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if email is already used', async () => {
      await insertUsers([userThree, userOne]);
      newUser.email = userOne.email;

      await request(app).post('/v1/users').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if username is already used', async () => {
      await insertUsers([userThree, userOne]);
      newUser.username = userOne.username;

      await request(app).post('/v1/users').send(newUser).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /v1/users', () => {
    test('should return 200 and apply the default query options', async () => {
      await insertUsers([userOne, userTwo, userThree]);

      const res = await request(app).get('/v1/users').send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0]).toEqual({
        id: userOne._id.toHexString(),
        username: userOne.username,
        firstName: userOne.firstName,
        lastName: userOne.lastName,
        email: userOne.email,
        phone: userOne.phone,
        createdAt: expect.anything(),
      });
    });

    test('should correctly apply search on field', async () => {
      await insertUsers([userOne, userTwo, userThree]);

      const res = await request(app).get('/v1/users').query({ search: userOne.username }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(userOne._id.toHexString());
    });

    test('should correctly sort the returned array if ascending sort param is specified', async () => {
      await insertUsers([userOne, userTwo, userThree]);

      const res = await request(app).get('/v1/users').query({ sortBy: 'createdAt:asc' }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0].id).toBe(userOne._id.toHexString());
      expect(res.body.results[1].id).toBe(userTwo._id.toHexString());
      expect(res.body.results[2].id).toBe(userThree._id.toHexString());
    });

    test('should limit returned array if limit param is specified', async () => {
      await insertUsers([userOne, userTwo, userThree]);

      const res = await request(app).get('/v1/users').query({ limit: 2 }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 2,
        totalPages: 2,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(userOne._id.toHexString());
      expect(res.body.results[1].id).toBe(userTwo._id.toHexString());
    });

    test('should return the correct page if page and limit params are specified', async () => {
      await insertUsers([userOne, userTwo, userThree]);

      const res = await request(app).get('/v1/users').query({ page: 2, limit: 2 }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 2,
        limit: 2,
        totalPages: 2,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(userThree._id.toHexString());
    });
  });

  describe('GET /v1/users/:userId', () => {
    test('should return 200 and the user object if data is ok', async () => {
      await insertUsers([userOne]);

      const res = await request(app).get(`/v1/users/${userOne._id}`).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: userOne._id.toHexString(),
        username: userOne.username,
        firstName: userOne.firstName,
        lastName: userOne.lastName,
        email: userOne.email,
        phone: userOne.phone,
        createdAt: expect.anything(),
      });
    });

    test('should return 400 error if userId is not a valid mongo id', async () => {
      await insertUsers([userThree]);

      await request(app).get('/v1/users/invalidId').send().expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if user is not found', async () => {
      await insertUsers([userThree]);

      await request(app).get(`/v1/users/${userOne._id}`).send().expect(httpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /v1/users/:userId', () => {
    test('should return 204 if data is ok', async () => {
      await insertUsers([userOne]);

      await request(app).delete(`/v1/users/${userOne._id}`).send().expect(httpStatus.NO_CONTENT);

      const dbUser = await User.findById(userOne._id);
      expect(dbUser).toBeNull();
    });

    test('should return 400 error if userId is not a valid mongo id', async () => {
      await insertUsers([userThree]);

      await request(app).delete('/v1/users/invalidId').send().expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if user already is not found', async () => {
      await insertUsers([userThree]);

      await request(app).delete(`/v1/users/${userOne._id}`).send().expect(httpStatus.NOT_FOUND);
    });
  });

  describe('PATCH /v1/users/:userId', () => {
    test('should return 200 and successfully update user if data is ok', async () => {
      await insertUsers([userOne]);

      const updateBody = {
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number('62#########'),
      };

      const res = await request(app).patch(`/v1/users/${userOne._id}`).send(updateBody).expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: userOne._id.toHexString(),
        username: updateBody.username,
        firstName: updateBody.firstName,
        lastName: updateBody.lastName,
        email: updateBody.email,
        phone: updateBody.phone,
        createdAt: expect.anything(),
      });

      const dbUser = await User.findById(userOne._id);
      expect(dbUser).toBeDefined();
      if (!dbUser) return;
      expect(dbUser).toMatchObject({
        username: updateBody.username,
        firstName: updateBody.firstName,
        lastName: updateBody.lastName,
        email: updateBody.email,
        phone: updateBody.phone,
      });
    });

    test('should return 400 error if userId is not a valid mongo id', async () => {
      await insertUsers([userThree]);
      const updateBody = { firstName: faker.name.firstName() };

      await request(app).patch(`/v1/users/invalidId`).send(updateBody).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if email is invalid', async () => {
      await insertUsers([userOne]);
      const updateBody = { email: 'invalidEmail' };

      await request(app).patch(`/v1/users/${userOne._id}`).send(updateBody).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if email is already taken', async () => {
      await insertUsers([userOne, userTwo]);
      const updateBody = { email: userTwo.email };

      await request(app).patch(`/v1/users/${userOne._id}`).send(updateBody).expect(httpStatus.BAD_REQUEST);
    });

    test('should not return 400 if email is my email', async () => {
      await insertUsers([userOne]);
      const updateBody = { email: userOne.email };

      await request(app).patch(`/v1/users/${userOne._id}`).send(updateBody).expect(httpStatus.OK);
    });
  });
});
