var express = require('express');
var router = express.Router();
const blogPosts = require('../controllers/blogPostController.js');
const aboutMeInfo = require('../controllers/aboutMeController.js');
const login = require('../controllers/loginController.js');
var validateToken = require('../middlewares/validateToken.js'); 
const checkToken = require('../controllers/checkToken.js');


//  _   _ ___ ___ ___ 
// | | | / __| __| _ \
// | |_| \__ \ _||   /
//  \___/|___/___|_|_\
router.post('/user/login', login.loginUser);
router.post('/user/create', validateToken, login.createUser);
router.get('/user/checkToken', checkToken);

//  ___  ___  ___ _____ 
// | _ \/ _ \/ __|_   _|
// |  _/ (_) \__ \ | |  
// |_|  \___/|___/ |_|  
router.post('/post/create', validateToken, blogPosts.createPost);
router.get('/post', validateToken, blogPosts.findList);
router.get('/post/all', validateToken, blogPosts.findAll);
router.get('/post/:id(\\d+)',validateToken, blogPosts.findById);
router.get('/post/offset/:offset(\\d+)', blogPosts.findPaginated);
router.delete('/post/:id(\\d+)', validateToken, blogPosts.remove);
router.put('/post/:id(\\d+)', validateToken, blogPosts.update);

 //    _   _              _   __  __     
 //   /_\ | |__  ___ _  _| |_|  \/  |___ 
 //  / _ \| '_ \/ _ \ || |  _| |\/| / -_)
 // /_/ \_\_.__/\___/\_,_|\__|_|  |_\___|
router.put('/about-me', aboutMeInfo.updateAboutMe);
router.get('/about-me', aboutMeInfo.findAboutMe);

module.exports = router;
