const express = require('express');
const EmployeeService = require('../services/employeeService');
const router = express.Router();

const employeeService = new EmployeeService();

router.use(express.json());

/**
 * @swagger
 * tags:
 *  - name: Employees
 *    description: Operaciones con Empleados
 */

/**
 * @swagger
 * /employee:
 *  get:
 *    tags:
 *      - Employees
 *    summary: Obtiene una lista de empleados
 *    responses:
 *      200:
 *        description: Lista de empleados
 */
router.get('/', async (req, res, next) => {
  try {
    const employees = await employeeService.getAll();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /employee/{employeeNumber}:
 *  get:
 *    tags:
 *      - Employees
 *    summary: Obtiene un empleado por su número
 *    parameters:
 *      - in: path
 *        name: employeeNumber
 *        required: true
 *        description: Número del empleado
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Empleado encontrado
 */
router.get('/:employeeNumber', async (req, res, next) => {
  try {
    const employee = await employeeService.getById(parseInt(req.params.employeeNumber, 10));
    res.json(employee);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /employee/search/{query}:
 *  get:
 *    tags:
 *      - Employees
 *    summary: Busca empleados por ID o nombre
 *    parameters:
 *      - in: path
 *        name: query
 *        required: true
 *        description: Texto para buscar empleados
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Lista de empleados coincidentes
 */
router.get('/search/:query', async (req, res, next) => {
  try {
    const { query } = req.params;
    const results = await employeeService.search(query);
    res.json(results);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /employee:
 *  post:
 *    tags:
 *      - Employees
 *    summary: Crea un nuevo empleado
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              employeeNumber:
 *                type: number
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              age:
 *                type: number
 *              gender:
 *                type: string
 *              department1:
 *                type: string
 *              department2:
 *                type: string
 *              department3:
 *                type: string
 *    responses:
 *      201:
 *        description: Empleado creado
 */
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newEmployee = await employeeService.create(body);
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /employee/{employeeNumber}:
 *  put:
 *    tags:
 *      - Employees
 *    summary: Actualiza completamente un empleado
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                age:
 *                  type: number
 *                gender:
 *                  type: string
 *                department1:
 *                  type: string
 *                department2:
 *                  type: string
 *                department3:
 *                 type: string
 *    responses:
 *      201:
 *        description: Empleado creado
 */
router.put('/:employeeNumber', async (req, res, next) => {
  try {
    const updatedEmployee = await employeeService.update(parseInt(req.params.employeeNumber, 10), req.body);
    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /employee/{id}:
 *  patch:
 *    tags:
 *      - Employees
 *    summary: Actualiza a un empleado por Id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del empleado
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              age:
 *                type: number
 *              gender:
 *                type: string
 *              department1:
 *                type: string
 *              department2:
 *                type: string
 *              department3:
 *                type: string
 *              override:
 *                type: boolean
 *    responses:
 *      200:
 *        description: Empleado actualizado
 */
router.patch('/:employeeNumber', async (req, res, next) => {
  try {
    const employeeNumber = parseInt(req.params.employeeNumber, 10);
    const override = req.body.override || false;
    const replacedEmployee = await employeeService.replace(employeeNumber, req.body, override);
    res.json(replacedEmployee);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /employee/{id}:
 *  delete:
 *    tags:
 *      - Employees
 *    summary: Elimina a un empleado por ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del empleado
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Empleado eliminado
 */
router.delete('/:employeeNumber', async (req, res, next) => {
  try {
    const deletedEmployee = await employeeService.delete(parseInt(req.params.employeeNumber, 10));
    res.json(deletedEmployee);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
