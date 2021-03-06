// Code from https://obfuscator.io/. Used to hide the API_FOOTBALL API Key
var _0x17d6 = ['9811CaACaI', '1323116hMGSjL', '581741oujLdu', '460783NcTkWs', '34GQsILH', '831227XIEAfm', '45604CTJBHL', '2blzVbM', '18351tUSCdr', '1LivCDg', '359pDzJPO', 'bac16047d5msh4c42fd455664d80p1c6cdajsn6a053785a5e9', '34SEtptG']; var _0x2eec = function (_0x225714, _0x5b7e6e) { _0x225714 = _0x225714 - 0xcb; var _0x17d6f0 = _0x17d6[_0x225714]; return _0x17d6f0; }; (function (_0x4ce0d7, _0x5066fb) { var _0x27ec8d = _0x2eec; while (!![]) { try { var _0x1c256c = -parseInt(_0x27ec8d(0xd7)) * parseInt(_0x27ec8d(0xd3)) + -parseInt(_0x27ec8d(0xd0)) + -parseInt(_0x27ec8d(0xd1)) * -parseInt(_0x27ec8d(0xcf)) + -parseInt(_0x27ec8d(0xd2)) * parseInt(_0x27ec8d(0xce)) + parseInt(_0x27ec8d(0xcd)) * -parseInt(_0x27ec8d(0xd4)) + -parseInt(_0x27ec8d(0xcc)) + -parseInt(_0x27ec8d(0xd5)) * -parseInt(_0x27ec8d(0xcb)); if (_0x1c256c === _0x5066fb) break; else _0x4ce0d7['push'](_0x4ce0d7['shift']()); } catch (_0x427680) { _0x4ce0d7['push'](_0x4ce0d7['shift']()); } } }(_0x17d6, 0xc123d)); function myAPIKey() { var _0xc06af4 = _0x2eec; return _0xc06af4(0xd6); } myAPIKey();


// Example code to read the API-FOOTBALL API copied from https://rapidapi.com/api-sports/api/api-football/endpoints
// Modified to add a custum URL and to only read data once per day.
async function getData(url) {
    // Get current time
    var timeNow = new Date().getTime();

    // Calculate one day in milliseconds = (day * hours * minutes * seconds * msec)
    var oneDay = 1 * 24 * 60 * 60 * 1000;

    var timeDataLastRead = 0;
    if (localStorage.getItem('timeDataLastRead') != null) {
        timeDataLastRead = localStorage.getItem('timeDataLastRead');
    }

    if (timeNow >= parseInt(timeDataLastRead) + parseInt(oneDay)) {
        const MY_API = myAPIKey();
        console.log('Data is stale so perform an API read.');
        let response = await fetch("https://api-football-v1.p.rapidapi.com/" + url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": `${MY_API}`,
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
            }
        });

        let data = await response.json();
        localStorage.setItem('covidData', JSON.stringify(data));
        localStorage.setItem('timeDataLastRead', timeNow);
        return data;
    } else {
        console.log('Data is valid. No API call required.');
        let response = await JSON.parse(localStorage.getItem('covidData'));
        let data = await response;
        return data;
    }
}

// Function to search 'data' for a league named 'leagueName'.
// Returns the league data if found, otherwise will return null.
function getLeagueData(data, leagueName) {
    var leagueData = null;
    $.each(data.api.leagues, function (index, value) {
        if (value.name == leagueName) {
            leagueData = value;
        }
    });
    return leagueData;
}

function updateHomePage(leagueData) {
    return `
        <p>${leagueData.name}</p>
        <img src="${leagueData.logo}" width="80" height="80" alt="League Logo">
        <p>Season Start: ${leagueData.season_start}</p>
        <p>Season End: ${leagueData.season_end}</p>
    `
}

// Execute the function once the DOM is ready.
$(document).ready(function () {
    // Get a list of the current active leagues in England
    const country = 'england';
    const url = "v2/leagues/current/" + country;
    getData(url).then(data => {
        // Find the league data for the Premiership
        var leagueData = getLeagueData(data, 'Premier League');
        console.log(leagueData);

        $("#league-info").html(updateHomePage(leagueData));
    });
})