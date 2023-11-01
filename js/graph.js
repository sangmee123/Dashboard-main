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

/* Graph 1 ~ 5 함수 호출 */
updateGraph1();
updateGraph2();
updateGraph3();
updateGraph4();
updateGraph5();

/* 기업 리스트에서 하나를 택할 시 해당 호기 전체 그래프 데이터 출력 */
window.onload = function(){
    /* 웹 PC 기업 리스트 */
    document.querySelector('.c').addEventListener('click', () => {       
      updateGraph1(); 
      updateGraph2(); 
      updateGraph3(); 
      updateGraph4(); 
      updateGraph5();
    });
    /* 모바일 버전 기업 리스트 */
    document.querySelector('option').addEventListener('click', () => {
      updateGraph1(); 
      updateGraph2(); 
      updateGraph3(); 
      updateGraph4(); 
      updateGraph5();
    });
}


/*chart1*/
function updateGraph1() { 
    let root = am5.Root.new("chartdiv1");

    root.dateFormatter.setAll({
      dateFormat: "yyyy-MM-dd", //yyyy-MM-dd
      dateFields: ["valueX"]
    });
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]); 
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX:true
    }));
    
    chart.children.unshift(am5.Label.new(root, {
        text: "Pressure",
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(10),
        paddingTop: 0,
        paddingBottom: 0
    }));

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // // Create axes
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        baseInterval: { 
            timeUnit: "second", 
            count: 1 
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
    }));
    
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        logarithmic: true,
        renderer: am5xy.AxisRendererY.new(root, {})
    }));
    
    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
        name: "Pressure",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "year",
        stroke: chart.get("colors").getIndex(8),
        fill: chart.get("colors").getIndex(8),
        tooltip: am5.Tooltip.new(root, {
            labelText: "[bold]{name}[/]\n{valueX}: {valueY}"
        })
    }));
    series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX:undefined,
          sprite: am5.Circle.new(root, {
            radius: 4,
            fill: series.get("fill")
          })
        })
    });
    series.strokes.template.setAll({
        strokeWidth: 3
    });

    // // Set up data processor to parse string dates
    // // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
    series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "yyyy-MM-dd HH:mm:ss", //yyyy-MM-dd HH:mm:ss
        dateFields: ["year"]
    });

    // Update data every second
    setInterval(() => { addData(); }, 5000);

    function addData() {
        // Data
        let data = arr1;
        series.data.setAll(data);
    }
    series.appear(1000);
    chart.appear(1000, 100);
}

/*chart2*/
function updateGraph2() { 
  let root = am5.Root.new("chartdiv2");

  root.dateFormatter.setAll({
    dateFormat: "yyyy-MM-dd", //yyyy-MM-dd
    dateFields: ["valueX"]
  });
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]); 
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  let chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX:true
  }));
  
  chart.children.unshift(am5.Label.new(root, {
      text: "Max Depth",
      fontSize: 20,
      fontWeight: "500",
      textAlign: "center",
      x: am5.percent(50),
      centerX: am5.percent(50),
      y: am5.percent(10),
      paddingTop: 0,
      paddingBottom: 0
  }));

  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "none"
  }));
  cursor.lineY.set("visible", false);

  // // Create axes
  // // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: { 
          timeUnit: "second", 
          count: 1 
      },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
  }));
  
  let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      logarithmic: true,
      renderer: am5xy.AxisRendererY.new(root, {})
  }));
  
  // Add scrollbar
  // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
  chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
  }));

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  let series = chart.series.push(am5xy.LineSeries.new(root, {
      minBulletDistance: 25,
      name: "Max Depth",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "year",
      stroke: chart.get("colors").getIndex(11),
      fill: chart.get("colors").getIndex(11),
      tooltip: am5.Tooltip.new(root, {
          labelText: "[bold]{name}[/]\n{valueX}: {valueY}"
      })
  }));
  series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationX:undefined,
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: series.get("fill")
        })
      })
  });
  series.strokes.template.setAll({
      strokeWidth: 3
  });

  // // Set up data processor to parse string dates
  // // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
  series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: "yyyy-MM-dd HH:mm:ss", //yyyy-MM-dd HH:mm:ss
      dateFields: ["year"]
  });

  // Update data every second
  setInterval(() => { addData(); }, 5000);

  function addData() {
      // Data
      let data = arr2;
      series.data.setAll(data);
  }
  series.appear(1000);
  chart.appear(1000, 100);
}

/*chart3*/
function updateGraph3() {
    let root = am5.Root.new("chartdiv3");

    root.dateFormatter.setAll({
      dateFormat: "yyyy-MM-dd", //yyyy-MM-dd
      dateFields: ["valueX"]
    });
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]); 
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX:true
    }));
    
    chart.children.unshift(am5.Label.new(root, {
        text: "Torque",
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(10),
        paddingTop: 0,
        paddingBottom: 0
    }));

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // // Create axes
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        baseInterval: { 
            timeUnit: "second", 
            count: 1 
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
    }));
    
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        logarithmic: true,
        renderer: am5xy.AxisRendererY.new(root, {})
    }));
    
    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
        name: "Torque",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "year",
        stroke: chart.get("colors").getIndex(6),
        fill: chart.get("colors").getIndex(6),
        tooltip: am5.Tooltip.new(root, {
            labelText: "[bold]{name}[/]\n{valueX}: {valueY}"
        })
    }));
    series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX:undefined,
          sprite: am5.Circle.new(root, {
            radius: 4,
            fill: series.get("fill")
          })
        })
    });
    series.strokes.template.setAll({
        strokeWidth: 3
    });

    // // Set up data processor to parse string dates
    // // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
    series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "yyyy-MM-dd HH:mm:ss", //yyyy-MM-dd HH:mm:ss
        dateFields: ["year"]
    });

    // Update data every second
    setInterval(() => { addData(); }, 5000);

    function addData() {
        // Data
        let data = arr3;
        series.data.setAll(data);
    }
    series.appear(1000);
    chart.appear(1000, 100);
}

/*chart4*/
function updateGraph4() {
  let root = am5.Root.new("chartdiv4");

  root.dateFormatter.setAll({
    dateFormat: "yyyy-MM-dd", //yyyy-MM-dd
    dateFields: ["valueX"]
  });
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]); 
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  let chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX:true
  }));
  
  chart.children.unshift(am5.Label.new(root, {
      text: "Beat Position",
      fontSize: 20,
      fontWeight: "500",
      textAlign: "center",
      x: am5.percent(50),
      centerX: am5.percent(50),
      y: am5.percent(10),
      paddingTop: 0,
      paddingBottom: 0
  }));

  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "none"
  }));
  cursor.lineY.set("visible", false);

  // // Create axes
  // // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: { 
          timeUnit: "second", 
          count: 1 
      },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
  }));
  
  let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      logarithmic: true,
      renderer: am5xy.AxisRendererY.new(root, {})
  }));
  
  // Add scrollbar
  // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
  chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
  }));

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  let series = chart.series.push(am5xy.LineSeries.new(root, {
      minBulletDistance: 25,
      name: "Beat Position",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "year",
      stroke: chart.get("colors").getIndex(30),
      fill: chart.get("colors").getIndex(30),
      tooltip: am5.Tooltip.new(root, {
          labelText: "[bold]{name}[/]\n{valueX}: {valueY}"
      })
  }));
  series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationX:undefined,
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: series.get("fill")
        })
      })
  });
  series.strokes.template.setAll({
      strokeWidth: 3
  });

  // // Set up data processor to parse string dates
  // // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
  series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: "yyyy-MM-dd HH:mm:ss", //yyyy-MM-dd HH:mm:ss
      dateFields: ["year"]
  });

  // Update data every second
  setInterval(() => { addData(); }, 5000)

  function addData() {
      // Data
      let data = arr4;
      series.data.setAll(data);
  }
  series.appear(1000);
  chart.appear(1000, 100);
}

/*chart5*/
function updateGraph5() {
    let root = am5.Root.new("chartdiv5");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX:true,
      lineColor: "#fbd51a"
    }));
    
    chart.get("colors").set("step", 3);

    chart.children.unshift(am5.Label.new(root, {
        text: "Inclination",
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(10),
        paddingTop: 0,
        paddingBottom: 0
    }));
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.3,
      baseInterval: {
        timeUnit: "second",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "X",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value1",
      valueXField: "date1",    
      stroke: chart.get("colors").getIndex(15),
      fill: chart.get("colors").getIndex(15),
      tooltip: am5.Tooltip.new(root, {
        labelText: "[bold]{name}[/]\n{valueX}: {valueY}"
      })
    }));
    series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX:undefined,
          sprite: am5.Circle.new(root, {
            radius: 4,
            fill: series.get("fill")
          })
        })
    });
    series.strokes.template.setAll({
        strokeWidth: 2
    });
    
    series.get("tooltip").get("background").set("fillOpacity", 0.5);

    let series2 = chart.series.push(am5xy.LineSeries.new(root, {
      minBulletDistance: 10,
      name: "Y",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value2",
      valueXField: "date2", 
      stroke: chart.get("colors").getIndex(19),
      fill: chart.get("colors").getIndex(19),
      tooltip: am5.Tooltip.new(root, {
        labelText: "[bold]{name}[/]\n{valueX}: {valueY}"
      })
    }));
    series2.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX:undefined,
          sprite: am5.Circle.new(root, {
            radius: 4,
            fill: series2.get("fill")
          })
        })
    });
    series2.strokes.template.setAll({
      strokeDasharray: [2, 2],
      strokeWidth: 2
    });
    
    // Set date fields
    // https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates
    root.dateFormatter.setAll({
      dateFormat: "yyyy-MM-dd",
      dateFields: ["valueX"]
    });

    // Set up data processor to parse string dates
    // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
    series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "yyyy-MM-dd HH:mm:ss", //yyyy-MM-dd HH:mm:ss
        dateFields: ["date1"]
    });

    series2.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "yyyy-MM-dd HH:mm:ss", //yyyy-MM-dd HH:mm:ss
        dateFields: ["date2"]
    });

    // Update data every second
    setInterval(() => { addData(); }, 5000)

    function addData() {
        // Data
        let data = arr5;
        
        series.data.setAll(data);
        series2.data.setAll(data);
    }
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);
}

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
]

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