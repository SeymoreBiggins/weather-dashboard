const APIkey = "&appid=d7e0c195c64571ad19075476190817d8"
var queryURL = "";
var url = ""; // https://api.openweathermap.org/data/2.5/forecast?q=
var currentURL = "";
var cityHistoryContainer = document.getElementById("search-history-container");
let cities = [];
var city = "";

getHistory(); 
historyClick(); 
searchClick(); 

// pull saved cities from local storage and commit to array saved_cities
function getHistory(){
    let cityHistoryStore = JSON.parse(localStorage.getItem(cities));
    
    if (cityHistoryStore !== null) {
        cities = cityHistoryStore
    }
    
    createHistoryButtons();
}

// sets localstorage item to cities array 
function storeHistory(){
    localStorage.setItem("cities", JSON.stringify(cities)); 
}

// create buttons for each item in arr cities (this is stored history)
function createHistoryButtons(){
    cityHistoryContainer.innerHTML = "";
    // check if there is history stored in cities
    if (cities == null) {
        return;
    }
    // create array to list stored cities
    let storedCities = [... new Set(cities)];
    // loop through stored cities - making unique buttons for each
    for(let i=0; i < storedCities.length; i++){
        let storedCityName = storedCities[i];

        let buttonEl = document.createElement("button");
        buttonEl.textContent = storedCityName;
        buttonEl.setAttribute("class", "historyBtn");

        cityHistoryContainer.appendChild(buttonEl);
        historyClick();
    }
}

// listens for click on history buttons
function historyClick(){
    $(".historyBtn").on("click", function(event){
        event.preventDefault();
        city = $(this).text().trim();
        APIcall();
    })
}

// listens for click on search button
function searchClick() {
    $("#search-button").on("click", function(event){
        event.preventDefault();
        city = $(this).prev().val().trim();
        
        //push the city user entered into cities array 
        cities.push(city);
        //make sure cities array.length is never more than 8 
        if(cities.length > 5){
            cities.shift()
        }
        //return from function early if form is blank
        if (city == ""){
            return; 
        }
        APIcall();
        storeCities(); 
        createHistoryButtons();
    })
}

// lord help me
var APICall = function() {

    // url 'templates' without city or API key
    url = "https://api.openweathermap.org/data/2.5/forecast?q=";
    currentURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    // fleshed out url's w/ city and API key
    queryURL = url + city + APIkey;
    currentWeatherURL = currentURL + city + APIkey;

    $("#city-name").test("Current weather in " + city);
    $.ajax({
        url:queryURL,
        method: "GET",
    })

    .then(function(response){
        let day = 0;

        // loop through data sets
        for(let i=0; i< response.list.length; i++){
            
            // separate time from time/data
            if(response.list[i].dt_txt.split(" ")[1] == "12:00:00") // select data from noon
            {
                //if time of report is 3pm, populate text areas accordingly
                let dayCal = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                let monthCal = response.list[i].dt_txt.split("-")[1];
                let yearCal = response.list[i].dt_txt.split("-")[0];
                $("#" + day + "date").text(monthCal + "/" + dayCal + "/" + yearCal); 
                // convert to farenheit
                let temp = Math.round(((response.list[i].main.temp - 273.15) *9/5+32));
                $("#" + day + "temp").text("Temp: " + temp + String.fromCharCode(176)+"F");
                $("#" + day + "humidity").text("Humidity: " + response.list[i].main.humidity);
                $("#" + day + "icon").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                day++; 
            }   
        }
    })

    // display data in main div
    //function to display data in main div 
    $.ajax({
        url:currentWeatherURL,
        method: "GET", 
    })
    
    .then(function(currentData){
        let temp = Math.round(((currentData.main.temp - 273.15) * 9/5 + 32))
        console.log(currentData);
        
        $("#temperature").text("Temperature: " + temp + String.fromCharCode(176)+"F");
        $("#humidity").text("Humidity: " + currentData.main.humidity);
        $("#wind-speed").text("Wind Speed: " + currentData.wind.speed);
        // $("#uv-index").text("UV Index: " + currentData.uv)
        $("#current-pic").attr({"src": "http://openweathermap.org/img/w/" + currentData.weather[0].icon + ".png",
         "height": "100px", "width":"100px"});
    })
}

/* // listen for 'enter' key (kk=13) - if heard click submit btn
$("#searchTerm").keypress(function(event) { 

	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#search-button").click(); 
	} 
});

$("#search-button").on("click", function() {

    $('#forecastHeader').addClass('show');

    city = $("#searchTerm").val("");

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax({
        url:queryUrl,
        method: "GET"
    })
    .then(function (response){
        // convert to farenheit
        let temp = (response.main.temp - 273.15) * 1.80 + 32;
        console.log(temp);
    })
}) */