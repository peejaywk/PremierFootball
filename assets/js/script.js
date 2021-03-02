// Example code to read the API-FOOTBALL API copied from https://rapidapi.com/api-sports/api/api-football/endpoints
// Modified to add a custum URL.
function getData(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    const data = null;

    // Wait for the request to finish and for the 'OK' status.
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", "https://api-football-v1.p.rapidapi.com/" + url);
    xhr.setRequestHeader("x-rapidapi-key", "bac16047d5msh4c42fd455664d80p1c6cdajsn6a053785a5e9");
    xhr.setRequestHeader("x-rapidapi-host", "api-football-v1.p.rapidapi.com");

    xhr.send(data);
}




// Execute the function once the DOM is ready.
$(document).ready(function () {
    // To minimise API calls the league data is only read once per day or when no data has been read (new browser/user)
    // Read back the time the API was last read to fetch the league information
    var dateLeagueRead = 0;
    if (localStorage.getItem('lastDateLeagueRead') != null) {
        dateLeagueRead = localStorage.getItem('lastDateLeagueRead');
    }

    // Get current time
    var timeNow = new Date().getTime();

    // Calculate one day in milliseconds = (day * hours * minutes * seconds * msec)
    var oneDay = 1 * 24 * 60 * 1000;

    console.log('Time Now ' + timeNow);
    console.log('Data Read ' + dateLeagueRead);

    if (timeNow >= dateLeagueRead + oneDay) {
        console.log('Data is stale so perform an API read.');
    } else {
        console.log('Data is valid. No API call required.');
    }

    // const url = "v2/leagues/current/england";
    // var data = null;
    // getData(url, function(data) {
    //     console.log(data);
    //     localStorage.setItem('leagueData',JSON.stringify(data));
    // });
    localStorage.setItem('lastDateLeagueRead', timeNow);

    var retrievedData = JSON.parse(localStorage.getItem('leagueData'));
    console.log(retrievedData);
    $.each(retrievedData.api.leagues, function (index, value) {
        if (value.name == "Premier League") {
            console.log(index + ": " + value.name);
            console.log(index + ": " + value.league_id);
            return false;
        }
    });
})