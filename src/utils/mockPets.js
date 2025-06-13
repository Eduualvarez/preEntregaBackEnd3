import { faker } from "@faker-js/faker";

export const mockPets = (pid) => {
  
    
  const pets = [];

  for (let i = 0; i < pid; i += 1) {
    const specie = i % 2 == 0 ? faker.animal.cat() : faker.animal.dog();

    const petData = {
      name: faker.person.firstName(),
      specie: specie,
      birthDate: faker.date.birthdate({ mode: "year", min: 1995, max: 2005 }),
    };

    pets.push(petData);
  } //for

  return pets;
}; //funcion
