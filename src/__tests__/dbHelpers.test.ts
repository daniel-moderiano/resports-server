import { selectAllFromTable } from "../db/helpers";
import './dbSetupTeardown';

describe('database helper functions', () => {
  describe('select all', () => {
    it('should select items from the table', async () => {
      const res = await selectAllFromTable('users')
      expect(res.rows).toHaveLength(0);
    })
  })
})