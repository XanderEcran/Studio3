// routes/index.js
const express = require('express');
const authController = require('../contollers/auth')
const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/login');
};

router.get('/indexUser', isAuthenticated, (req, res) => {
    res.render('indexUser', { message: 'Welcome back!', username: req.session.username });
});

module.exports = router;
