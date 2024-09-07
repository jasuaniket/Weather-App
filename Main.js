const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const iconOutput = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const windDirection = document.querySelector('.winddir');
const feelsLike = document.querySelector('.feelslike');
const preciP = document.querySelector('.precip');
const presS = document.querySelector('.press');
const uV = document.querySelector('.uv');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "howrah";

cities.forEach((city) => {
    city.addEventListener('click', (e)=>{
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
})

form.addEventListener('submit', (e) =>{
    if(search.value.length == 0){
        alert('please type a city name')
    }else{
        cityInput = search.value;
        fetchWeatherData();
        search.value="";
        app.style.opacity="0"
    }
    e.preventDefault();
})

function dayOfTheWeek(year, month, day){
    const weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday', 
        'Friday', 
        'Saturday'
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

function fetchWeatherData(){
    let a = fetch(`http://api.weatherapi.com/v1/current.json?key=37224148dcb14427a5d94741241608&q=${cityInput}`)
    a.then((data) => {
        return data.json()
    }).then((data) =>{
        console.log(data)
     //cloud output   
    const cloudOutput = document.querySelector('.cloud');
    if (cloudOutput) {
      cloudOutput.innerHTML = data.current.cloud + "%";
    }
    //humidity
    const humidityOutput = document.querySelector('.humidity');
    if (humidityOutput) {
        humidityOutput.innerHTML = data.current.humidity + "%";
    }
    //wind
    const windOutput = document.querySelector('.wind');
    if (windOutput) {
        windOutput.innerHTML = data.current.wind_kph + " km/h";
    }
    //windidr
    const windDirection = document.querySelector('.winddir');
    if (windDirection) {
        windDirection.innerHTML = data.current.wind_dir;
    }
    //feelslike
    const feelsLike = document.querySelector('.feelslike');
    if (feelsLike) {
        feelsLike.innerHTML = data.current.feelslike_c + " &#176;" +"C";
    }

    const preciP = document.querySelector('.precip');
    if (preciP) {
        preciP.innerHTML = data.current.precip_mm + " mm";
    }

    const presS = document.querySelector('.press');
    if (presS) {
        presS.innerHTML = data.current.pressure_mb + " mb";
    }

    const uV = document.querySelector('.uv');
    if (uV) {
        const uvIndex = data.current.uv; 
        
        let uvLevel = '';
    
        if (uvIndex <= 2) {
            uvLevel = 'Low';
        } else if (uvIndex <= 5) {
            uvLevel = 'Moderate';
        } else if (uvIndex <= 7) {
            uvLevel = 'High';
        } else if (uvIndex <= 10) {
            uvLevel = 'Very High';
        } else {
            uvLevel = 'Extreme';
        }
    
        uV.innerHTML = uvLevel;
    }
    
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;

        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);

        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}.${m}.${y}`;
        timeOutput.innerHTML = time;
        nameOutput.innerHTML = data.location.name;

        const iconOutput = document.querySelector('.icon');
        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);

        if (iconOutput && iconId) {
        iconOutput.src = `//cdn.weatherapi.com/weather/64x64/${iconId}`;
        }
        
        /*cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + " km/h";*/

        let timeOfDay = "Day";

        const code = data.current.condition.code;
        if(!data.current.is_day) {
            timeOfDay = "night";
        }
        if(code == 1000){
            app.style.backgroundImage = `url(clear.jpg)`;
            btn.style.background = "#54a0e8";
            if(timeOfDay == "night"){
                btn.style.background = "#487baa";
            }
        }
        else if (
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282
        ){
            app.style.backgroundImage = `url(cloudy.jpg)`;
            btn.style.background = "#535e68";
            if(timeOfDay == "night"){
                btn.style.background = "#181e27";
            }
        }else if(
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252
        ) {
            app.style.backgroundImage = `url(rainy.jpg)`;
            btn.style.background = "#647d75";
            if(timeOfDay == "night") {
                btn.style.background = "#325c80";
            }
        }else {
            app.style.backgroundImage = `url(snowy.jpg)`;
            btn.style.background = "#4d72aa";
            if(timeOfDay == "night") {
                btn.style.background = "#1b1b1b";
            }
        }
        app.style.opacity = "1";
    })
    .catch(() => {
        alert('city not found try again');
        app.style.opacity = "1";
    });
}
fetchWeatherData();
app.style.opacity = "1";
