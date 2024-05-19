const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
      
  let token = req.headers.token;  
  if (!token) return res.status(401).send("Access denied!");

  let isValid = jwt.verify(token, `${process.env.SECRET_PASS}`);  
  if (isValid) next();
  else return res.status(400).send(isValid);
}