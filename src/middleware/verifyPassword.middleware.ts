import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../modules/errors';

const verifyPassword = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { password } = req.body;
  const resultCompare = password === 'password';

  if (password === '' || resultCompare === false) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Passwords does not match'));
  }

  return next();
};

export default verifyPassword;
