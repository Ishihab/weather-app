const apiKey = "7112f7605bf604a2298ba251c4014431"; 
const apiUrl = "https://api.openweathermap.org/data/3.0/onecall?";
const locationApiUrl = "http://api.openweathermap.org/geo/1.0/direct?";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const part = "minutely,hourly,daily,alerts";
const unit = "metric";

searchButton.addEventListener("click", () => {
    const location = locationInput.value;
    if (location) {
        fetchLocation(location);
    }
});

function fetchLocation(location){
    const locationUrl = `${locationApiUrl}q=${location}&limit=1&appid=${apiKey}`;
    
    fetch(locationUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                throw new Error("Location not found");
            }

            locationElement.textContent = data[0].name;
            const lat = data[0].lat;
            const lon = data[0].lon;

            // ✅ Now build the second fetch URL AFTER lat/lon are ready
            const url = `${apiUrl}lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}&units=${unit}`;

            return fetch(url); // return so we can chain
        })
        .then(response => response.json())
        .then(data => {
            temperatureElement.textContent = data.current.temp + "°C";
            descriptionElement.textContent = data.current.weather[0].description;
        })
        .catch(error => {
            console.error("Error fetching data", error);
        });
}
