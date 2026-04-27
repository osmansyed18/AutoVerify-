const vehicleModel = require('../models/vehicle');
const { formatVehicleResponse, createErrorResponse, createSuccessResponse } = require('../utils/dataUtils');

// Search vehicles (for admin dashboard)
async function searchVehicles(req, res) {
    try {
        const { search, page = 1, limit = 10 } = req.query;
        
        let vehicles = vehicleModel.searchVehicles(search);
        
        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        const paginatedResults = vehicles.slice(startIndex, endIndex);
        
        res.json(createSuccessResponse({
            vehicles: paginatedResults,
            currentPage: parseInt(page),
            totalPages: Math.ceil(vehicles.length / limit),
            totalResults: vehicles.length
        }, 'Vehicles retrieved successfully'));
        
    } catch (error) {
        console.error('Error searching vehicles:', error);
        res.status(500).json(createErrorResponse('Error searching vehicles'));
    }
}

// Get vehicle details by ID
async function getVehicleDetails(req, res) {
    try {
        const { vehicleId } = req.params;
        
        if (!vehicleId) {
            return res.status(400).json(createErrorResponse('Vehicle ID is required'));
        }
        
        // Get data from different sources
        const csvVehicle = vehicleModel.getVehicleById(vehicleId);
        const insuranceData = vehicleModel.getInsuranceData(vehicleId);
        const serviceData = vehicleModel.getServiceData(vehicleId);
        
        if (!csvVehicle && !insuranceData) {
            return res.status(404).json(createErrorResponse('Vehicle not found'));
        }
        
        // Calculate mileage discrepancy
        let discrepancy = 0;
        let isAccurate = true;
        
        if (insuranceData && serviceData.length > 0) {
            const latestService = serviceData[serviceData.length - 1];
            discrepancy = Math.abs(insuranceData.mileage - latestService.mileage);
            isAccurate = discrepancy <= 500; // 500km tolerance
        }
        
        const response = formatVehicleResponse(csvVehicle, insuranceData, serviceData);
        
        res.json(createSuccessResponse({
            ...response,
            verification: {
                discrepancy: discrepancy.toLocaleString() + ' kms',
                isAccurate,
                recommendation: isAccurate ? 
                    'Mileage appears accurate' : 
                    'Mileage discrepancy detected - further investigation recommended'
            }
        }, 'Vehicle details retrieved successfully'));
        
    } catch (error) {
        console.error('Error getting vehicle details:', error);
        res.status(500).json(createErrorResponse('Error retrieving vehicle details'));
    }
}

// Verify vehicle mileage (for dashboard form)
async function verifyMileage(req, res) {
    try {
        const { vehicleId } = req.query;
        
        if (!vehicleId) {
            return res.status(400).json(createErrorResponse('Vehicle ID is required'));
        }
        
        // Get data from insurance company
        const insuranceData = vehicleModel.getInsuranceData(vehicleId);
        
        // Get data from service center
        const serviceData = vehicleModel.getServiceData(vehicleId);
        
        if (!insuranceData) {
            return res.status(404).json(createErrorResponse('Vehicle not found in insurance records'));
        }
        
        // Calculate discrepancy
        let discrepancy = 0;
        let isAccurate = true;
        
        if (serviceData.length > 0) {
            const latestService = serviceData[serviceData.length - 1];
            discrepancy = Math.abs(insuranceData.mileage - latestService.mileage);
            isAccurate = discrepancy <= 500;
        }
        
        res.json(createSuccessResponse({
            vehicleId,
            insuranceData: {
                mileage: insuranceData.mileage.toLocaleString(),
                lastUpdated: insuranceData.lastUpdated,
                company: insuranceData.company,
                rto: insuranceData.rto
            },
            serviceData: serviceData.map(service => ({
                date: service.serviceDate,
                mileage: service.mileage.toLocaleString(),
                type: service.serviceType,
                center: service.serviceCenter,
                cost: service.cost.toLocaleString()
            })),
            discrepancy: discrepancy.toLocaleString(),
            isAccurate,
            recommendation: isAccurate ? 
                'Mileage appears accurate' : 
                'Mileage discrepancy detected - further investigation recommended'
        }, 'Mileage verification completed'));
        
    } catch (error) {
        console.error('Error verifying mileage:', error);
        res.status(500).json(createErrorResponse('Error verifying mileage'));
    }
}

// Get all vehicles for admin dashboard
async function getAllVehicles(req, res) {
    try {
        const vehicles = vehicleModel.getCSVData();
        
        res.json(createSuccessResponse({
            vehicles: vehicles.slice(0, 50), // Limit to 50 for performance
            total: vehicles.length
        }, 'All vehicles retrieved successfully'));
        
    } catch (error) {
        console.error('Error getting all vehicles:', error);
        res.status(500).json(createErrorResponse('Error retrieving vehicles'));
    }
}

// Get vehicle statistics for dashboard
async function getVehicleStats(req, res) {
    try {
        const vehicles = vehicleModel.getCSVData();
        const insuranceData = vehicleModel.mockInsuranceData;
        const serviceData = vehicleModel.mockServiceData;
        
        const stats = {
            totalVehicles: vehicles.length,
            totalInsuranceRecords: insuranceData.length,
            totalServiceRecords: serviceData.length,
            states: [...new Set(vehicles.map(v => v.State))].length,
            makes: [...new Set(vehicles.map(v => v.Make))].length,
            recentVerifications: 3, // Mock data
            requireInvestigation: 1  // Mock data
        };
        
        res.json(createSuccessResponse(stats, 'Statistics retrieved successfully'));
        
    } catch (error) {
        console.error('Error getting vehicle stats:', error);
        res.status(500).json(createErrorResponse('Error retrieving statistics'));
    }
}

// Get owner history for a vehicle
async function getOwnerHistory(req, res) {
    try {
        const { vehicleId } = req.query;
        
        if (!vehicleId) {
            return res.status(400).json(createErrorResponse('Vehicle ID is required'));
        }
        
        // Get owner history data
        const ownerData = vehicleModel.getOwnerHistoryData(vehicleId);
        
        if (!ownerData) {
            return res.status(404).json(createErrorResponse('Vehicle owner history not found'));
        }
        
        res.json(createSuccessResponse({
            vehicleId: ownerData.vehicleId,
            ownerName: ownerData.ownerName,
            vehicleInfo: {
                make: ownerData.make,
                model: ownerData.model,
                manufacturingYear: ownerData.manufacturingYear,
                vehicleType: ownerData.vehicleType,
                fuelType: ownerData.fuelType,
                color: ownerData.color
            },
            registrationDetails: {
                state: ownerData.registrationState,
                expiryDate: ownerData.registrationExpiry
            },
            insuranceDetails: {
                expiryDate: ownerData.insuranceExpiry
            },
            technicalDetails: {
                engineNumber: ownerData.engineNumber,
                chassisNumber: ownerData.chassisNumber
            }
        }, 'Owner history retrieved successfully'));
        
    } catch (error) {
        console.error('Error getting owner history:', error);
        res.status(500).json(createErrorResponse('Error retrieving owner history'));
    }
}

module.exports = {
    searchVehicles,
    getVehicleDetails,
    verifyMileage,
    getAllVehicles,
    getVehicleStats,
    getOwnerHistory
};
