import { Router } from "express";
import { createSession, getSession, deleteSession } from "../controllers/sessionController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sessão
 *   description: Autenticação por cookie e sessão
 */

/**
 * @swagger
 * /sessao:
 *   post:
 *     summary: Realizar login e criar sessão
 *     tags: [Sessão]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       201:
 *         description: Sessão criada com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/", createSession);

/**
 * @swagger
 * /sessao:
 *   get:
 *     summary: Verificar sessão ativa
 *     tags: [Sessão]
 *     responses:
 *       200:
 *         description: Sessão ativa, retorna dados do usuário
 *       401:
 *         description: Nenhuma sessão ativa
 */
router.get("/", getSession);

/**
 * @swagger
 * /sessao:
 *   delete:
 *     summary: Encerrar sessão (logout)
 *     tags: [Sessão]
 *     responses:
 *       204:
 *         description: Sessão encerrada com sucesso
 */
router.delete("/", deleteSession);

export default router;