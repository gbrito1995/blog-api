var express = require('express');
var router = express.Router();
const blogPosts = require('../controllers/blogPostController.js');
const login = require('../controllers/loginController.js');
var validateToken = require('../middlewares/validateToken.js'); 


//  _   _ ___ ___ ___ 
// | | | / __| __| _ \
// | |_| \__ \ _||   /
//  \___/|___/___|_|_\
router.post('/user/create', validateToken, login.createUser);
router.post('/user/login', login.loginUser);

//  ___  ___  ___ _____ 
// | _ \/ _ \/ __|_   _|
// |  _/ (_) \__ \ | |  
// |_|  \___/|___/ |_|  
router.post('/post/create', blogPosts.createPost);
router.get('/post/all', blogPosts.findAll);
router.get('/post/:id', blogPosts.findById);
router.delete('/post/:id', blogPosts.remove);

module.exports = router;
