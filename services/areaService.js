const Area = require('../models/areaModel');
const Department = require('../models/departmentModel');
const { v4: uuidv4 } = require('uuid');


class AreaService {
  async getAll() {
    try {
      return await Area.find().exec();
    } catch (error) {
      throw new Error('Error fetching areas: ' + error.message);
    }
  }

  async getById(areaId) {
    try {
      const area = await Area.findOne({ areaId }).exec();
      if (!area) {
        throw new Error('Area not found');
      }
      return area;
    } catch (error) {
      throw new Error('Error fetching area: ' + error.message);
    }
  }

  async create(newArea) {
    try {
      if (!newArea.areaId) {
        newArea.areaId = uuidv4();
      }

      const area = new Area(newArea);
      return await area.save();
    } catch (error) {
      throw new Error('Error creating area: ' + error.message);
    }
  }

  async update(areaId, changes) {
    try {
      const area = await Area.findOne({ areaId }).exec();
      if (!area) {
        throw new Error(`Área con ID ${areaId} no encontrada.`);
      }

      Object.keys(changes).forEach((key) => {
        if (area[key] !== undefined) {
          area[key] = changes[key];
        }
      });

      return await area.save();
    } catch (error) {
      throw new Error('Error actualizando área: ' + error.message);
    }
  }





  async replace(areaId, changes) {
    try {
      const area = await Area.findOne({ areaId }).exec();
      if (!area) {
        throw new Error('Area not found');
      }

      if (!changes || Object.keys(changes).length === 0) {
        throw new Error('No fields provided for update.');
      }

      const allowedFields = ['name', 'description'];
      const fieldsToUpdate = Object.keys(changes);

      if (fieldsToUpdate.length !== 1) {
        throw new Error('Only one field can be updated at a time.');
      }

      const fieldToUpdate = fieldsToUpdate[0];

      if (fieldToUpdate === 'name') {
        const oldName = area.name;
        const newName = changes.name;

        await Department.updateMany(
          { area: oldName },
          { area: newName }
        );

        area.name = newName;
        return await area.save();
      } else {
        area[fieldToUpdate] = changes[fieldToUpdate];
        return await area.save();
      }
    } catch (error) {
      throw new Error('Error replacing area: ' + error.message);
    }
  }

  async delete(areaId, force = false) {
    try {
      const area = await Area.findOne({ areaId }).exec();
      if (!area) {
        throw new Error(`Área con ID ${areaId} no encontrada.`);
      }

      const relatedDepartments = await Department.find({ area: area._id }).exec();
      if (relatedDepartments.length > 0 && !force) {
        throw new Error(
          'El área está en uso por uno o más departamentos. Usa "force" para eliminar.'
        );
      }

      if (relatedDepartments.length > 0) {
        await Department.updateMany(
          { area: area._id },
          { $set: { area: null } }
        );
      }

      await Area.deleteOne({ areaId });
      return { message: `El área con ID ${areaId} ha sido eliminada correctamente.` };
    } catch (error) {
      throw new Error('Error deleting area: ' + error.message);
    }
  }

  async search(query) {
    try {
      const regex = new RegExp(query, 'i');
      const isNumeric = !isNaN(query);

      const filter = isNumeric
        ? { areaId: query }
        : { name: regex };

      const areas = await Area.find(filter).exec();

      return areas.map((area) => ({
        id: area.areaId,
        name: area.name,
        building: area.building
      }));
    } catch (error) {
      throw new Error('Error searching areas: ' + error.message);
    }
  }





}

module.exports = AreaService;
