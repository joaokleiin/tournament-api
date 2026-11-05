import { z } from "zod";

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const registerSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

// ─── PLAYER ──────────────────────────────────────────────────────────────────

export const createPlayerSchema = z.object({
  nickname: z.string().min(2, "Nickname muito curto").max(30, "Nickname não pode ultrapassar 30 caracteres"),
  fullName: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  country: z.string().min(2, "País inválido"),
  mainGame: z.string().min(1, "Jogo principal é obrigatório"),
});

export const updatePlayerSchema = createPlayerSchema.partial();

// ─── TEAM ────────────────────────────────────────────────────────────────────

export const createTeamSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  tag: z.string().min(2, "Tag muito curta").max(5, "Tag não pode ultrapassar 5 caracteres"),
  country: z.string().min(2, "País inválido"),
  game: z.string().min(1, "Jogo é obrigatório"),
  players: z.array(z.string()).optional(),
});

export const updateTeamSchema = createTeamSchema.partial();

// ─── TOURNAMENT ──────────────────────────────────────────────────────────────

export const createTournamentSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  game: z.string().min(1, "Jogo é obrigatório"),
  format: z.enum(["single_elimination", "round_robin"], {
    error: "Formato inválido. Use: single_elimination ou round_robin",
  }),
  status: z.enum(["upcoming", "ongoing", "finished"], {
    error: "Status inválido. Use: upcoming, ongoing ou finished",
  }).optional(),
  startDate: z.coerce.date(),
  prizePool: z.string().optional(),
  teams: z.array(z.string()).optional(),
});

export const updateTournamentSchema = createTournamentSchema.partial();

export const addMatchSchema = z.object({
  teamA: z.string().min(1, "Time A é obrigatório"),
  teamB: z.string().min(1, "Time B é obrigatório"),
  winner: z.string().optional(),
  scoreA: z.number().min(0).optional(),
  scoreB: z.number().min(0).optional(),
  playedAt: z.coerce.date().optional(),
});

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreatePlayerInput = z.infer<typeof createPlayerSchema>;
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type CreateTournamentInput = z.infer<typeof createTournamentSchema>;
export type AddMatchInput = z.infer<typeof addMatchSchema>;