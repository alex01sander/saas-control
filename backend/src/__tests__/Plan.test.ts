import request from "supertest";
import app from "../app.js";
import { prisma } from "../database/client.js";

describe("Plan Integration Tests", () => {
    let token: string;

    beforeAll(async () => {
        await prisma.subscription.deleteMany();
        await prisma.user.deleteMany();
        await prisma.plan.deleteMany();

        // Create a user and get a token
        await request(app)
            .post("/users")
            .send({
                name: "Test User",
                email: "test@example.com",
                password: "password123"
            });

        const sessionResponse = await request(app)
            .post("/sessions")
            .send({
                email: "test@example.com",
                password: "password123"
            });

        token = sessionResponse.body.token;
    });

    it("should be able to create a new plan", async () => {
        const response = await request(app)
            .post("/plans")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Premium Monthly",
                priceCents: 2990,
                interval: "month"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Premium Monthly");
        expect(response.body.priceCents).toBe(2990);
    });

    it("should not be able to create a plan with an existing name", async () => {
        const response = await request(app)
            .post("/plans")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Premium Monthly",
                priceCents: 5000,
                interval: "month"
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Plan already exists");
    });

    it("should be able to list all plans", async () => {
        const response = await request(app)
            .get("/plans")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("should be able to update a plan", async () => {
        const plan = await prisma.plan.findFirst();
        
        const response = await request(app)
            .put(`/plans/${plan?.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Premium Monthly Updated",
                priceCents: 3500
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Premium Monthly Updated");
        expect(response.body.priceCents).toBe(3500);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
});
