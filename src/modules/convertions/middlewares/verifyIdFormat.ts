import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

export default function verifyIdFormat(request: Request, _: Response, next: NextFunction): void {
  const { id } = request.params;
  function isNotValidIdFormat() {
    const idRGEX = /^[A-Z]{3}[_]{1}[A-Z]{3}$/;
    return !idRGEX.test(id);
  }

  if (isNotValidIdFormat()) {
    throw new AppError("One or both currencies code aren't valid");
  }
  return next();
}
