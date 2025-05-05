'use client';

import { useEffect, useState } from 'react';
import { fetchHotels } from './actions/fetch-hotels';

export default function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [location, setLocation] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);

  const loadHotels = async () => {
    try {
      const data = await fetchHotels();
      setHotels(data || []);
      filterHotels(data || [], location);
    } catch (err) {
      console.error(err);
    }
  };

  const filterHotels = (hotelsData, searched) => {
    const term = searched.toLowerCase().trim();
    if (!term) {
      setFilteredHotels(hotelsData);
    } else {
      const filtered = hotelsData.filter(hotel =>
        hotel.location?.toLowerCase().includes(term)
      );
      setFilteredHotels(filtered);
    }
  };

  useEffect(() => {
    loadHotels();
  }, []);

  useEffect(() => {
    filterHotels(hotels, location);
  }, [location, hotels]);

  return (
    <>
      <nav>
        <h1 className="title">🏨 HotelHub</h1>
      </nav>

      <main>
        <section>
          <h2>Browse Hotels</h2>

          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Search by location..."
          />

          <ul className="card-list">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => {
                const availableCount = hotel.rooms?.filter(r => r.available).length || 0;
                return (
                  <li key={hotel.id}>
                    <img src={hotel.image} alt={hotel.name} />
                    <div>
                      <h3>{hotel.name}</h3>
                      <p><strong>Location:</strong> {hotel.location}</p>
                      <p><strong>Available Rooms:</strong> {availableCount}</p>
                      <a href={`/hotels/${hotel.id}`}>View Rooms</a>
                    </div>
                  </li>
                );
              })
            ) : (
              <p></p>
            )}
          </ul>
        </section>
      </main>
    </>
  );
}
