import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import { setupTestDB, teardownTestDB } from "./helpers";

let authToken: string;
let teamAId: string;
let teamBId: string;

beforeAll(async () => {
  await setupTestDB();

  await request(app).post("/auth/register").send({
    name: "Testador",
    email: "test@tournament.com",
    password: "senha123",
  });

  const loginRes = await request(app).post("/auth/login").send({
    email: "test@tournament.com",
    password: "senha123",
  });

  authToken = loginRes.body.token;

  const teamA = await request(app)
    .post("/teams")
    .set("Authorization", `Bearer ${authToken}`)
    .send({ name: "NAVI", tag: "NAVI", country: "Ukraine", game: "CS2" });

  const teamB = await request(app)
    .post("/teams")
    .set("Authorization", `Bearer ${authToken}`)
    .send({ name: "FaZe Clan", tag: "FAZE", country: "USA", game: "CS2" });

  teamAId = teamA.body._id;
  teamBId = teamB.body._id;
});

afterAll(async () => {
  await teardownTestDB();
});

describe("POST /tournaments", () => {
  it("deve criar torneio com dados válidos", async () => {
    const res = await request(app)
      .post("/tournaments")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "IEM Katowice 2025",
        game: "CS2",
        format: "single_elimination",
        startDate: "2025-08-01T12:00:00.000Z",
        prizePool: "$1.000.000",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("IEM Katowice 2025");
    expect(res.body.status).toBe("upcoming");
  });

  it("deve rejeitar torneio sem nome", async () => {
    const res = await request(app)
      .post("/tournaments")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        game: "CS2",
        format: "single_elimination",
        startDate: "2025-08-01T12:00:00.000Z",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("deve rejeitar formato inválido", async () => {
    const res = await request(app)
      .post("/tournaments")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Torneio Inválido",
        game: "CS2",
        format: "formato_errado",
        startDate: "2025-08-01T12:00:00.000Z",
      });

    expect(res.status).toBe(400);
  });

  it("deve rejeitar acesso sem token", async () => {
    const res = await request(app).post("/tournaments").send({
      name: "Sem Token",
      game: "CS2",
      format: "round_robin",
      startDate: "2025-08-01T12:00:00.000Z",
    });

    expect(res.status).toBe(401);
  });
});

describe("GET /tournaments", () => {
  it("deve listar todos os torneios", async () => {
    const res = await request(app)
      .get("/tournaments")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("deve filtrar torneios por status", async () => {
    const res = await request(app)
      .get("/tournaments?status=upcoming")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    res.body.forEach((t: any) => {
      expect(t.status).toBe("upcoming");
    });
  });

  it("deve rejeitar acesso sem token", async () => {
    const res = await request(app).get("/tournaments");
    expect(res.status).toBe(401);
  });
});

describe("GET /tournaments/:id", () => {
  let tournamentId: string;

  beforeAll(async () => {
    const res = await request(app)
      .post("/tournaments")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Torneio Para Buscar",
        game: "Valorant",
        format: "round_robin",
        startDate: "2025-09-01T12:00:00.000Z",
      });
    tournamentId = res.body._id;
  });

  it("deve retornar o torneio pelo ID", async () => {
    const res = await request(app)
      .get(`/tournaments/${tournamentId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(tournamentId);
  });

  it("deve retornar 404 para ID inexistente", async () => {
    const fakeId = new mongoose.Types.ObjectId().toHexString();
    const res = await request(app)
      .get(`/tournaments/${fakeId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(404);
  });

  it("deve retornar 400 para ID malformado", async () => {
    const res = await request(app)
      .get("/tournaments/id-invalido")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(400);
  });
});

describe("PUT /tournaments/:id", () => {
  let tournamentId: string;

  beforeAll(async () => {
    const res = await request(app)
      .post("/tournaments")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Torneio Para Atualizar",
        game: "CS2",
        format: "single_elimination",
        startDate: "2025-10-01T12:00:00.000Z",
      });
    tournamentId = res.body._id;
  });

  it("deve atualizar o status do torneio", async () => {
    const res = await request(app)
      .put(`/tournaments/${tournamentId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ status: "ongoing" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ongoing");
  });

  it("deve retornar 404 ao atualizar ID inexistente", async () => {
    const fakeId = new mongoose.Types.ObjectId().toHexString();
    const res = await request(app)
      .put(`/tournaments/${fakeId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ status: "finished" });

    expect(res.status).toBe(404);
  });
});

describe("POST /tournaments/:id/matches", () => {
  let tournamentId: string;

  beforeAll(async () => {
    const res = await request(app)
      .post("/tournaments")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Torneio Com Partidas",
        game: "CS2",
        format: "single_elimination",
        startDate: "2025-11-01T12:00:00.000Z",
        teams: [teamAId, teamBId],
      });
    tournamentId = res.body._id;
  });

  it("deve adicionar uma partida ao torneio", async () => {
    const res = await request(app)
      .post(`/tournaments/${tournamentId}/matches`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        teamA: teamAId,
        teamB: teamBId,
        scoreA: 16,
        scoreB: 14,
        winner: teamAId,
      });

    expect(res.status).toBe(201);
    expect(res.body.matches).toHaveLength(1);
    expect(res.body.matches[0].scoreA).toBe(16);
  });

  it("deve rejeitar partida sem os times", async () => {
    const res = await request(app)
      .post(`/tournaments/${tournamentId}/matches`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ scoreA: 10 });

    expect(res.status).toBe(400);
  });
});

describe("DELETE /tournaments/:id", () => {
  let tournamentId: string;

  beforeAll(async () => {
    const res = await request(app)
      .post("/tournaments")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Torneio Para Excluir",
        game: "CS2",
        format: "round_robin",
        startDate: "2025-12-01T12:00:00.000Z",
      });
    tournamentId = res.body._id;
  });

  it("deve excluir o torneio", async () => {
    const res = await request(app)
      .delete(`/tournaments/${tournamentId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(204);
  });

  it("deve retornar 404 ao tentar excluir torneio já excluído", async () => {
    const res = await request(app)
      .delete(`/tournaments/${tournamentId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(404);
  });
});