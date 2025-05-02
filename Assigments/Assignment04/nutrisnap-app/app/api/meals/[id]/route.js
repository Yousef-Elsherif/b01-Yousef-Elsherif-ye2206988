import { readMeals, writeMeals } from "@/lib/meals";

export async function GET(_, { params }) {
  const meals = await readMeals();
  const meal = meals.find(m => m.id == params.id);
  return meal
    ? Response.json(meal)
    : Response.json({ error: "Meal not found" }, { status: 404 });
}

export async function PUT(request, { params }) {
  const meals = await readMeals();
  const index = meals.findIndex(m => m.id == params.id);
  if (index === -1) return Response.json({ error: "Meal not found" }, { status: 404 });

  const updated = await request.json();
  meals[index] = { ...meals[index], ...updated };
  await writeMeals(meals);
  return Response.json(meals[index]);
}

export async function DELETE(_, { params }) {
  const meals = await readMeals();
  const newMeals = meals.filter(m => m.id != params.id);
  if (newMeals.length === meals.length)
    return Response.json({ error: "Meal not found" }, { status: 404 });

  await writeMeals(newMeals);
  return Response.json({ message: "Deleted" });
}
