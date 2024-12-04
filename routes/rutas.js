const employeeRouter = require('./employeeRouter');
const departmentRouter = require('./departmentRouter');
const managerRouter = require('./managerRouter');
const areaRouter = require('./areaRouter');
const authRouter = require('../auth/authRouter');
const express = require('express');

function routerApi(app) {
  const router = express.Router();

  // Rutas normales las de siempre
  app.use('/employee', employeeRouter);
  app.use('/department', departmentRouter);
  app.use('/manager', managerRouter);
  app.use('/area', areaRouter);

  // Rutas de autenticación con authRouter o sisisi
  app.use('/auth', authRouter);
}

module.exports = routerApi;
