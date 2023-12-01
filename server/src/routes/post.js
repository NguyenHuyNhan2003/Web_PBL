
const express = require('express');
const router = express.Router();
const PostController = require('../app/controllers/PostController');
const requireAuth = require('../middleware/requireAuth');
const Post = require('../app/models/Post');

router.get('/',PostController.show);
router.get('/by/:id',PostController.getbyid);
router.get('/create',PostController.create);
router.get('/recruitment',PostController.cruitment);
router.post('/sendmail',PostController.send_gmail)
//cần đăng nhập để truy cập các route dưới

router.get('/edit/recruitment/:_id',PostController.editbyid);
router.put('/update/recruitment/:_id',PostController.updatebyid);
router.delete('/delete/:id',PostController.deletebyid);
router.post('/create',PostController.createpost);
router.post('/scraper',PostController.scrape)

router.use(requireAuth.AuthAdmin) // cho những phần cần admin đăng nhập
router.use(requireAuth.AuthUser) // cho những phần cần user đăng nhập

module.exports = router;

