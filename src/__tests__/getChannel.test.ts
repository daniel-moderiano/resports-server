import { getChannel } from "../controllers/channelControllers";
import request from "supertest";
import express from "express";
import "./dbSetupTeardown";
import { deleteChannel, insertChannel } from "../db/channelHelpers";

// Setup new app instance
const app = express();

// Use the controller
app.get("/channels/:channelId", getChannel);

describe("getChannel controller", () => {
  // Add some channels to the test database
  beforeAll(async () => {
    await insertChannel({ channelId: "1234", channelName: "VGBootCamp" });
    await insertChannel({ channelId: "5678", channelName: "BTSSmash" });
  });

  it("retrieves correct channel in the database", async () => {
    const res = await request(app).get("/channels/1234");
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({
      channel_id: "1234",
      channel_name: "VGBootCamp",
    });
  });

  it("throws error if channel is not in database", async () => {
    // Delete existing channels first
    await deleteChannel("1234");
    await deleteChannel("5678");

    const res = await request(app).get("/channels/1234");
    // Error will return in text/html form here. In production, a JSON format error will be returned
    expect(res.headers["content-type"]).toMatch(/text/);
    expect(res.statusCode).toEqual(400);
  });
});
