import getDb from '../db'
import { dropTable } from '../db/utils';

// ! Ensure test DB is used
process.env.TEST_ENV = 'true';

(async () => {
  await dropTable('items');
})();

// Ensure test tables are dropped
// TODO: create utility to drop all tables
beforeAll(async () => {
  await dropTable('items');
});

afterAll(async () => {
  await dropTable('items');
  await getDb().end();
});