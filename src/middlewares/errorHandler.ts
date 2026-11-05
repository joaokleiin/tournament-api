import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ZodError) {
    const errors = err.issues.map((e) => e.message);
    res.status(400).json({ message: "Dados inválidos.", errors });
    return;
  }

  if ((err as any).code === 11000) {
    res.status(409).json({ message: "Registro duplicado. Verifique campos únicos como e-mail ou nickname." });
    return;
  }

  console.error("Erro interno:", err);
  res.status(500).json({ message: "Erro interno do servidor." });
}