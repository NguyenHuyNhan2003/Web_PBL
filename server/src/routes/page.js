
const express = require('express');
const router = express.Router();

const FanpageController = require('../app/controllers/FageController');

router.get('/',FanpageController.show);
router.get('/view',FanpageController.index);
router.get('/react',FanpageController.react);


// router.use(requireAuth.AuthAdmin) // cho những phần cần admin đăng nhập
// router.use(requireAuth.AuthUser) // cho những phần cần user đăng nhập


module.exports = router;
