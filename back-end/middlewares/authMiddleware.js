// Un middleware es como un “portero” que revisa cada pedido antes de dejarlo pasar a la siguiente parte del servidor.
// Sirve para seguridad, validaciones y procesamiento de datos.
//Revisa si la petición trae un token en la cabecera Authorization (debe empezar con Bearer ).
//Ese token es un JWT (JSON Web Token). Es un código seguro que el backend genera cuando un usuario inicia sesión correctamente.
// Contiene información codificada, como el id y el email del usuario.
// Está firmado con tu clave secreta (JWT_SECRET), así el backend puede verificar que no fue modificado.

// ¿Qué hace el middleware?
// Antes:
// Cuando creabas una excusa, el backend no sabía quién eras porque no verificaba el token ni agregaba el usuario a la petición.
// Por eso, req.user era undefined y daba error al intentar leer req.user.id.

// Ahora:
// El middleware revisa el token que envía el frontend, lo decodifica y pone los datos del usuario en req.user.
// Así, cuando el backend crea la excusa, puede usar req.user.id para asociarla al usuario correcto.

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default authMiddleware;

