'use client';
import { useEffect, useState } from 'react';

export default function SummaryPage() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    fetch('/api/meals/summary')
      .then(res => res.json())
      .then(data => setSummary(data));
  }, []);

  return (
    <>
      <nav>
        <a href="/">Home</a>
        <a href="/">Meals</a>
        <a href="/add">Add Meal</a>
        <a href="/summary">Summary</a>
      </nav>

      <div className="container">
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
          <tbody>
            {summary.map(item => (
              <tr key={item.tag}>
                <td>#{item.tag}</td>
                <td>{item.totalMeals}</td>
                <td>⭐ {item.averageSatisfaction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer>NutriSnap © 2025</footer>
    </>
  );
}
