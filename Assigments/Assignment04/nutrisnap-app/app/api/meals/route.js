import { readMeals, writeMeals } from "@/lib/meals";

export async function GET() {
  const meals = await readMeals();
  return Response.json(meals);
}

export async function POST(request) {
  const meal = await request.json();
  if (
    !meal.title || !Array.isArray(meal.tags) || !meal.calories ||
    !meal.satisfaction
  ) {
    return Response.json({ error: "Invalid meal data" }, { status: 400 });
  }

  const meals = await readMeals();
  const newMeal = {
    id: Date.now(),
    userId: 1,
    ...meal,
    date: new Date().toISOString(),
  };
  meals.push(newMeal);
  await writeMeals(meals);
  return Response.json(newMeal, { status: 201 });
}
