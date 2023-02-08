import { selectAllFromTable } from "../db/generalHelpers";
import "./dbSetupTeardown";

describe("database initialisation", () => {
  describe("empty tables are created", () => {
    it("should create 2 empty tables", async () => {
      // const users = await selectAllFromTable('users');
      const channels = await selectAllFromTable("channels");
      const subscriptions = await selectAllFromTable("subscriptions");

      // If the table is present, it will be identifiable here with zero rows
      // expect(users.rows).toHaveLength(0);
      expect(channels.rows).toHaveLength(0);
      expect(subscriptions.rows).toHaveLength(0);
    });
  });
});
