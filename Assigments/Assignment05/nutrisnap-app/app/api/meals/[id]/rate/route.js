import { readMeals, writeMeals } from "@/lib/meals";

export async function POST(request, { params }) {
  const { id } = params;
  const { rating } = await request.json();

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return Response.json({ error: "Rating must be a number from 1 to 5." }, { status: 400 });
  }

  const meals = await readMeals();
  const meal = meals.find(m => m.id == id);
  if (!meal) return Response.json({ error: "Meal not found" }, { status: 404 });

  meal.ratings = meal.ratings || [];
  meal.ratings.push(rating);

  const avg = meal.ratings.reduce((a, b) => a + b, 0) / meal.ratings.length;
  meal.satisfaction = Math.round(avg);

  await writeMeals(meals);
  return Response.json({ message: "Rating added", average: avg.toFixed(2) });
}
