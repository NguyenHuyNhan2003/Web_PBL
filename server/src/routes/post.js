
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

router.post('/:id/commentPost',PostController.commentPost)
// upload picture 


router.post('/upload',PostController.upload.single('file'),PostController.postUpload);
router.get('/getImage',PostController.getImage);
///


//cần đăng nhập để truy cập các route dưới
router.use(requireAuth.AuthAdmin)

router.get('/',PostController.show);
router.post('/create',PostController.upload.single('anh'),PostController.createpost);
router.get('/edit/recruitment/:_id',PostController.editbyid);
router.put('/update/recruitment/:_id',PostController.updatebyid);
router.delete('/delete/:id',PostController.deletebyid);


// router.use(requireAuth.AuthAdmin) // cho những phần cần admin đăng nhập
// router.use(requireAuth.AuthUser) // cho những phần cần user đăng nhập
module.exports = router;

