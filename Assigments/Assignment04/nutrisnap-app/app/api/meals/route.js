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

// GET /api/meals
export async function GET() {
  const meals = await readMeals();
  return NextResponse.json(meals);
}

// POST /api/meals
export async function POST(req) {
  const newMeal = await req.json();
  const meals = await readMeals();
  newMeal.id = Date.now().toString();
  meals.push(newMeal);
  await saveMeals(meals);
  return NextResponse.json(newMeal, { status: 201 });
}
