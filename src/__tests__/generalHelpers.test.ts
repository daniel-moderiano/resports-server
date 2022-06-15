import { selectAllFromTable, dropTable } from "../db/generalHelpers";
import './dbSetupTeardown';

describe('Generalised database helper/utility functions', () => {
  it('should select all items from the table', async () => {
    const res = await selectAllFromTable('channels')
    expect(res.rows).toHaveLength(0);
  })

  it('should drop selected table', async () => {
    // Cannot drop other tables as they have dependencies
    await dropTable('subscriptions');

    // Aim to access this table. An error should be thrown
    selectAllFromTable('subscriptions')
      .catch((err) => {
        // Check for custom severity property thrown by node-pg
        expect(err.severity).toBe('ERROR')
      })
  })
});