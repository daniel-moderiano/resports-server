"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../db/utils");
const items_service_1 = require("../db/items-service");
require("./dbSetupTeardown");
describe('Item Service', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // here we're doing some table setup stuff so that we can perform assertions later
        // this is basically like running a fixture
        yield (0, utils_1.createTable)('items');
        yield (0, utils_1.insert)('items', 'steering wheel', 62.59);
        yield (0, utils_1.insert)('items', 'windshield wiper', 23.39);
    }));
    // this resets our environment variable so the next test doesn't fail due to bad db connection
    afterEach(() => {
        process.env.TEST_ERROR = 'false';
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, utils_1.dropTable)('items');
    }));
    describe('fetchAllItems', () => {
        it('should fetch all items from items table', () => __awaiter(void 0, void 0, void 0, function* () {
            const items = yield (0, items_service_1.fetchAllItems)();
            expect(items.rows).toStrictEqual([
                { id: 1, name: 'steering wheel', price: '62.59' },
                { id: 2, name: 'windshield wiper', price: '23.39' }
            ]);
        }));
        // this tests the error path
        it('should catch error if database is down', () => __awaiter(void 0, void 0, void 0, function* () {
            process.env.TEST_ERROR = 'true';
            let isError = false;
            // Custom try/catch that ensures the presence of an error is tested. I am unable to test with the typical .toThrow() functionality, hence the unusual pattern here
            try {
                yield (0, items_service_1.fetchAllItems)();
            }
            catch (error) {
                // This line will only be called if there is an 
                isError = true;
            }
            finally {
                expect(isError).toBe(true);
            }
        }));
    });
    describe('fetchAllItems', () => {
        it('should return item names in upper case from items table', () => __awaiter(void 0, void 0, void 0, function* () {
            const items = yield (0, items_service_1.fetchItemNames)();
            expect(items).toEqual([
                'STEERING WHEEL',
                'WINDSHIELD WIPER'
            ]);
        }));
        // this tests the error path
        it('should catch error if database is down', () => __awaiter(void 0, void 0, void 0, function* () {
            process.env.TEST_ERROR = 'true';
            let isError = false;
            try {
                yield (0, items_service_1.fetchAllItems)();
            }
            catch (error) {
                isError = true;
            }
            finally {
                expect(isError).toBe(true);
            }
        }));
    });
});
