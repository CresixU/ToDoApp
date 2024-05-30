import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent)
    return next(err)
  
  res.status(500)
  res.render('error', { error: err })
};

export default errorHandler;