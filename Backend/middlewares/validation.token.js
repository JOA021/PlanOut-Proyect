import jwt from 'jsonwebtoken'

export const verificarToken = (req, res, next) => {


  let token = req.body.token;

  if (!token) {
    return res.status(403).send("Se requiere un token.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;

    console.log(req.user)

    next();
  } catch (error) {
    return res.status(401).send("Token inválido o expirado.");
  } 
};