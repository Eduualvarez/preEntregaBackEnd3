import { Router } from "express";
import { request, response } from "express";
import GenerateDataController from "../controllers/generateData.controller.js";
import { mockingUsers } from "../utils/mockUsers.js";
import { mockPets } from "../utils/mockPets.js";

const router = Router();
router.get("/mockingpets/:pid?", async (req = request, res = response) => {
  const pid = parseInt(req.params.pid);
  try {
    if (pid <= 0 || isNaN(pid) || !pid) throw new Error;
    const pets = mockPets(pid);
    res.status(200).send({ status: "success", payload: pets });
  } catch (error) {
    console.log(
      `error: \t${error.stack.split("at")[0]}`,
      `method request: \t${req.method}`
    );
    if (error)
      res
        .status(400)
        .send({ error: `proporcione una cantidad de mascotas a generar` });
  } //bloque catch
}); //endpoint GET

router.get("/mockingusers/:uid?", async (req = request, res = response) => {
  try {
    const userId = req.params.uid
    const users = await mockingUsers(userId);
    res.status(200).send({ status: "success", payload: users });
  } catch (error) {
    console.log(`error:${error.stack} \t method:${req.method}`);
    res.status(404).send({ status: "error" });
  }//catch
}); //endpoint GET
router.post("/generateData/:users/:pets",async (req = request, res = response) => {
    try {
        const users = parseInt(req.params.users);
        const pets = parseInt(req.params.pets);
        
        
        await   GenerateDataController.generateAndUploadData(users, pets )
        res.status(201).send({status:"created with success"})
    } catch (error) {
        
        res.status(400).send({status:"error, especificar cantidad de usuarios y mascotas"})
    }
    
})//endpoint POST





export default router;