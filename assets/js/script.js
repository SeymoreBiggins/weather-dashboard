const APIkey = "&appid=d7e0c195c64571ad19075476190817d8"
var queryURL = "";
var url = ""; // https://api.openweathermap.org/data/2.5/forecast?q=
var currentURL = "";
var cityHistoryContainer = document.getElementById("history");
let cities = [];
var city = "";

// store value of searchbar
city = $("#city-input").val();

// pull saved cities from local storage and commit to array saved_cities
function getHistory(){
    let cityHistoryStore = JSON.parse(localStorage.getItem(cities));

    if (cityHistoryStore !== null) {
        cities = cityHistoryStore
    }

    createHistoryButtons();
}

// create buttons for each item in arr cities (this is stored history)
function createHistoryButtons(){
    citiesHistoryContainer.innerHTML = "";
    // check if there is history stored in cities
    if (cities == null) {
        return;
    }
    // create array to list stored cities
    let storedCities = [... new Set(cities)];
    // loop through stored cities - making unique buttons for each
    for(let i=0; i < unique_cities.length; i++){
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
        APIcall();
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

//sets localstorage item to cities array 
function storeHistory(){
    localStorage.setItem("cities", JSON.stringify(cities)); 
}

getHistory(); 
listClicker(); 
searchClicker(); 