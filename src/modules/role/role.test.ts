import mongoose from 'mongoose';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import httpMocks from 'node-mocks-http';
import { jest } from '@jest/globals';
import verifyPassword from '../../middleware/verifyPassword.middleware';
import verifyPermission from '../../middleware/verifyPermission.middleware';
import app from '../../app';
import setupTestDB from '../jest/setupTestDB';
import Role from './role.model';
import { IRole } from './role.interfaces';
import { Permission } from '../permission';
import { ApiError } from '../errors';

setupTestDB();

const userPassword = 'password';

const permissionOne = {
  _id: new mongoose.Types.ObjectId(),
  name: 'roles.create',
};

const roleOne = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.firstName(),
};

const roleTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.firstName(),
};

const roleThree = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.firstName(),
};

const insertPermissions = async (permissions: Record<string, any>[]) => {
  await Permission.insertMany(permissions.map((permission) => ({ ...permission })));
};

const insertRoles = async (roles: Record<string, any>[]) => {
  await Role.insertMany(roles.map((role) => ({ ...role })));
};

describe('Role routes', () => {
  describe('POST /v1/roles', () => {
    let newRole: IRole;
    let newUser: any;

    beforeEach(() => {
      newRole = {
        name: faker.name.firstName(),
        permissions: [],
      };

      insertPermissions([permissionOne]);

      const role = {
        _id: new mongoose.Types.ObjectId(),
        name: faker.name.firstName(),
        permissions: [permissionOne._id.toHexString()],
      };

      insertRoles([role]);

      newUser = {
        _id: new mongoose.Types.ObjectId(),
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number('62#########'),
        role: role._id.toHexString(),
        status: 'active',
      };
    });

    test('should return 201 and successfully create new role if data is ok', async () => {
      await insertRoles([roleThree]);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: `/v1/roles`,
        body: newRole,
      });
      const next = jest.fn();

      req.user = newUser;

      await verifyPermission('roles.create')(req, httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith();
    });

    test("should return 401 when user doesn't have permission create role", async () => {
      await insertRoles([roleThree]);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: `/v1/roles`,
        body: newRole,
      });
      const next = jest.fn();

      req.user = newUser;

      await verifyPermission('undefined.permission')(req, httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.UNAUTHORIZED,
          message: "You don't have enough permission to perform this action",
        })
      );
    });
  });

  describe('GET /v1/roles', () => {
    test('should return 200 and apply the default query options', async () => {
      await insertRoles([roleOne, roleTwo, roleThree]);

      const res = await request(app).get('/v1/roles').send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0]).toEqual({
        id: roleOne._id.toHexString(),
        name: roleOne.name,
        permissions: [],
        createdAt: expect.anything(),
      });
    });

    test('should correctly apply search on field', async () => {
      await insertRoles([roleOne, roleTwo, roleThree]);

      const res = await request(app).get('/v1/roles').query({ search: roleOne.name }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(roleOne._id.toHexString());
    });

    test('should correctly sort the returned array if ascending sort param is specified', async () => {
      await insertRoles([roleOne, roleTwo, roleThree]);

      const res = await request(app).get('/v1/roles').query({ sortBy: 'createdAt:asc' }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0].id).toBe(roleOne._id.toHexString());
      expect(res.body.results[1].id).toBe(roleTwo._id.toHexString());
      expect(res.body.results[2].id).toBe(roleThree._id.toHexString());
    });

    test('should limit returned array if limit param is specified', async () => {
      await insertRoles([roleOne, roleTwo, roleThree]);

      const res = await request(app).get('/v1/roles').query({ limit: 2 }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 2,
        totalPages: 2,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(roleOne._id.toHexString());
      expect(res.body.results[1].id).toBe(roleTwo._id.toHexString());
    });

    test('should return the correct page if page and limit params are specified', async () => {
      await insertRoles([roleOne, roleTwo, roleThree]);

      const res = await request(app).get('/v1/roles').query({ page: 2, limit: 2 }).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 2,
        limit: 2,
        totalPages: 2,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(roleThree._id.toHexString());
    });
  });

  describe('GET /v1/roles/:roleId', () => {
    test('should return 200 and the role object if data is ok', async () => {
      await insertRoles([roleOne]);

      const res = await request(app).get(`/v1/roles/${roleOne._id}`).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: roleOne._id.toHexString(),
        name: roleOne.name,
        permissions: [],
        createdAt: expect.anything(),
      });
    });

    test('should return 400 error if roleId is not a valid mongo id', async () => {
      await insertRoles([roleThree]);

      await request(app).get('/v1/roles/invalidId').send().expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if role is not found', async () => {
      await insertRoles([roleThree]);

      await request(app).get(`/v1/roles/${roleOne._id}`).send().expect(httpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /v1/roles/:roleId', () => {
    test('should return 204 if data is ok', async () => {
      await insertRoles([roleOne]);

      const req = httpMocks.createRequest({
        method: 'DELETE',
        url: `/v1/roles/${roleOne._id}`,
        body: {
          password: userPassword,
        },
      });
      const next = jest.fn();

      await verifyPassword(req, httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith();
    });

    test('should return 401 if wrong password', async () => {
      await insertRoles([roleOne]);

      const req = httpMocks.createRequest({
        url: `/v1/roles/${roleOne._id}`,
        method: 'DELETE',
        body: {
          password: 'wrong password',
        },
      });
      const next = jest.fn();

      await verifyPassword(req, httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Passwords does not match' })
      );
    });
  });

  describe('PATCH /v1/roles/:roleId', () => {
    test('should return 200 and successfully update role if data is ok', async () => {
      await insertRoles([roleOne]);
      const updateBody = {
        name: faker.name.firstName(),
      };

      const res = await request(app).patch(`/v1/roles/${roleOne._id}`).send(updateBody).expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: roleOne._id.toHexString(),
        name: updateBody.name,
        permissions: [],
        createdAt: expect.anything(),
      });

      const dbRole = await Role.findById(roleOne._id);
      expect(dbRole).toBeDefined();
      if (!dbRole) return;
      expect(dbRole).toMatchObject({
        name: updateBody.name,
      });
    });

    test('should return 400 error if roleId is not a valid mongo id', async () => {
      await insertRoles([roleThree]);
      const updateBody = { firstName: faker.name.firstName() };

      await request(app).patch(`/v1/roles/invalidId`).send(updateBody).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if role name is already taken', async () => {
      await insertRoles([roleOne, roleTwo]);
      const updateBody = { name: roleTwo.name };

      await request(app).patch(`/v1/roles/${roleOne._id}`).send(updateBody).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('PATCH /v1/roles/:roleId/sync-permission', () => {
    test('should return 200 and successfully assign permissions if data is ok', async () => {
      await insertPermissions([permissionOne]);
      await insertRoles([roleOne]);

      const updateBody = {
        permissions: [permissionOne._id.toHexString()],
      };

      const res = await request(app)
        .patch(`/v1/roles/${roleOne._id}/sync-permission`)
        .send(updateBody)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: roleOne._id.toHexString(),
        name: roleOne.name,
        permissions: expect.any(Array),
        createdAt: expect.anything(),
      });

      const dbRole = await Role.findById(roleOne._id);
      expect(dbRole).toBeDefined();
      if (!dbRole) return;
      expect(dbRole._id.toHexString()).toEqual(roleOne._id.toHexString());
      expect(dbRole.name).toEqual(roleOne.name);
      expect(dbRole.permissions).toHaveLength(1);
    });

    test('should return 400 error if roleId is not a valid mongo id', async () => {
      await insertPermissions([permissionOne]);
      await insertRoles([roleThree]);
      const updateBody = { permissions: [permissionOne._id] };

      await request(app).patch(`/v1/roles/invalidId/sync-permission`).send(updateBody).expect(httpStatus.BAD_REQUEST);
    });
  });
});
