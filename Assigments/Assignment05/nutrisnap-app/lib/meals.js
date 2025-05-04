import fs from 'fs-extra';
import path from 'path';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const filePath = path.join(process.cwd(), 'data', 'meals.json');

export async function readMeals() {
  const exists = await fs.pathExists(filePath);
  if (!exists) return [];
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
}

export async function writeMeals(meals) {
  await fs.writeFile(filePath, JSON.stringify(meals, null, 2));
}

export const getMeals = async () => {
  return await prisma.meal.findMany({
    include: {
      tags: true, // 👈 Include tag objects
    },
  });
};

export const getMeal = async (id) => {
  return await prisma.meal.findUnique({
    where: { id },
    include: {
      tags: true, // Include tags for edit page
    }
  });
};


export const addMeal = async (meal) => {
  const tagNames = meal.tags; // ["breakfast", "quick"]
  delete meal.tags; // Remove it from top-level

  return await prisma.meal.create({
    data: {
      ...meal,
      tags: {
        connectOrCreate: tagNames.map(name => ({
          where: { name },
          create: { name }
        }))
      }
    }
  });
};


export const updateMeal = async (id, meal) => {
  return await prisma.meal.update({
    where: { id: Number(id) },
    data: meal
  });
};

export const deleteMeal = async (id) => {
  return await prisma.meal.delete({
    where: { id: Number(id) }
  });
};

export const deleteMeals = async () => {
  return await prisma.meal.deleteMany();
};

export const getMealsByDate = async (date) => {
  return await prisma.meal.findMany({
    where: {
      date: {
        startsWith: date // e.g., "2025-05-05"
      }
    }
  });
};


export const addSatisfaction = async (id, rating) => {
  return await prisma.meal.update({
    where: { id: Number(id) },
    data: { satisfaction: rating }
  });
};

// Get meals by tag
export const getMealsByTag = async (tag) => {
  return await prisma.meal.findMany({
    where: {
      tags: {
        has: tag // works for string[]
      }
    }
  });
};

// Get average tag satisfaction (advanced, placeholder until we know your schema)
export const getAverageTagSatisfaction = async () => {
  // This only works if you have a separate Tag model.
  // Let me know how you store tags.
  return {}; // Placeholder
};

// Get meal summary
export const getMealSummary = async () => {
  const total = await prisma.meal.count();
  const avg = await prisma.meal.aggregate({
    _avg: { satisfaction: true }
  });

  return {
    totalMeals: total,
    averageSatisfaction: avg._avg.satisfaction || 0
  };
};
