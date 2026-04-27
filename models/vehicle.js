const fs = require('fs');
const path = require('path');

// Mock data for India nationwide vehicle system
const mockInsuranceData = [
    {
        id: 1,
        vehicleId: 'MH01AB1234',
        mileage: 45000,
        lastUpdated: '2024-01-15',
        company: 'ICICI Lombard Insurance',
        rto: 'Mumbai RTO'
    },
    {
        id: 2,
        vehicleId: 'DL02CD5678',
        mileage: 32000,
        lastUpdated: '2024-02-20',
        company: 'HDFC Ergo Insurance',
        rto: 'Delhi RTO'
    },
    {
        id: 3,
        vehicleId: 'KA03EF9012',
        mileage: 67000,
        lastUpdated: '2024-03-10',
        company: 'Bajaj Allianz Insurance',
        rto: 'Bangalore RTO'
    },
    {
        id: 4,
        vehicleId: 'TN04GH3456',
        mileage: 89000,
        lastUpdated: '2024-01-25',
        company: 'Royal Sundaram Insurance',
        rto: 'Chennai RTO'
    },
    {
        id: 5,
        vehicleId: 'GJ05IJ7890',
        mileage: 54000,
        lastUpdated: '2024-02-15',
        company: 'Reliance General Insurance',
        rto: 'Ahmedabad RTO'
    },
    {
        id: 6,
        vehicleId: 'AP13L5733',
        mileage: 108000,
        lastUpdated: '2024-03-01',
        company: 'New India Assurance',
        rto: 'Andhra Pradesh RTO'
    },
    {
        id: 7,
        vehicleId: 'RJ06KL1234',
        mileage: 78000,
        lastUpdated: '2024-02-28',
        company: 'United India Insurance',
        rto: 'Jaipur RTO'
    },
    {
        id: 8,
        vehicleId: 'WB07MN5678',
        mileage: 41000,
        lastUpdated: '2024-03-05',
        company: 'National Insurance Company',
        rto: 'Kolkata RTO'
    },
    {
        id: 9,
        vehicleId: 'UP08OP9012',
        mileage: 92000,
        lastUpdated: '2024-01-18',
        company: 'Oriental Insurance Company',
        rto: 'Lucknow RTO'
    },
    {
        id: 10,
        vehicleId: 'PB09QR3456',
        mileage: 63000,
        lastUpdated: '2024-02-22',
        company: 'The New India Assurance',
        rto: 'Patiala RTO'
    },
    {
        id: 11,
        vehicleId: 'HR10ST7890',
        mileage: 35000,
        lastUpdated: '2024-03-08',
        company: 'Bajaj Allianz General Insurance',
        rto: 'Chandigarh RTO'
    },
    {
        id: 12,
        vehicleId: 'CT11UV1234',
        mileage: 86000,
        lastUpdated: '2024-01-12',
        company: 'ICICI Lombard General Insurance',
        rto: 'Chhattisgarh RTO'
    },
    {
        id: 13,
        vehicleId: 'OR12WX5678',
        mileage: 58000,
        lastUpdated: '2024-02-18',
        company: 'HDFC Ergo General Insurance',
        rto: 'Bhubaneswar RTO'
    },
    {
        id: 14,
        vehicleId: 'JH13YZ9012',
        mileage: 72000,
        lastUpdated: '2024-03-02',
        company: 'Reliance General Insurance',
        rto: 'Ranchi RTO'
    },
    {
        id: 15,
        vehicleId: 'AS14AB3456',
        mileage: 49000,
        lastUpdated: '2024-01-28',
        company: 'Royal Sundaram General Insurance',
        rto: 'Guwahati RTO'
    },
    {
        id: 16,
        vehicleId: 'ML15CD7890',
        mileage: 81000,
        lastUpdated: '2024-02-25',
        company: 'United India Insurance Company',
        rto: 'Shillong RTO'
    },
    {
        id: 17,
        vehicleId: 'GJ16EF1234',
        mileage: 37000,
        lastUpdated: '2024-03-06',
        company: 'National Insurance Company Limited',
        rto: 'Gandhinagar RTO'
    },
    {
        id: 18,
        vehicleId: 'KA17GH5678',
        mileage: 95000,
        lastUpdated: '2024-01-20',
        company: 'Oriental Insurance Company Limited',
        rto: 'Mysore RTO'
    },
    {
        id: 19,
        vehicleId: 'TN18IJ9012',
        mileage: 68000,
        lastUpdated: '2024-02-14',
        company: 'The New India Assurance Company Limited',
        rto: 'Coimbatore RTO'
    },
    {
        id: 20,
        vehicleId: 'MH19KL3456',
        mileage: 43000,
        lastUpdated: '2024-03-03',
        company: 'Bajaj Allianz Insurance Company Limited',
        rto: 'Pune RTO'
    },
    {
        id: 21,
        vehicleId: 'AP13AE4397',
        mileage: 35000,
        lastUpdated: '2024-02-20',
        company: 'HDFC Ergo General Insurance',
        rto: 'Andhra Pradesh RTO'
    },
    {
        id: 22,
        vehicleId: 'TS08HQ7117',
        mileage: 42000,
        lastUpdated: '2024-03-10',
        company: 'ICICI Lombard General Insurance',
        rto: 'Telangana RTO'
    },
    {
        id: 23,
        vehicleId: 'TG13E7117',
        mileage: 38000,
        lastUpdated: '2024-01-25',
        company: 'Reliance General Insurance',
        rto: 'Telangana RTO'
    }
];

const mockServiceData = [
    {
        id: 1,
        vehicleId: 'MH01AB1234',
        serviceDate: '2024-01-10',
        mileage: 44900,
        serviceType: 'Regular Maintenance',
        serviceCenter: 'AutoCare Mumbai',
        cost: 2500
    },
    {
        id: 2,
        vehicleId: 'MH01AB1234',
        serviceDate: '2023-11-15',
        mileage: 42000,
        serviceType: 'Oil Change',
        serviceCenter: 'AutoCare Mumbai',
        cost: 1500
    },
    {
        id: 3,
        vehicleId: 'DL02CD5678',
        serviceDate: '2024-02-15',
        mileage: 31900,
        serviceType: 'Tire Replacement',
        serviceCenter: 'QuickService Delhi',
        cost: 8000
    },
    {
        id: 4,
        vehicleId: 'KA03EF9012',
        serviceDate: '2024-03-05',
        mileage: 66800,
        serviceType: 'Brake Service',
        serviceCenter: 'Bangalore Auto Works',
        cost: 3500
    },
    {
        id: 5,
        vehicleId: 'TN04GH3456',
        serviceDate: '2024-01-20',
        mileage: 88900,
        serviceType: 'Regular Maintenance',
        serviceCenter: 'Chennai Service Center',
        cost: 2800
    },
    {
        id: 6,
        vehicleId: 'GJ05IJ7890',
        serviceDate: '2024-02-10',
        mileage: 53900,
        serviceType: 'Oil Change',
        serviceCenter: 'Ahmedabad Auto Care',
        cost: 1800
    },
    {
        id: 7,
        vehicleId: 'AP13L5733',
        serviceDate: '2024-02-25',
        mileage: 107800,
        serviceType: 'Major Service',
        serviceCenter: 'Vijayawada Service Center',
        cost: 12000
    },
    {
        id: 8,
        vehicleId: 'RJ06KL1234',
        serviceDate: '2024-02-20',
        mileage: 77900,
        serviceType: 'Clutch Replacement',
        serviceCenter: 'Jaipur Auto Garage',
        cost: 15000
    },
    {
        id: 9,
        vehicleId: 'RJ06KL1234',
        serviceDate: '2023-12-10',
        mileage: 75000,
        serviceType: 'Regular Maintenance',
        serviceCenter: 'Jaipur Auto Garage',
        cost: 3000
    },
    {
        id: 10,
        vehicleId: 'WB07MN5678',
        serviceDate: '2024-03-01',
        mileage: 40900,
        serviceType: 'Battery Replacement',
        serviceCenter: 'Kolkata Auto Center',
        cost: 4500
    },
    {
        id: 11,
        vehicleId: 'UP08OP9012',
        serviceDate: '2024-01-15',
        mileage: 91800,
        serviceType: 'Suspension Repair',
        serviceCenter: 'Lucknow Motor Works',
        cost: 8500
    },
    {
        id: 12,
        vehicleId: 'UP08OP9012',
        serviceDate: '2023-10-20',
        mileage: 88000,
        serviceType: 'Brake Overhaul',
        serviceCenter: 'Lucknow Motor Works',
        cost: 6000
    },
    {
        id: 13,
        vehicleId: 'PB09QR3456',
        serviceDate: '2024-02-18',
        mileage: 62800,
        serviceType: 'Engine Tune-up',
        serviceCenter: 'Patiala Service Hub',
        cost: 3500
    },
    {
        id: 14,
        vehicleId: 'HR10ST7890',
        serviceDate: '2024-03-05',
        mileage: 34800,
        serviceType: 'Regular Maintenance',
        serviceCenter: 'Chandigarh Auto Care',
        cost: 2200
    },
    {
        id: 15,
        vehicleId: 'CT11UV1234',
        serviceDate: '2024-01-08',
        mileage: 85800,
        serviceType: 'Transmission Service',
        serviceCenter: 'Raipur Auto Works',
        cost: 9000
    },
    {
        id: 16,
        vehicleId: 'OR12WX5678',
        serviceDate: '2024-02-15',
        mileage: 57800,
        serviceType: 'Air Conditioning Service',
        serviceCenter: 'Bhubaneswar Auto Center',
        cost: 2500
    },
    {
        id: 17,
        vehicleId: 'JH13YZ9012',
        serviceDate: '2024-02-28',
        mileage: 71800,
        serviceType: 'Wheel Alignment',
        serviceCenter: 'Ranchi Motor Garage',
        cost: 1200
    },
    {
        id: 18,
        vehicleId: 'AS14AB3456',
        serviceDate: '2024-01-25',
        mileage: 48800,
        serviceType: 'Oil Change',
        serviceCenter: 'Guwahati Service Station',
        cost: 1600
    },
    {
        id: 19,
        vehicleId: 'ML15CD7890',
        serviceDate: '2024-02-20',
        mileage: 80800,
        serviceType: 'Major Service',
        serviceCenter: 'Shillong Auto Works',
        cost: 11000
    },
    {
        id: 20,
        vehicleId: 'GJ16EF1234',
        serviceDate: '2024-03-04',
        mileage: 36800,
        serviceType: 'Tire Rotation',
        serviceCenter: 'Gandhinagar Auto Care',
        cost: 800
    },
    {
        id: 21,
        vehicleId: 'KA17GH5678',
        serviceDate: '2024-01-18',
        mileage: 94800,
        serviceType: 'Engine Repair',
        serviceCenter: 'Mysore Motor Works',
        cost: 18000
    },
    {
        id: 22,
        vehicleId: 'TN18IJ9012',
        serviceDate: '2024-02-12',
        mileage: 67800,
        serviceType: 'Regular Maintenance',
        serviceCenter: 'Coimbatore Service Center',
        cost: 3200
    },
    {
        id: 20,
        vehicleId: 'MH19KL3456',
        serviceDate: '2024-03-01',
        mileage: 42800,
        serviceType: 'Brake Service',
        serviceCenter: 'Pune Auto Garage',
        cost: 2800
    },
    {
        id: 21,
        vehicleId: 'AP13AE4397',
        serviceDate: '2024-02-20',
        mileage: 35000,
        serviceType: 'Regular Maintenance',
        serviceCenter: 'Hyderabad Auto Care',
        cost: 2500
    },
    {
        id: 22,
        vehicleId: 'AP13AE4397',
        serviceDate: '2023-12-15',
        mileage: 32000,
        serviceType: 'Oil Change',
        serviceCenter: 'Hyderabad Auto Care',
        cost: 1500
    },
    {
        id: 23,
        vehicleId: 'TS08HQ7117',
        serviceDate: '2024-03-10',
        mileage: 42000,
        serviceType: 'Tire Replacement',
        serviceCenter: 'Hyderabad Service Center',
        cost: 7500
    },
    {
        id: 24,
        vehicleId: 'TG13E7117',
        serviceDate: '2024-01-25',
        mileage: 38000,
        serviceType: 'Battery Replacement',
        serviceCenter: 'Warangal Auto Works',
        cost: 4200
    },
    {
        id: 25,
        vehicleId: 'TG13E7117',
        serviceDate: '2023-11-10',
        mileage: 35000,
        serviceType: 'Wheel Alignment',
        serviceCenter: 'Warangal Auto Works',
        cost: 1000
    }
];

// Read CSV data
function readCSVData(filePath) {
    try {
        const csvPath = path.join(__dirname, '..', filePath);
        const data = fs.readFileSync(csvPath, 'utf8');
        const lines = data.split('\n').filter(line => line.trim());
        
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
    } catch (error) {
        console.error('Error reading CSV:', error);
        return [];
    }
}

// Get insurance data by vehicle ID
function getInsuranceData(vehicleId) {
    return mockInsuranceData.find(data => data.vehicleId.toUpperCase() === vehicleId.toUpperCase());
}

// Get service data by vehicle ID
function getServiceData(vehicleId) {
    return mockServiceData.filter(data => data.vehicleId.toUpperCase() === vehicleId.toUpperCase());
}

// Get all CSV data
function getCSVData() {
    return readCSVData('India_Vehicle_Database.csv');
}

// Search vehicles in CSV
function searchVehicles(searchTerm) {
    const csvData = getCSVData();
    if (!searchTerm) return csvData.slice(0, 10); // Return first 10 if no search term
    
    const term = searchTerm.toUpperCase();
    return csvData.filter(vehicle => 
        vehicle['Vehicle ID']?.toUpperCase().includes(term) ||
        vehicle['State']?.toUpperCase().includes(term) ||
        vehicle['RTO']?.toUpperCase().includes(term) ||
        vehicle['Make']?.toUpperCase().includes(term) ||
        vehicle['Model']?.toUpperCase().includes(term)
    );
}

// Get vehicle by ID from CSV
function getVehicleById(vehicleId) {
    const csvData = getCSVData();
    return csvData.find(vehicle => vehicle['Vehicle ID']?.toUpperCase() === vehicleId.toUpperCase());
}

// Get owner history data for vehicles
function getOwnerHistoryData(vehicleId) {
    const ownerHistoryDatabase = [
        {
            vehicleId: 'MH01AB1234',
            ownerName: 'Rajesh Kumar',
            manufacturingYear: 2018,
            registrationState: 'Maharashtra',
            registrationExpiry: '2025-03-15',
            insuranceExpiry: '2024-12-31',
            vehicleType: 'Car',
            make: 'Maruti Suzuki',
            model: 'Swift Dzire',
            fuelType: 'Petrol',
            color: 'White',
            engineNumber: 'G13B123456',
            chassisNumber: 'MA3EFD12345678901'
        },
        {
            vehicleId: 'DL02CD5678',
            ownerName: 'Priya Sharma',
            manufacturingYear: 2019,
            registrationState: 'Delhi',
            registrationExpiry: '2026-01-20',
            insuranceExpiry: '2025-02-28',
            vehicleType: 'Car',
            make: 'Hyundai',
            model: 'i20',
            fuelType: 'Diesel',
            color: 'Silver',
            engineNumber: 'G4LD789012',
            chassisNumber: 'MALNH56789012345'
        },
        {
            vehicleId: 'KA03EF9012',
            ownerName: 'Amit Reddy',
            manufacturingYear: 2020,
            registrationState: 'Karnataka',
            registrationExpiry: '2025-08-10',
            insuranceExpiry: '2024-11-30',
            vehicleType: 'SUV',
            make: 'Mahindra',
            model: 'XUV500',
            fuelType: 'Diesel',
            color: 'Black',
            engineNumber: 'Mhawk345678',
            chassisNumber: 'MA1XYZ98765432109'
        },
        {
            vehicleId: 'TN04GH3456',
            ownerName: 'Lakshmi Narayanan',
            manufacturingYear: 2017,
            registrationState: 'Tamil Nadu',
            registrationExpiry: '2024-12-25',
            insuranceExpiry: '2024-09-15',
            vehicleType: 'Car',
            make: 'Tata',
            model: 'Nexon',
            fuelType: 'Petrol',
            color: 'Blue',
            engineNumber: 'REVOTRON901234',
            chassisNumber: 'MATCQR12345678901'
        },
        {
            vehicleId: 'GJ05IJ7890',
            ownerName: 'Rakesh Patel',
            manufacturingYear: 2021,
            registrationState: 'Gujarat',
            registrationExpiry: '2027-03-22',
            insuranceExpiry: '2025-06-30',
            vehicleType: 'Car',
            make: 'Honda',
            model: 'City',
            fuelType: 'Petrol',
            color: 'Gray',
            engineNumber: 'I-VTEC567890',
            chassisNumber: 'MAHJKL23456789012'
        },
        {
            vehicleId: 'AP13L5733',
            ownerName: 'John Smith',
            manufacturingYear: 2007,
            registrationState: 'Andhra Pradesh',
            registrationExpiry: '2025-06-15',
            insuranceExpiry: '2024-08-31',
            vehicleType: 'Car',
            make: 'Toyota',
            model: 'Innova',
            fuelType: 'Diesel',
            color: 'White',
            engineNumber: '2KDFTV123456',
            chassisNumber: 'MHTNK12345678901'
        },
        {
            vehicleId: 'RJ06KL1234',
            ownerName: 'Vikram Singh',
            manufacturingYear: 2019,
            registrationState: 'Rajasthan',
            registrationExpiry: '2026-05-10',
            insuranceExpiry: '2025-04-20',
            vehicleType: 'SUV',
            make: 'Ford',
            model: 'Ecosport',
            fuelType: 'Diesel',
            color: 'Red',
            engineNumber: 'DRAGON789012',
            chassisNumber: 'MA1PQR34567890123'
        },
        {
            vehicleId: 'WB07MN5678',
            ownerName: 'Anjali Banerjee',
            manufacturingYear: 2020,
            registrationState: 'West Bengal',
            registrationExpiry: '2026-08-25',
            insuranceExpiry: '2025-03-15',
            vehicleType: 'Car',
            make: 'Maruti Suzuki',
            model: 'Baleno',
            fuelType: 'Petrol',
            color: 'Blue',
            engineNumber: 'K12C345678',
            chassisNumber: 'MA3STU56789012345'
        },
        {
            vehicleId: 'UP08OP9012',
            ownerName: 'Rahul Verma',
            manufacturingYear: 2018,
            registrationState: 'Uttar Pradesh',
            registrationExpiry: '2025-09-30',
            insuranceExpiry: '2024-10-20',
            vehicleType: 'Car',
            make: 'Hyundai',
            model: 'Creta',
            fuelType: 'Diesel',
            color: 'Brown',
            engineNumber: 'U2CRDi890123',
            chassisNumber: 'MALVWX78901234567'
        },
        {
            vehicleId: 'PB09QR3456',
            ownerName: 'Gurpreet Kaur',
            manufacturingYear: 2021,
            registrationState: 'Punjab',
            registrationExpiry: '2027-02-14',
            insuranceExpiry: '2025-08-10',
            vehicleType: 'Car',
            make: 'Kia',
            model: 'Seltos',
            fuelType: 'Petrol',
            color: 'White',
            engineNumber: 'G4LD234567',
            chassisNumber: 'MA1YZA12345678901'
        },
        {
            vehicleId: 'HR10ST7890',
            ownerName: 'Ankit Sharma',
            manufacturingYear: 2022,
            registrationState: 'Haryana',
            registrationExpiry: '2028-01-20',
            insuranceExpiry: '2025-12-25',
            vehicleType: 'SUV',
            make: 'Tata',
            model: 'Harrier',
            fuelType: 'Diesel',
            color: 'Black',
            engineNumber: '2.0KRYPTEC456789',
            chassisNumber: 'MATCDE23456789012'
        },
        {
            vehicleId: 'CT11UV1234',
            ownerName: 'Prakash Rao',
            manufacturingYear: 2019,
            registrationState: 'Chhattisgarh',
            registrationExpiry: '2026-06-18',
            insuranceExpiry: '2025-01-30',
            vehicleType: 'Car',
            make: 'Mahindra',
            model: 'Thar',
            fuelType: 'Diesel',
            color: 'Red',
            engineNumber: 'MHAWK1234567',
            chassisNumber: 'MA1FGH34567890123'
        },
        {
            vehicleId: 'OR12WX5678',
            ownerName: 'Sabyasachi Mishra',
            manufacturingYear: 2020,
            registrationState: 'Odisha',
            registrationExpiry: '2026-11-05',
            insuranceExpiry: '2025-05-18',
            vehicleType: 'Car',
            make: 'Honda',
            model: 'WR-V',
            fuelType: 'Diesel',
            color: 'Gray',
            engineNumber: 'I-DTEC5678901',
            chassisNumber: 'MAHIJK45678901234'
        },
        {
            vehicleId: 'JH13YZ9012',
            ownerName: 'Kumar Ravi',
            manufacturingYear: 2018,
            registrationState: 'Jharkhand',
            registrationExpiry: '2025-07-22',
            insuranceExpiry: '2024-11-10',
            vehicleType: 'Car',
            make: 'Maruti Suzuki',
            model: 'Vitara Brezza',
            fuelType: 'Diesel',
            color: 'White',
            engineNumber: 'D13A1234567',
            chassisNumber: 'MA3LMN89012345678'
        },
        {
            vehicleId: 'AS14AB3456',
            ownerName: 'Bhabesh Kalita',
            manufacturingYear: 2021,
            registrationState: 'Assam',
            registrationExpiry: '2027-04-08',
            insuranceExpiry: '2025-09-25',
            vehicleType: 'SUV',
            make: 'Toyota',
            model: 'Fortuner',
            fuelType: 'Diesel',
            color: 'Silver',
            engineNumber: '2GDFTV8901234',
            chassisNumber: 'MHTOPQ56789012345'
        },
        {
            vehicleId: 'ML15CD7890',
            ownerName: 'Lalnunmawia',
            manufacturingYear: 2019,
            registrationState: 'Meghalaya',
            registrationExpiry: '2026-03-15',
            insuranceExpiry: '2025-02-20',
            vehicleType: 'Car',
            make: 'Hyundai',
            model: 'Venue',
            fuelType: 'Petrol',
            color: 'Blue',
            engineNumber: 'G4FA2345678',
            chassisNumber: 'MALRST12345678901'
        },
        {
            vehicleId: 'GJ16EF1234',
            ownerName: 'Nitin Mehta',
            manufacturingYear: 2022,
            registrationState: 'Gujarat',
            registrationExpiry: '2028-06-30',
            insuranceExpiry: '2026-01-15',
            vehicleType: 'Car',
            make: 'Tata',
            model: 'Punch',
            fuelType: 'Petrol',
            color: 'Yellow',
            engineNumber: 'REVOTRON1234567',
            chassisNumber: 'MATUVW34567890123'
        },
        {
            vehicleId: 'KA17GH5678',
            ownerName: 'Deepika Rao',
            manufacturingYear: 2017,
            registrationState: 'Karnataka',
            registrationExpiry: '2025-09-10',
            insuranceExpiry: '2024-12-31',
            vehicleType: 'SUV',
            make: 'Jeep',
            model: 'Compass',
            fuelType: 'Diesel',
            color: 'Green',
            engineNumber: 'MULTIJET5678901',
            chassisNumber: 'MA1CDE45678901234'
        },
        {
            vehicleId: 'TN18IJ9012',
            ownerName: 'Mohan Kumar',
            manufacturingYear: 2020,
            registrationState: 'Tamil Nadu',
            registrationExpiry: '2026-12-20',
            insuranceExpiry: '2025-07-18',
            vehicleType: 'Car',
            make: 'Renault',
            model: 'Kiger',
            fuelType: 'Petrol',
            color: 'White',
            engineNumber: 'H4K12345678',
            chassisNumber: 'MA1EFG67890123456'
        },
        {
            vehicleId: 'MH19KL3456',
            ownerName: 'Sanjay Patil',
            manufacturingYear: 2021,
            registrationState: 'Maharashtra',
            registrationExpiry: '2027-08-25',
            insuranceExpiry: '2025-10-30',
            vehicleType: 'SUV',
            make: 'MG',
            model: 'Hector',
            fuelType: 'Diesel',
            color: 'Black',
            engineNumber: 'DDI234567890',
            chassisNumber: 'MA1HIJ78901234567'
        },
        {
            vehicleId: 'AP13AE4397',
            ownerName: 'Srinivas Reddy',
            manufacturingYear: 2019,
            registrationState: 'Andhra Pradesh',
            registrationExpiry: '2026-04-20',
            insuranceExpiry: '2025-03-15',
            vehicleType: 'Car',
            make: 'Hyundai',
            model: 'Venue',
            fuelType: 'Petrol',
            color: 'White',
            engineNumber: 'G4FA987654321',
            chassisNumber: 'MALXYZ12345678901'
        },
        {
            vehicleId: 'TS08HQ7117',
            ownerName: 'Ramesh Kumar',
            manufacturingYear: 2020,
            registrationState: 'Telangana',
            registrationExpiry: '2026-08-15',
            insuranceExpiry: '2025-06-30',
            vehicleType: 'SUV',
            make: 'Kia',
            model: 'Seltos',
            fuelType: 'Diesel',
            color: 'Gray',
            engineNumber: 'U2CRDi123456789',
            chassisNumber: 'MA1ABC98765432109'
        },
        {
            vehicleId: 'TG13E7117',
            ownerName: 'Anand Sharma',
            manufacturingYear: 2018,
            registrationState: 'Telangana',
            registrationExpiry: '2025-11-30',
            insuranceExpiry: '2024-12-25',
            vehicleType: 'Car',
            make: 'Maruti Suzuki',
            model: 'Baleno',
            fuelType: 'Petrol',
            color: 'Blue',
            engineNumber: 'K12C123456789',
            chassisNumber: 'MA3DEF98765432101'
        }
    ];
    
    if (!vehicleId) {
        return ownerHistoryDatabase;
    }
    
    return ownerHistoryDatabase.find(owner => owner.vehicleId.toUpperCase() === vehicleId.toUpperCase());
}

module.exports = {
    getInsuranceData,
    getServiceData,
    getCSVData,
    searchVehicles,
    getVehicleById,
    getOwnerHistoryData,
    mockInsuranceData,
    mockServiceData
};
