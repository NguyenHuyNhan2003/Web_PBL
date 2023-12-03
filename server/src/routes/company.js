
const express = require('express');
const router = express.Router();
const CompanyController = require('../app/controllers/CompanyController');

router.get('/search/all',CompanyController.searchInput);
router.get('/search',CompanyController.searchselect);
router.get('/',CompanyController.show);


// router.use(requireAuth.AuthAdmin) // cho những phần cần admin đăng nhập
// router.use(requireAuth.AuthUser) // cho những phần cần user đăng nhập



module.exports = router;
