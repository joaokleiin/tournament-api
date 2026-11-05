import mongoose, { Document, Schema } from "mongoose";

export interface ITeam extends Document {
  name: string;
  tag: string;
  country: string;
  game: string;
  players: mongoose.Types.ObjectId[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: [true, "Nome do time é obrigatório"],
      unique: true,
      trim: true,
    },
    tag: {
      type: String,
      required: [true, "Tag do time é obrigatória"],
      uppercase: true,
      trim: true,
      maxlength: [5, "Tag não pode ultrapassar 5 caracteres"],
    },
    country: {
      type: String,
      required: [true, "País é obrigatório"],
      trim: true,
    },
    game: {
      type: String,
      required: [true, "Jogo é obrigatório"],
      trim: true,
    },
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
  },
  { timestamps: true }
);

export const Team = mongoose.model<ITeam>("Team", teamSchema);