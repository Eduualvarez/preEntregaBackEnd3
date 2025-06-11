import { Router } from "express";
import { request, response } from "express";
import { faker } from "@faker-js/faker";
import Pet from "../dao/Pets.dao.js";
const router = Router();
router.get("/mockingpets/:pid?", async (req = request, res = response) => {

    const pid = parseInt(req.params.pid);
    
try {
     const generatePets = (pid)=>{ 
       if ( pid <= 0 || isNaN(pid)) res.status(400).send({error:`proporcione una cantidad de mascotas a generar`})
      
        const pets = [];
    
    for (let i = 0; i < pid; i+=1) {
       const specie = (i%2==0)
        ?faker.animal.cat()
        :faker.animal.dog();


       const pet = {
            
            name:faker.person.firstName(),
            specie:specie,
            birthDate:faker.date.birthdate({ mode: 'year', min: 1995, max: 2005 }),
           
            

       }
           pets.push(pet)}//for
          
        return pets
        
        }//funcion
      const pets =  generatePets(pid);
      const pet_to_create = new Pet()
     pets.forEach(pet => {
        pet_to_create.save(pet)
     });
     res.status(200).send({status:"success", payload:pets})
     
     } catch (error) {
    console.log( `error: \t${error.stack.split("at")[0]}`,`method request: \t${req.method}`)
}//bloque catch
});//endpoint GET

export default router;
