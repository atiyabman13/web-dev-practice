
// ==========================================
// GET HTML ELEMENTS
// ==========================================

const cityInput =
    document.getElementById("cityInput");

const searchBtn =
    document.getElementById("searchBtn");

const weatherCard =
    document.getElementById("weatherCard");

const welcome =
    document.getElementById("welcome");

const statusText =
    document.getElementById("status");

const recentSection =
    document.getElementById("recentSection");

const recentList =
    document.getElementById("recentList");

const clearBtn =
    document.getElementById("clearBtn");


// ==========================================
// EVENT LISTENERS
// ==========================================

// Search button

searchBtn.addEventListener(
    "click",
    searchWeather
);


// Press Enter

cityInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchWeather();

        }

    }
);


// Clear recent searches

clearBtn.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "recentCities"
        );

        renderRecentCities();

    }
);


// ==========================================
// SEARCH WEATHER
// ==========================================

async function searchWeather() {

    // Get city

    const city =
        cityInput.value.trim();


    // Check empty input

    if (!city) {

        showError(
            "Please enter a city name."
        );

        return;
    }


    // Check API key

    if (
        API_KEY === "YOUR_API_KEY" ||
        API_KEY.trim() === ""
    ) {

        showError(
            "Please add your OpenWeatherMap API key in script.js."
        );

        return;
    }


    // Loading state

    setLoading(true);

    statusText.textContent = "";


    try {

        // ==================================
        // FETCH WEATHER DATA
        // ==================================

        const response =
            await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
            );


        // ==================================
        // CHECK RESPONSE
        // ==================================

        if (!response.ok) {

            if (response.status === 404) {

                throw new Error(
                    "City not found. Please check the spelling."
                );

            }


            if (response.status === 401) {

                throw new Error(
                    "Invalid or inactive API key. Please check your OpenWeatherMap API key."
                );

            }


            if (response.status === 429) {

                throw new Error(
                    "Too many requests. Please try again later."
                );

            }


            throw new Error(
                "Unable to fetch weather data right now."
            );

        }


        // ==================================
        // CONVERT RESPONSE TO JSON
        // ==================================

        const data =
            await response.json();


        // ==================================
        // DISPLAY WEATHER
        // ==================================

        displayWeather(data);


        // ==================================
        // SAVE CITY
        // ==================================

        saveRecentCity(data.name);


        // ==================================
        // DISPLAY RECENT SEARCHES
        // ==================================

        renderRecentCities();


        // Remove error

        statusText.textContent = "";

    }


    catch (error) {

        console.error(
            "Weather API Error:",
            error
        );

        showError(
            error.message
        );

    }


    finally {

        setLoading(false);

    }

}


// ==========================================
// DISPLAY WEATHER
// ==========================================

function displayWeather(data) {

    // Get weather object

    const weather =
        data.weather[0];


    // ==================================
    // CITY
    // ==================================

    document.getElementById(
        "cityName"
    ).textContent =
        `${data.name}, ${data.sys.country}`;


    // ==================================
    // TEMPERATURE
    // ==================================

    document.getElementById(
        "temperature"
    ).textContent =
        `${Math.round(data.main.temp)}°`;


    // ==================================
    // CONDITION
    // ==================================

    document.getElementById(
        "condition"
    ).textContent =
        weather.description;


    // ==================================
    // FEELS LIKE
    // ==================================

    document.getElementById(
        "feelsLike"
    ).textContent =
        `Feels like ${Math.round(data.main.feels_like)}°`;


    // ==================================
    // HUMIDITY
    // ==================================

    document.getElementById(
        "humidity"
    ).textContent =
        `${data.main.humidity}%`;


    // ==================================
    // WIND
    // ==================================

    document.getElementById(
        "wind"
    ).textContent =
        `${data.wind.speed} m/s`;


    // ==================================
    // PRESSURE
    // ==================================

    document.getElementById(
        "pressure"
    ).textContent =
        `${data.main.pressure} hPa`;


    // ==================================
    // WEATHER ICON
    // ==================================

    document.getElementById(
        "weatherIcon"
    ).textContent =
        getWeatherEmoji(
            weather.main
        );


    // ==================================
    // DATE & TIME
    // ==================================

    document.getElementById(
        "dateTime"
    ).textContent =
        new Date().toLocaleString(
            undefined,
            {
                weekday: "long",
                hour: "numeric",
                minute: "2-digit"
            }
        );


    // ==================================
    // SHOW WEATHER CARD
    // ==================================

    weatherCard.classList.remove(
        "hidden"
    );


    // Hide welcome

    welcome.classList.add(
        "hidden"
    );

}


// ==========================================
// WEATHER EMOJI
// ==========================================

function getWeatherEmoji(
    condition
) {

    const icons = {

        Clear: "☀️",

        Clouds: "☁️",

        Rain: "🌧️",

        Drizzle: "🌦️",

        Thunderstorm: "⛈️",

        Snow: "❄️",

        Mist: "🌫️",

        Smoke: "🌫️",

        Haze: "🌫️",

        Dust: "🌪️",

        Fog: "🌫️",

        Sand: "🌪️",

        Ash: "🌋",

        Squall: "💨",

        Tornado: "🌪️"

    };


    return (
        icons[condition] ||
        "🌤️"
    );

}


// ==========================================
// SAVE RECENT CITY
// ==========================================

function saveRecentCity(city) {

    let cities =
        JSON.parse(
            localStorage.getItem(
                "recentCities"
            )
        ) || [];


    // Add city at beginning

    cities = [

        city,

        ...cities.filter(
            item =>
                item.toLowerCase()
                !== city.toLowerCase()
        )

    ];


    // Keep only 5

    cities =
        cities.slice(0, 5);


    // Save

    localStorage.setItem(
        "recentCities",
        JSON.stringify(cities)
    );

}


// ==========================================
// DISPLAY RECENT CITIES
// ==========================================

function renderRecentCities() {

    const cities =
        JSON.parse(
            localStorage.getItem(
                "recentCities"
            )
        ) || [];


    // No recent cities

    if (cities.length === 0) {

        recentSection.classList.add(
            "hidden"
        );

        return;

    }


    // Show section

    recentSection.classList.remove(
        "hidden"
    );


    // Clear previous buttons

    recentList.innerHTML = "";


    // Create buttons

    cities.forEach(
        function (city) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "recent-city";


            button.textContent =
                city;


            // Search when clicked

            button.addEventListener(
                "click",
                function () {

                    cityInput.value =
                        city;

                    searchWeather();

                }
            );


            recentList.appendChild(
                button
            );

        }
    );

}


// ==========================================
// SHOW ERROR
// ==========================================

function showError(message) {

    statusText.textContent =
        message;


    weatherCard.classList.add(
        "hidden"
    );


    welcome.classList.remove(
        "hidden"
    );

}


// ==========================================
// LOADING STATE
// ==========================================

function setLoading(
    isLoading
) {

    searchBtn.disabled =
        isLoading;


    if (isLoading) {

        searchBtn.textContent =
            "Loading...";

    }

    else {

        searchBtn.textContent =
            "Search";

    }

}


// ==========================================
// LOAD RECENT SEARCHES
// ==========================================

renderRecentCities();