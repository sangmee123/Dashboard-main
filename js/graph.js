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
updateGraph1();
updateGraph2();
updateGraph3();
updateGraph4();
updateGraph5();
 
for(let i = 0; i < 2; i++) {
    document.querySelector('.li' + i).addEventListener('click', function() {       
        updateGraph1();
        updateGraph2();
        updateGraph3();
        updateGraph4();
        updateGraph5();
    });
}

var m_IDX = 19;


/*chart1*/
function updateGraph1() { 
    Highcharts.chart('container1', {
        chart: {
            type: 'gauge',
            backgroundColor:  'rgba(24, 38, 51, 0.4)',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'pressure',
            style: { color: 'black' }
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 200,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: { text: 'kgf/cm2' },
            plotBands: [{
                from: 0,
                to: 120,
                color: '#55BF3B' // green
            }, {
                from: 120,
                to: 160,
                color: '#DDDF0D' // yellow
            }, {
                from: 160,
                to: 200,
                color: '#DF5353' // red
            }]
        },

        series: [{
            name: 'Pressure',
            data: [0],
            tooltip: {
                valueSuffix: ' kgf/cm2'
            }
        }]

    },
    // Add some life
    function (chart) {
        if (!chart.renderer.forExport) {
            setInterval(function () {
                var point = chart.series[0].points[0],
                    newVal,
                    inc = Math.round((Math.random() - 0.5) * 20);

                newVal = point.y + inc;
                if (newVal < 0 || newVal > 200) {
                    newVal = point.y - inc;
                }
                point.update(newVal);
            }, 5000);
        }
    });
}

/*chart2*/
function updateGraph2() { 
    var root = am5.Root.new("chartdiv");

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
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX:true
    }));
    
    chart.children.unshift(am5.Label.new(root, {
        text: "Max_Depth",
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
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // // Create axes
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        baseInterval: { 
            timeUnit: "second", 
            count: 1 
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
    }));
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        min: 0,
        autoGridCount: false,
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
    var series = chart.series.push(am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
        name: "Depth",
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
            radius: 3,
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
    setInterval(function () {
        addData();
    }, 5000);

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
    var root = am5.Root.new("chartdiv3");

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
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
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
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // // Create axes
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        baseInterval: { 
            timeUnit: "second", 
            count: 1 
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
    }));
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
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
    var series = chart.series.push(am5xy.LineSeries.new(root, {
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
            radius: 3,
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
    setInterval(function () {
        addData();
    }, 5000);

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
    var root = am5.Root.new("chartdiv4");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
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
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.3,
      baseInterval: {
        timeUnit: "second",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
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
    var series = chart.series.push(am5xy.LineSeries.new(root, {
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
            radius: 3,
            fill: series.get("fill")
          })
        })
    });
    series.strokes.template.setAll({
        strokeWidth: 2
    });
    
    series.get("tooltip").get("background").set("fillOpacity", 0.5);

    var series2 = chart.series.push(am5xy.LineSeries.new(root, {
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
            radius: 3,
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
    setInterval(function () {
        addData();
    }, 5000);

    function addData() {
        // Data
        let data = arr4;
        
        series.data.setAll(data);
        series2.data.setAll(data);
    }
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);
}

/*chart5*/
function updateGraph5() {
    var root = am5.Root.new("chartdiv5");

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
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX:true
    }));
    
    chart.children.unshift(am5.Label.new(root, {
        text: "Beat_position",
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
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // // Create axes
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        baseInterval: { 
            timeUnit: "second", 
            count: 1 
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
    }));
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        min: 0,
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
    var series = chart.series.push(am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
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
            radius: 3,
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
    setInterval(function () {
        addData();
    }, 5000);

    function addData() {
        // Data
        let data = arr5;
        series.data.setAll(data);
    }
    series.appear(1000);
    chart.appear(1000, 100);
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