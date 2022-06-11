import { selectAllFromTable, insertUser, selectUser, deleteUser, updateUser } from "../db/helpers";
import './dbSetupTeardown';

describe('Database helper/utility functions', () => {
  describe('Generalised functions', () => {
    it('Should select all items from the table', async () => {
      const res = await selectAllFromTable('users')
      expect(res.rows).toHaveLength(0);
    })
  });

  describe('Users table functions', () => {
    describe('Add user to table', () => {
      it('should insert a user into the table', async () => {
        const res = await insertUser('1234', 'dan@gmail.com')
        expect(res.rowCount).toBe(1);
      })

      // Error handling
    })

    describe('Select user from table', () => {
      it('should select user from the table', async () => {
        const res = await selectUser('1234');

        // Should return inserted user from test above
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({ "user_id": "1234", "user_email": "dan@gmail.com" });
      })

      // Error handling
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

      // Error handling
    })

    describe('Delete user from table', () => {
      it('should delete a user from the table', async () => {
        const res = await deleteUser('1234');

        // Should remove one row only, leaving no more rows in the table
        expect(res.rowCount).toBe(1);
        expect(res.rows).toHaveLength(0);
      });

      // Error handling
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