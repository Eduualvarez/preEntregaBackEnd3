import { adoptionsService, petsService, usersService } from "../services/index.js";
import logger from "../config/winston.config.js";

const getAllAdoptions = async(req,res)=>{
    const result = await adoptionsService.getAll();
    res.status(200).send({status:"success",payload:result});
    logger.http(`metodo: ${req.method} route /`)
}

const getAdoption = async(req,res)=>{
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({_id:adoptionId})
    if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})&& logger.error('adoption not found')
    logger.error('error adoption not found')
    res.status(200).send({status:"success",payload:adoption})
    logger.http(`metodo: ${req.method} route /:aid`)
}

const createAdoption = async(req,res)=>{
    const {uid,pid} = req.params;
    const user = await usersService.getUserById(uid);
    if(!user) return res.status(404).send({status:"error", error:"user Not found"}) &&  logger.error('user not found')
    const pet = await petsService.getBy({_id:pid});
    if(!pet) return res.status(404).send({status:"error",error:"Pet not found"})&& logger.error('pet not found')
    if(pet.adopted) return res.status(400).send({status:"error",error:"Pet is already adopted"});


    user.pets.push(pet._id);
    await usersService.update(user._id,{pets:user.pets})
    await petsService.update(pet._id,{adopted:true,owner:user._id})
    await adoptionsService.create({owner:user._id,pet:pet._id})
    res.status(200).send({status:"success",message:"Pet adopted"});
    logger.http(`adoption success \trequest method ${req.method} ruote /:uid/:pid`)
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}



