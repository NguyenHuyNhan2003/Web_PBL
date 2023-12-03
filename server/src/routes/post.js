
const express = require('express');
const router = express.Router();
const PostController = require('../app/controllers/PostController');
const requireAuth = require('../middleware/requireAuth');
const Post = require('../app/models/Post');



router.get('/by/:id',PostController.getbyid);
router.get('/create',PostController.create);
router.get('/recruitment',PostController.cruitment);
router.post('/sendmail',PostController.send_gmail)
router.get('/recruitment/by/:id',PostController.getrecruitmentbyid)




router.post('/scraper',PostController.scrape)
//cần đăng nhập để truy cập các route dưới
router.use(requireAuth.AuthAdmin)

router.get('/',PostController.show);
router.post('/create',PostController.createpost);
router.get('/edit/recruitment/:_id',PostController.editbyid);
router.put('/update/recruitment/:_id',PostController.updatebyid);
router.delete('/delete/:id',PostController.deletebyid);


// router.use(requireAuth.AuthAdmin) // cho những phần cần admin đăng nhập
// router.use(requireAuth.AuthUser) // cho những phần cần user đăng nhập
module.exports = router;

