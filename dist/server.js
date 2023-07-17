"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This file is separated from app.ts in case app needs to be exported for other reasons (e.g. testing)
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 5000;
app_1.default.listen(port, () => console.log(`Server running on port ${port}`));
