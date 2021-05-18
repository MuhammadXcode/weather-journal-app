/* Global Variables */
const apiKey = 'ce92cfeefa125ad76290f155bbdab6dc';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    // get weather data from the API
    const feeling = document.querySelector("#feelings").value;
    getWeather ('/getWeatherData',)
    .then (temp =>{
        // Post request here
        postData('/addWeatherData',{date:newDate, temp: temp, feeling:feeling})
    })
    .then(()=>{
        // Update UI here
        updateUI();
    })}
    const getWeather = async ()=>{
        const zipCode = document.querySelector("#zip").value;
        // Check for the entered zip code
        if(!zipCode){
            return alert("You didn't enter a zip code!!");
        }
        const fullURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
        const resp = await fetch(fullURL);
            try{
                if ((resp.status === 404) || (resp.status === 400)){
                    return alert(`Invalid zip code! 
                    Please enter a valid zip code`);
                }
                const fullData = await resp.json();
                console.log(fullData.main.temp);
                return fullData.main.temp;
                // let temp = fullData.main.temp;
                // return temp;
            }catch(error){
                console.log(error);
            } //appropriately handle the error
    }
    // post the response data + feeling to the server
    const postData = async ( url = '', fullData = {})=>{
          const response = await fetch(url, {
          method: 'POST', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
         // Body data type must match "Content-Type" header        
          body: JSON.stringify(fullData), 
        });
        try {
            const nData = await response.json();
            console.log(nData);
            return nData;
          }catch(error) {
          console.log("error", error);
          //appropriately handle the error
          }
    }
    // Update UI 
    const updateUI = async()=>{
        const request = await fetch('all');
        try{
            const allData = await request.json();
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = `${allData.temp} C`;
            document.getElementById('content').innerHTML = allData.feeling;
        }catch(err){
            console.log("Error", err);
        }
    }
