import { Router } from "express";
import { register, login } from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Registro e autenticação de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastrar novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: E-mail já cadastrado
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realizar login e obter token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Token JWT retornado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: E-mail ou senha incorretos
 */
router.post("/login", login);

export default router;