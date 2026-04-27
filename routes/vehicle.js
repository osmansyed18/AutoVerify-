const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// GET /api/vehicles/search - Search vehicles
router.get('/search', vehicleController.searchVehicles);

// GET /api/vehicles/owner-history - Get vehicle owner history
router.get('/owner-history', vehicleController.getOwnerHistory);

// GET /api/vehicles/stats - Get vehicle statistics
router.get('/stats', vehicleController.getVehicleStats);

// GET /api/vehicles - Get all vehicles (admin)
router.get('/', vehicleController.getAllVehicles);

// GET /api/vehicles/:vehicleId - Get vehicle details
router.get('/:vehicleId', vehicleController.getVehicleDetails);

// Legacy route for existing functionality
// GET /api/verify-mileage - Verify vehicle mileage (for dashboard form)
router.get('/verify-mileage', vehicleController.verifyMileage);

module.exports = router;
