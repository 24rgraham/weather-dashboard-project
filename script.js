// take in user search
const day1Card = document.getElementById('day1Card')
const day2Card = document.getElementById('day2Card')
const day3Card = document.getElementById('day3Card')
const day4Card = document.getElementById('day4Card')
const day5Card = document.getElementById('day5Card')
const day1Img = document.getElementById('day1Img')
const day2Img = document.getElementById('day2Img')
const day3Img = document.getElementById('day3Img')
const day4Img = document.getElementById('day4Img')
const day5Img = document.getElementById('day5Img')
const goButton = document.getElementById("goButton")
const title = document.getElementById("title")
const dropdown = document.querySelectorAll('.dropdown-item')
let cities = []


function findImg(day) {
    switch (day.weather[0].main) {
        case 'Clouds':
            if (day.weather[0].description == 'overcast clouds') {
                return 'http://www.photos-public-domain.com/wp-content/uploads/2012/04/fluffy-white-clouds.jpg'
            } else { return 'https://filipinotimes.net/wp-content/uploads/2017/05/IMG_4867.jpg' }
        case 'Rain':
            return 'https://jooinn.com/images/raining-12.jpg'
        case 'Clear':
            return 'https://wallpapercave.com/wp/wp3736920.jpg'
        case 'Thunderstorm':
            return 'https://www.severe-weather.eu/wp-content/gallery/weather-photos/04072017_Adria_Lightning_8b.jpg'
        case 'Snow':
            return 'https://images.unsplash.com/photo-1511131341194-24e2eeeebb09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        case 'Drizzle':
            return 'https://jooinn.com/images/raining-12.jpg'
        default:
            return 'https://placekitten.com'
    }
}

function printCardText(day) {
    return titleCase(day.weather[0].description) + '<br> Temp: ' + Math.floor(day.main.temp) + '°F <br> Wind: ' + Math.floor(day.wind.speed) + ' mph <br> Humidity: ' + Math.floor(day.main.humidity) + '%'
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

//fetch data
async function getWeather(city) {
    try {
        const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=74161c6e5f2f61ea2996c44ba6799559&units=imperial'
        const response = await fetch(openWeatherUrl);
        const data = await response.json();
        const day1 = data.list[0]
        const day2 = data.list[8]
        const day3 = data.list[16]
        const day4 = data.list[24]
        const day5 = data.list[32]
        //set Card titles
        document.getElementById('day3Title').innerHTML = moment.utc(day3.dt_txt + '+08:00').format('dddd')
        document.getElementById('day4Title').innerHTML = moment.utc(day4.dt_txt + '+08:00').format('dddd')
        document.getElementById('day5Title').innerHTML = moment.utc(day5.dt_txt + '+08:00').format('dddd')
        //print weather
        day1Card.innerHTML = printCardText(day1)
        day2Card.innerHTML = printCardText(day2)
        day3Card.innerHTML = printCardText(day3)
        day4Card.innerHTML = printCardText(day4)
        day5Card.innerHTML = printCardText(day5)
        //set images
        day1Img.setAttribute('src', findImg(day1))
        day2Img.setAttribute('src', findImg(day2))
        day3Img.setAttribute('src', findImg(day3))
        day4Img.setAttribute('src', findImg(day4))
        day5Img.setAttribute('src', findImg(day5))
        //display city name
        title.textContent = data.city.name + ', ' + data.city.country + ' Weather'
        //save city in local storage
        storedCities = JSON.parse(localStorage.getItem('cities'));
        if (storedCities !== null) {
            cities = storedCities;
        }
        if(!cities.includes(city)){
            cities.push(city)
        }
        console.log(cities);
        var child = dropdownGuy.lastElementChild; 
        while (child) {
            dropdownGuy.removeChild(child);
            child = dropdownGuy.lastElementChild;
        }
        for (var i = 0; i < cities.length; i++) {
            var thing = cities[i]
            var a = document.createElement("a");
            a.textContent = thing;
            a.setAttribute("class", "dropdown-item");
            dropdownGuy.appendChild(a);
          }
        localStorage.setItem("cities", JSON.stringify(cities))
        // }
        //reset event listeners
        document.querySelectorAll('.dropdown-item').forEach(function (dropdown) {
            dropdown.addEventListener('click', function () {
                console.log(`The ${dropdown.textContent} button was clicked!`);
                getWeather(dropdown.textContent)
            });
        });
    } catch (error) {
        console.error(error);
        alert('City not found.')
    }
}

function search() {
    const city = document.getElementById("searchField").value
    console.log(city);
    getWeather(city);
}

function handleDropdown() {
    console.log('clicky');
}

goButton.addEventListener('click', search())

getWeather('seattle')
