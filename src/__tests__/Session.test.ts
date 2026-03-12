import request from "supertest";
import app from "../app.js";

import bcrypt from "bcryptjs"; 
import { prisma } from "../database/client.js"; 


describe("Session Integration Tests", () => {
  beforeAll(async () => {
    await prisma.subscription.deleteMany();
    await prisma.user.deleteMany();

    
    const passwordHash = await bcrypt.hash("123456", 8);
    await prisma.user.create({
      data: {
        name: "User Test",
        email: "login@test.com",
        passwordHash: passwordHash,
      }
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should be able to authenticate", async () => {
    const response = await request(app)
      .post("/sessions")
      .send({
        email: "login@test.com",
        password: "123456"
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token"); 
  });

  it("should not be able to authenticate with non-existing user", async () => {
    const response = await request(app)
      .post("/sessions")
      .send({
        email: "wrong@test.com",
        password: "any-password"
      });

    expect(response.status).toBe(401); 
  });
});