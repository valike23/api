import Crypt from "cryptr";
import { Knex } from "../database/db";
import { key } from "../public";


const crypt = new  Crypt(key);
export class Admin {
    email: string ='';
    name: string = '';
    password: string = '';
   
    constructor(email: string, password: string, name: string= ''){
        this.email = email;
        this.name = name;
        this.password = password
    }

    
    async login(): Promise< any>{
        console.log(this.password, this.email);
      const user = await Knex("users").where({email: this.email}).select('*');
      if(user == null) return  JSON.stringify({data:{}, msg: 'email  does not exist', status: 503});
      console.log(user);
      if(this.password != user[0].password)return JSON.stringify({data:{}, msg: ' password does not exist', status: 503});
     const token = crypt.encrypt(JSON.stringify(user));
     return JSON.stringify({
        data: {
            token, user, role: 'admin'
        },
        msg: 'successful', status: 200
     })

    }
    async register(): Promise< any>{
    try {
        const user = await Knex("users").insert({email: this.email,
            password: this.password, name: this.name}).select('*');
          console.log(user);
         return JSON.stringify({
            data: {
                 user,
                 role: 'admin'
            },
            msg: 'successful', status: 200
         })
    } catch (error) {
        console.log(error);
    }

    }
}