import request from "supertest"; 
import app from "../app.js";     
import { prisma } from "../database/client.js"; 


describe("User Integration Tests", () => {
  
  
  beforeAll(async () => {
  
  await prisma.subscription.deleteMany();
  await prisma.user.deleteMany();
});

  
  it("should be able to create a new user", async () => {
    
    const response = await request(app)
      .post("/users")
      .send({
        name: "Dev Alex",
        email: "alex@test.com",
        password: "password123"
      });

    
    expect(response.status).toBe(201); 
    expect(response.body).toHaveProperty("id");     
    expect(response.body.email).toBe("alex@test.com");  
  });

  it("should not be able to create a user with an existing email", async () => {
    
    const response = await request(app)
      .post("/users")
      .send({
        name: "Dev Alex",
        email: "alex@test.com",
        password: "password123"
      });

        
    expect(response.status).toBe(400); 
    expect(response.body.message).toBe("Email already exists");     
  });

  it("should not be able to list users without a token", async () => {
  const response = await request(app).get("/users");    

  expect(response.status).toBe(401);
  expect(response.body.message).toBe("JWT token is missing");   
});

it("should be able to list users when authenticated", async () => {
    
  const authResponse = await request(app)
    .post("/sessions")
    .send({
      email: "alex@test.com",
      password: "password123"
    });

  const { token } = authResponse.body;

    
  const response = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});

  afterAll(async () => {
  await prisma.$disconnect();
});
});