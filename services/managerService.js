const Manager = require('../models/managerModel');
const Department = require('../models/departmentModel');

class ManagerService {
  async getAll() {
    try {
      return await Manager.find().exec();
    } catch (error) {
      throw new Error('Error fetching managers: ' + error.message);
    }
  }

  async getById(managerId) {
    try {
      const manager = await Manager.findOne({ managerId }).exec();
      if (!manager) {
        throw new Error('Manager not found');
      }
      return manager;
    } catch (error) {
      throw new Error('Error fetching manager: ' + error.message);
    }
  }

  async create(newManager) {
    try {
      const lastManager = await Manager.findOne().sort({ managerId: -1 }).exec();
      const newManagerId = lastManager ? lastManager.managerId + 1 : 1;

      const manager = new Manager({ managerId: newManagerId, ...newManager });
      return await manager.save();
    } catch (error) {
      console.error('Error en ManagerService.create:', error.message);
      throw new Error('Error creating manager: ' + error.message);
    }
  }


  async update(managerId, changes) {
    try {
      const manager = await Manager.findOneAndUpdate({ managerId }, changes, { new: true }).exec();
      if (!manager) {
        throw new Error('Manager not found');
      }
      return manager;
    } catch (error) {
      throw new Error('Error updating manager: ' + error.message);
    }
  }

  async replace(managerId, changes) {
    try {
      const manager = await Manager.findOne({ managerId }).exec();
      if (!manager) {
        throw new Error('Manager not found');
      }

      if (!changes || Object.keys(changes).length === 0) {
        throw new Error('No fields provided for update.');
      }

      const allowedFields = ['name', 'education', 'shift'];
      const fieldsToUpdate = Object.keys(changes);

      if (fieldsToUpdate.length !== 1) {
        throw new Error('Only one field can be updated at a time.');
      }

      const fieldToUpdate = fieldsToUpdate[0];

      if (fieldToUpdate === 'name') {
        const oldName = manager.name;
        const newName = changes.name;

        manager.name = newName;

        await Department.updateMany(
          { manager: oldName },
          { manager: newName }
        );

        return await manager.save();
      } else {
        manager[fieldToUpdate] = changes[fieldToUpdate];
        return await manager.save();
      }
    } catch (error) {
      throw new Error('Error replacing manager: ' + error.message);
    }
  }

  async delete(managerId, force = false) {
    try {
      const manager = await Manager.findOne({ managerId }).exec();
      if (!manager) {
        throw new Error('Manager not found');
      }

      const departmentsUsingManager = await Department.find({ manager: manager._id }).exec();

      if (departmentsUsingManager.length > 0 && !force) {
        throw new Error('Manager is in use by departments. Use "force" to delete.');
      }

      await Manager.deleteOne({ managerId });

      if (departmentsUsingManager.length > 0) {
        await Department.updateMany(
          { manager: manager._id },
          { manager: null }
        );
      }

      return { message: `Manager ${manager.name} has been successfully deleted.` };
    } catch (error) {
      console.error('Error deleting manager:', error.message);
      throw new Error('Error deleting manager: ' + error.message);
    }
  }

  async search(query) {
    try {
      const regex = new RegExp(query, 'i');
      const isNumeric = !isNaN(query);

      const filter = isNumeric
        ? { managerId: query }
        : { name: regex };

      const managers = await Manager.find(filter).exec();

      return managers.map((manager) => ({
        id: manager.managerId,
        name: manager.name,
        education: manager.education,
        shift: manager.shift
      }));
    } catch (error) {
      throw new Error('Error searching managers: ' + error.message);
    }
  }



}

module.exports = ManagerService;
