const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Mock user database (in production, use a real database)
const users = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: '$2b$10$VDC2y9x2gA5dBglTbLHJyOi4Fsf8Si1kejYXAroZRNrcOQSodpbse', // password: 'password123'
        role: 'user',
        createdAt: new Date()
    },
    {
        id: '2',
        name: 'Admin User',
        email: 'admin@example.com',
        password: '$2b$10$GIJJBlViCuNP7iW.PyYrt.UWBEzOWwpM26zBe3gIT.UIU5.SaM4NW', // password: 'admin123'
        role: 'admin',
        createdAt: new Date()
    },
    {
        id: '3',
        name: 'Test User',
        email: 'test@example.com',
        password: '$2b$10$G/DYcNXAHWap1jl8eHH4Eumz.ud9cBC2UO7WUFcOfDiKkHj.gVV7m', // password: 'test123'
        role: 'user',
        createdAt: new Date()
    }
];

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Middleware to check if user is admin
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('Access denied. Admin rights required.');
    }
}

// GET /login - Show login form
router.get('/login', (req, res) => {
    const error = req.query.error || null;
    const success = req.query.success || null;
    res.render('users/login', { error, success });
});

// POST /login - Handle login
router.post('/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('users/login', { 
            error: 'Invalid email or password format',
            email: req.body.email
        });
    }

    const { email, password } = req.body;
    
    // Find user by email
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return res.render('users/login', { 
            error: 'No account found with this email',
            email
        });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
        return res.render('users/login', { 
            error: 'Incorrect password',
            email
        });
    }
    
    // Set session
    req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    
    res.redirect('/dashboard');
});

// GET /signup - Show signup form
router.get('/signup', (req, res) => {
    const error = req.query.error || null;
    res.render('users/signup', { error });
});

// POST /signup - Handle signup
router.post('/signup', [
    body('name').trim().isLength({ min: 2, max: 50 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match');
        }
        return true;
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('users/signup', { 
            error: errors.array()[0].msg,
            name: req.body.name,
            email: req.body.email
        });
    }

    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.render('users/signup', { 
            error: 'An account with this email already exists',
            name,
            email
        });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        role: 'user', // Default role
        createdAt: new Date()
    };
    
    users.push(newUser);
    
    res.redirect('/login?success=Account created successfully! Please login.');
});

// GET /logout - Handle logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login?success=Logged out successfully!');
    });
});

// GET /profile - Show user profile
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('users/profile', { user: req.session.user });
});

// POST /profile - Update user profile
router.post('/profile', isLoggedIn, [
    body('name').trim().isLength({ min: 2, max: 50 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('users/profile', { 
            user: req.session.user,
            error: errors.array()[0].msg
        });
    }

    const { name } = req.body;
    
    // Update user in database
    const userIndex = users.findIndex(u => u.id === req.session.user.id);
    if (userIndex !== -1) {
        users[userIndex].name = name;
        req.session.user.name = name;
    }
    
    res.render('users/profile', { 
        user: req.session.user,
        success: 'Profile updated successfully!'
    });
});

module.exports = { router, isLoggedIn, isAdmin };
