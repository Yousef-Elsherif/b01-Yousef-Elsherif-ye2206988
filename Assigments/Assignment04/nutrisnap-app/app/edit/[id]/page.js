"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditMealPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function fetchMeal() {
      const res = await fetch(`/api/meals/${id}`);
      if (res.ok) {
        const meal = await res.json();
        setForm({
          title: meal.title,
          tags: meal.tags.join(", "),
          calories: meal.calories,
          description: meal.description,
          satisfaction: meal.satisfaction,
          image: meal.image || "",
        });
      } else {
        alert("Meal not found");
        router.push("/");
      }
    }
    fetchMeal();
  }, [id, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = form.tags.split(",").map((tag) => tag.trim());

    const updatedMeal = {
      title: form.title,
      tags: tagsArray,
      calories: Number(form.calories),
      description: form.description,
      satisfaction: Number(form.satisfaction),
      image: form.image,
      date: new Date().toISOString(),
      userId: 1,
    };

    const res = await fetch(`/api/meals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMeal),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to update meal!");
    }
  };

  if (!form) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <nav className="flex gap-4 mb-8">
        <a href="/">Home</a>
        <a href="/add">Add Meal</a>
        <a href="/summary">Summary</a>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Edit Meal</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md mx-auto">
        <input type="text" name="title" placeholder="Meal Title" required className="border p-2 rounded" value={form.title} onChange={handleChange} />
        <input type="text" name="tags" placeholder="Tags (comma separated)" className="border p-2 rounded" value={form.tags} onChange={handleChange} />
        <input type="number" name="calories" placeholder="Calories" className="border p-2 rounded" value={form.calories} onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="border p-2 rounded" value={form.description} onChange={handleChange}></textarea>
        <input type="number" name="satisfaction" placeholder="Satisfaction (1-5)" min="1" max="5" className="border p-2 rounded" value={form.satisfaction} onChange={handleChange} />
        <input type="url" name="image" placeholder="Image URL" className="border p-2 rounded" value={form.image} onChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update Meal</button>
      </form>
    </div>
  );
}
