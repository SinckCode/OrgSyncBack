const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'jair', password: 'elmejorprofe' },
];

function authenticateUser(username, password) {
  if (username === 'jair' && password === 'elmejorprofe') {
    return { username: 'jair', role: 'admin', specialMessage: 'Sabemos que es el mejor profe' };
  }

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    throw new Error('Credenciales incorrectas');
  }

  return { username: user.username, role: user.role };
}


module.exports = { authenticateUser };
