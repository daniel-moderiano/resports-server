import { Request, Response, NextFunction } from 'express';

// Add mock user to res.locals to make available in tests. Import any test files as required, but be sure to use it prior to defining route with controller being tests
export const addTestUser = (req: Request, res: Response, next: NextFunction) => {
  res.locals.user = {
    // A user ID that reflects the exam format encountered in production env
    sub: 'google-oauth2|12345678910'
  };
  next()
};