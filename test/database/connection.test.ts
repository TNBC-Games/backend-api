import db from '../../src/helpers/database';

describe('Database', () => {
  test('Test connection', async () => {
    await db.connect();
  });
});