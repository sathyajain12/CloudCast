// app.js
async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    // Replace with your Azure Function URL
    const functionUrl = "https://<YOUR_AZURE_FUNCTION_URL>/api/weather?city=" + encodeURIComponent(city);

    try {
        const response = await fetch(functionUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Could not fetch weather data. Please try again.");
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = `
        <h3>Weather in ${data.city}</h3>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} km/h</p>
        <h4>5-Day Forecast</h4>
        <ul>
            ${data.forecast.map(day => `<li>${day.date}: ${day.temp}°C, ${day.description}</li>`).join("")}
        </ul>
    `;
}
