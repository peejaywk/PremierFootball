/**
 * Function to search 'data' for a league named 'leagueName'.
 * Returns the league data if found, otherwise will return null.
 * @param {Object} data
 * @param {string} leagueName
*/
function getLeagueData(data, leagueName) {
    var leagueData = null;
    $.each(data.api.leagues, function (index, value) {
        if (value.name == leagueName) {
            leagueData = value;
        }
    });
    return leagueData;
}

/**
 * Update the home page with the Premier League logo and the season start and end dates
 * @param {Object} leagueData
 */
function updateHomePage(leagueData) {
    // Convert date into a user friendly format.
    var seasonStart = new Date(leagueData.season_start);
    var seasonEnd = new Date(leagueData.season_end);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    return `
        <h4 class="uppercase table-title">Premier League</h4>
        <div class="image-section">
            <img src="${leagueData.logo}" class="logo-img" alt="League Logo">
        </div>
        <div>
            <div class="inline-block title-text">Season Start:</div>
            <div class="inline-block info-text">${seasonStart.toLocaleDateString('en-GB', options)}</div>
        </div>
        <div>
            <div class="inline-block title-text">Season End:</div>
            <div class="inline-block info-text">${seasonEnd.toLocaleDateString('en-GB', options)}</div>
        </div>
    `;
}

/**
 * Create a table containing the upcoming fixtures.
 * @param {Object} fixtureList
 */
function updateFixturesTable(fixtureList) {
    var fixtureTable = `<table class="fixture-table">`;
    fixtureTable += `
    <tr class="table-header">
        <td>Date</td>
        <td class="d-none d-md-table-cell"></td>
        <td>Home Team</td>
        <td class="d-none d-md-table-cell"></td>
        <td>Away Team</td>
        <td>Kickoff</td>
    </tr>`;
 
    // Loop through each fixture and update the table
    $.each(fixtureList.api.fixtures, function (index, value) {
        //Convert the event date into more user friendly format (Fri, 19 March 2021)
        var fixtureDate = new Date(value.event_date);
        const options1 = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        const options2 = { hour: '2-digit', minute: '2-digit' };

        fixtureTable += `
        <tr class="table-text">
            <td>${fixtureDate.toLocaleDateString('en-GB', options1)}</td>
            <td class="d-none d-md-table-cell"><img src="${value.homeTeam.logo}" width="20" height="20" alt="Home Team Logo"></td>
            <td class="table-teamname"><a href="team.html?league_id=${value.league_id}&team_id=${value.homeTeam.team_id}">${value.homeTeam.team_name}</a></td>
            <td class="d-none d-md-table-cell"><img src="${value.awayTeam.logo}" width="20" height="20" alt="Home Team Logo"></td>
            <td class="table-teamname"><a href="team.html?league_id=${value.league_id}&team_id=${value.awayTeam.team_id}">${value.awayTeam.team_name}</a></td>
            <td>${fixtureDate.toLocaleTimeString('en-GB', options2)}</td>
        </tr>`;
    });
    fixtureTable += `</table>`;
    return fixtureTable;
}


/**
 * Execute the function once the DOM is ready.
 */
$(document).ready(function () {
    // Calculate one day in milliseconds = (day * hours * minutes * seconds * msec)
    var oneDay = 1 * 24 * 60 * 60 * 1000;

    // Get a list of the current active leagues in England
    const country = 'england';
    var url = "v2/leagues/current/" + country;
    getData(url, 'league', oneDay).then((data) => {
        // Find the league data for the Premiership
        var leagueData = getLeagueData(data, 'Premier League');

        $("#league-info").html(updateHomePage(leagueData));

        return leagueData.league_id;
    }).then((league_id) => { // Once the league_id has been returned from the API update the fixtures and leagues table
        //Request the league fixtures for the next 10 days
        url = "v2/fixtures/league/" + league_id + "/next/10?timezone=Europe%2FLondon";
        getData(url, 'fixtures', oneDay).then((data) => {
            $("#fixtures-table").html(updateFixturesTable(data));
        });

        //Request the current standings for the Premier League
        url = "v2/leagueTable/" + league_id;
        getData(url, 'table', oneDay).then((data) => {
            $("#league-table").html(updateLeagueTable(data, league_id, ''));
        });

        // Initialise tooltips - select using the 'data-bs-toggle' attribute.
        // Example code taken from https://getbootstrap.com/docs/5.0/components/tooltips/
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    });
});

