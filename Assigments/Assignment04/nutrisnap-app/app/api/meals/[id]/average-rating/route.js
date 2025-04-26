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

// GET /api/meals/:id/average-rating
export async function GET(request, { params }) {
  const { id } = params;
  const meals = await readMeals();

  const meal = meals.find((m) => m.id == id);

  if (!meal) {
    return NextResponse.json({ error: 'Meal not found' }, { status: 404 });
  }

  if (!meal.ratings || meal.ratings.length === 0) {
    return NextResponse.json({ error: 'No ratings yet' }, { status: 404 });
  }

  const total = meal.ratings.reduce((sum, rating) => sum + rating, 0);
  const average = total / meal.ratings.length;

  return NextResponse.json({ averageRating: average.toFixed(2) });
}
