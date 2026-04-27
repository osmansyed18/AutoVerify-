const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const { router: userRoutes, isLoggedIn, isAdmin } = require('./routes/users');
const vehicleRoutes = require('./routes/vehicle');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'autoverify-india-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
// Main page routes
app.get('/', (req, res) => {
    res.render('home', { user: req.session.user });
});

app.get('/about', (req, res) => {
    res.render('about', { user: req.session.user });
});

// User authentication routes
app.use('/', userRoutes);

// Protected routes
app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard', { user: req.session.user });
});

app.get('/admin', isAdmin, (req, res) => {
    res.render('admin', { user: req.session.user });
});

app.get('/owner-history', isLoggedIn, (req, res) => {
    res.render('owner-history', { user: req.session.user });
});

app.get('/mileage-verification', isLoggedIn, (req, res) => {
    res.render('mileage-verification', { user: req.session.user });
});

// API routes
app.use('/api/vehicles', vehicleRoutes);

// Legacy route for existing functionality
app.get('/verify-mileage', isLoggedIn, async (req, res) => {
    try {
        const { vehicleId } = req.query;
        
        if (!vehicleId) {
            return res.status(400).json({ error: 'Vehicle ID is required' });
        }
        
        // Import vehicle controller for reuse
        const vehicleController = require('./controllers/vehicleController');
        // Call the controller method with await
        await vehicleController.verifyMileage(req, res);
        
    } catch (error) {
        console.error('Error in legacy verify-mileage route:', error);
        res.status(500).json({ error: 'Error verifying mileage' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`AutoVerify India Vehicle Verification System running on port ${PORT}`);
    console.log(`Access the system at: http://localhost:${PORT}`);
});

module.exports = app;
