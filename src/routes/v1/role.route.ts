import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { roleController, roleValidation } from '../../modules/role';

const router: Router = express.Router();

router
  .route('/')
  .post(validate(roleValidation.createRole), roleController.createRole)
  .get(validate(roleValidation.getRoles), roleController.getRoles);

router
  .route('/:roleId')
  .get(validate(roleValidation.getRole), roleController.getRole)
  .patch(validate(roleValidation.updateRole), roleController.updateRole)
  .delete(validate(roleValidation.deleteRole), roleController.deleteRole);

router.route('/:roleId/sync-permission').patch(validate(roleValidation.assignPermission), roleController.assignPermission);

export default router;
