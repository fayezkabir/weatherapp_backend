console.log("client side javascript file loaded");

const fetchWeather = async ( location ) => {
    return dataObj = await fetch(`http://localhost:8080/weather?address=${location}`).then((response) => {
        return response.json().then(data => {
            return data;
        })
            .catch(error => console.log("error", error));
    })

}

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messagePara = document.querySelector("#message");
const errorPara = document.querySelector("#error");

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = searchInput.value;
    errorPara.textContent = "loading"
    messagePara.textContent = "loading"
    const data = await fetchWeather(location);
    
    if (data.error) {
        errorPara.style.display = "block";
        errorPara.textContent = data.error;
        messagePara.textContent = "";
        messagePara.style.display = "none"
    } else {
        messagePara.style.display = "block";
        messagePara.textContent = data.forecast;
        errorPara.textContent = data.location;
        
    }
})