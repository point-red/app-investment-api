import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { permissionController, permissionValidation } from '../../modules/permission';

const router: Router = express.Router();

router
  .route('/')
  .post(validate(permissionValidation.createPermission), permissionController.createPermission)
  .get(validate(permissionValidation.getPermissions), permissionController.getPermissions);

export default router;
