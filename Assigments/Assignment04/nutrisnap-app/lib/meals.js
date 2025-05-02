import fs from 'fs-extra';
import path from 'path';

// Path to meals.json file
const filePath = path.join(process.cwd(), 'data', 'meals.json');

// Read all meals from the file
export async function readMeals() {
  const exists = await fs.pathExists(filePath);
  if (!exists) return [];
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
}

// Write (save) updated meals array back to the file
export async function writeMeals(meals) {
  await fs.writeFile(filePath, JSON.stringify(meals, null, 2));
}
