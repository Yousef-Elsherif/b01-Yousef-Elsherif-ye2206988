"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddMealPage() {
  const router = useRouter();
  const [meal, setMeal] = useState({
    title: "",
    tags: "",
    calories: "",
    description: "",
    satisfaction: "",
    image: "",
  });

  const handleChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = meal.tags.split(",").map(tag => tag.trim());

    const newMeal = {
      title: meal.title,
      tags: tagsArray,
      calories: Number(meal.calories),
      description: meal.description,
      satisfaction: Number(meal.satisfaction),
      image: meal.image,
      date: new Date().toISOString(),
      userId: 1,
    };

    const res = await fetch("/api/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMeal),
    });

    if (res.ok) {
      alert("Meal saved successfully!");
      router.push("/");
    } else {
      alert("Failed to save meal!");
    }
  };

  return (
    <div className="container">
      <nav>
        <Link href="/">Home</Link>
        <Link href="/add">Add Meal</Link>
        <Link href="/summary">Summary</Link>
      </nav>

      <h1 id="page-title">Add New Meal</h1>

      <form id="meal-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Meal Title"
          required
          value={meal.title}
          onChange={handleChange}
        />
        <input
          type="text"
          id="tags"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={meal.tags}
          onChange={handleChange}
        />
        <input
          type="number"
          id="calories"
          name="calories"
          placeholder="Calories"
          value={meal.calories}
          onChange={handleChange}
        />
        <textarea
          id="description"
          name="description"
          placeholder="Meal Description"
          value={meal.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="number"
          id="satisfaction"
          name="satisfaction"
          placeholder="Satisfaction (1-5)"
          min="1"
          max="5"
          value={meal.satisfaction}
          onChange={handleChange}
        />
        <input
          type="url"
          id="image"
          name="image"
          placeholder="Image URL"
          value={meal.image}
          onChange={handleChange}
        />
        <button type="submit">Save Meal</button>
      </form>

      <footer>NutriSnap © 2025</footer>
    </div>
  );
}
