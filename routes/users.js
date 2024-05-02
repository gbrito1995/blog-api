var express = require('express');
var router = express.Router();
const login = require('../controllers/loginController.js');

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
 */

router.post('/create', login.createUser);
router.post('/login', login.loginUser);

module.exports = router;
