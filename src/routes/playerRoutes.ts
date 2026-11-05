import { Router } from "express";
import { createPlayer, listPlayers, getPlayerById, updatePlayer, deletePlayer } from "../controllers/playerController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Gerenciamento de jogadores
 */

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Cadastrar novo jogador
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePlayerInput'
 *     responses:
 *       201:
 *         description: Jogador criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       409:
 *         description: Nickname ou e-mail já cadastrado
 */
router.post("/", createPlayer);

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Listar todos os jogadores
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: game
 *         schema:
 *           type: string
 *         description: Filtrar por jogo principal
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filtrar por país
 *     responses:
 *       200:
 *         description: Lista de jogadores retornada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/", listPlayers);

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Buscar jogador por ID
 *     tags: [Players]
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
 *         description: Jogador encontrado
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Jogador não encontrado
 */
router.get("/:id", getPlayerById);

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Atualizar jogador por ID
 *     tags: [Players]
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
 *             $ref: '#/components/schemas/CreatePlayerInput'
 *     responses:
 *       200:
 *         description: Jogador atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Jogador não encontrado
 */
router.put("/:id", updatePlayer);

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Excluir jogador por ID
 *     tags: [Players]
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
 *         description: Jogador excluído com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Jogador não encontrado
 */
router.delete("/:id", deletePlayer);

export default router;