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

function init_Clock() { setInterval(getTime, 1000); }

init_Clock();


/* Map */
let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.868999, 127.738249), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };

let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(37.868999, 127.738249); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({ position: markerPosition });

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);


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
function onGeoError(){ alert("Can't find you. No weather for you.");}
navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);