console.log("client side javascript file loaded");

const fetchWeather = async ( location ) => {
    return dataObj = await fetch(`/weather?address=${location}`).then((response) => {
        return response.json().then(data => {
            return data;
        })
            .catch(error => console.log("error", error));
    })

}

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messagePara = document.querySelector("#message");
const TempPara = document.querySelector("#temp");
const HumidityPara = document.querySelector("#humid");
const errorPara = document.querySelector("#error");

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = searchInput.value;
    errorPara.textContent = "loading"
    messagePara.textContent = ""
    const data = await fetchWeather(location);
    console.log(data);
    
    if (data.error) {
        errorPara.style.display = "block";
        errorPara.textContent = data.error;
        messagePara.textContent = "";
        TempPara.textContent = ``
        HumidityPara.textContent = ``
        // messagePara.style.display = "none"
    } else {
        // messagePara.style.display = "block";
        // messagePara.textContent = data.forecast;
        errorPara.textContent = data.location;
        messagePara.textContent = `Currently ${data.forecast.currently.summary} sky here in ${data.address}.`
        TempPara.textContent = `Curreently ${data.forecast.currently.temperature} degree temperature going on and there is ${data.forecast.currently.precipProbability}% chance of rain as there ${data.forecast.currently.humidity * 100}% humidity.`
        HumidityPara.textContent = `wind speed is ${Math.round((data.forecast.currently.windSpeed || 0) )}km/h.`
        

        
    }
})