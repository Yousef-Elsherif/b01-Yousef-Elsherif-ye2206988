import { readMeals } from "@/lib/meals";

export async function GET() {
  try {
    const meals = await readMeals();
    const summary = {};

    meals.forEach(meal => {
      if (!meal.tags) return; 

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

  } catch (error) {
    console.error("Error processing meals summary:", error);
    return Response.json({ error: "An error occurred while fetching the summary." }, { status: 500 });
  }
}
