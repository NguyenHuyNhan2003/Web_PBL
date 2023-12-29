
const express = require('express');
const router = express.Router();
const BlogController = require('../app/controllers/BlogController');

router.get('/by/:_id',BlogController.getbyid);
router.get('/',BlogController.show);


module.exports = router;