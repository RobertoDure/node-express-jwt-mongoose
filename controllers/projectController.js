const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);


router.get('/', (req, res) => {
    res.send({ userId: req.userId, userEmail: req.userEmail, userName: req.userName});
});

module.exports = app => app.use('/projects', router);