import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { loginSchema } from "../validations/schemas";

// POST /sessao — Login com cookie
export async function createSession(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = loginSchema.parse(req.body);

    const user = await User.findOne({ email: data.email }).select("+password");

    if (!user || !(await user.comparePassword(data.password))) {
      res.status(401).json({ message: "E-mail ou senha incorretos." });
      return;
    }

    // Salva os dados do usuário na sessão
    req.session.userId = String(user._id);
    req.session.userName = user.name;
    req.session.userEmail = user.email;

    res.status(201).json({
      message: "Login realizado com sucesso.",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}

// GET /sessao — Verifica quem está logado
export async function getSession(
  req: Request,
  res: Response
): Promise<void> {
  if (!req.session.userId) {
    res.status(401).json({ message: "Nenhuma sessão ativa." });
    return;
  }

  res.json({
    user: {
      id: req.session.userId,
      name: req.session.userName,
      email: req.session.userEmail,
    },
  });
}

// DELETE /sessao — Logout
export async function deleteSession(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    res.status(204).send();
  });
}