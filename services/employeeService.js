const Employee = require('../models/employeeModel');
const Department = require('../models/departmentModel');

class EmployeeService {
  async getAll() {
    try {
      return await Employee.find()
        .populate('department1', 'name')
        .populate('department2', 'name')
        .populate('department3', 'name')
        .exec();
    } catch (error) {
      throw new Error('Error fetching employees: ' + error.message);
    }
  }


  async getById(employeeNumber) {
    try {
      const employee = await Employee.findOne({ employeeNumber }).populate('department1 department2 department3').exec();
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    } catch (error) {
      throw new Error('Error fetching employee: ' + error.message);
    }
  }

  async create(newEmployee) {
    try {
      console.log('Datos recibidos para crear empleado:', newEmployee);

      const departmentFields = ['department1', 'department2', 'department3'];
      const departmentIds = {};

      for (const field of departmentFields) {
        if (newEmployee[field]) {
          const department = await Department.findById(newEmployee[field]).exec();
          if (!department) {
            throw new Error(`El departamento con ID '${newEmployee[field]}' no existe.`);
          }
          departmentIds[field] = department._id;
        }
      }

      const employee = new Employee({
        ...newEmployee,
        ...departmentIds,
      });

      return await employee.save();
    } catch (error) {
      console.error('Error en EmployeeService.create:', error.message);
      throw new Error('Error creating employee: ' + error.message);
    }
  }




  async update(employeeNumber, changes) {
    try {
      console.log('Datos recibidos para actualizar empleado:', changes);

      const departmentFields = ['department1', 'department2', 'department3'];
      const departmentIds = {};

      for (const field of departmentFields) {
        if (changes[field]) {
          const department = await Department.findById(changes[field]).exec();
          if (!department) {
            throw new Error(`El departamento con ID '${changes[field]}' no existe.`);
          }
          departmentIds[field] = department._id;
        }
      }

      const updatedEmployee = await Employee.findOneAndUpdate(
        { employeeNumber },
        { ...changes, ...departmentIds },
        { new: true }
      ).exec();

      if (!updatedEmployee) {
        throw new Error('Empleado no encontrado.');
      }

      return updatedEmployee;
    } catch (error) {
      console.error('Error en EmployeeService.update:', error.message);
      throw new Error('Error updating employee: ' + error.message);
    }
  }


  async replace(employeeNumber, changes, override = false) {
    try {
      const employee = await Employee.findOne({ employeeNumber }).exec();
      if (!employee) {
        throw new Error('Employee not found');
      }

      const allowedFields = ['firstName', 'lastName', 'age', 'gender', 'department1', 'department2', 'department3'];
      const fieldsToUpdate = Object.keys(changes);

      if (fieldsToUpdate.length !== 2) {
        throw new Error('Solo puedes actualizar un campo a la vez.');
      }

      const fieldToUpdate = fieldsToUpdate[0];
      if (['department1', 'department2', 'department3'].includes(fieldToUpdate)) {
        if (!override) {
          throw new Error('El departamento no se puede cambiar directamente. Modifíquelo en el módulo principal.');
        } else {
          if (!(await Department.findById(changes[fieldToUpdate]))) {
            throw new Error('El nuevo departamento asignado no existe.');
          }
        }
      }

      employee[fieldToUpdate] = changes[fieldToUpdate];
      return await employee.save();
    } catch (error) {
      throw new Error('Error replacing employee: ' + error.message);
    }
  }

  async delete(employeeNumber) {
    try {
      const employee = await Employee.findOneAndDelete({ employeeNumber }).exec();
      if (!employee) {
        throw new Error('Employee not found');
      }
      return { employeeNumber };
    } catch (error) {
      throw new Error('Error deleting employee: ' + error.message);
    }
  }

  async search(query) {
    try {
      const regex = new RegExp(query, 'i');
      const isNumeric = !isNaN(query);

      const filter = isNumeric
        ? { employeeNumber: query }
        : { $or: [{ firstName: regex }, { lastName: regex }] };

      const employees = await Employee.find(filter)
        .populate('department1', 'name')
        .populate('department2', 'name')
        .populate('department3', 'name')
        .exec();

      return employees.map((employee) => ({
        id: employee.employeeNumber,
        name: `${employee.firstName} ${employee.lastName}`,
        age: employee.age,
        gender: employee.gender,
        departments: [
          employee.department1 ? employee.department1.name : null,
          employee.department2 ? employee.department2.name : null,
          employee.department3 ? employee.department3.name : null
        ].filter(Boolean),
        ...employee._doc
      }));
    } catch (error) {
      throw new Error('Error searching employees: ' + error.message);
    }
  }




}

module.exports = EmployeeService;
