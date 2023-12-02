
const express = require('express');
const router = express.Router();
const CompanyController = require('../app/controllers/CompanyController');

router.get('/search/all',CompanyController.searchInput);
router.get('/search',CompanyController.searchselect);
router.get('/',CompanyController.show);



module.exports = router;
