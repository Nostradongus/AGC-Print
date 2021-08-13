import express from 'express';
import { getUsers, getUser, addUser } from '../controller/users.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/:username', getUser);

router.post('/', addUser);

export default router;
