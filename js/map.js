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
        center: new kakao.maps.LatLng(37.640695, 127.147675), // 지도의 중심좌표
        level: 10 // 지도의 확대 레벨
    };

let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

//일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도 타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl(); 
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 마커가 표시될 위치입니다 
let positions = [
  {
    title: '서울건설기계(주)',
    latLng: new kakao.maps.LatLng(37.673613, 126.865862)
  },
  {
    title: '우리건설기계',
    latLng: new kakao.maps.LatLng(37.568702, 126.993562)
  },
  {
    title: '봉래건설기계(주)',
    latLng: new kakao.maps.LatLng(37.375656, 126.944399)
  },
  {
    title: '태산건설기계',
    latLng: new kakao.maps.LatLng(37.597822, 126.650762)
  },
  {
    title: '(주)비젼시스템',
    latLng: new kakao.maps.LatLng(37.513896, 127.115957)
  },
  {
    title: '정우건설중기',
    latLng: new kakao.maps.LatLng(37.601084, 127.099927)
  },
  {
    title: '(주)에스지오',
    latLng: new kakao.maps.LatLng(37.402056, 126.686377)
  },
  {
    title: '대웅건설(주)',
    latLng: new kakao.maps.LatLng(37.035640, 127.604745)
  },
  {
    title: '영주대형건설기계',
    latLng: new kakao.maps.LatLng(36.816873, 128.638362)
  },
  {
    title: '영암건설장비(주)',
    latLng: new kakao.maps.LatLng(37.179881, 128.976808)
  },
  {
    title: '금성건설기계',
    latLng: new kakao.maps.LatLng(36.890148, 127.481973)
  },
  {
    title: '송광건설기계',
    latLng: new kakao.maps.LatLng(37.168421, 126.895548)
  },
  {
    title: '솔리메틱스',
    latLng: new kakao.maps.LatLng(37.868999, 127.738249)
  },
  {
    title: '한내건설(주)',
    latLng: new kakao.maps.LatLng(36.941485, 127.688740)
  }
];

//각 기업 클릭 시 위치 마커 생성
for(let i = 0; i < 14; i++) {
    document.querySelector('.li' + i).addEventListener('click', function(e) {  
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: positions[i].latLng, // 지도의 중심좌표
            level: 4 // 지도의 확대 레벨
        };
        var mapLoaction = new kakao.maps.Map(mapContainer, mapOption);

        //일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도 타입 컨트롤을 생성합니다
        var mapTypeControl = new kakao.maps.MapTypeControl();
        mapLoaction.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        var marker = new kakao.maps.Marker({ // 지도 마커 위치 표시
            map: mapLoaction,
            position: positions[i].latLng,
            title: positions[i].title
        });
        marker.setMap(mapLoaction);
    });
}

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
function onGeoError(){ alert("Can't find you. No weather for you.");}
navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);