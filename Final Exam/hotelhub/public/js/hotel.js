
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

function renderRooms(hotelId) {
  const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
  const list = document.getElementById("room-list");
  list.innerHTML = "";
  rooms
    .filter(room => room.hotelId === hotelId)
    .forEach(room => {
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${room.photo}" alt="Room ${room.roomNumber}" />
        <div>
          <h3>Room ${room.roomNumber}</h3>
          <p>Capacity: ${room.capacity}, Price: $${room.price}</p>
          <button class="${room.available ? '' : 'release'}" onclick="toggleAvailability('${room.id}')">
            ${room.available ? 'Book' : 'Release'}
          </button>
        </div>
      `;
      list.appendChild(li);
    });
}

function toggleAvailability(id) {
  let rooms = JSON.parse(localStorage.getItem("rooms")) || [];
  rooms = rooms.map(r => {
    if (r.id === id) r.available = !r.available;
    return r;
  });
  localStorage.setItem("rooms", JSON.stringify(rooms));
  renderRooms(getQueryParam("hotelId"));
}

document.addEventListener("DOMContentLoaded", () => {
  renderRooms(getQueryParam("hotelId"));
});
