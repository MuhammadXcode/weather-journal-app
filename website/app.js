/* Global Variables */
const apiKey = 'ce92cfeefa125ad76290f155bbdab6dc';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();
const btn = document.querySelector("#generate");

btn.addEventListener('click',getWeather);

async function getWeather(){
    try{
        const zipCode = document.querySelector("#zip").value;
        if(!zipCode){
            return alert("You didn't enter a zip code!!");
        }
        const fullURL = `api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
        const resp = await fetch(fullURL);
        if ((resp.status === 404) || (resp.status === 400)){
            return alert(`Invalid zip code! 
            Please enter a valid zip code`);
        }
        const fullData = await resp.json();
        let temp = fullData.main.temp;
        return temp;
    }catch(error){
        console.log(error);
    } //appropriately handle the error
}
