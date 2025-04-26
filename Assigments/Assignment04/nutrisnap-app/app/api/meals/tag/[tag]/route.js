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

// GET /api/meals/tag/:tag
export async function GET(request, { params }) {
  const { tag } = params;
  const meals = await readMeals();
  const filtered = meals.filter((meal) => 
    meal.tags && meal.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );

  return NextResponse.json(filtered);
}
