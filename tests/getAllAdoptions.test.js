// tests/adoptionsRoutes.test.js
import request from 'supertest';
import { jest } from '@jest/globals';

process.env.NODE_ENV = 'test';

// Mock de servicios del index.js
 jest.unstable_mockModule('../src/services/index.js', () => ({
  adoptionsService: {
    getAll: jest.fn().mockResolvedValue([{ id: 'a1', pet: 'perro' }]),
    getBy: jest.fn().mockImplementation(({ _id }) =>
      _id === 'valid' ? { _id: 'valid', pet: 'dog' } : null
    ),
    create: jest.fn().mockResolvedValue(true)
  },
  usersService: {
    getUserById: jest.fn().mockImplementation((uid) =>
      uid === 'u1' ? { _id: 'u1', pets: [] } : null
    ),
    update: jest.fn().mockResolvedValue(true)
  },
  petsService: {
    getBy: jest.fn().mockImplementation(({ _id }) => {
      if (_id === 'p1') return { _id: 'p1', adopted: false };
      if (_id === 'p2') return { _id: 'p2', adopted: true };
      return null;
    }),
    update: jest.fn().mockResolvedValue(true)
  }
}));

const appModule = await import('../src/app.js');
const app = appModule.default;

describe('🔁 Rutas de Adopciones', () => {
  describe('GET /api/adoptions', () => {
    it('debe devolver lista de adopciones', async () => {
      const res = await request(app).get('/api/adoptions');//
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 'success',
        payload: [{ id: 'a1', pet: 'perro' }]
      });
    });
  
  });

  describe('GET /api/adoptions/:aid', () => {
    it('debe devolver adopción válida', async () => {
      const res = await request(app).get('/api/adoptions/valid');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 'success',
        payload: { _id: 'valid', pet: 'dog' }
      });
    });

    it('debe devolver 404 si no existe', async () => {
      const res = await request(app).get('/api/adoptions/invalid');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({
        status: 'error',
        error: 'Adoption not found'
      });
    });
  });

  describe('POST /api/adoptions/:uid/:pid', () => {
    it('debe adoptar una mascota correctamente', async () => {
      const res = await request(app).post('/api/adoptions/u1/p1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 'success',
        message: 'Pet adopted'
      });
    });

    it('debe fallar si el usuario no existe', async () => {
      const res = await request(app).post('/api/adoptions/fake/p1');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('user Not found');
    });

    it('debe fallar si la mascota no existe', async () => {
      const res = await request(app).post('/api/adoptions/u1/fakepet');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Pet not found');
    });

    it('debe fallar si la mascota ya fue adoptada', async () => {
      const res = await request(app).post('/api/adoptions/u1/p2');//mascota sin adoptar
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Pet is already adopted');
    });
    
   
  })})