const express = require('express');
const { getHome } = require('../controller/index');

const router = express.Router();

router.get('/', getHome);

module.exports = router;
