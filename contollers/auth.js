let mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const session = require('express-session');

let connection = mysql.createConnection({
    host:        process.env.DATABASE_HOST,
   user:        process.env.DATABASE_USER,
   password:    process.env.DATABASE_PASS,
   database:    process.env.DATABASE,
});

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Email or password not provided');
            return res.status(400).render('login', {
                message: 'Please enter both email and password'
            });
        }

        connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.log('Database query error:', error);
                return res.status(500).render('login', {
                    message: 'An error occurred while trying to log in'
                    
                });
            }

            if (results.length === 0) {
                console.log('No user found with the provided email');
                return res.status(400).render('login', {
                    message: 'Email or password is incorrect'
                });
            }

            const users = results[0];

            if (users.password !== password) {
                console.log('Password does not match');
                return res.status(400).render('login', {
                    message: 'Email or password is incorrect'
                });
            }

            req.session.users = {
                id_user: users.id_user,
                username: users.username,
                email: users.email
            };

            console.log('User logged in successfully:', req.session.user);

            return res.status(200).render('indexUser', {
                message: 'Logged in successfully'
            });
        });
    } catch (error) {
        console.log('Unexpected error:', error);
        return res.status(500).render('login', {
            message: 'An error occurred while trying to log in'
        });
    }
    console.log(req.body);
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).render('error', {
                message: 'Failed to log out'
            });
        }
        res.clearCookie('connect.sid');
        return res.status(200).redirect('/');
    });
};