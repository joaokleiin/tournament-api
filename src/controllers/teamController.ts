import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Team } from "../models/Team";
import { createTeamSchema, updateTeamSchema } from "../validations/schemas";

export async function createTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = createTeamSchema.parse(req.body);
    const team = await Team.create(data);
    res.status(201).json(team);
  } catch (err) {
    next(err);
  }
}

export async function listTeams(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { game, country } = req.query;
    const filter: Record<string, string> = {};

    if (typeof game === "string") filter.game = game;
    if (typeof country === "string") filter.country = country;

    const teams = await Team.find(filter).populate("players", "nickname fullName country").sort({ createdAt: -1 });
    res.json(teams);
  } catch (err) {
    next(err);
  }
}

export async function getTeamById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "ID inválido." });
      return;
    }

    const team = await Team.findById(id).populate("players", "nickname fullName country mainGame");

    if (!team) {
      res.status(404).json({ message: "Time não encontrado." });
      return;
    }

    res.json(team);
  } catch (err) {
    next(err);
  }
}

export async function updateTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "ID inválido." });
      return;
    }

    const data = updateTeamSchema.parse(req.body);
    const team = await Team.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate("players", "nickname fullName");

    if (!team) {
      res.status(404).json({ message: "Time não encontrado." });
      return;
    }

    res.json(team);
  } catch (err) {
    next(err);
  }
}

export async function deleteTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "ID inválido." });
      return;
    }

    const team = await Team.findByIdAndDelete(id);

    if (!team) {
      res.status(404).json({ message: "Time não encontrado." });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}