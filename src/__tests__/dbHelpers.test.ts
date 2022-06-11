import { selectAllFromTable, insertUser, selectUser, deleteUser, updateUser, dropTable, insertChannel, selectChannel, updateChannel, deleteChannel, insertSubscription, selectSubscription, updateSubscription, deleteSubscription } from "../db/helpers";
import './dbSetupTeardown';

describe('Database helper/utility functions', () => {
  describe('Generalised functions', () => {
    it('should select all items from the table', async () => {
      const res = await selectAllFromTable('channels')
      expect(res.rows).toHaveLength(0);
    })

    it('should drop selected table', async () => {
      // Cannot drop other tables as they have dependencies
      // await dropTable('subscriptions');

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
        const res = await insertUser({
          userId: '1234',
          userEmail: 'dan@gmail.com'
        })
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
        const res = await updateUser({
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
    describe('Add channel to table', () => {
      it('should insert a channel into the table', async () => {
        const res = await insertChannel({
          channelId: '123456',
          channelName: 'VGBootCamp'
        })
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({ "channel_id": "123456", "channel_name": "VGBootCamp" });
      })
    })

    describe('Select channel from table', () => {
      it('should select channel from the table', async () => {
        const res = await selectChannel('123456');

        // Should return inserted channel from test above
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({ "channel_id": "123456", "channel_name": "VGBootCamp" });
      })
    })

    describe('Update channel in table', () => {
      it('should update and return new channel in the table', async () => {
        const res = await updateChannel({
          channelId: '123456',
          channelName: 'BTSSmash'
        });

        // Should perform single row update only
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({ "channel_id": "123456", "channel_name": "BTSSmash" });
      })
    })

    describe('Delete channel from table', () => {
      it('should delete a channel from the table', async () => {
        const res = await deleteChannel('123456');

        // Should remove one row only, leaving no more rows in the table
        expect(res.rowCount).toBe(1);
        expect(res.rows).toHaveLength(0);
      });
    });
  });

  describe('Subscriptions table functions', () => {
    // Insert user and channel into db before creating subscription entries
    beforeAll(async () => {
      await insertUser({
        userId: '1234',
        userEmail: 'dan@gmail.com'
      })

      await insertChannel({
        channelId: '123456',
        channelName: 'VGBootCamp'
      });

      // Second channel insert to allow testing of subscription update
      await insertChannel({
        channelId: '12345678',
        channelName: 'VGBootCamp'
      })
    });

    describe('Add subscription to table', () => {
      it('should insert a subscription into the table', async () => {
        const res = await insertSubscription({
          channelId: '123456',
          userId: '1234'
        })
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({
          "subscription_id": 1,
          "channel_id": "123456",
          "user_id": "1234",
        });
      })
    })

    describe('Select subscription from table', () => {
      it('should select subscription from the table', async () => {
        const res = await selectSubscription(1);

        // Should return inserted channel from test above
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({
          "subscription_id": 1,
          "channel_id": "123456",
          "user_id": "1234",
        });
      })
    })

    describe('Update subscription in table', () => {
      it('should update and return new subscription in the table', async () => {
        const res = await updateSubscription({
          subscriptionId: 1,
          channelId: '12345678',
          userId: '1234'
        });

        // Should perform single row update only
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({
          "subscription_id": 1,
          "channel_id": "12345678",
          "user_id": "1234",
        });
      })
    })

    describe('Delete subscription from table', () => {
      it('should delete a subscription from the table', async () => {
        const res = await deleteSubscription(1);

        // Should remove one row only, leaving no more rows in the table
        expect(res.rowCount).toBe(1);
        expect(res.rows).toHaveLength(0);
      });
    });
  });
})