import { selectAllFromTable, dropTable } from "../db/helpers";
import { createTable } from "../db/testUtils";
import './dbSetupTeardown';

describe('database helper functions', () => {
  describe('createTable', () => {
    it('should create the table in the database', async () => {
      const res = await createTable('items');
      // Because the table has just been created, no rows should exist
      expect(res.rowCount).toBeNull();
    })
  });

  describe('drop table', () => {
    it('should create the table in the database', async () => {
      // const res = await dropTable('items');
      // Because the table has just been created, no rows should exist
      // expect(res.rowCount).toBeNull();
    })
  });

  describe('select all', () => {
    it('should select items from the table', async () => {
      const res = await selectAllFromTable('items')
      console.log(res);

      // After each db test run, the 'items' table will be dropped, so we can be sure there is only one row in the table - the row inserted in the insert test
      expect(res.rows[0]).toStrictEqual({ id: 1, name: 'steering wheel', price: '62.59' })
    })
  })
})