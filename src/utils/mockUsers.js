import { createHash } from "./index.js";
import { faker } from "@faker-js/faker";

export const  mockingUsers = async(userId)=>{
          
            const numberOfUsers = ( parseInt(userId))
                ?userId
                :50;
            const users=[];
            const password_encrypted = await  createHash("coder123") ;
            for (let i = 0; i < numberOfUsers; i+=1) {
               const gender =  (i%2==0)?"male":"female";
                const role = (i%25==(1))?"admin":"user";
                    const mockUser = {
                        first_name:faker.person.firstName(gender),
                        last_name:faker.person.lastName(gender),
                        role:role,
                        email: faker.internet.exampleEmail(),
                        password:password_encrypted,
                        pets:[]
                    };//mockUser
                
                 users.push(mockUser)
            }//for
            return users
        }//function