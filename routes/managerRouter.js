const express = require('express');
const ManagerService = require('../services/managerService');
const router = express.Router();

const managerService = new ManagerService();

router.use(express.json());

/**
 * @swagger
 * tags:
 *  - name: Managers
 *    description: Operaciones con Managers
 */

/**
 * @swagger
 * /manager:
 *  get:
 *    tags:
 *      - Managers
 *    summary: Obtiene una lista de managers
 *    responses:
 *      200:
 *        description: Lista de managers
 */
router.get('/', async (req, res, next) => {
  try {
    const managers = await managerService.getAll();
    res.json(managers);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /manager/{managerId}:
 *  get:
 *    tags:
 *      - Managers
 *    summary: Obtiene un manager por su ID
 *    parameters:
 *      - in: path
 *        name: managerId
 *        required: true
 *        description: ID del manager
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Manager encontrado
 */
router.get('/:managerId', async (req, res, next) => {
  try {
    const manager = await managerService.getById(parseInt(req.params.managerId, 10));
    res.json(manager);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /manager/search/{query}:
 *  get:
 *    tags:
 *      - Managers
 *    summary: Busca encargados por ID o nombre
 *    parameters:
 *      - in: path
 *        name: query
 *        required: true
 *        description: Texto para buscar encargados
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Lista de encargados coincidentes
 */
router.get('/search/:query', async (req, res, next) => {
  try {
    const { query } = req.params;
    const results = await managerService.search(query);
    res.json(results);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /manager:
 *  post:
 *    tags:
 *      - Managers
 *    summary: Crea un nuevo manager
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              managerId:
 *                type: number
 *              name:
 *                type: string
 *              education:
 *                type: string
 *              shift:
 *                type: string
 *                enum: [Morning, Afternoon, Night]
 *    responses:
 *      201:
 *        description: Manager creado
 */
router.post('/', async (req, res, next) => {
  try {
    console.log('Datos enviados al backend:', req.body);
    const newManager = await managerService.create(req.body);
    res.status(201).json(newManager);
  } catch (error) {
    console.error('Error al crear el manager:', error.message);
    next(error);
  }
});

/**
 * @swagger
 * /manager/{managerId}:
 *  put:
 *    tags:
 *      - Managers
 *    summary: Actualiza completamente un manager
 *    parameters:
 *      - in: path
 *        name: managerId
 *        required: true
 *        description: ID del manager
 *        schema:
 *          type: number
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              education:
 *                type: string
 *              shift:
 *                type: string
 *                enum: [Morning, Afternoon, Night]
 *    responses:
 *      200:
 *        description: Manager actualizado
 */
router.put('/:managerId', async (req, res, next) => {
  try {
    const updatedManager = await managerService.update(parseInt(req.params.managerId, 10), req.body);
    res.json(updatedManager);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /manager/{managerId}:
 *  patch:
 *    tags:
 *      - Managers
 *    summary: Reemplaza un campo específico de un manager
 *    parameters:
 *      - in: path
 *        name: managerId
 *        required: true
 *        description: ID del manager
 *        schema:
 *          type: number
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              field:
 *                type: string
 *              value:
 *                type: string
 *    responses:
 *      200:
 *        description: Campo actualizado en el manager
 */
router.patch('/:managerId', async (req, res, next) => {
  try {
    const managerId = parseInt(req.params.managerId, 10);
    const replacedManager = await managerService.replace(managerId, req.body);
    res.json(replacedManager);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /manager/{managerId}:
 *  delete:
 *    tags:
 *      - Managers
 *    summary: Elimina un manager por su ID
 *    parameters:
 *      - in: path
 *        name: managerId
 *        required: true
 *        description: ID del manager
 *        schema:
 *          type: number
 *      - in: query
 *        name: force
 *        required: false
 *        description: Indica si debe forzar la eliminación
 *        schema:
 *          type: boolean
 *    responses:
 *      200:
 *        description: Manager eliminado
 */
router.delete('/:managerId', async (req, res, next) => {
  try {
    const managerId = parseInt(req.params.managerId, 10);
    const force = req.query.force === 'true';
    const result = await managerService.delete(managerId, force);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
