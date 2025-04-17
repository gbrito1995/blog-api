const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
      
  let token = req.headers.token;  
  if (!token) return res.status(401).send("Access denied!");

  jwt.verify(token, `${process.env.SECRET_PASS}`, (err, decode) => {
    
    if (err) res.status(401).send("Token is not valid.");
    else res.status(200).send("Token is valid.");    
    
  });  
  
}