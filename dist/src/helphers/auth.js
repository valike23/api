"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const db_1 = require("../database/db");
const public_1 = require("../public");
const crypt = new cryptr_1.default(public_1.key);
class Auth {
    constructor(email, password, name = '') {
        this.email = '';
        this.name = '';
        this.password = '';
        this.email = email;
        this.name = name;
        this.password = password;
    }
    async login() {
        console.log(this.password, this.email);
        const user = await (0, db_1.Knex)("users").where({ email: this.email }).select('*');
        if (user == null)
            return JSON.stringify({ data: {}, msg: 'email  does not exist', status: 503 });
        console.log(user);
        if (this.password != user[0].password)
            return JSON.stringify({ data: {}, msg: ' password does not exist', status: 503 });
        const token = crypt.encrypt(JSON.stringify(user));
        return JSON.stringify({
            data: {
                token, user
            },
            msg: 'successful', status: 200
        });
    }
    async register() {
        try {
            const user = await (0, db_1.Knex)("users").insert({ email: this.email,
                password: this.password, name: this.name }).select('*');
            console.log(user);
            return JSON.stringify({
                data: {
                    user
                },
                msg: 'successful', status: 200
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map