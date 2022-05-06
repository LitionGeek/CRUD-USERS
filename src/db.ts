import { createConnection } from "typeorm";
import { Users } from "./entities/Users";

export const connectDB = async ()=>{
    await createConnection({
        type:"mysql",
        username:"LitionGeek",
        password:"mason123",
        port:3306,
        host:"localhost",
        database:"userdb",
        entities:[Users],
        synchronize:false,
        ssl:false
    })
}