import { expect } from "chai";
import request from "supertest";
import app from "../server.js";

describe("CORS", () => {
    it("should allow localhost frontend", async () => {
        const response = await request(app)
            .get("/")
            .set("Origin", "http://localhost:3000");

        expect(response.headers["access-control-allow-origin"])
            .to.equal("http://localhost:3000");
    });
});