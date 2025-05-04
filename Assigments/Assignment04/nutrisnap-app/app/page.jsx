'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MealsPage() {
  const router = useRouter();
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState([]);

  // Function to fetch meals and extract unique tags
  const fetchMeals = async () => {
    let url = '/api/meals';
    if (tag) url = `/api/meals/tag/${tag}`;
    else if (date) url = `/api/meals/date/${date}`;
    
    const res = await fetch(url);
    const data = await res.json();
    setMeals(data);

    // Extract unique tags from meals
    const allTags = new Set();
    data.forEach(meal => {
      meal.tags.forEach(t => allTags.add(t));
    });
    setTags(Array.from(allTags));  // Convert Set to Array
  };

  useEffect(() => {
    fetchMeals();
  }, [tag, date]);

  const filtered = meals.filter(meal =>
    meal.title.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting meals by date (ascending or descending)
  const sortMealsByDate = (order) => {
    const sortedMeals = [...meals].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setMeals(sortedMeals);
  };

  return (
    <>
      <nav>
        <a href="/">Home</a>
        <a href="/">Meals</a>
        <a href="/add">Add Meal</a>
        <a href="/summary">Summary</a>
      </nav>

      <div className="container">
        <h1>🍽️ Your Meals</h1>
      
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-box"
        />

        {/* Tag Filter Dropdown */}
        <div>
          <select onChange={e => setTag(e.target.value)} value={tag} className="filter-dropdown">
            <option value="">Select Tag</option>
            {tags.length === 0 ? (
              <option value="">No tags available</option>
            ) : (
              tags.map((tagName, index) => (
                <option key={index} value={tagName}>{tagName}</option>
              ))
            )}
          </select>
        </div>

        {/* Date Filter Input */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="search-box"
          />
          <button 
            onClick={() => sortMealsByDate('asc')}
            className="date-filter-btn"
          >
            Sort by Date (Ascending)
          </button>
          <button 
            onClick={() => sortMealsByDate('desc')}
            className="date-filter-btn"
          >
            Sort by Date (Descending)
          </button>
          <button 
            onClick={() => {
              setDate('');
              fetchMeals(); // Reset the filter
            }}
            className="reset-filter-btn"
          >
            Reset Filters
          </button>
        </div>

        <div id="meals-list">
          {filtered.map(meal => (
            <div key={meal.id} className="card">
              <img
                src={meal.image || 'https://via.placeholder.com/150'}
                alt={meal.title}
                className="meal-img"
              />
              <div className="card-content">
                <h3>{meal.title}</h3>
                <p><strong>Date:</strong> {new Date(meal.date).toLocaleString()}</p>
                <p><strong>Tags:</strong> {meal.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}</p>
                <p><strong>Calories:</strong> {meal.calories} kcal</p>
                <p><strong>Satisfaction:</strong> <span className="stars">{'⭐'.repeat(meal.satisfaction)}</span></p>
                <button onClick={(e) => {
                  const desc = e.target.nextElementSibling;
                  desc.classList.toggle("hidden");
                  e.target.textContent = desc.classList.contains("hidden") ? "Show Description" : "Hide Description";
                }} >
                  Show Description
                </button>
                <p className="description hidden">{meal.description}</p>
                <div className="action-btns">
                  <button className="edit-btn" onClick={() => router.push(`/edit/${meal.id}`)}>✏️ Edit</button>
                  <button
                    className="delete-btn"
                    onClick={async () => {
                      if (!confirm(`Are you sure you want to delete "${meal.title}"?`)) return;
                      const res = await fetch(`/api/meals/${meal.id}`, { method: 'DELETE' });
                      if (res.ok) setMeals(prev => prev.filter(m => m.id !== meal.id));
                      else alert('Failed to delete meal');
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer>NutriSnap © 2025. Built with 💚 for Health & Simplicity.</footer>
    </>
  );
}
