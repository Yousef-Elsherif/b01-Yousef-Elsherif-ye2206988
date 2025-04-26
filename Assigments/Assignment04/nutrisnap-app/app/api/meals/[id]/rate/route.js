import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
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

async function saveMeals(meals) {
  await writeFile(mealsPath, JSON.stringify(meals, null, 2));
}

// POST /api/meals/:id/rate
export async function POST(request, { params }) {
  const { id } = params;
  const { rating } = await request.json();
  const meals = await readMeals();

  const meal = meals.find((m) => m.id == id);

  if (!meal) {
    return NextResponse.json({ error: 'Meal not found' }, { status: 404 });
  }

  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Invalid rating (must be 1–5)' }, { status: 400 });
  }

  // Create ratings array if not exist
  if (!meal.ratings) {
    meal.ratings = [];
  }

  meal.ratings.push(rating);

  await saveMeals(meals);

  return NextResponse.json({ message: 'Rating added successfully', meal });
}
