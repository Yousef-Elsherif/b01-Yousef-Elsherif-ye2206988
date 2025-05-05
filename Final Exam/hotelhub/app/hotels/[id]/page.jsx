'use client';
import { useEffect, useState } from 'react';
import { getHotelById } from '../../actions/get-hotel-by-id';
import { toggleRoomAvailability } from '../../actions/update-room-status';
import { useParams } from 'next/navigation';

export default function HotelDetailsPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getHotelById(id);
        setHotel(data);
        console.log("Loaded hotel:", data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  const toggleRoom = async (roomId, currentStatus) => {
    try {
      await toggleRoomAvailability(roomId, !currentStatus);
      setHotel((same) => ({
        ...same,
        rooms: same.rooms.map((room) =>
          room.id === roomId ? { ...room, available: !currentStatus } : room
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (!hotel) return <p></p>;

  return (
    <>
      <nav>
        <a href="/">← Back to Hotels</a>
      </nav>

      <main>
        <h2>{hotel.name}</h2>

        <ul className="card-list">
          {hotel.rooms.map((room) => (
            <li key={room.id}>
              <img src={room.photo} alt={`Room ${room.roomNumber}`} />
              <div>
                <h3>Room {room.roomNumber}</h3>
                <p><strong>Capacity:</strong> {room.capacity}</p>
                <p><strong>Price:</strong> ${room.price}</p>
                <p><strong>Status:</strong> {room.available === true? 'Available' : 'Booked'}</p>
                <button
                  className={room.available ? '' : 'release'}
                  onClick={() => toggleRoom(room.id, room.available)}
                >
                  {room.available ? 'Book' : 'Release'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
