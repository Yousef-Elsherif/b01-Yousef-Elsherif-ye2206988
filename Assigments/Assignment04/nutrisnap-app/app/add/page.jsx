'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddMealPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    tags: '',
    calories: '',
    description: '',
    satisfaction: '',
    image: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()),
      calories: parseInt(form.calories),
      satisfaction: parseInt(form.satisfaction)
    };

    const res = await fetch('/api/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('Meal saved!');
      router.push('/meals');
    } else {
      alert('Error saving meal');
    }
  };

  return (
    <>
      <nav>
        <a href="/">Home</a>
        <a href="/meals">Meals</a>
        <a href="/meals/add">Add Meal</a>
        <a href="/meals/summary">Summary</a>
      </nav>

      <div className="container">
        <h1>Add New Meal</h1>
        <form onSubmit={handleSubmit}>
          <input id="title" value={form.title} onChange={handleChange} placeholder="Meal Title" required />
          <input id="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma-separated)" />
          <input type="number" id="calories" value={form.calories} onChange={handleChange} placeholder="Calories" required />
          <textarea id="description" value={form.description} onChange={handleChange} placeholder="Meal Description" />
          <input type="number" id="satisfaction" value={form.satisfaction} onChange={handleChange} placeholder="Satisfaction (1-5)" min="1" max="5" required />
          <input id="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
          <button type="submit">Save Meal</button>
        </form>
      </div>

      <footer>NutriSnap © 2025</footer>
    </>
  );
}
