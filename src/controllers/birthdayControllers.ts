import { Response, Request } from "express";
import { number } from "joi";
import { connectionDB } from "../database/db.js";
import birthSchema from "../models/userBirthSchema.js";
import { UserBirth, UserData } from "../protocolls/protocol.js";
import { birthRepository } from "../repositories/birthRepository.js";




export async function registerBirthday(req: Request, res: Response) {

    const datas = req.body as UserData;

    try{

        const addBirth = await birthRepository.postBirth(datas);

        const {error} = birthSchema.validate(datas);

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }

        if(!addBirth.rows){
            res.sendStatus(409)
            return
        }

        res.sendStatus(201);

    }catch(err){
        res.status(400).send(err.message);
    }

    
}


 export async function checkBirthdays(req: Request, res: Response) {
    
    try{

        const showBirth = await birthRepository.getBirth();


        res.status(200).send(showBirth.rows);

    }catch(err){
        res.status(400).send(err.message);
    }

}

 export async function deleteBirthday(req: Request, res: Response) {

    const {id} = req.params;
    
    const idInteger = parseInt(id);

    try{

        /* const birthExists = await birthRepository.getBirthById(idInteger);

        if(!birthExists.rows){
            res.sendStatus(404)
            return
        }
        console.log(birthExists.rows) */
        const deleteBirth = await birthRepository.deleteBirth(idInteger);

    
        console.log(deleteBirth.rows);
        

        res.sendStatus(200)

    }catch(err){
        res.status(400).send(err.message);
    }    
}

export async function updateBirth (req: Request, res: Response) {

    const {id} = req.params;
    
    const idInteger = parseInt(id);

    try{
        
        const atualzationMonth = await birthRepository.updateMonth(idInteger);

        res.sendStatus(200)

    }catch(err){
        res.status(400).send(err.message);
    }    

   
    
} 

export async function birthPerMonth(req: Request, res: Response) {

    const {month} = req.params;
    
    try{

        const showBirth = await birthRepository.personPerMonth(month);


        res.status(200).send(showBirth.rows);

    }catch(err){
        res.status(400).send(err.message);
    }

}