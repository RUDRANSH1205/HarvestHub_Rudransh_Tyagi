import { apiRequest, getCurrentUserId, mockDelay, USE_MOCK_DATA } from './config'
import {
  mockCrops,
  mockEquipment,
  mockExpenses,
  mockFarms,
  mockFields,
  mockMaintenance,
  mockOperations,
  mockRotations,
  mockUsers,
  mockYields,
} from '../mock-data'
import { loadMock, saveMock } from './mock-store'

/*
  Mock "database" used while USE_MOCK_DATA is true, kept separately for each user
  and saved in the browser, so logging in again with the same email shows the same data.
  Only the demo account starts with sample data; new accounts start empty.
*/
const DEMO_USER_ID = mockUsers[0].id

function createEmptyDb() {
  return {
    farms: [],
    fields: [],
    crops: [],
    rotations: [],
    operations: [],
    expenses: [],
    yields: [],
    equipment: [],
    maintenance: [],
  }
}

const demoDb = {
    farms: mockFarms,
    fields: mockFields,
    crops: mockCrops,
    rotations: mockRotations,
    operations: mockOperations,
    expenses: mockExpenses,
    yields: mockYields,
    equipment: mockEquipment,
  maintenance: mockMaintenance,
}

function getUserId() {
  return getCurrentUserId() || 'guest'
}

function getUserDb() {
  const userId = getUserId()
  const fallback = userId === DEMO_USER_ID ? demoDb : createEmptyDb()
  return { ...createEmptyDb(), ...loadMock(`db_${userId}`, fallback) }
}

function saveUserDb(db) {
  saveMock(`db_${getUserId()}`, db)
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}

/**
 * Creates the standard CRUD functions for one REST resource.
 *
 *   GET    /api/{resource}        -> getAll()
 *   GET    /api/{resource}/{id}   -> getById(id)
 *   POST   /api/{resource}        -> create(data)
 *   PUT    /api/{resource}/{id}   -> update(id, data)
 *   DELETE /api/{resource}/{id}   -> remove(id)
 */
function createService(collection, endpoint) {
  return {
    async getAll() {
      if (!USE_MOCK_DATA) return apiRequest(endpoint)
      await mockDelay()
      return getUserDb()[collection]
    },

    async getById(id) {
      if (!USE_MOCK_DATA) return apiRequest(`${endpoint}/${id}`)
      await mockDelay()
      return getUserDb()[collection].find((item) => item.id === id) || null
    },

    async create(data) {
      if (!USE_MOCK_DATA) return apiRequest(endpoint, { method: 'POST', body: data })
      await mockDelay()
      const db = getUserDb()
      const newItem = { ...data, id: createId(collection) }
      db[collection] = [...db[collection], newItem]
      saveUserDb(db)
      return newItem
    },

    async update(id, data) {
      if (!USE_MOCK_DATA) return apiRequest(`${endpoint}/${id}`, { method: 'PUT', body: data })
      await mockDelay()
      const db = getUserDb()
      db[collection] = db[collection].map((item) => (item.id === id ? { ...item, ...data, id } : item))
      saveUserDb(db)
      return db[collection].find((item) => item.id === id)
    },

    async remove(id) {
      if (!USE_MOCK_DATA) return apiRequest(`${endpoint}/${id}`, { method: 'DELETE' })
      await mockDelay()
      const db = getUserDb()
      db[collection] = db[collection].filter((item) => item.id !== id)
      saveUserDb(db)
      return null
    },
  }
}

// ---- Placeholder Spring Boot endpoints ----
export const farmService = createService('farms', '/api/farms')
export const fieldService = createService('fields', '/api/fields')
export const cropService = createService('crops', '/api/crops')
export const rotationService = createService('rotations', '/api/rotations')
export const operationService = createService('operations', '/api/operations')
export const expenseService = createService('expenses', '/api/expenses')
export const yieldService = createService('yields', '/api/yields')
export const equipmentService = createService('equipment', '/api/equipment')
export const maintenanceService = createService('maintenance', '/api/maintenance')

// Lookup table used by the useCollection() hook
export const services = {
  farms: farmService,
  fields: fieldService,
  crops: cropService,
  rotations: rotationService,
  operations: operationService,
  expenses: expenseService,
  yields: yieldService,
  equipment: equipmentService,
  maintenance: maintenanceService,
}
