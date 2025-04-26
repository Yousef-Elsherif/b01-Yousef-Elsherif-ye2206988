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

// GET /api/meals/:id
export async function GET(request, { params }) {
  const meals = await readMeals();
  const meal = meals.find((m) => m.id === params.id);
  if (meal) {
    return NextResponse.json(meal);
  } else {
    return NextResponse.json({ error: 'Meal not found' }, { status: 404 });
  }
}

// PUT /api/meals/:id
export async function PUT(request, { params }) {
  const meals = await readMeals();
  const index = meals.findIndex((m) => m.id === params.id);

  if (index === -1) {
    return NextResponse.json({ error: 'Meal not found' }, { status: 404 });
  }

  const updatedMeal = await request.json();
  meals[index] = { ...updatedMeal, id: params.id };

  await saveMeals(meals);
  return NextResponse.json(meals[index]);
}

// DELETE /api/meals/:id
// export async function DELETE(request, { params }) {
//   const meals = await readMeals();
//   const newMeals = meals.filter((m) => m.id !== params.id);

//   if (newMeals.length === meals.length) {
//     return NextResponse.json({ error: 'Meal not found' }, { status: 404 });
//   }

//   await saveMeals(newMeals);
//   return NextResponse.json({ message: 'Meal deleted' });
// }

export async function DELETE(request, { params }) {
  const id = params.id;
  const meals = await readMeals();
  const newMeals = meals.filter(m => m.id != id);

  if (newMeals.length === meals.length) {
    return NextResponse.json({ error: 'Meal not found' }, { status: 404 });
  }

  await saveMeals(newMeals);

  return NextResponse.json({ message: 'Meal deleted' });
}

