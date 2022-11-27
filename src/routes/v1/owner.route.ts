import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { ownerController, ownerValidation } from '../../modules/owner';

const router: Router = express.Router();

router
  .route('/')
  .post(validate(ownerValidation.createOwner), ownerController.createOwner)
  .get(validate(ownerValidation.getOwners), ownerController.getOwners);

router
  .route('/:ownerId')
  .get(validate(ownerValidation.getOwner), ownerController.getOwner)
  .patch(validate(ownerValidation.updateOwner), ownerController.updateOwner)
  .delete(validate(ownerValidation.deleteOwner), ownerController.deleteOwner);

export default router;
