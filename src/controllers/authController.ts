import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { registerSchema, loginSchema } from "../validations/schemas";

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = registerSchema.parse(req.body);

    const existing = await User.findOne({ email: data.email });
    if (existing) {
      res.status(409).json({ message: "E-mail já cadastrado." });
      return;
    }

    const user = await User.create(data);

    res.status(201).json({
      message: "Usuário criado com sucesso.",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = loginSchema.parse(req.body);

    const user = await User.findOne({ email: data.email }).select("+password");

    if (!user || !(await user.comparePassword(data.password))) {
      res.status(401).json({ message: "E-mail ou senha incorretos." });
      return;
    }

    const secret = process.env.JWT_SECRET ?? "";
    const expiresIn = process.env.JWT_EXPIRES_IN ?? "1d";

    const token = jwt.sign({ id: user._id, email: user.email }, secret, {
      expiresIn,
    } as jwt.SignOptions);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}