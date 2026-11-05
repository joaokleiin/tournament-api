import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Tournament } from "../models/Tournament";
import { createTournamentSchema, updateTournamentSchema, addMatchSchema } from "../validations/schemas";

export async function createTournament(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = createTournamentSchema.parse(req.body);
    const tournament = await Tournament.create(data);
    res.status(201).json(tournament);
  } catch (err) {
    next(err);
  }
}

export async function listTournaments(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { game, status } = req.query;
    const filter: Record<string, string> = {};

    if (typeof game === "string") filter.game = game;
    if (typeof status === "string") filter.status = status;

    const tournaments = await Tournament.find(filter)
      .populate("teams", "name tag country")
      .sort({ startDate: 1 });

    res.json(tournaments);
  } catch (err) {
    next(err);
  }
}

export async function getTournamentById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "ID inválido." });
      return;
    }

    const tournament = await Tournament.findById(id)
      .populate("teams", "name tag country game")
      .populate("matches.teamA", "name tag")
      .populate("matches.teamB", "name tag")
      .populate("matches.winner", "name tag");

    if (!tournament) {
      res.status(404).json({ message: "Torneio não encontrado." });
      return;
    }

    res.json(tournament);
  } catch (err) {
    next(err);
  }
}

export async function updateTournament(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "ID inválido." });
      return;
    }

    const data = updateTournamentSchema.parse(req.body);
    const tournament = await Tournament.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    if (!tournament) {
      res.status(404).json({ message: "Torneio não encontrado." });
      return;
    }

    res.json(tournament);
  } catch (err) {
    next(err);
  }
}

export async function deleteTournament(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "ID inválido." });
      return;
    }

    const tournament = await Tournament.findByIdAndDelete(id);

    if (!tournament) {
      res.status(404).json({ message: "Torneio não encontrado." });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function addMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "ID inválido." });
      return;
    }

    const data = addMatchSchema.parse(req.body);

    const tournament = await Tournament.findById(id);

    if (!tournament) {
      res.status(404).json({ message: "Torneio não encontrado." });
      return;
    }

    tournament.matches.push(data as any);
    await tournament.save();

    res.status(201).json(tournament);
  } catch (err) {
    next(err);
  }
}