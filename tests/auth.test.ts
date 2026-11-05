import request from "supertest";
import app from "../src/app";
import { setupTestDB, teardownTestDB } from "./helpers";

beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  await teardownTestDB();
});

describe("POST /auth/register", () => {
  it("deve cadastrar um usuário com dados válidos", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "João Silva",
      email: "joao@email.com",
      password: "senha123",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe("joao@email.com");
    expect(res.body.user).not.toHaveProperty("password");
  });

  it("deve rejeitar cadastro com e-mail inválido", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "Maria",
      email: "email-invalido",
      password: "senha123",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("deve rejeitar cadastro sem nome", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "sem@nome.com",
      password: "senha123",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("deve rejeitar senha com menos de 6 caracteres", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "Pedro",
      email: "pedro@email.com",
      password: "123",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("deve rejeitar e-mail já cadastrado", async () => {
    await request(app).post("/auth/register").send({
      name: "Duplicado",
      email: "duplicado@email.com",
      password: "senha123",
    });

    const res = await request(app).post("/auth/register").send({
      name: "Duplicado 2",
      email: "duplicado@email.com",
      password: "senha456",
    });

    expect(res.status).toBe(409);
  });
});

describe("POST /auth/login", () => {
  beforeAll(async () => {
    await request(app).post("/auth/register").send({
      name: "Usuário Teste",
      email: "login@email.com",
      password: "senhaCorreta",
    });
  });

  it("deve retornar token com credenciais corretas", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "login@email.com",
      password: "senhaCorreta",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });

  it("deve rejeitar senha incorreta", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "login@email.com",
      password: "senhaErrada",
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("deve rejeitar e-mail não cadastrado", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "naoexiste@email.com",
      password: "qualquersenha",
    });

    expect(res.status).toBe(401);
  });

  it("deve rejeitar login sem e-mail", async () => {
    const res = await request(app).post("/auth/login").send({
      password: "senha123",
    });

    expect(res.status).toBe(400);
  });
});