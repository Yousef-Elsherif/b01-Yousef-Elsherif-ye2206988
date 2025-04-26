"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SummaryPage() {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    async function fetchSummary() {
      const res = await fetch("/api/meals/summary");
      if (res.ok) {
        const data = await res.json();
        setSummary(data);
      } else {
        console.error("Failed to fetch summary data");
      }
    }
    fetchSummary();
  }, []);

  return (
    <div className="container">
      <nav>
        <Link href="/">Home</Link>
        <Link href="/add">Add Meal</Link>
        <Link href="/summary">Summary</Link>
      </nav>

      <h1>Meal Summary</h1>
      <p>Summary of meals grouped by tags.</p>

      <table className="summary-table">
        <thead>
          <tr>
            <th>Tag</th>
            <th>Total Meals</th>
            <th>Avg Satisfaction</th>
          </tr>
        </thead>
        <tbody id="summary-body">
          {Object.entries(summary).map(([tag, data]) => (
            <tr key={tag}>
              <td>#{tag}</td>
              <td>{data.totalMeals}</td>
              <td>⭐ {data.averageSatisfaction}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer>NutriSnap © 2025</footer>
    </div>
  );
}
