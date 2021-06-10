/* utils - o que não faz parte da regra des negócio e é comum a todos */
/* Para o negócio a mudança de token é irrelevante, mas para segurança é sim */
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const md5HashSecret = process.env.MD5_SECRET;
const jwtHashSecret = process.env.JWT_SECRET;
const jwtTimeLimit = process.env.JWT_VALID_TIME;


const criaHash = (senha) => {
  return md5(senha + md5HashSecret);
}

const criaToken = (model) => {
  return jwt.sign({ ...model }, jwtHashSecret, {
    expiresIn: `${jwtTimeLimit}ms`,
  })
}

const decodificaToken = (token) => {
  return jwt.decode(token);
}

const validaToken = (token) => {
  try {
    jwt.verify(token, jwtHashSecret);
    return true;
  } catch (error) {
    return false;
  }
}


module.exports = {
  criaHash,
  criaToken,
  validaToken,
  decodificaToken
}

