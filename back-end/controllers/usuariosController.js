import Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//jsonwebtoken (o jwt):
// 1. Cuando el usuario inicia sesión:
// Si el email y la contraseña son correctos, tu backend crea un token JWT con información del usuario (por ejemplo, su id y email).
// Ese token es como una "llave digital" que el usuario guarda en el frontend (por ejemplo, en localStorage).

// 2. Cuando el usuario navega por la app:
// Cada vez que hace una petición protegida (por ejemplo, crear o borrar una excusa), el frontend envía ese token al backend.
// El backend usa jsonwebtoken para verificar que el token es válido y no fue modificado.

// 3. ¿Por qué es útil?
// No necesitas guardar sesiones en el servidor.
// El usuario puede navegar, recargar la página o cerrar y abrir el navegador, y mientras tenga el token, sigue autenticado.
// Es seguro porque el token está firmado y no se puede falsificar.

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    // Verifica si el usuario ya existe
    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    // Genera el token JWT
    const token = jwt.sign({ id: usuario._id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};