"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knex = void 0;
const knex_1 = __importDefault(require("knex"));
let { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = process.env;
console.log(MYSQL_HOST, MYSQL_USER);
exports.Knex = (0, knex_1.default)({
    client: 'mysql2',
    connection: {
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD || '',
        database: 'demosysdb'
    }
});
//# sourceMappingURL=db.js.map