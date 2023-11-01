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

const weatherDescKo = [
    { 201: '가벼운 비를 동반한 천둥구름' },
    { 200: '비를 동반한 천둥구름' },
    { 202: '폭우를 동반한 천둥구름' },
    { 210: '약한 천둥구름' },
    { 211: '천둥구름' },
    { 212: '강한 천둥구름' },
    { 221: '불규칙적 천둥구름' },
    { 230: '약한 연무를 동반한 천둥구름' },
    { 231: '연무를 동반한 천둥구름' },
    { 232: '강한 안개비를 동반한 천둥구름' },
    { 300: '가벼운 안개비' },
    { 301: '안개비' },
    { 302: '강한 안개비' },
    { 310: '가벼운 적은비' },
    { 311: '적은비' },
    { 312: '강한 적은비' },
    { 313: '소나기와 안개비' },
    { 314: '강한 소나기와 안개비' },
    { 321: '소나기' },
    { 500: '악한 비' },
    { 501: '중간 비' },
    { 502: '강한 비' },
    { 503: '매우 강한 비' },
    { 504: '극심한 비' },
    { 511: '우박' },
    { 520: '약한 소나기 비' },
    { 521: '소나기 비' },
    { 522: '강한 소나기 비' },
    { 531: '불규칙적 소나기 비' },
    { 600: '가벼운 눈' },
    { 601: '눈' },
    { 602: '강한 눈' },
    { 611: '진눈깨비' },
    { 612: '소나기 진눈깨비' },
    { 615: '약한 비와 눈' },
    { 616: '비와 눈' },
    { 620: '약한 소나기 눈' },
    { 621: '소나기 눈' },
    { 622: '강한 소나기 눈' },
    { 701: '박무' },
    { 711: '연기' },
    { 721: '연무' },
    { 731: '모래 먼지' },
    { 741: '안개' },
    { 751: '모래' },
    { 761: '먼지' },
    { 762: '화산재' },
    { 771: '돌풍' },
    { 781: '토네이도' },
    { 800: '구름 한 점 없는 맑은 하늘' },
    { 801: '약간의 구름이 낀 하늘' },
    { 802: '드문드문 구름이 낀 하늘' },
    { 803: '구름이 거의 없는 하늘' },
    { 804: '구름으로 뒤덮인 흐린 하늘' },
    { 900: '토네이도' },
    { 901: '태풍' },
    { 902: '허리케인' },
    { 903: '한랭' },
    { 904: '고온' },
    { 905: '바람부는' },
    { 906: '우박' },
    { 951: '바람이 거의 없는' },
    { 952: '약한 바람' },
    { 953: '부드러운 바람' },
    { 954: '중간 세기 바람' },
    { 955: '신선한 바람' },
    { 956: '센 바람' },
    { 957: '돌풍에 가까운 센 바람' },
    { 958: '돌풍' },
    { 959: '심각한 돌풍' },
    { 960: '폭풍' },
    { 961: '강한 폭풍' },
    { 962: '허리케인' },
];

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