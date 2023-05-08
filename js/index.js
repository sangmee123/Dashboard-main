/* 날짜, 시간 */
let d = document.querySelector('.date')
let clock = document.querySelector('.time');

function getTime() {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    const h = today.getHours();
    const m = today.getMinutes();

    const dateString = year + '.' + month + '.' + date;
    d.innerHTML = dateString;
    const timeString = h + ':' + m;
    clock.innerHTML = `${h<10 ? `0${h}`:h}:${m<10 ? `0${m}`:m}`
}

function init_Clock() {
    setInterval(getTime, 1000);
}

init_Clock();

/* 날씨 API */
const API_KEY = "7b25d47b3c02e4069876383772c479c5";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("You live in", lat, lng);

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
              var weatherIcon = `${data.weather[0].icon}`; 
              var url = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
              var img = document.querySelector('#todayImg');
              img.src = url;

              const weather = document.querySelector("#weatherToday1"); 
              const city = document.querySelector("#weatherToday2");
              city.innerText = data.name;
              weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
              console.log(data);
    });
}
function onGeoError(){ alert("Can't find you. No weather for you."); }
navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);