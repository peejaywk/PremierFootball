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

function getCurrentLeagues(country) {
    var data = null;
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
        const url = "v2/leagues/current/" + country;
        getData(url, function (data) {
            console.log(data);
            localStorage.setItem('leagueData', JSON.stringify(data));
        });
    } else {
        console.log('Data is valid. No API call required.');
        data = JSON.parse(localStorage.getItem('leagueData'));
        localStorage.setItem('lastDateLeagueRead', timeNow);
    }

    return data;
}

// Function to search 'data' for a league named 'leagueName'.
// Returns the league ID if found, otherwise will return null.
function getLeagueID(data, leagueName) {
    var league_id = null;
    $.each(data.api.leagues, function (index, value) {
        if (value.name == leagueName) {
             league_id = value.league_id;
        }
    });
    return league_id;
}

// Execute the function once the DOM is ready.
$(document).ready(function () {

    // Get a list of the current active leagues in England
    var retrievedData = getCurrentLeagues('england');
    
    // Find the league ID for the Premiership
    var leagueID = getLeagueID(retrievedData, 'Premier League');

    console.log(retrievedData);
    console.log('League ID: ' + leagueID);

})