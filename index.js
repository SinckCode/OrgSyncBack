const express = require("express");
const mongoose = require("mongoose");
const routerApi = require('./routes/rutas');
const { logError, errorHandler } = require('./middlewares/errorHandler');
const setupSwagger = require('./Swagger');
const cors = require('cors');
const authRouter = require('./auth/authRouter');


const app = express();
const port = 3000;

app.use(express.json());
app.use(logError);
app.use(errorHandler);
app.use(cors());
app.use('/auth', authRouter);


const MONGO_URI = 'mongodb+srv://onesto01:ang777pop@finalproject.dx4tm.mongodb.net/?retryWrites=true&w=majority&appName=finalproject';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  });


routerApi(app);
setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Hola mi server en Express con MongoDB");
});

app.get("/nuevaruta", (req, res) => {
  res.send("Hola soy una nueva ruta");
});

app.listen(port, () => {
  console.log(`Hola perro, estas en el puerto ${port} madafaker`);
  console.log(`Documentación disponible en http://localhost:${port}/api-docs`);
});
