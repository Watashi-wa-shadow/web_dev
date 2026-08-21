fetch('https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8777&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code');
let cityInput = document.querySelector("#cityInput");
let searchButton = document.querySelector("#searchButton");
let historyContainer = document.querySelector("#history");
let val;
searchButton.addEventListener("click",() =>{
    weatherData();
    cityInput.value = "";
})
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    weatherData(cityInput.value.trim());
    cityInput.value = "";
  }
});
async function weatherData() {
    val = cityInput.value.trim();
    if (!val) return;

    let geoData = await cityName();
    if (!geoData.results || geoData.results.length === 0) {
        alert("City not found. Please try another name.");
        return;
    }

    let { latitude, longitude, name } = geoData.results[0];
    cityWeather(latitude, longitude, name);
} 
async function cityName(){
    return fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${val}&count=1&countryCode=IN`)
    .then(response => response.json())
    .then(data =>{
        return data;
    })
}
async function cityWeather(latitude, longitude, cityName) {
  try {
    // Request current conditions + daily min/max + auto timezone
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
    const response = await fetch(url);
    const data = await response.json();

    displayWeather(data, cityName);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}
// Helper for WMO weather codes
const weatherCodes = {
    0: "Clear Sky ☀️",
    1: "Mainly Clear 🌤️",
    2: "Partly Cloudy ⛅",
    3: "Overcast ☁️",
    45: "Fog 🌫️",
    51: "Light Drizzle 🌦️",
    61: "Rain 🌧️",
    71: "Snow ❄️",
    95: "Thunderstorm ⛈️"
};

function displayWeather(data, cityName) {
    const current = data.current;
    const units = data.current_units;
    const condition = weatherCodes[current.weather_code] || "Variable";
    const card = document.createElement("div");
    card.classList.add("weather-card");
    Object.assign(card.style, {
        width: "100%",
        backgroundColor: "#f5f8fa",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "15px"
    });
    card.innerHTML = `
        <h2>${cityName}</h2>
        <p class="condition">${condition}</p>
        <h1 class="temp">${current.temperature_2m}${units.temperature_2m}</h1>
        <p>Feels like: ${current.apparent_temperature}${units.apparent_temperature}</p>
        
        <div class="metrics">
        <p>💧 Humidity: ${current.relative_humidity_2m}${units.relative_humidity_2m}</p>
        <p>💨 Wind: ${current.wind_speed_10m} ${units.wind_speed_10m}</p>
        </div>
    `;
    historyContainer.prepend(card);
}
