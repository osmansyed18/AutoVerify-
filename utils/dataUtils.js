// CSV parsing utility
function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim());
    const records = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const record = {};
        
        headers.forEach((header, index) => {
            record[header] = values[index] || '';
        });
        
        records.push(record);
    }
    
    return records;
}

// Data formatting utilities
function formatMileage(mileage) {
    if (!mileage) return '0 kms';
    return `${parseInt(mileage).toLocaleString()} kms`;
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
}

function formatCurrency(amount) {
    if (!amount) return '₹0';
    return `₹${parseInt(amount).toLocaleString('en-IN')}`;
}

// Vehicle validation
function isValidVehicleId(vehicleId) {
    const indianVehiclePattern = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/;
    return indianVehiclePattern.test(vehicleId.toUpperCase());
}

// Search utility
function searchInObject(obj, searchTerm) {
    if (!obj || !searchTerm) return false;
    
    const term = searchTerm.toLowerCase();
    return Object.values(obj).some(value => 
        value && value.toString().toLowerCase().includes(term)
    );
}

// Response formatting
function formatVehicleResponse(vehicle, insuranceData, serviceData) {
    return {
        vehicle: {
            id: vehicle['Vehicle ID'],
            state: vehicle['State'],
            rto: vehicle['RTO'],
            make: vehicle['Make'],
            model: vehicle['Model'],
            year: vehicle['Year'],
            currentMileage: formatMileage(vehicle['Current Mileage']),
            insuranceCompany: vehicle['Insurance Company'],
            lastServiceDate: formatDate(vehicle['Last Service Date']),
            serviceCenter: vehicle['Service Center']
        },
        insurance: insuranceData ? {
            mileage: formatMileage(insuranceData.mileage),
            lastUpdated: formatDate(insuranceData.lastUpdated),
            company: insuranceData.company,
            rto: insuranceData.rto
        } : null,
        service: serviceData.map(service => ({
            date: formatDate(service.serviceDate),
            mileage: formatMileage(service.mileage),
            type: service.serviceType,
            center: service.serviceCenter,
            cost: formatCurrency(service.cost)
        }))
    };
}

// Error handling
function createErrorResponse(message, statusCode = 500) {
    return {
        error: message,
        status: statusCode,
        timestamp: new Date().toISOString()
    };
}

function createSuccessResponse(data, message = 'Success') {
    return {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    };
}

module.exports = {
    parseCSV,
    formatMileage,
    formatDate,
    formatCurrency,
    isValidVehicleId,
    searchInObject,
    formatVehicleResponse,
    createErrorResponse,
    createSuccessResponse
};
