import { Router } from "express";
import { createTeam, listTeams, getTeamById, updateTeam, deleteTeam } from "../controllers/teamController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Gerenciamento de times
 */

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Cadastrar novo time
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTeamInput'
 *     responses:
 *       201:
 *         description: Time criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       409:
 *         description: Nome de time já cadastrado
 */
router.post("/", createTeam);

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Listar todos os times
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: game
 *         schema:
 *           type: string
 *         description: Filtrar por jogo
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filtrar por país
 *     responses:
 *       200:
 *         description: Lista de times retornada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/", listTeams);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Buscar time por ID
 *     tags: [Teams]
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
 *         description: Time encontrado
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Time não encontrado
 */
router.get("/:id", getTeamById);

/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Atualizar time por ID
 *     tags: [Teams]
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
 *             $ref: '#/components/schemas/CreateTeamInput'
 *     responses:
 *       200:
 *         description: Time atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Time não encontrado
 */
router.put("/:id", updateTeam);

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Excluir time por ID
 *     tags: [Teams]
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
 *         description: Time excluído com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Time não encontrado
 */
router.delete("/:id", deleteTeam);

export default router;