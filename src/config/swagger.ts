import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tournament Manager API",
      version: "1.0.0",
      description:
        "API RESTful para gerenciamento de torneios de games. Cadastre jogadores, times e torneios, registre partidas e acompanhe resultados.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT obtido no endpoint /auth/login.",
        },
      },
      schemas: {
        RegisterInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "João Silva" },
            email: { type: "string", example: "joao@email.com" },
            password: { type: "string", example: "senha123" },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "joao@email.com" },
            password: { type: "string", example: "senha123" },
          },
        },
        CreatePlayerInput: {
          type: "object",
          required: ["nickname", "fullName", "email", "country", "mainGame"],
          properties: {
            nickname: { type: "string", example: "s1mple" },
            fullName: { type: "string", example: "Oleksandr Kostyliev" },
            email: { type: "string", example: "s1mple@navi.gg" },
            country: { type: "string", example: "Ukraine" },
            mainGame: { type: "string", example: "CS2" },
          },
        },
        CreateTeamInput: {
          type: "object",
          required: ["name", "tag", "country", "game"],
          properties: {
            name: { type: "string", example: "Natus Vincere" },
            tag: { type: "string", example: "NAVI" },
            country: { type: "string", example: "Ukraine" },
            game: { type: "string", example: "CS2" },
            players: {
              type: "array",
              items: { type: "string" },
              example: ["664f1b2c3d4e5f6a7b8c9d0e"],
            },
          },
        },
        CreateTournamentInput: {
          type: "object",
          required: ["name", "game", "format", "startDate"],
          properties: {
            name: { type: "string", example: "IEM Katowice 2025" },
            game: { type: "string", example: "CS2" },
            format: {
              type: "string",
              enum: ["single_elimination", "round_robin"],
              example: "single_elimination",
            },
            status: {
              type: "string",
              enum: ["upcoming", "ongoing", "finished"],
              example: "upcoming",
            },
            startDate: { type: "string", format: "date-time", example: "2025-08-01T12:00:00.000Z" },
            prizePool: { type: "string", example: "$1.000.000" },
            teams: {
              type: "array",
              items: { type: "string" },
              example: ["664f1b2c3d4e5f6a7b8c9d0e"],
            },
          },
        },
        AddMatchInput: {
          type: "object",
          required: ["teamA", "teamB"],
          properties: {
            teamA: { type: "string", example: "664f1b2c3d4e5f6a7b8c9d0e" },
            teamB: { type: "string", example: "664f1b2c3d4e5f6a7b8c9d0f" },
            winner: { type: "string", example: "664f1b2c3d4e5f6a7b8c9d0e" },
            scoreA: { type: "number", example: 16 },
            scoreB: { type: "number", example: 14 },
            playedAt: { type: "string", format: "date-time", example: "2025-08-02T15:00:00.000Z" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);