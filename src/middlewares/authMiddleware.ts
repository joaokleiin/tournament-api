import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Verifica sessão primeiro
  if (req.session?.userId) {
    req.user = { id: req.session.userId, email: req.session.userEmail ?? "" };
    next();
    return;
  }

  // Fallback: verifica JWT no header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET ?? "";
    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      req.user = decoded;
      next();
      return;
    } catch {
      res.status(401).json({ message: "Token inválido ou expirado." });
      return;
    }
  }

  res.status(401).json({ message: "Não autenticado." });
}