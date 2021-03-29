// Code from https://obfuscator.io/. Used to hide the API_FOOTBALL API Key
var _0x17d6 = ['9811CaACaI', '1323116hMGSjL', '581741oujLdu', '460783NcTkWs', '34GQsILH', '831227XIEAfm', '45604CTJBHL', '2blzVbM', '18351tUSCdr', '1LivCDg', '359pDzJPO', 'bac16047d5msh4c42fd455664d80p1c6cdajsn6a053785a5e9', '34SEtptG']; var _0x2eec = function (_0x225714, _0x5b7e6e) { _0x225714 = _0x225714 - 0xcb; var _0x17d6f0 = _0x17d6[_0x225714]; return _0x17d6f0; }; (function (_0x4ce0d7, _0x5066fb) { var _0x27ec8d = _0x2eec; while (!![]) { try { var _0x1c256c = -parseInt(_0x27ec8d(0xd7)) * parseInt(_0x27ec8d(0xd3)) + -parseInt(_0x27ec8d(0xd0)) + -parseInt(_0x27ec8d(0xd1)) * -parseInt(_0x27ec8d(0xcf)) + -parseInt(_0x27ec8d(0xd2)) * parseInt(_0x27ec8d(0xce)) + parseInt(_0x27ec8d(0xcd)) * -parseInt(_0x27ec8d(0xd4)) + -parseInt(_0x27ec8d(0xcc)) + -parseInt(_0x27ec8d(0xd5)) * -parseInt(_0x27ec8d(0xcb)); if (_0x1c256c === _0x5066fb) break; else _0x4ce0d7['push'](_0x4ce0d7['shift']()); } catch (_0x427680) { _0x4ce0d7['push'](_0x4ce0d7['shift']()); } } }(_0x17d6, 0xc123d)); function myAPIKey() { var _0xc06af4 = _0x2eec; return _0xc06af4(0xd6); } myAPIKey();

/**
 * Example code to read the API-FOOTBALL API copied from https://rapidapi.com/api-sports/api/api-football/endpoints
 * Modified to add a custom URL and to store the data locally to reduce the number of calls to the API.
 * The data will be updated depending on the value of the 'frequency' term passed in.
 * @param {string} url
 * @param {string} store_id
 * @param {number} frequency
 */
async function getData(url, store_id, frequency) {
    // Get current time
    var timeNow = new Date().getTime();

    // Retrieve the time that the requested data was last read
    var timeDataLastRead = 0;
    if (localStorage.getItem('timeDataLastRead' + store_id) != null) {
        timeDataLastRead = localStorage.getItem('timeDataLastRead' + store_id);
    }
    
    // If the data has expired the read the API - else retrieve from local storage
    if (timeNow >= parseInt(timeDataLastRead) + parseInt(frequency)) {
        const MY_API = myAPIKey();
        console.log('Data is stale so perform an API read.');
        let response = await fetch("https://api-football-v1.p.rapidapi.com/" + url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": `${MY_API}`,
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
            }
        }).then(result => {
            // CREDIT: https://stackoverflow.com/questions/54163952/async-await-in-fetch-how-to-handle-errors
            // Check for other errors that won't be handled by the .catch
            // Fetch only detects network errors          
            if (result.status >= 400 && result.status < 600) {
                throw new Error("Bad repsonse from server");
            }
            return result.json();
        }).catch(error => {
            console.log("Error:", error);
        });

        localStorage.setItem('localData' + store_id, JSON.stringify(response));
        localStorage.setItem('timeDataLastRead' + store_id, timeNow);
        return response;
    } else {
        console.log('Data is valid. No API call required.');
        let response = await JSON.parse(localStorage.getItem('localData' + store_id));
        let data = await response;
        return data;
    }
}

/**
 * Create an inline list containing the teams 'form' for the last 5 games.
 * Adds the appropriate class for win/draw/loss
 * @param {string} formString
 */
function createFormList(formString) {
    var formList = `<ul class="form-ul">`;
    for (var i = 0; i < formString.length; i++) {
        if (formString[i] == 'W' || formString[i] == 'w') {
            formList += `
                <li class="form-li form-li-won">${formString[i]}</li>
            `
        } else if (formString[i] == 'L' || formString[i] == 'l'){
            formList += `
                <li class="form-li form-li-lost">${formString[i]}</li>
            `
        } else {
            formList += `
                <li class="form-li form-li-draw">${formString[i]}</li>
            `
        }
    }
    formList += `</ul>`;
    return formList;
}

/**
 * Create the Premier League table from the leagueTableData object.
 * Inserts the 'form' list
 * On mobile devices certain columns will be hidden to enable the table to fit on the page.
 * @param {Object} leagueTableData
 * @param {string} league_id
 * @param {string} team_id
 */
function updateLeagueTable(leagueTableData, league_id, team_id) {
    var leagueTable = `<table class="league-table">`;
    leagueTable += `
    <tr class="table-header">
        <td>Rank</td>
        <td class="d-none d-md-table-cell"></td>
        <td>Team Name</td>
        <td data-bs-toggle="tooltip" title="Games Played">P</td>
        <td class="d-none d-md-table-cell">Form</td>
        <td data-bs-toggle="tooltip" title="Games Won">W</td>
        <td data-bs-toggle="tooltip" title="Games Drawn">D</td>
        <td data-bs-toggle="tooltip" title="Games Lost">L</td>
        <td class="d-none d-md-table-cell" data-bs-toggle="tooltip" title="Goals For">GF</td>
        <td class="d-none d-md-table-cell" data-bs-toggle="tooltip" title="Goals Against">GA</td>
        <td class="d-none d-md-table-cell" data-bs-toggle="tooltip" title="Goal Difference">GD</td>
        <td>Points</td>
    </tr>`;

    $.each(leagueTableData.api.standings[0], function (index, value) {
        // Add the row-highlight class if the team names match. Used to highlight the team
        // in the league table when displayed on the team page.
        var teamHighlight = value.team_id==team_id ? 'row-highlight' : '';
        
        var formList = createFormList(value.forme);
        leagueTable += `
        <tr class="table-text ${teamHighlight}">
            <td>${value.rank}</td>
            <td class="d-none d-md-table-cell"><img src="${value.logo}" width="20" height="20" alt="Home Team Logo"></td>
            <td class="table-teamname"><a href="team.html?league_id=${league_id}&team_id=${value.team_id}">${value.teamName}</a></td>
            <td>${value.all.matchsPlayed}</td>
            <td class="d-none d-md-table-cell">${formList}</td>
            <td>${value.all.win}</td>
            <td>${value.all.draw}</td>
            <td>${value.all.lose}</td>
            <td class="d-none d-md-table-cell">${value.all.goalsFor}</td>
            <td class="d-none d-md-table-cell">${value.all.goalsAgainst}</td>
            <td class="d-none d-md-table-cell">${value.goalsDiff}</td>
            <td>${value.points}</td>
        </tr>`;
    });

    leagueTable += `</table>`;
    return leagueTable;
}

