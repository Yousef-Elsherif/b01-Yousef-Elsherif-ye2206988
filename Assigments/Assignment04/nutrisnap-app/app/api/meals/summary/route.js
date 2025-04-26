import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const mealsPath = path.join(process.cwd(), 'data', 'meals.json');

async function readMeals() {
  try {
    const data = await readFile(mealsPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// GET /api/meals/summary
export async function GET() {
  const meals = await readMeals();
  const summary = {};

  meals.forEach(meal => {
    if (meal.tags) {
      meal.tags.forEach(tag => {
        if (!summary[tag]) {
          summary[tag] = { count: 0, totalSatisfaction: 0, ratingsCount: 0 };
        }
        summary[tag].count++;
        if (meal.ratings) {
          summary[tag].totalSatisfaction += meal.ratings.reduce((a, b) => a + b, 0);
          summary[tag].ratingsCount += meal.ratings.length;
        } else if (meal.satisfaction) {
          summary[tag].totalSatisfaction += meal.satisfaction;
          summary[tag].ratingsCount++;
        }
      });
    }
  });

  // calculate average satisfaction per tag
  const result = {};

  for (const tag in summary) {
    const tagInfo = summary[tag];
    result[tag] = {
      totalMeals: tagInfo.count,
      averageSatisfaction: tagInfo.ratingsCount > 0
        ? (tagInfo.totalSatisfaction / tagInfo.ratingsCount).toFixed(2)
        : 'No ratings'
    };
  }

  return NextResponse.json(result);
}
