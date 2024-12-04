const Department = require('../models/departmentModel');
const Manager = require('../models/managerModel');
const Area = require('../models/areaModel');
const Employee = require('../models/employeeModel');

class DepartmentService {
  async getAll() {
    try {
      return await Department.find().populate('manager area').exec();
    } catch (error) {
      throw new Error('Error fetching departments: ' + error.message);
    }
  }

  async getById(departmentNumber) {
    try {
      const department = await Department.findOne({ departmentNumber }).populate('manager area').exec();
      if (!department) {
        throw new Error('Department not found');
      }
      return department;
    } catch (error) {
      throw new Error('Error fetching department: ' + error.message);
    }
  }

  async create(newDepartment) {
    try {
      if (!(await Manager.findById(newDepartment.manager))) {
        throw new Error('Manager does not exist');
      }
      if (!(await Area.findById(newDepartment.area))) {
        throw new Error('Area does not exist');
      }

      if (!newDepartment.departmentNumber) {
        const lastDepartment = await Department.findOne().sort({ departmentNumber: -1 }).exec();
        newDepartment.departmentNumber = lastDepartment ? lastDepartment.departmentNumber + 1 : 1;
      }

      const department = new Department(newDepartment);
      return await department.save();
    } catch (error) {
      throw new Error('Error creating department: ' + error.message);
    }
  }


  async update(departmentNumber, changes) {
    try {
      if (changes.manager && !(await Manager.findById(changes.manager))) {
        throw new Error('Manager does not exist');
      }
      if (changes.area && !(await Area.findById(changes.area))) {
        throw new Error('Area does not exist');
      }

      const department = await Department.findOneAndUpdate(
        { departmentNumber },
        changes,
        { new: true }
      ).exec();
      if (!department) {
        throw new Error('Department not found');
      }
      return department;
    } catch (error) {
      throw new Error('Error updating department: ' + error.message);
    }
  }

  async replace(departmentNumber, changes, override = false) {
    try {
      const department = await Department.findOne({ departmentNumber }).exec();
      if (!department) {
        throw new Error('Department not found');
      }

      const allowedFields = ['name', 'manager', 'area'];
      const fieldsToUpdate = Object.keys(changes);

      if (fieldsToUpdate.length !== 2) {
        throw new Error('Solo puedes actualizar un campo a la vez.');
      }

      const fieldToUpdate = fieldsToUpdate[0];
      if (fieldToUpdate === 'manager' && changes.manager !== department.manager) {
        if (!override) {
          throw new Error('El nombre del manager no se puede cambiar directamente en el departamento.');
        } else if (!(await Manager.findById(changes.manager))) {
          throw new Error('El nuevo manager asignado no existe.');
        }
      }

      if (fieldToUpdate === 'area' && changes.area !== department.area) {
        if (!override) {
          throw new Error('El nombre del área no se puede cambiar directamente en el departamento.');
        } else if (!(await Area.findById(changes.area))) {
          throw new Error('El área asignada no existe.');
        }
      }

      if (fieldToUpdate === 'name') {
        const oldName = department.name;
        const newName = changes.name;

        department.name = newName;

        await Employee.updateMany(
          { $or: [{ department1: oldName }, { department2: oldName }, { department3: oldName }] },
          {
            $set: {
              'department1.$[elem]': newName,
              'department2.$[elem]': newName,
              'department3.$[elem]': newName,
            },
          },
          { arrayFilters: [{ elem: oldName }], multi: true }
        );

        return await department.save();
      } else {
        department[fieldToUpdate] = changes[fieldToUpdate];
        return await department.save();
      }
    } catch (error) {
      throw new Error('Error replacing department: ' + error.message);
    }
  }

  async delete(departmentNumber, force = false) {
    try {
      const department = await Department.findOne({ departmentNumber }).exec();
      if (!department) {
        throw new Error('Department not found');
      }

      const employeesInDepartment = await Employee.find({
        $or: [
          { department1: department._id },
          { department2: department._id },
          { department3: department._id },
        ],
      });

      if (employeesInDepartment.length > 0 && !force) {
        throw new Error('El departamento está en uso por empleados y no se puede eliminar. Usa "force" para eliminar.');
      }

      await Department.deleteOne({ departmentNumber });

      if (employeesInDepartment.length > 0) {
        await Employee.updateMany(
          {
            $or: [
              { department1: department._id },
              { department2: department._id },
              { department3: department._id },
            ],
          },
          {
            $set: {
              department1: null,
              department2: null,
              department3: null,
            },
          }
        );
      }

      return { message: `El departamento ${department.name} ha sido eliminado correctamente.` };
    } catch (error) {
      throw new Error('Error deleting department: ' + error.message);
    }
  }

  async search(query) {
    try {
      const regex = new RegExp(query, 'i');
      const isNumeric = !isNaN(query);

      const filter = isNumeric
        ? { departmentNumber: query }
        : { name: regex };

      const departments = await Department.find(filter)
        .populate('manager', 'name education')
        .populate('area', 'name building')
        .exec();

      return departments.map((department) => ({
        id: department.departmentNumber,
        name: department.name,
        manager: department.manager ? department.manager.name : null,
        area: department.area ? department.area.name : null,
        ...department._doc
      }));
    } catch (error) {
      throw new Error('Error searching departments: ' + error.message);
    }
  }





}

module.exports = DepartmentService;
