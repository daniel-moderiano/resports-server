import { createTable, insert, select, dropTable } from "../db/utils";
import './dbSetupTeardown';

describe('database utils', () => {
  describe('createTable', () => {
    it('should create the table in the database', async () => {
      const res = await createTable('items');
      // Because the table has just been created, no rows should exist
      expect(res.rowCount).toBeNull();
    })
  });

  describe('insert', () => {
    it('should insert an item into the table', async () => {
      const res = await insert('items', 'steering wheel', 62.59)
      expect(res.rowCount).toEqual(1)
    })
  });

  describe('select', () => {
    it('should select items from the table', async () => {
      const res = await select('items')
      // After each db test run, the 'items' table will be dropped, so we can be sure there is only one row in the table - the row inserted in the insert test
      expect(res.rows[0]).toStrictEqual({ id: 1, name: 'steering wheel', price: '62.59' })
    })
  })
})