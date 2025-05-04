import { getMealsByDate } from "@/lib/meals";

export async function GET(_, { params }) {
  const { date } = params;
  const meals = await getMealsByDate(date);
  return Response.json(meals);
}
