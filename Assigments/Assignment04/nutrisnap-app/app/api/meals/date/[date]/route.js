import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const mealsPath = path.join(process.cwd(), 'data', 'meals.json');

async function readMeals() {
  try {
    const data = await readFile(mealsPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// GET /api/meals/date/:date
export async function GET(request, { params }) {
  const { date } = params;
  const meals = await readMeals();
  
  const filtered = meals.filter((meal) => {
    if (!meal.date) return false;

    const mealDate = meal.date.split('T')[0]; // get 'YYYY-MM-DD'
    return mealDate === date;
  });

  return NextResponse.json(filtered);
}
