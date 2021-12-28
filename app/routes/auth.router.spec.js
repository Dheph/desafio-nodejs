const server = require('../../server');
const request = require('supertest');
const dbConfig = require('../config/db.config');

const db = require('../models');

describe('Users tests', () => {
  beforeAll(async () => {
    await db.mongoose.connect(dbConfig.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it('should singnin user', async () => {
    const response = await request(server).post('/signin').send({
      name: 'teste@email.com',
      password: '12345',
    });

    expect(response.status).toBe(200);
    expect(response.body.user.id).toBe('61cb6323702393a126cb27e1');
    expect(response.body.user.email).toBe('teste@email.com');
  });
});
