import { Router } from "express";
import {
  createTournament,
  listTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
  addMatch,
} from "../controllers/tournamentController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Tournaments
 *   description: Gerenciamento de torneios
 */

/**
 * @swagger
 * /tournaments:
 *   post:
 *     summary: Criar novo torneio
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTournamentInput'
 *     responses:
 *       201:
 *         description: Torneio criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post("/", createTournament);

/**
 * @swagger
 * /tournaments:
 *   get:
 *     summary: Listar todos os torneios
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: game
 *         schema:
 *           type: string
 *         description: Filtrar por jogo
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [upcoming, ongoing, finished]
 *         description: Filtrar por status
 *     responses:
 *       200:
 *         description: Lista de torneios retornada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/", listTournaments);

/**
 * @swagger
 * /tournaments/{id}:
 *   get:
 *     summary: Buscar torneio por ID
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Torneio encontrado com times e partidas populados
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Torneio não encontrado
 */
router.get("/:id", getTournamentById);

/**
 * @swagger
 * /tournaments/{id}:
 *   put:
 *     summary: Atualizar torneio por ID
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTournamentInput'
 *     responses:
 *       200:
 *         description: Torneio atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Torneio não encontrado
 */
router.put("/:id", updateTournament);

/**
 * @swagger
 * /tournaments/{id}:
 *   delete:
 *     summary: Excluir torneio por ID
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Torneio excluído com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Torneio não encontrado
 */
router.delete("/:id", deleteTournament);

/**
 * @swagger
 * /tournaments/{id}/matches:
 *   post:
 *     summary: Adicionar partida a um torneio
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddMatchInput'
 *     responses:
 *       201:
 *         description: Partida adicionada com sucesso
 *       400:
 *         description: Dados inválidos ou ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Torneio não encontrado
 */
router.post("/:id/matches", addMatch);

export default router;