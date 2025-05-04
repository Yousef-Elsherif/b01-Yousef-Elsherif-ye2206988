import { readMeals } from "@/lib/meals";

export async function GET() {
  const meals = await readMeals();
  const summary = {};

  meals.forEach(meal => {
    meal.tags.forEach(tag => {
      if (!summary[tag]) summary[tag] = { count: 0, total: 0 };
      summary[tag].count++;
      summary[tag].total += meal.satisfaction || 0;
    });
  });

  const result = Object.entries(summary).map(([tag, data]) => ({
    tag,
    totalMeals: data.count,
    averageSatisfaction: (data.total / data.count).toFixed(2)
  }));

  return Response.json(result);
}
