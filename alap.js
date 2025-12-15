let lat=47.53333
let lon=21.63333

function keres(){
  lat=document.getElementById("szel").value
  lon=document.getElementById("hossz").value  
  terkep()
  adatLekeres()
}


function terkep(){
//terkep
var data = [{
  type:'scattermap',
  lat:[lat],
  lon:[lon],
  mode:'markers',
  marker: {
    size:14
  },
  text:['']
}]

var layout = {
  autosize: true,
  hovermode:'closest',
  map: {
    bearing:0,
    center: {
      lat:lat,
      lon:lon
    },
    pitch:0,
    zoom:5
  },
}

Plotly.newPlot('terkep', data, layout)
}

terkep()

//diagram
async function adatLekeres() {
  let x = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
  let y = await x.json();
  megjelenit(y);
}

adatLekeres()

const megjelenit=(y)=>{
    console.log(y)

    var data = [
    {
        x: y.hourly.time,
        y: y.hourly.temperature_2m,
        type: 'bar'
    }
    ];

    Plotly.newPlot('myDiv', data);


    //napi maximum hőmérsékletek
    xMax=[]
    yMax=[]
    for (let i = 0; i < 7; i++) {
        let maxIdo=""
        let maxHo=-9999
        for (let j = 0; j < 24; j++) {
            if (y.hourly.temperature_2m[i*24+j]>maxHo){
                maxHo=y.hourly.temperature_2m[i*24+j]
                maxIdo=y.hourly.time[i*24+j]
                
            }
            
        }
        yMax.push(maxHo)
        xMax.push(maxIdo)
        
    }

    console.log(yMax)

    var dataMax = [
    {
        x: xMax,
        y: yMax,
        type: 'bar'
    }
    ];

    Plotly.newPlot('napiMax', dataMax);


    //napi minimum hőmérsékletek
    xMin=[]
    yMin=[]
    for (let i = 0; i < 7; i++) {
        let minIdo=""
        let minHo=9999
        for (let j = 0; j < 24; j++) {
            if (y.hourly.temperature_2m[i*24+j]<minHo){
                minHo=y.hourly.temperature_2m[i*24+j]
                minIdo=y.hourly.time[i*24+j]
                
            }
            
        }
        yMin.push(minHo)
        xMin.push(minIdo)
        
    }

    console.log(yMin)

    var dataMin = [
    {
        x: xMin,
        y: yMin,
        type: 'bar'
    }
    ];

    Plotly.newPlot('napiMin', dataMin);







}

