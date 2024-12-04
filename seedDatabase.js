const mongoose = require('mongoose');
const Area = require('./models/areaModel');
const Manager = require('./models/managerModel');
const Department = require('./models/departmentModel');
const Employee = require('./models/employeeModel');
const { data } = require('./data/data');

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb+srv://onesto01:ang777pop@finalproject.dx4tm.mongodb.net/?retryWrites=true&w=majority&appName=finalproject', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa con MongoDB.');

    await Area.deleteMany({});
    await Manager.deleteMany({});
    await Department.deleteMany({});
    await Employee.deleteMany({});
    console.log('Datos existentes eliminados.');

    const insertedAreas = await Area.insertMany(data.areas);
    console.log(`${insertedAreas.length} áreas insertadas correctamente.`);

    const insertedManagers = await Manager.insertMany(data.managers);
    console.log(`${insertedManagers.length} managers insertados correctamente.`);

    const departmentsData = data.departments.map((dept) => {
      const manager = insertedManagers.find((mgr) => mgr.name === dept.manager);
      const area = insertedAreas.find((ar) => ar.name === dept.area);

      if (!manager) {
        console.warn(`No se encontró el manager para el departamento: ${dept.name}`);
      }
      if (!area) {
        console.warn(`No se encontró el área para el departamento: ${dept.name}`);
      }

      return {
        departmentNumber: dept.departmentNumber,
        name: dept.name,
        manager: manager ? manager._id : null,
        area: area ? area._id : null,
      };
    });

    const insertedDepartments = await Department.insertMany(departmentsData);
    console.log(`${insertedDepartments.length} departamentos insertados correctamente.`);

    const employeesData = data.employees.map((emp) => {
      const department1 = insertedDepartments.find((dep) => dep.name === emp.department1);
      const department2 = insertedDepartments.find((dep) => dep.name === emp.department2);
      const department3 = insertedDepartments.find((dep) => dep.name === emp.department3);

      if (!department1) {
        console.warn(`No se encontró el departamento 1 para el empleado: ${emp.firstName}`);
      }
      if (!department2) {
        console.warn(`No se encontró el departamento 2 para el empleado: ${emp.firstName}`);
      }
      if (!department3) {
        console.warn(`No se encontró el departamento 3 para el empleado: ${emp.firstName}`);
      }

      return {
        employeeNumber: emp.employeeNumber,
        firstName: emp.firstName,
        lastName: emp.lastName,
        age: emp.age,
        gender: emp.gender,
        department1: department1 ? department1._id : null,
        department2: department2 ? department2._id : null,
        department3: department3 ? department3._id : null,
      };
    });

    const insertedEmployees = await Employee.insertMany(employeesData);
    console.log(`${insertedEmployees.length} empleados insertados correctamente.`);

    console.log('Base de datos poblada correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    process.exit(1);
  }
}

seedDatabase();
