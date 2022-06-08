import { createTable, insert, dropTable } from "../db/utils"
import { fetchAllItems } from '../db/fetchAll'

describe('Item Service', () => {
  beforeAll(async () => {
    // here we're doing some table setup stuff so that we can perform assertions later
    // this is basically like running a fixture
    await createTable('items')
    await insert('items', 'steering wheel', 62.59)
    await insert('items', 'windshield wiper', 23.39)
  })

  // this resets our environment variable so the next test doesn't fail due to bad db connection
  afterEach(() => {
    process.env.UNHAPPY = 'false';
  })

  afterAll(async () => {
    await dropTable('items')
  })

  describe('fetchAllItems', () => {
    it('should fetch all items from items table', async () => {
      const items = await fetchAllItems()
      expect(items.rows).toStrictEqual([
        { id: 1, name: 'steering wheel', price: '62.59' },
        { id: 2, name: 'windshield wiper', price: '23.39' }
      ])
    })

    // this tests the error path
    it('should catch error if database is down', async () => {
      process.env.UNHAPPY = 'true';
      let isError = false;

      // Custom try/catch that ensures the presence of an error is tested. I am unable to test with the typical .toThrow() functionality, hence the unusual pattern here
      try {
        await fetchAllItems();
      } catch (error) {
        // This line will only be called if there is an 
        isError = true
      } finally {
        expect(isError).toBe(true)
      }
    })
  })
});