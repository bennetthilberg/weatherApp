let input = document.querySelector('#theInput');
let theBtn = document.querySelector('#theBtn');
let weatherP = document.querySelector('#weatherP');
let imgHolder = document.querySelector('#imgHolder');

theBtn.addEventListener('click', () => processBtn(input.value));

async function getWeather(city){
    try{
        let weather = await fetch(`http://api.weatherapi.com/v1/current.json?key=840b2c1f1fab4e8db48225750232504&q=${city}`,
        {mode: "cors"});
        let response = await weather.json();
        return response.current.temp_f;
    }
    catch{
        console.log('getWeather caught')
    }   
}
async function processBtn(city){
    let weatherResp = await getWeather(city);
    input.value = '';
    weatherP.textContent = `${weatherResp}`;
    findImg(weatherResp);
}

function findImg(temp){
    let src;
    if(temp < 50){
        src = './imgs/cold.jpeg';
    }
    else if(temp >= 50 && temp < 80){
        src = './imgs/medium.png';
    }
    else if(temp >= 80){
        src = './imgs/hot.jpeg';
    }
    else{
        src = './imgs/question.png'
    }
    let img = document.createElement('img');
    img.src = src;
    imgHolder.replaceChildren(img);
}