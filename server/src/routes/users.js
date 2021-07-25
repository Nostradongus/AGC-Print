const express = require('express');
const { getUsers, getUser, addUser } = require('../controller/users');

const router = express.Router();

router.get('/', getUsers);

router.get('/:username', getUser);

router.post('/', addUser);

module.exports = router;
