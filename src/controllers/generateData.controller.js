import { petsService, usersService } from "../services/index.js";
import { mockPets } from "../utils/mockPets.js";
import { mockingUsers } from "../utils/mockUsers.js";
 export default class GenerateDataController {
    static async  generateAndUploadData(users, pets){
        const usersArray = await mockingUsers(users);
        const petsArray = mockPets(pets);
      

        for (const user of usersArray) {
           await usersService.create(user)
        }
         for (const pet of petsArray) {
           await petsService.create(pet)
        }
    }
}
