/*
  Sample data used while the Spring Boot backend is not connected.
  The shape of each object should match your MongoDB documents / Java DTOs.
*/

export const mockUsers = [
  {
    id: 'u1',
    fullName: 'Ravi Kumar',
    email: 'demo@gmail.com',
    phone: '9876543210',
    password: 'password123',
  },
]

export const mockFarms = [
  { id: 'farm1', name: 'Green Valley Farm', location: 'Nashik, Maharashtra', totalArea: 45 },
  { id: 'farm2', name: 'Sunrise Acres', location: 'Ludhiana, Punjab', totalArea: 30 },
  { id: 'farm3', name: 'River Bend Farm', location: 'Mysuru, Karnataka', totalArea: 22 },
]

export const mockFields = [
  { id: 'field1', name: 'North Field', farmId: 'farm1', area: 12, soilType: 'Loamy' },
  { id: 'field2', name: 'South Field', farmId: 'farm1', area: 15, soilType: 'Clay' },
  { id: 'field3', name: 'East Plot', farmId: 'farm2', area: 10, soilType: 'Sandy Loam' },
  { id: 'field4', name: 'West Plot', farmId: 'farm2', area: 8, soilType: 'Alluvial' },
  { id: 'field5', name: 'Riverside Field', farmId: 'farm3', area: 9, soilType: 'Black Soil' },
]

export const mockCrops = [
  { id: 'crop1', name: 'Wheat', season: 'Rabi', duration: 120, waterRequirement: 'Medium' },
  { id: 'crop2', name: 'Rice', season: 'Kharif', duration: 150, waterRequirement: 'High' },
  { id: 'crop3', name: 'Potato', season: 'Rabi', duration: 90, waterRequirement: 'Medium' },
  { id: 'crop4', name: 'Chickpea', season: 'Rabi', duration: 100, waterRequirement: 'Low' },
  { id: 'crop5', name: 'Maize', season: 'Kharif', duration: 110, waterRequirement: 'Medium' },
  { id: 'crop6', name: 'Watermelon', season: 'Zaid', duration: 80, waterRequirement: 'High' },
]

export const mockRotations = [
  { id: 'rot1', fieldId: 'field1', year: 2026, season: 'Rabi', cropId: 'crop1' },
  { id: 'rot2', fieldId: 'field1', year: 2027, season: 'Rabi', cropId: 'crop3' },
  { id: 'rot3', fieldId: 'field1', year: 2028, season: 'Rabi', cropId: 'crop4' },
  { id: 'rot4', fieldId: 'field2', year: 2026, season: 'Kharif', cropId: 'crop2' },
  { id: 'rot5', fieldId: 'field2', year: 2027, season: 'Kharif', cropId: 'crop2' },
  { id: 'rot6', fieldId: 'field3', year: 2026, season: 'Kharif', cropId: 'crop5' },
  { id: 'rot7', fieldId: 'field5', year: 2026, season: 'Zaid', cropId: 'crop6' },
]

export const mockOperations = [
  { id: 'op1', fieldId: 'field1', type: 'Ploughing', date: '2026-09-20', notes: 'Deep ploughing before rabi sowing' },
  { id: 'op2', fieldId: 'field1', type: 'Sowing', date: '2026-10-05', notes: 'Sow HD-2967 wheat variety' },
  { id: 'op3', fieldId: 'field2', type: 'Harvesting', date: '2026-10-12', notes: 'Kharif rice harvest' },
  { id: 'op4', fieldId: 'field3', type: 'Irrigation', date: '2026-10-02', notes: 'Drip irrigation – 2 hours' },
  { id: 'op5', fieldId: 'field4', type: 'Fertilization', date: '2026-10-18', notes: 'Apply DAP 50 kg/acre' },
  { id: 'op6', fieldId: 'field5', type: 'Weeding', date: '2026-09-15', notes: 'Manual weeding' },
]

export const mockExpenses = [
  { id: 'exp1', fieldId: 'field1', cropId: 'crop1', category: 'Seeds', amount: 18000, date: '2026-09-10', description: 'Wheat seeds 400 kg' },
  { id: 'exp2', fieldId: 'field1', cropId: 'crop1', category: 'Fertilizer', amount: 12500, date: '2026-09-18', description: 'Urea and DAP' },
  { id: 'exp3', fieldId: 'field2', cropId: 'crop2', category: 'Labour', amount: 22000, date: '2026-08-25', description: 'Transplanting labour' },
  { id: 'exp4', fieldId: 'field3', cropId: 'crop5', category: 'Irrigation', amount: 6500, date: '2026-08-30', description: 'Diesel for pump' },
  { id: 'exp5', fieldId: 'field2', cropId: 'crop2', category: 'Pesticide', amount: 8200, date: '2026-09-05', description: 'Stem borer control' },
]

export const mockYields = [
  { id: 'yld1', fieldId: 'field2', cropId: 'crop2', harvestDate: '2025-11-02', quantity: 360, unit: 'Quintal' },
  { id: 'yld2', fieldId: 'field1', cropId: 'crop1', harvestDate: '2026-04-10', quantity: 210, unit: 'Quintal' },
  { id: 'yld3', fieldId: 'field3', cropId: 'crop5', harvestDate: '2025-10-20', quantity: 150, unit: 'Quintal' },
]

export const mockEquipment = [
  { id: 'eq1', name: 'Mahindra 575 DI', type: 'Tractor', status: 'Active', purchaseDate: '2021-03-15' },
  { id: 'eq2', name: 'Kirloskar 5HP', type: 'Water Pump', status: 'Active', purchaseDate: '2022-06-01' },
  { id: 'eq3', name: 'Preet 987', type: 'Harvester', status: 'Under Maintenance', purchaseDate: '2020-11-20' },
  { id: 'eq4', name: 'Knapsack Sprayer', type: 'Sprayer', status: 'Inactive', purchaseDate: '2019-02-10' },
]

export const mockMaintenance = [
  { id: 'mnt1', equipmentId: 'eq1', maintenanceDate: '2026-07-10', nextMaintenanceDate: '2026-10-10', cost: 4500, description: 'Engine oil & filter change' },
  { id: 'mnt2', equipmentId: 'eq3', maintenanceDate: '2026-09-22', nextMaintenanceDate: '2026-10-05', cost: 12000, description: 'Blade replacement' },
  { id: 'mnt3', equipmentId: 'eq2', maintenanceDate: '2026-05-01', nextMaintenanceDate: '2026-11-01', cost: 1800, description: 'Impeller cleaning' },
  { id: 'mnt4', equipmentId: 'eq1', maintenanceDate: '2026-04-08', nextMaintenanceDate: '2026-07-10', cost: 3900, description: 'Tyre check & greasing' },
]
