import { selectAllFromTable, insertUser, selectUser, deleteUser, updateUser, dropTable, insertChannel, selectChannel, updateChannel, deleteChannel, insertSubscription, selectSubscription, updateSubscription, deleteSubscription, selectUserSubscriptions } from "../db/helpers";
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
      await insertChannel({
        channelId: '123456',
        channelName: 'VGBootCamp'
      });

      // Second channel insert to allow testing of subscription update
      await insertChannel({
        channelId: '12345678',
        channelName: 'BTSSmash'
      })
    });

    describe('Add subscription to table', () => {
      it('should insert a subscription into the table', async () => {
        const res = await insertSubscription({
          channelId: '123456',
          platform: 'twitch',
          userId: '1234'
        })
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({
          "subscription_id": 1,
          "channel_id": "123456",
          "user_id": "1234",
          "platform": "twitch"
        });
      })
    })

    describe('Select subscription from table using subscription ID', () => {
      it('should select subscription from the table using integer input', async () => {
        const res = await selectSubscription(1);

        // Should return inserted channel from test above
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({
          "subscription_id": 1,
          "channel_id": "123456",
          "user_id": "1234",
          "platform": "twitch"
        });
      })

      it('should select subscription from the table using string input', async () => {
        const res = await selectSubscription('1');

        // Should return inserted channel from test above
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({
          "subscription_id": 1,
          "channel_id": "123456",
          "user_id": "1234",
          "platform": "twitch"
        });
      })
    })

    describe('Update subscription in table', () => {
      it('should update and return new subscription in the table (integer input)', async () => {
        const res = await updateSubscription({
          subscriptionId: 1,
          channelId: '123456',
          userId: '1234',
          platform: "youtube"
        });

        // Should perform single row update only
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({
          "subscription_id": 1,
          "channel_id": "123456",
          "user_id": "1234",
          "platform": "youtube"
        });
      })

      it('should update and return new subscription in the table (string input)', async () => {
        const res = await updateSubscription({
          subscriptionId: '1',
          channelId: '123456',
          userId: '1234',
          platform: "twitch"
        });

        // Should perform single row update only
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({
          "subscription_id": 1,
          "channel_id": "123456",
          "user_id": "1234",
          "platform": "twitch"
        });
      })
    })

    describe('Delete subscription from table', () => {
      it('should delete a subscription from the table (integer input) and return deleted subscription', async () => {
        const res = await deleteSubscription(1);

        // Should remove one row only, leaving no more rows in the table
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({
          "subscription_id": 1,
          "channel_id": "123456",
          "user_id": "1234",
          "platform": "twitch"
        });
      });

      it('should delete a subscription from the table (string input) and return deleted subscription', async () => {
        // Reinsert subscription
        await insertSubscription({
          channelId: '123456',
          platform: 'twitch',
          userId: '1234'
        })

        // Note the ID is '2' here, as the previously deleted subscriptions holds on to ID '1' despite deletion
        const res = await deleteSubscription('2');

        // Should remove one row only, leaving no more rows in the table
        expect(res.rowCount).toBe(1);
        expect(res.rows[0]).toStrictEqual({
          "subscription_id": 2,
          "channel_id": "123456",
          "user_id": "1234",
          "platform": "twitch"
        });
      });
    });

    describe('Select subscriptions from table using user ID', () => {
      it('should select all subscriptions belonging to one user from the table', async () => {
        // Insert some extra subscriptions into the db
        await insertSubscription({
          channelId: '123456',
          platform: 'twitch',
          userId: '1234'
        })

        await insertSubscription({
          channelId: '12345678',
          platform: 'twitch',
          userId: '1234'
        });

        await insertSubscription({
          channelId: '12345678',
          platform: 'twitch',
          userId: '5678'
        })

        const res = await selectUserSubscriptions('1234');

        // Should return two of the three subscriptions in the database (note IDs to be 3 and 4, as two previous subscriptions have already been inserted in previous tests)
        expect(res.rowCount).toBe(2);
        expect(res.rows).toStrictEqual([{
          "subscription_id": 3,
          "channel_id": "123456",
          "user_id": "1234",
          "platform": "twitch"
        },
        {
          "subscription_id": 4,
          "channel_id": "12345678",
          "user_id": "1234",
          "platform": "twitch"
        }]);
      });
    });
  });
})