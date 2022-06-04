"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send('Hello');
});
db_1.default.query("DELETE FROM users WHERE id = 1", (err, res) => {
    console.log(err, res);
    db_1.default.end();
});
exports.default = app;
