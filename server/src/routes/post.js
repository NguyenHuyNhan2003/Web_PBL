
const express = require('express');
const router = express.Router();
const PostController = require('../app/controllers/PostController');
router.get('/by/:id',PostController.getbyid);
router.get('/create',PostController.create);
router.get('/recruitment',PostController.cruitment);
router.get('/edit/recruitment/:_id',PostController.editbyid);
router.put('/update/recruitment/:_id',PostController.updatebyid);
router.delete('/delete/:id',PostController.deletebyid);
router.post('/create',PostController.createpost);
router.get('/',PostController.show);
module.exports = router;

