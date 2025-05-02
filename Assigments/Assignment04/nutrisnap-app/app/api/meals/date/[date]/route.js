import { readMeals } from "@/lib/meals";

export async function GET(_, { params }) {
  const { date } = params;
  const meals = await readMeals();
  const filtered = meals.filter(meal => meal.date.startsWith(date));
  return Response.json(filtered);
}
