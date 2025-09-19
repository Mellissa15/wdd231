document.addEventListener("DOMContentLoaded", async () => {
    // --- Create 3 spotlight cards dynamically ---
    const spotlightsMainBox = document.querySelector(".spotlights-main-box");
    spotlightsMainBox.innerHTML = "";

    const createSpotCard = (index) => {
        const spotCard = document.createElement("div");
        spotCard.className = `spot-card spot-card-0${index}`;

        spotCard.innerHTML = `
            <div class="title-spot">
                <h4 id="business-name-0${index}"></h4>
                <h3 id="tag0${index}"></h3>
            </div>
            <div class="spot-img">
                <img src="" alt="" id="img-0${index}-spot" width="80px">
            </div>
            <div class="spot-data">
                <p><span id="phone-0${index}"></span></p>
                <p><a href="" id="url-0${index}" target="_blank" rel="noopener"></a></p>
                <p><span id="member-since-0${index}"></span></p>
            </div>
        `;

        return spotCard;
    };

    for (let i = 1; i <= 3; i++) {
        spotlightsMainBox.appendChild(createSpotCard(i));
    }

    // --- Query the newly created elements ---
    const businessNames = [
        document.querySelector("#business-name-01"),
        document.querySelector("#business-name-02"),
        document.querySelector("#business-name-03")
    ];
    const industries = [
        document.querySelector("#tag01"),
        document.querySelector("#tag02"),
        document.querySelector("#tag03")
    ];
    const phones = [
        document.querySelector("#phone-01"),
        document.querySelector("#phone-02"),
        document.querySelector("#phone-03")
    ];
    const urls = [
        document.querySelector("#url-01"),
        document.querySelector("#url-02"),
        document.querySelector("#url-03")
    ];
    const members = [
        document.querySelector("#member-since-01"),
        document.querySelector("#member-since-02"),
        document.querySelector("#member-since-03")
    ];
    const imgs = [
        document.querySelector("#img-01-spot"),
        document.querySelector("#img-02-spot"),
        document.querySelector("#img-03-spot")
    ];

    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

        // Shuffle and select first 3 entries
        const shuffledData = data.sort(() => 0.5 - Math.random()).slice(0, 3);

        // Fill the cards
        shuffledData.forEach((member, index) => {
            if (businessNames[index]) businessNames[index].textContent = member.Name;
            if (industries[index]) industries[index].textContent = member.Industry;
            if (phones[index]) phones[index].textContent = `Phone: ${member.Phone}`;
            if (urls[index]) {
                urls[index].href = member.Website;
                urls[index].textContent = "Visit the website";
            }
            if (members[index]) members[index].textContent = `Membership level: ${member.Membership}`;
            if (imgs[index]) {
                imgs[index].src = member.logo;
                imgs[index].alt = `${member.Name} logo`;
            }
        });
    } catch (error) {
        console.error("Error fetching members data:", error);
    }
});


// ---------- CONFIG ----------
const myKey = "90158c8799bb28ca5c3054efdcbe85fd"; // Your OpenWeatherMap API key
const myLat = "-33.9249"; // Cape Town Latitude
const myLon = "18.4241"; // Cape Town Longitude

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date();
const day = today.getDay();

// ---------- WEATHER SECTION ----------
async function fetchCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather");
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error("Weather fetch error:", error);
    }
}

function displayCurrentWeather(data) {
    const weatherBox = document.querySelector("#current-weather");
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;

    weatherBox.innerHTML = `
        <div class="current-weather">
            <h3>Current Weather in ${data.name}</h3>
            <h4>${weekdays[day]}</h4>
            <p>Temperature: <strong>${parseFloat(data.main.temp).toFixed(0)}°C</strong></p>
            <figure>
                <img src="${iconSrc}" alt="${desc}">
                <figcaption>${desc}</figcaption>
            </figure>
        </div>
    `;
}

async function fetchForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch forecast");
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error("Forecast fetch error:", error);
    }
}

function displayForecast(data) {
    const forecastBox = document.querySelector("#forecast");

    const middayForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    let forecastHTML = `
        <h3>3-Day Forecast</h3>
        <div class="main-day-box">
    `;

    middayForecasts.forEach((item, i) => {
        const dayIndex = (day + i + 1) % 7;
        const iconSrc = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        const desc = item.weather[0].description;
        const temp = parseFloat(item.main.temp).toFixed(0);

        forecastHTML += `
            <div class="day-box">
                <h4>${weekdays[dayIndex]}</h4>
                <figure>
                    <img src="${iconSrc}" alt="${desc}">
                    <figcaption>${desc}</figcaption>
                </figure>
                <p>Temp: ${temp}°C</p>
            </div>
        `;
    });

    forecastHTML += `</div>`;
    forecastBox.innerHTML = forecastHTML;
}

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", () => {
    fetchCurrentWeather();
    fetchForecast();
    loadSpotlights();
});
