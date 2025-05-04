import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Read the meals.json file
  const mealsData = fs.readFileSync(path.resolve('prisma', 'data', 'meals.json'), 'utf-8'); 
  const meals = JSON.parse(mealsData); // Parse the JSON data into an array

  // Insert each meal into the database
  for (let mealData of meals) {
    await prisma.meal.create({
        data: {
          id: mealData.id,  
          userId: mealData.userId,
          title: mealData.title,
          calories: mealData.calories,
          satisfaction: mealData.satisfaction,
          date: mealData.date, // Directly using the string date
          image: mealData.image,
          description: mealData.description,
          tags: {
            connectOrCreate: mealData.tags.map(tag => ({
              where: { name: tag }, // Connect or create tag by name
              create: { name: tag }
            }))
          }
        }
      });
  }

  console.log('Seeding completed!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
