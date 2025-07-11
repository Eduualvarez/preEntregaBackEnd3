import { Router} from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';

const router = Router();

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: 
 *       - Adoptions
 *     responses:
 *       200:
 *         description: Lista de adopciones
 */
router.get('/',adoptionsController.getAllAdoptions);
/**
 * @swagger
 * /api/adoptions/{aid}:
 * 
 *   get:
 *     summary: Obtener una adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *       404:
 *         description: No encontrada
 */
router.get('/:aid',adoptionsController.getAdoption);
/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopción creada
 *       404:
 *         description: Usuario o mascota no encontrada
 */
router.post('/:uid/:pid',adoptionsController.createAdoption);

export default router;