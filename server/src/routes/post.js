
const express = require('express');
const router = express.Router();
const PostController = require('../app/controllers/PostController');
const requireAuth = require('../middleware/requireAuth')


router.get('/by/:id',PostController.getbyid);
router.get('/create',PostController.create);
router.get('/recruitment',PostController.cruitment);
router.post('/sendmail',PostController.send_gmail)
router.get('/recruitment/by/:id',PostController.getrecruitmentbyid)
router.get('/edit/recruitment/:_id',PostController.editbyid);
router.put('/update/recruitment/:_id',PostController.updatebyid);
router.delete('/delete/:id',PostController.deletebyid);
router.post('/create',PostController.createpost);
router.get('/',PostController.show);
//cần đăng nhập để truy cập các route dưới
router.use(requireAuth)

module.exports = router;

