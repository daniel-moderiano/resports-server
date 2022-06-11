"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Base path /api/users
router.get('/', (req, res) => {
    res.send('User route');
});
router.get('/login', (req, res) => {
    res.send('Protected login route');
});
router.post('/logout', (req, res) => {
    res.send('Logout route');
});
router.post('/register', (req, res) => {
    res.send('Register route');
});
// router.route('/:userId')
//   .get(protectRoute, getUser)
//   .delete(protectRoute, deleteUser)
//   .put(protectRoute, updateUser);
exports.default = router;
