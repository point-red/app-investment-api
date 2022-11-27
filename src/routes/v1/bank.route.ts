import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { bankController, bankValidation } from '../../modules/bank';

const router: Router = express.Router();

router
  .route('/')
  .post(validate(bankValidation.createBank), bankController.createBank)
  .get(validate(bankValidation.getBanks), bankController.getBanks);

router
  .route('/:bankId')
  .get(validate(bankValidation.getBank), bankController.getBank)
  .patch(validate(bankValidation.updateBank), bankController.updateBank)
  .delete(validate(bankValidation.deleteBank), bankController.deleteBank);

export default router;
