var express = require('express');
var router = express.Router();
const blogPosts = require('../controllers/blogPostController.js');


/* GET home page. */
/* 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 */

router.post('/', blogPosts.createPost);

router.get('/', blogPosts.findAll);

router.get('/:id', blogPosts.findById);

router.delete('/:id', blogPosts.remove);

module.exports = router;
