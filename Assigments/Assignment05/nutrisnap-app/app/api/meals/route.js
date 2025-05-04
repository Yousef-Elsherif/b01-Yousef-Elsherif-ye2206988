// /api/meals/route.js
import { getMeals, addMeal } from "@/lib/meals";

export async function GET() {
  try {
    const meals = await getMeals();

    if (!meals || !Array.isArray(meals)) {
      console.error("Invalid meals data from Prisma");
      return new Response(JSON.stringify({ error: "No meals found" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(meals), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("GET /api/meals error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
export async function POST(request) {
  try {
    const meal = await request.json();

    if (
      !meal.title ||
      !Array.isArray(meal.tags) ||
      isNaN(meal.calories) ||
      meal.satisfaction == null
    ) {
      return Response.json({ error: "Invalid meal data" }, { status: 400 });
    }

    const newMeal = await addMeal({
      ...meal,
      userId: 1,
      date: new Date().toISOString(),
    });

    return Response.json(newMeal, { status: 201 });
  } catch (err) {
    console.error("POST /api/meals error:", err);
    return Response.json({ error: "Failed to add meal" }, { status: 500 });
  }
}


