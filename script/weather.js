// Base API URL and API Key
const apiKey = "fe824cb856a37281c8c13e7a5fbbd488";
const baseApiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch weather data
async function fetchWeather(city) {
  try {
    // Construct the API URL
    const apiUrl = `${baseApiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch data from the API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`City not found: ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json();
    updateWeatherDetails(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("City not found. Please try again.");
  }
}

// Function to update weather details in the DOM
function updateWeatherDetails(data) {
  const weatherImage = document.querySelector("#weather-container img");
  const weatherCity = document.querySelector("#weather-details h1");
  const weatherTemp = document.querySelector("#weather-details h2");
  const weatherDescription = document.querySelector("#weather-details h3.description");

  // Update DOM elements with data
  weatherCity.textContent = data.name;
  weatherTemp.textContent = `${data.main.temp.toFixed(1)} °C`;
  weatherDescription.textContent = data.weather[0].description;

  // Update weather icon
  const iconCode = data.weather[0].icon;
  weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Event listener for search button
document.querySelector("button").addEventListener("click", () => {
  const cityInput = document.querySelector("#city-data").value.trim();
  if (cityInput) {
    fetchWeather(cityInput);
  } else {
    alert("Please enter a city name.");
  }
});
document.querySelector("#city-data").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      document.querySelector("button").click(); // Simulate button click
    }
  });
  