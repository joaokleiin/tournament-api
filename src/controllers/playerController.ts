import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Player } from "../models/Player";
import { createPlayerSchema, updatePlayerSchema } from "../validations/schemas";

export async function createPlayer(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = createPlayerSchema.parse(req.body);
    const player = await Player.create(data);
    res.status(201).json(player);
  } catch (err) {
    next(err);
  }
}

export async function listPlayers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { game, country } = req.query;
    const filter: Record<string, string> = {};

    if (typeof game === "string") filter.mainGame = game;
    if (typeof country === "string") filter.country = country;

    const players = await Player.find(filter).sort({ createdAt: -1 });
    res.json(players);
  } catch (err) {
    next(err);
  }
}

export async function getPlayerById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "ID inválido." });
      return;
    }

    const player = await Player.findById(id);

    if (!player) {
      res.status(404).json({ message: "Jogador não encontrado." });
      return;
    }

    res.json(player);
  } catch (err) {
    next(err);
  }
}

export async function updatePlayer(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "ID inválido." });
      return;
    }

    const data = updatePlayerSchema.parse(req.body);
    const player = await Player.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    if (!player) {
      res.status(404).json({ message: "Jogador não encontrado." });
      return;
    }

    res.json(player);
  } catch (err) {
    next(err);
  }
}

export async function deletePlayer(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "ID inválido." });
      return;
    }

    const player = await Player.findByIdAndDelete(id);

    if (!player) {
      res.status(404).json({ message: "Jogador não encontrado." });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}