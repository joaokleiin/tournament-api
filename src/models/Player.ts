import mongoose, { Document, Schema } from "mongoose";

export interface IPlayer extends Document {
  nickname: string;
  fullName: string;
  email: string;
  country: string;
  mainGame: string;
}

const playerSchema = new Schema<IPlayer>(
  {
    nickname: {
      type: String,
      required: [true, "Nickname é obrigatório"],
      unique: true,
      trim: true,
      maxlength: [30, "Nickname não pode ultrapassar 30 caracteres"],
    },
    fullName: {
      type: String,
      required: [true, "Nome completo é obrigatório"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "E-mail é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    country: {
      type: String,
      required: [true, "País é obrigatório"],
      trim: true,
    },
    mainGame: {
      type: String,
      required: [true, "Jogo principal é obrigatório"],
      trim: true,
    },
  },
  { timestamps: true }
);

export const Player = mongoose.model<IPlayer>("Player", playerSchema);