let cityName = document.querySelector('#city');
let icon = document.querySelector('.weather-icon');
let temp = document.querySelector('#temp');
let desc = document.querySelector('.desc');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let search = document.querySelector('#search-bar');
let btn = document.querySelector('#search-btn');

const API_KEY = '19c4073ca90b5f958ea8c6020c9dbb08';

// desc.innerHTML = "Search City"
async function weatherFetch(city)
{
    let fetching = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    let data = await fetching.json();

    console.log(data)
    cityName.textContent = data.name;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    icon.style.height = `4em`;
    icon.style.width = `4em`;
    temp.textContent = data.main.temp === undefined ? '-' : `${data.main.temp} °C`;
    desc.textContent = data.weather[0].description;
    humidity.textContent = `Humidity : ${data.main.humidity}`;
    wind.textContent = `Wind : ${data.wind.speed}`;
    if (data.message === `city not found` || data.cod === `404`){
        desc.innerHTML = `No City Found`;
        console.log(data.message);
    }
    // document.body.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080/?weather,landscape,trees')`;
}


btn.addEventListener('click',function() {
    console.log("Searching")
    let input = search.value
    weatherFetch(input);
})

search.addEventListener("keyup",function(e){
    let input = search.value
    if (e.key === 'Enter'){
        weatherFetch(input);
    }
})
