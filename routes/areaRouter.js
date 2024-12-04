const express = require('express');
const AreaService = require('../services/areaService');
const router = express.Router();

const areaService = new AreaService();

router.use(express.json());

/**
 * @swagger
 * tags:
 *  - name: Areas
 *    description: Operaciones con Áreas
 */

/**
 * @swagger
 * /area:
 *  get:
 *    tags:
 *      - Areas
 *    summary: Obtiene una lista de áreas
 *    responses:
 *      200:
 *        description: Lista de áreas
 */
router.get('/', async (req, res, next) => {
  try {
    const areas = await areaService.getAll();
    res.json(areas);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /area/{areaId}:
 *  get:
 *    tags:
 *      - Areas
 *    summary: Obtiene un área por su ID
 *    parameters:
 *      - in: path
 *        name: areaId
 *        required: true
 *        description: ID del área
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Área encontrada
 */
router.get('/:areaId', async (req, res, next) => {
  try {
    const area = await areaService.getById(parseInt(req.params.areaId, 10));
    res.json(area);
  } catch (error) {
    next(error);
  }
});


/**
 * @swagger
 * /area/search/{query}:
 *  get:
 *    tags:
 *      - Areas
 *    summary: Busca áreas por ID o nombre
 *    parameters:
 *      - in: path
 *        name: query
 *        required: true
 *        description: Texto para buscar áreas
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Lista de áreas coincidentes
 */
router.get('/search/:query', async (req, res, next) => {
  try {
    const { query } = req.params; // Obtén el término de búsqueda
    const results = await areaService.search(query); // Llama al método `search` del servicio
    res.json(results);
  } catch (error) {
    next(error);
  }
});


/**
 * @swagger
 * /area:
 *  post:
 *    tags:
 *      - Areas
 *    summary: Crea un nuevo área
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              areaId:
 *                type: number
 *              name:
 *                type: string
 *              description:
 *                type: string
 *    responses:
 *      201:
 *        description: Área creada
 */
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newArea = await areaService.create(body);
    res.status(201).json(newArea);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /area/{areaId}:
 *  put:
 *    tags:
 *      - Areas
 *    summary: Actualiza completamente un área
 *    parameters:
 *      - in: path
 *        name: areaId
 *        required: true
 *        description: ID del área
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
 *              description:
 *                type: string
 *    responses:
 *      200:
 *        description: Área actualizada
 */
router.put('/:areaId', async (req, res, next) => {
  try {
    const { areaId } = req.params; // Extrae el areaId desde los parámetros
    const changes = req.body; // Obtén los cambios del cuerpo de la solicitud

    const updatedArea = await areaService.update(areaId, changes);
    res.status(200).json(updatedArea); // Responde con el área actualizada
  } catch (error) {
    console.error('Error al actualizar el área:', error.message);
    res.status(400).json({ message: error.message });
  }
});


/**
 * @swagger
 * /area/{areaId}:
 *  patch:
 *    tags:
 *      - Areas
 *    summary: Reemplaza un campo específico de un área
 *    parameters:
 *      - in: path
 *        name: areaId
 *        required: true
 *        description: ID del área
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
 *        description: Campo actualizado en el área
 */
router.patch('/:areaId', async (req, res, next) => {
  try {
    const areaId = parseInt(req.params.areaId, 10);
    const replacedArea = await areaService.replace(areaId, req.body);
    res.json(replacedArea);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /area/{areaId}:
 *  delete:
 *    tags:
 *      - Areas
 *    summary: Elimina un área por su ID
 *    parameters:
 *      - in: path
 *        name: areaId
 *        required: true
 *        description: ID del área
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
 *        description: Área eliminada
 */
router.delete('/:areaId', async (req, res, next) => {
  try {
    const { areaId } = req.params; // Extrae el áreaId de los parámetros
    const force = req.query.force === 'true'; // Convierte query string a booleano

    const result = await areaService.delete(areaId, force);
    res.status(200).json(result); // Responde con el resultado de la eliminación
  } catch (error) {
    console.error('Error al eliminar el área:', error.message);
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
