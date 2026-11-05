import mongoose, { Document, Schema } from "mongoose";

export type TournamentStatus = "upcoming" | "ongoing" | "finished";
export type TournamentFormat = "single_elimination" | "round_robin";

export interface IMatch {
  teamA: mongoose.Types.ObjectId;
  teamB: mongoose.Types.ObjectId;
  winner?: mongoose.Types.ObjectId;
  scoreA?: number;
  scoreB?: number;
  playedAt?: Date;
}

export interface ITournament extends Document {
  name: string;
  game: string;
  format: TournamentFormat;
  status: TournamentStatus;
  startDate: Date;
  prizePool?: string;
  teams: mongoose.Types.ObjectId[];
  matches: IMatch[];
}

const matchSchema = new Schema<IMatch>({
  teamA: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  teamB: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  winner: { type: Schema.Types.ObjectId, ref: "Team" },
  scoreA: { type: Number },
  scoreB: { type: Number },
  playedAt: { type: Date },
});

const tournamentSchema = new Schema<ITournament>(
  {
    name: {
      type: String,
      required: [true, "Nome do torneio é obrigatório"],
      unique: true,
      trim: true,
    },
    game: {
      type: String,
      required: [true, "Jogo é obrigatório"],
      trim: true,
    },
    format: {
      type: String,
      enum: {
        values: ["single_elimination", "round_robin"],
        message: "Formato inválido. Use: single_elimination ou round_robin",
      },
      required: [true, "Formato é obrigatório"],
    },
    status: {
      type: String,
      enum: {
        values: ["upcoming", "ongoing", "finished"],
        message: "Status inválido. Use: upcoming, ongoing ou finished",
      },
      default: "upcoming",
    },
    startDate: {
      type: Date,
      required: [true, "Data de início é obrigatória"],
    },
    prizePool: {
      type: String,
      trim: true,
    },
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    matches: [matchSchema],
  },
  { timestamps: true }
);

export const Tournament = mongoose.model<ITournament>(
  "Tournament",
  tournamentSchema
);