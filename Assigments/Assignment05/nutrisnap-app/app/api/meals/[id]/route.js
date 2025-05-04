// /api/meals/[id]/route.js
import { getMeal, updateMeal, deleteMeal } from '@/lib/meals';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const id = Number(params.id);
  const meal = await getMeal(id);
  return meal
    ? Response.json(meal)
    : Response.json({ error: "Meal not found" }, { status: 404 });
}

export async function PUT(request, { params }) {
  const data = await request.json();

  const updated = await prisma.meal.update({
    where: { id: Number(params.id) },
    data: {
      ...data,
      tags: {
        set: [], // clear existing
        connectOrCreate: data.tags.map(name => ({
          where: { name },
          create: { name }
        }))
      }
    }
  });

  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  try {
    await deleteMeal(Number(params.id));
    return Response.json({ message: "Deleted" });
  } catch (error) {
    return Response.json({ error: "Meal not found" }, { status: 404 });
  }
}

