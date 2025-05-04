import { getMealsByTag } from "@/lib/meals";

export async function GET(_, { params }) {
  const { tag } = params;
  const meals = await getMealsByTag(tag);
  return Response.json(meals);
}
