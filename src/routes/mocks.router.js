import { Router } from "express";
import { request, response } from "express";
import { faker } from "@faker-js/faker";

const router = Router();
router.get("/mockingpets/:pid", async (req = request, res = response) => {


    const pid = parseInt(req.params.pid);
    
    const generatePets = (pid)=>{ 
       if (isNaN(pid) || pid <= 0) pid = 5;
        const pets = [];
    
    for (let i = 0; i < pid; i+=1) {
       const specie = (i%2==0)
       ?faker.animal.cat()
       :faker.animal.dog();


       const pet = {
           name:faker.person.firstName(),
           specie:specie,
           birthDate:faker.date.birthdate({ mode: 'year', min: 1995, max: 2005 }),
           owner:''
       }
           pets.push(pet)}//for
          
        return pets
        
        }//funcion
      const pets =  generatePets(pid)
       
  res.send({ mascotas: pets });
});

export default router;
