import { readMeals } from "@/lib/meals";

export async function GET(_, { params }) {
  const { tag } = params;
  const meals = await readMeals();
  const filtered = meals.filter(meal => meal.tags.includes(tag));
  return Response.json(filtered);
}
