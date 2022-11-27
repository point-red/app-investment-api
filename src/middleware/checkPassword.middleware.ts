import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../modules/errors';

const checkPassword = (req: Request, _res: Response, next: NextFunction): void => {
  const { password } = req.body;
  const resultCompare = password === 'password';

  if (password === '' || resultCompare === false) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'Passwords does not match'));
  }

  return next();
};

export default checkPassword;
