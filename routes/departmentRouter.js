const express = require('express');
const DepartmentService = require('../services/departmentService');
const router = express.Router();

const departmentService = new DepartmentService();

router.use(express.json());

/**
 * @swagger
 * tags:
 *  - name: Departments
 *    description: Operaciones con Departamentos
 */

/**
 * @swagger
 * /department:
 *  get:
 *    tags:
 *      - Departments
 *    summary: Obtiene una lista de departamentos
 *    responses:
 *      200:
 *        description: Lista de departamentos
 */
router.get('/', async (req, res, next) => {
  try {
    const departments = await departmentService.getAll();
    res.json(departments);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /department/{departmentNumber}:
 *  get:
 *    tags:
 *      - Departments
 *    summary: Obtiene un departamento por su número
 *    parameters:
 *      - in: path
 *        name: departmentNumber
 *        required: true
 *        description: Número del departamento
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Departamento encontrado
 */
router.get('/:departmentNumber', async (req, res, next) => {
  try {
    const department = await departmentService.getById(parseInt(req.params.departmentNumber, 10));
    res.json(department);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /department/search/{query}:
 *  get:
 *    tags:
 *      - Departments
 *    summary: Busca departamentos por ID o nombre
 *    parameters:
 *      - in: path
 *        name: query
 *        required: true
 *        description: Texto para buscar departamentos
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Lista de departamentos coincidentes
 */
router.get('/search/:query', async (req, res, next) => {
  try {
    const { query } = req.params;
    const results = await departmentService.search(query);
    res.json(results);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /department:
 *  post:
 *    tags:
 *      - Departments
 *    summary: Crea un nuevo departamento
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              manager:
 *                type: string
 *              area:
 *                type: string
 *    responses:
 *      201:
 *        description: Departamento creado
 */
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newDepartment = await departmentService.create(body);
    res.status(201).json(newDepartment);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /department/{departmentNumber}:
 *  put:
 *    tags:
 *      - Departments
 *    summary: Actualiza completamente un departamento
 *    parameters:
 *      - in: path
 *        name: departmentNumber
 *        required: true
 *        description: Número del departamento
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
 *              manager:
 *                type: string
 *              area:
 *                type: string
 *    responses:
 *      200:
 *        description: Departamento actualizado
 */
router.put('/:departmentNumber', async (req, res, next) => {
  try {
    const updatedDepartment = await departmentService.update(
      parseInt(req.params.departmentNumber, 10),
      req.body
    );
    res.json(updatedDepartment);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /department/{departmentNumber}:
 *  patch:
 *    tags:
 *      - Departments
 *    summary: Reemplaza un campo específico de un departamento
 *    parameters:
 *      - in: path
 *        name: departmentNumber
 *        required: true
 *        description: Número del departamento
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
 *              manager:
 *                type: string
 *              area:
 *                type: string
 *    responses:
 *      200:
 *        description: Campo actualizado en el departamento
 */
router.patch('/:departmentNumber', async (req, res, next) => {
  try {
    const departmentNumber = parseInt(req.params.departmentNumber, 10);
    const override = req.body.override || false;
    const replacedDepartment = await departmentService.replace(departmentNumber, req.body, override);
    res.json(replacedDepartment);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /department/{departmentNumber}:
 *  delete:
 *    tags:
 *      - Departments
 *    summary: Elimina un departamento por su número
 *    parameters:
 *      - in: path
 *        name: departmentNumber
 *        required: true
 *        description: Número del departamento
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
 *        description: Departamento eliminado
 */
router.delete('/:departmentNumber', async (req, res, next) => {
  try {
    const departmentNumber = parseInt(req.params.departmentNumber, 10);
    const force = req.query.force === 'true'; // Convertir query string a booleano
    const result = await departmentService.delete(departmentNumber, force);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
