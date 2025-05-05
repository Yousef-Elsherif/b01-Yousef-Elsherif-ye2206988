const HOTEL_API = "https://gist.githubusercontent.com/abdalabaaji/21d1dfd255c59077f15b5990bf596636/raw/884244adc7afa94d536f29042f8b7191c4dbed39/hotels.json";
const ROOM_API = "https://gist.githubusercontent.com/abdalabaaji/21d1dfd255c59077f15b5990bf596636/raw/884244adc7afa94d536f29042f8b7191c4dbed39/rooms.json";

async function fetchInitialData() {
  const hotels = localStorage.getItem("hotels");
  const rooms = localStorage.getItem("rooms");
  if (hotels && rooms) {
    console.log("Data already fetched.");
    return;
  }
  console.log("Checking for cached data...");

  const hotelRes = await fetch(HOTEL_API);
  const roomRes = await fetch(ROOM_API);
  const hotelData = await hotelRes.json();
  const roomData = await roomRes.json();

  localStorage.setItem("hotels", JSON.stringify(hotelData));
  localStorage.setItem("rooms", JSON.stringify(roomData));
}

function createHotelListItem(hotel) {
  return `
    <li>
      <img src="${hotel.image}" alt="${hotel.name}" />
      <div>
        <h3>${hotel.name}</h3>
        <p>📍 ${hotel.location}</p>
        <p>Available Rooms: 🏠 ${countAvailableRooms(hotel.id)}</p>
        <a href="hotel.html?hotelId=${hotel.id}">View Rooms</a>
      </div>
    </li>
  `;
}

function renderHotels(filter = "") {
  const hotels = JSON.parse(localStorage.getItem("hotels")) || [];
  const list = document.getElementById("hotel-list");
  list.innerHTML = "";
  list.innerHTML = hotels
    .filter(h => h.location.toLowerCase().includes(filter.toLowerCase()))
    .map(hotel => createHotelListItem(hotel))
    .join('');
}

function countAvailableRooms(hotelId) {
  const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
  return rooms.filter(room => room.hotelId === hotelId && room.available).length;
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchInitialData();
  renderHotels();

  document.getElementById("search").addEventListener("input", e => {
    renderHotels(e.target.value);
  });
});
