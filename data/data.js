const data = {
  employees: [
    {
      employeeNumber: 101,
      firstName: "Carlos",
      lastName: "Gomez",
      age: 35,
      gender: "Male",
      department1: "IT",
      department2: "Support",
      department3: "Cybersecurity"
    },
    {
      employeeNumber: 102,
      firstName: "Ana",
      lastName: "Martinez",
      age: 28,
      gender: "Female",
      department1: "Human Resources",
      department2: "Public Relations",
      department3: "Legal"
    },
    {
      employeeNumber: 103,
      firstName: "Luis",
      lastName: "Fernandez",
      age: 45,
      gender: "Male",
      department1: "Finance",
      department2: "Accounting",
      department3: "Risk Management"
    },
    {
      employeeNumber: 104,
      firstName: "Maria",
      lastName: "Lopez",
      age: 32,
      gender: "Female",
      department1: "Marketing",
      department2: "Sales",
      department3: "Design"
    },
    {
      employeeNumber: 105,
      firstName: "Juan",
      lastName: "Perez",
      age: 40,
      gender: "Male",
      department1: "IT",
      department2: "Development",
      department3: "Testing"
    },
    {
      employeeNumber: 106,
      firstName: "Lucia",
      lastName: "Torres",
      age: 30,
      gender: "Female",
      department1: "Human Resources",
      department2: "Training",
      department3: "Public Relations"
    },
    {
      employeeNumber: 107,
      firstName: "Pedro",
      lastName: "Ramirez",
      age: 50,
      gender: "Male",
      department1: "Finance",
      department2: "Auditing",
      department3: "Legal"
    },
    {
      employeeNumber: 108,
      firstName: "Sofia",
      lastName: "Hernandez",
      age: 25,
      gender: "Female",
      department1: "Marketing",
      department2: "Design",
      department3: "Content Creation"
    },
    {
      employeeNumber: 109,
      firstName: "Miguel",
      lastName: "Castillo",
      age: 38,
      gender: "Male",
      department1: "IT",
      department2: "Support",
      department3: "Development"
    },
    {
      employeeNumber: 110,
      firstName: "Elena",
      lastName: "Vega",
      age: 29,
      gender: "Female",
      department1: "Human Resources",
      department2: "Public Relations",
      department3: "Training"
    },
    {
      employeeNumber: 111,
      firstName: "Roberto",
      lastName: "Morales",
      age: 48,
      gender: "Male",
      department1: "Finance",
      department2: "Auditing",
      department3: "Accounting"
    },
    {
      employeeNumber: 112,
      firstName: "Isabel",
      lastName: "Flores",
      age: 27,
      gender: "Female",
      department1: "Marketing",
      department2: "Sales",
      department3: "Design"
    },
    {
      employeeNumber: 113,
      firstName: "Alejandro",
      lastName: "Diaz",
      age: 33,
      gender: "Male",
      department1: "IT",
      department2: "Development",
      department3: "Cybersecurity"
    },
    {
      employeeNumber: 114,
      firstName: "Paula",
      lastName: "Cruz",
      age: 26,
      gender: "Female",
      department1: "Human Resources",
      department2: "Public Relations",
      department3: "Legal"
    },
    {
      employeeNumber: 115,
      firstName: "Jorge",
      lastName: "Reyes",
      age: 42,
      gender: "Male",
      department1: "Finance",
      department2: "Risk Management",
      department3: "Accounting"
    }
  ],

  departments: [
    {
      departmentNumber: 1,
      name: "IT",
      manager: "Roberto Sanchez",
      area: "Technology"
    },
    {
      departmentNumber: 2,
      name: "Human Resources",
      manager: "Laura Gutierrez",
      area: "Administration"
    },
    {
      departmentNumber: 3,
      name: "Finance",
      manager: "Marcos Rodriguez",
      area: "Accounting"
    },
    {
      departmentNumber: 4,
      name: "Marketing",
      manager: "Patricia Salinas",
      area: "Advertising"
    },
    {
      departmentNumber: 5,
      name: "Sales",
      manager: "Fernando Rivera",
      area: "Commerce"
    },
    {
      departmentNumber: 6,
      name: "Development",
      manager: "Santiago Alvarez",
      area: "Technology"
    },
    {
      departmentNumber: 7,
      name: "Support",
      manager: "Monica Jimenez",
      area: "Technology"
    },
    {
      departmentNumber: 8,
      name: "Training",
      manager: "Claudia Romero",
      area: "Administration"
    },
    {
      departmentNumber: 9,
      name: "Design",
      manager: "Eduardo Gomez",
      area: "Creative"
    },
    {
      departmentNumber: 10,
      name: "Auditing",
      manager: "Raul Perez",
      area: "Finance"
    },
    {
      departmentNumber: 11,
      name: "Risk Management",
      manager: "Carolina Diaz",
      area: "Finance"
    },
    {
      departmentNumber: 12,
      name: "Public Relations",
      manager: "Marcela Cruz",
      area: "Communication"
    },
    {
      departmentNumber: 13,
      name: "Cybersecurity",
      manager: "Diego Torres",
      area: "Technology"
    },
    {
      departmentNumber: 14,
      name: "Content Creation",
      manager: "Lorena Flores",
      area: "Creative"
    },
    {
      departmentNumber: 15,
      name: "Legal",
      manager: "Alejandra Ortiz",
      area: "Corporate"
    },
    {
      departmentNumber: 16,
      name: "Accounting", // Añadido
      manager: "Marcos Rodriguez",
      area: "Finance"
    },
    {
      departmentNumber: 17,
      name: "Testing", // Añadido
      manager: "Santiago Alvarez",
      area: "Technology"
    }
  ],
  managers: [
    {
      managerId: 1,
      name: "Roberto Sanchez",
      education: "Computer Engineering",
      shift: "Morning"
    },
    {
      managerId: 2,
      name: "Marcos Ariciaga",
      education: "Bachelor in Psychology",
      shift: "Afternoon"
    },
    {
      managerId: 3,
      name: "Marcos Rodriguez",
      education: "Bachelor in Accounting",
      shift: "Morning"
    },
    {
      managerId: 4,
      name: "Patricia Salinas",
      education: "Bachelor in Marketing",
      shift: "Afternoon"
    },
    {
      managerId: 5,
      name: "Fernando Rivera",
      education: "Business Administration",
      shift: "Morning"
    },
    {
      managerId: 6,
      name: "Santiago Alvarez",
      education: "Software Engineering",
      shift: "Morning"
    },
    {
      managerId: 7,
      name: "Monica Jimenez",
      education: "Information Systems",
      shift: "Afternoon"
    },
    {
      managerId: 8,
      name: "Claudia Romero",
      education: "Human Resources",
      shift: "Morning"
    },
    {
      managerId: 9,
      name: "Eduardo Gomez",
      education: "Graphic Design",
      shift: "Afternoon"
    },
    {
      managerId: 10,
      name: "Raul Perez",
      education: "Finance",
      shift: "Morning"
    },
    {
      managerId: 11,
      name: "Carolina Diaz",
      education: "Risk Management",
      shift: "Afternoon"
    },
    {
      managerId: 12,
      name: "Marcela Cruz",
      education: "Public Relations",
      shift: "Morning"
    },
    {
      managerId: 13,
      name: "Diego Torres",
      education: "Cybersecurity",
      shift: "Afternoon"
    },
    {
      managerId: 14,
      name: "Lorena Flores",
      education: "Digital Marketing",
      shift: "Morning"
    },
    {
      managerId: 15,
      name: "Alejandra Ortiz",
      education: "Law",
      shift: "Afternoon"
    },
    {
      managerId: 16,
      name: "Laura Gutierrez",
      education: "Human Resources Management",
      shift: "Morning"
    }
  ],

  areas: [
    {
      areaId: 1,
      name: "Technology",
      building: "Building A"
    },
    {
      areaId: 2,
      name: "Administration",
      building: "Building B"
    },
    {
      areaId: 3,
      name: "Accounting",
      building: "Building C"
    },
    {
      areaId: 4,
      name: "Advertising",
      building: "Building D"
    },
    {
      areaId: 5,
      name: "Commerce",
      building: "Building E"
    },
    {
      areaId: 6,
      name: "Creative",
      building: "Building F"
    },
    {
      areaId: 7,
      name: "Finance",
      building: "Building G"
    },
    {
      areaId: 8,
      name: "Communication",
      building: "Building H"
    },
    {
      areaId: 9,
      name: "Corporate",
      building: "Building I"
    }
  ]
};

function departmentExists(departmentName) {
  return data.departments.some(department => department.name === departmentName);
}

function managerExists(managerName) {
  return data.managers.some(manager => manager.name === managerName);
}

function areaExists(areaName) {
  return data.areas.some(area => area.name === areaName);
}

function isAreaInUse(areaId) {
  return data.employees.some(employee =>
    employee.department1 === areaId ||
    employee.department2 === areaId ||
    employee.department3 === areaId
  ) || data.departments.some(department => department.area === areaId);
}

function isDepartmentInUse(departmentName) {
  return data.employees.some(employee =>
    employee.department1 === departmentName ||
    employee.department2 === departmentName ||
    employee.department3 === departmentName
  );
}

function isManagerInUse(managerName) {
  return data.departments.some(department => department.manager === managerName);
}

module.exports = {
  data,
  departmentExists,
  managerExists,
  isAreaInUse,
  isDepartmentInUse,
  isManagerInUse,
  areaExists
};
