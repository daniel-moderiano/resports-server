import {
  selectChannel,
  insertChannel,
  upsertChannel,
  deleteChannel,
  updateChannel,
} from "../db/channelHelpers";
import "./dbSetupTeardown";

describe("Channels table helper/utility functions", () => {
  describe("Upsert channel to table", () => {
    it("should insert a channel into the table where one does not yet exist", async () => {
      const res = await upsertChannel({
        channelId: "123456",
        channelName: "BTSSmash",
      });
      expect(res.rowCount).toBe(1);
      expect(res.rows[0]).toStrictEqual({
        channel_id: "123456",
        channel_name: "BTSSmash",
      });
    });

    it("should update a channel name when one with the same ID exists", async () => {
      const res = await upsertChannel({
        channelId: "123456",
        channelName: "VGBootCamp",
      });

      expect(res.rowCount).toBe(1);
      expect(res.rows[0]).toStrictEqual({
        channel_id: "123456",
        channel_name: "VGBootCamp",
      });
    });
  });

  describe("Select channel from table", () => {
    it("should select channel from the table", async () => {
      const res = await selectChannel("123456");

      // Should return inserted channel from test above
      expect(res.rowCount).toBe(1);
      expect(res.rows[0]).toStrictEqual({
        channel_id: "123456",
        channel_name: "VGBootCamp",
      });
    });
  });

  describe("Update channel in table", () => {
    it("should update and return new channel in the table", async () => {
      const res = await updateChannel({
        channelId: "123456",
        channelName: "BTSSmash",
      });

      // Should perform single row update only
      expect(res.rowCount).toBe(1);
      expect(res.rows[0]).toStrictEqual({
        channel_id: "123456",
        channel_name: "BTSSmash",
      });
    });
  });

  describe("Delete channel from table", () => {
    it("should delete a channel from the table", async () => {
      const res = await deleteChannel("123456");

      // Should remove one row only, leaving no more rows in the table
      expect(res.rowCount).toBe(1);
      expect(res.rows).toHaveLength(0);
    });
  });
});
