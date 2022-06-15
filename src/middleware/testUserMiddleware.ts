import { Request, Response, NextFunction } from 'express';
import { RequestOIDCUser } from '../types/APITypes';

// Add mock user to res.locals to make available in tests. Import any test files as required, but be sure to use it prior to defining route with controller being tests
export const addTestUser = (req: Request, res: Response, next: NextFunction) => {
  const testUser: RequestOIDCUser = {
    nickname: 'test',
    name: 'Test User',
    picture: 'https://fake.content.user-avatar',
    updated_at: '2022-06-15T02:01:58.483Z',
    email: 'test@gmail.com',
    email_verified: false,
    sub: 'google-oauth2|12345678910'
  }
  // Assign the test user to res.locals object
  res.locals.user = testUser;
  next()
};
