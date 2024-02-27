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
import weatherDescKo from './weatherDescriptions.js';

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

              const weatherDescObject = weatherDescKo.find(code => Object.keys(code)[0] == data.cod);
              const weatherDescKoText = Object.values(weatherDescObject)[0];
              const weather = document.querySelector("#weatherToday1"); 
              const city = document.querySelector("#weatherToday2");
              city.innerText = data.name;
              weather.innerText = `${weatherDescKoText} / ${parseInt(data.main.temp)}º`;
              console.log(data);
    });
}
function onGeoError(){ alert("날씨가 표시되지 않습니다. https로 변환해주세요."); }
navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);

/* 원본 이미지 */
document.querySelector('#fir').addEventListener('click', function() {
    if (window.outerWidth > 500) //모바일 화면 사이즈가 아닐 경우
        window.open('../images/천공기.jpg');
});

document.querySelector('#sec').addEventListener('click', function() {
    if(window.outerWidth > 500) 
        window.open('../images/앱.jpg');
});

document.querySelector('#tel1').addEventListener('click', function() {
    if(window.outerWidth > 500)
        window.open('../images/텔레메틱스1.png');
})

document.querySelector('#tel2').addEventListener('click', function() {
    if(window.outerWidth > 500)
        window.open('../images/텔레메틱스2.png');
})
