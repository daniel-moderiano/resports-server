import { selectAllFromTable, insertUser, selectUser, deleteUser, updateUser, dropTable } from "../db/helpers";
import './dbSetupTeardown';

describe('Database helper/utility functions', () => {
  describe('Generalised functions', () => {
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

  describe('Users table functions', () => {
    describe('Add user to table', () => {
      it('should insert a user into the table', async () => {
        const res = await insertUser('1234', 'dan@gmail.com')
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({ "user_id": "1234", "user_email": "dan@gmail.com" });
      })
    })

    describe('Select user from table', () => {
      it('should select user from the table', async () => {
        const res = await selectUser('1234');

        // Should return inserted user from test above
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({ "user_id": "1234", "user_email": "dan@gmail.com" });
      })
    })

    describe('Update user in table', () => {
      it('should update and return new user in the table', async () => {
        const res = await updateUser('1234', {
          userId: '1234',
          userEmail: 'damo@gmail.com'
        });

        // Should perform single row update only
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({ "user_id": "1234", "user_email": "damo@gmail.com" });
      })
    })

    describe('Delete user from table', () => {
      it('should delete a user from the table', async () => {
        const res = await deleteUser('1234');

        // Should remove one row only, leaving no more rows in the table
        expect(res.rowCount).toBe(1);
        expect(res.rows).toHaveLength(0);
      });
    });


  });

  describe('Channels table functions', () => {
    it('should select items from the table', async () => {
      // const res = await selectAllFromTable('users')
      // expect(res.rows).toHaveLength(0);
    })
  });

  describe('Subscriptions table functions', () => {
    it('should select items from the table', async () => {
      // const res = await selectAllFromTable('users')
      // expect(res.rows).toHaveLength(0);
    })
  });
})