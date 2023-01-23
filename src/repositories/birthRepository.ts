import { QueryResult } from "pg";
import { connectionDB } from "../database/db.js";
import { UserBirth, UserData } from "../protocolls/protocol.js";


async function postBirth (datas: UserData) :Promise<QueryResult<UserData>>{
    return connectionDB.query(`
    INSERT INTO users (name, cpf, "birth-month", age) 
    VALUES ($1, $2, $3, $4);`, [datas.name, datas.cpf, datas.birthMonth, datas.age])
}

async function getBirth () :Promise<QueryResult<UserData>> {
    return connectionDB.query(`
    SELECT* FROM users;`)
}

async function getBirthById(id:number) :Promise<QueryResult<UserData>>{
    return connectionDB.query(`SELECT * FROM users WHERE id = $1`, [id])
}

async function deleteBirth(id:number):Promise<QueryResult<UserData>> {

    return connectionDB.query(`
    DELETE FROM "users" WHERE id = $1`, [id]
    )
}

async function  updateMonth(id:number) {

    const todayBirth = await connectionDB.query(`
    SELECT * FROM users WHERE id = $1`, [id]);

    console.log(todayBirth.rows[0].age)

    const birthToday =  connectionDB.query(`
    UPDATE "users" SET "age" = $1 WHERE id = $2;
    `, [todayBirth.rows[0].age +1, id])
}

async function personPerMonth(month:string):Promise<QueryResult<UserData>> {

    return connectionDB.query(`
    SELECT COUNT ("birth-month") AS "birthdays per month" FROM users WHERE "birth-month" = $1`,
    [month]);
}




export const birthRepository = {
    postBirth, 
    getBirth,
    deleteBirth,
    getBirthById,
    updateMonth,
    personPerMonth
}