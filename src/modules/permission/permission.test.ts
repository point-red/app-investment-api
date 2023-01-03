import mongoose from 'mongoose';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import app from '../../app';
import setupTestDB from '../jest/setupTestDB';
import Permission from './permission.model';
import { IPermission } from './permission.interfaces';

setupTestDB();

const permissionOne = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.internet.userName(),
};

const permissionTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.internet.userName(),
};

const permissionThree = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.internet.userName(),
};

const insertPermissions = async (permissions: Record<string, any>[]) => {
  await Permission.insertMany(permissions.map((permission) => ({ ...permission })));
};

describe('Permission routes', () => {
  describe('POST /v1/permissions', () => {
    let newPermission: IPermission;

    beforeEach(() => {
      newPermission = {
        name: faker.internet.userName(),
      };
    });

    test('should return 201 and successfully create new permission if data is ok', async () => {
      await insertPermissions([permissionThree]);

      const res = await request(app).post('/v1/permissions').send(newPermission).expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        name: newPermission.name,
        createdAt: expect.anything(),
      });

      const dbPermission = await Permission.findById(res.body.id);
      expect(dbPermission).toBeDefined();
      if (!dbPermission) return;

      expect(dbPermission).toMatchObject({
        name: newPermission.name,
      });
    });
  });

  describe('GET /v1/permissions', () => {
    test('should return 200 and apply the default query options', async () => {
      await insertPermissions([permissionOne, permissionTwo, permissionThree]);

      const res = await request(app).get('/v1/permissions').send().expect(httpStatus.OK);

      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0]).toEqual({
        id: permissionOne._id.toHexString(),
        name: permissionOne.name,
        createdAt: expect.anything(),
      });
    });
  });
});
