import express from 'express';
import routerApiExcusas from './routers/index.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT
const app = express();

app.use(cors()); // Permitir solicitudes CORS, permite que el frontend se comunique con el backend, mismo estando en puertos diferentes
app.use(express.json());
app.use(express.static('public')); //devolver archivos estáticos 

app.get('/', (req, res) => {
    res.send('<h1>Inicio</h1>');
}
);
routerApiExcusas(app);

// app.listen( port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// CONEXIÓN A MONGODB ATLAS
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });