"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [meals, setMeals] = useState([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchMeals() {
      const res = await fetch("/api/meals");
      const data = await res.json();
      setMeals(data);
    }
    fetchMeals();
  }, []);

  const filteredMeals = meals.filter(meal =>
    meal.title.toLowerCase().includes(searchText.toLowerCase())
  );

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this meal?")) return;

    const res = await fetch(`/api/meals/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setMeals(prevMeals => prevMeals.filter(meal => meal.id !== id));
    } else {
      alert("Failed to delete meal!");
    }
  }

  return (
    <div className="container">
      <nav>
        <Link href="/">Home</Link>
        <Link href="/add">Add Meal</Link>
        <Link href="/summary">Summary</Link>
      </nav>

      <h1>NutriSnap - Smart Meal Tracker</h1>

      <input
        type="text"
        id="search"
        placeholder="Search meals..."
        className="search-box"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div id="meals-list" className="meals-list">
        {filteredMeals.map((meal) => (
          <div key={meal.id} className="card">
            <img
              src={meal.image || "https://via.placeholder.com/150"}
              alt={meal.title}
              className="meal-img"
            />
            <div className="card-content">
              <h3>{meal.title}</h3>
              <p><strong>Date:</strong> {new Date(meal.date).toLocaleString()}</p>
              <p><strong>Tags:</strong> {meal.tags.join(", ")}</p>
              <p><strong>Calories:</strong> {meal.calories} kcal</p>
              <p><strong>Satisfaction:</strong> {"⭐".repeat(meal.satisfaction)}</p>
              <details>
                <summary>Show Description</summary>
                <p>{meal.description}</p>
              </details>
              <div className="actions-btns">
                <Link href={`/edit/${meal.id}`} className="edit-btn">✏️ Edit</Link>
                <button onClick={() => handleDelete(meal.id)} className="delete-btn">🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer>NutriSnap © 2025. Built with 💚 for Health & Simplicity.</footer>
    </div>
  );
}
