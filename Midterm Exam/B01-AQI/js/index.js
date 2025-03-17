const apiEndPoint = "https://gist.githubusercontent.com/abdalabaaji/7088a1a2cf70747aec4b29212dbe075f/raw/5dbb5522240dd0816170b6f8098b1a698febe750/aqi";

const aqiList = document.querySelector('#aqi-list');
const searchByName = document.querySelector('#city-input');

function renderCards(caps) {
    aqiList.innerHTML = caps.map(cap => `
        <div class="container">
            <div class="aqi-card">
                <div class="card-header">
                    <h2 class="city">${cap.capital_city}</h2>
                    <span class="aqi-value">AQI: ${cap.aqi}</span>
                    <button class="delete-btn" onClick="deleteAQI('${cap.capital_city}')">×</button>
                </div>
                <div class="card-body">
                    <div class="details">
                        <p><strong>Country:</strong> ${cap.country}</p>
                        <p><strong>Measurement Time:</strong> ${cap.measurement_time}</p>
                        <p><strong>Data Source:</strong> ${cap.data_source}</p>
                        <p><strong>Recommendation:</strong> ${cap.recommendation}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

async function fetchAQIData() {
    let caps = JSON.parse(localStorage.getItem('caps'));

    if (!caps) {
        const response = await fetch(apiEndPoint);
        caps = await response.json();
        localStorage.setItem('caps', JSON.stringify(caps));
    }

    return caps;
}

async function displayCards(){

    const caps = await fetchAQIData();
    renderCards(caps);

    }

function deleteAQI(capName){
    let caps = JSON.parse(localStorage.getItem('caps'));
    caps = caps.filter(cap => cap.capital_city !== capName);
    localStorage.setItem('caps', JSON.stringify(caps));

    renderCards(caps);
}

function filterName() {
    const searchLetters = searchByName.value.toLowerCase();
    let caps = JSON.parse(localStorage.getItem('caps')) || [];
    
    const filteredCaps = caps.filter(cap => cap.capital_city.toLowerCase().includes(searchLetters));
    renderCards(filteredCaps);
}

document.addEventListener('DOMContentLoaded', displayCards);
searchByName.addEventListener("input", filterName);




