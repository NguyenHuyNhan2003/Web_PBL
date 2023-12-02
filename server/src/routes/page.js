
const express = require('express');
const router = express.Router();

const FanpageController = require('../app/controllers/FageController');

router.get('/',FanpageController.show);
router.get('/view',FanpageController.index);
router.get('/react',FanpageController.react);


module.exports = router;
