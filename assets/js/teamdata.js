/**
 * Create the html for the team page. Contains the team logo and general info on the team.
 * @param {Object} teamData 
 */
function updateTeamInfo(teamData) {
    return `
        <h4 class="uppercase table-title">${teamData.api.teams[0].name}</h4>
        <img src="${teamData.api.teams[0].logo}" class="logo-img" alt="League Logo">

        <div>
            <div class="inline-block title-text">Founded:</div>
            <div class="inline-block info-text">${teamData.api.teams[0].founded}</div>
        </div>
        <div>
            <div class="inline-block title-text">Venue:</div>
            <div class="inline-block info-text">${teamData.api.teams[0].venue_name}</div>
        </div>
        <div>
            <div class="inline-block title-text">Address:</div>
            <div class="inline-block info-text">${teamData.api.teams[0].venue_address}</div>
        </div>
        <div>
            <div class="inline-block title-text">City:</div>
            <div class="inline-block info-text">${teamData.api.teams[0].venue_city}</div>
        </div>
        <div>
            <div class="inline-block title-text">Capacity:</div>
            <div class="inline-block info-text">${teamData.api.teams[0].venue_capacity}</div>
        </div>
    `
}

/**
 * Update the team results table
 * Adds the 'stats' button to the table which calls the modal window
 * @param {Object} resultsData 
 */
function updateResultsTable(resultsData) {
    var resultsTable = `<table class="fixture-table">`;
    resultsTable += `
    <tr class="table-header">
        <td>Date</td>
        <td class="d-none d-md-table-cell"></td>
        <td>Home Team</td>
        <td></td>
        <td></td>
        <td class="d-none d-md-table-cell"></td>
        <td>Away Team</td>
        <td></td>
     </tr>`

    //Loop through each fixture to generate the results table for the team.
    $.each(resultsData.api.fixtures, function (index, value) {
        var fixtureDate = new Date(value.event_date);
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

        resultsTable += `
        <tr class="table-text">
            <td>${fixtureDate.toLocaleDateString('en-GB', options)}</td>
            <td class="d-none d-md-table-cell"><img src="${value.homeTeam.logo}" width="20" height="20" alt="Home Team Logo"></td>
            <td class="table-teamname"><a href="team.html?league_id=${value.league_id}&team_id=${value.homeTeam.team_id}">${value.homeTeam.team_name}</a></td>
            <td>${value.goalsHomeTeam}</td>
            <td>${value.goalsAwayTeam}</td>
            <td class="d-none d-md-table-cell"><img src="${value.awayTeam.logo}" width="20" height="20" alt="Home Team Logo"></td>
            <td class="table-teamname"><a href="team.html?league_id=${value.league_id}&team_id=${value.awayTeam.team_id}">${value.awayTeam.team_name}</a></td>
            <td><button type="button" class="btn btn-primary shadow-none btn-stats" onClick="statsButtonClicked(${value.fixture_id},'${value.homeTeam.team_name}','${value.awayTeam.team_name}')">stats</button></td>
        </tr>`
    });
    resultsTable += `</table>`;
    // Add the html to create the template for the modal.
    resultsTable += `
        <div class="modal fade" id="fixture-modal" tabindex="-1" aria-labelledby="fixture-window" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabel"></h5>
                    <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p id=modal-teamid></p>
                </div>
            </div>
        </div>
        </div>
    `;
    return resultsTable;
}

/**
 * Update the team fixtures table
 * @param {Object} teamFixturesData 
 */
function updateTeamFixturesTable(teamFixturesData) {
    var teamFixtureTable = `<table class="fixture-table">`;
    teamFixtureTable += `
    <tr class="table-header">
        <td>Date</td>
        <td class="d-none d-md-table-cell"></td>
        <td>Home Team</td>
        <td class="d-none d-md-table-cell"></td>
        <td>Away Team</td>
        <td>Kickoff</td>
    </tr>`

    // Loop through the fixtures table and generate the table
    $.each(teamFixturesData.api.fixtures, function (index, value) {
        //Convert the event date into more user friendly format (Fri, 19 March 2021)
        var fixtureDate = new Date(value.event_date);
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

        teamFixtureTable += `
        <tr class="table-text">
            <td>${fixtureDate.toLocaleDateString('en-GB', options)}</td>
            <td class="d-none d-md-table-cell"><img src="${value.homeTeam.logo}" width="20" height="20" alt="Home Team Logo"></td>
            <td class="table-teamname"><a href="team.html?league_id=${value.league_id}&team_id=${value.homeTeam.team_id}">${value.homeTeam.team_name}</a></td>
            <td class="d-none d-md-table-cell"><img src="${value.awayTeam.logo}" width="20" height="20" alt="Home Team Logo"></td>
            <td class="table-teamname"><a href="team.html?league_id=${value.league_id}&team_id=${value.awayTeam.team_id}">${value.awayTeam.team_name}</a></td>
             <td>${fixtureDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</td>
        </tr>`
    });
    teamFixtureTable += `</table>`;
    return teamFixtureTable;
}

/**
 * Request the statistics for the given fixture_id and update the contents of the modal window
 * Team names are passed in so they can also be displayed in the window
 * @param {string} fixture_id 
 * @param {string} home_team 
 * @param {string} away_team 
 */
function statsButtonClicked(fixture_id, home_team, away_team) {
    var oneDay = 1 * 24 * 60 * 60 * 1000;
    var url = "v2/statistics/fixture/" + fixture_id;

    getData(url, 'fixture' + fixture_id, oneDay).then(data => {
        // Wait for the API data to return then update the modal html.
        // Replace any null parameters with 0
        var red_card_home = data.api.statistics["Red Cards"].home == null ? 0 : data.api.statistics["Red Cards"].home;
        var red_card_away = data.api.statistics["Red Cards"].away == null ? 0 : data.api.statistics["Red Cards"].away;
        var yellow_card_home = data.api.statistics["Yellow Cards"].home == null ? 0 : data.api.statistics["Yellow Cards"].home;
        var yellow_card_away = data.api.statistics["Yellow Cards"].away == null ? 0 : data.api.statistics["Yellow Cards"].away;
        
        $('#modal-teamid').html(`
            <table class="league-table">
                <tr class="table-header">
                    <td></td>
                    <td>Home</td>
                    <td>Away</td>
                </tr>    
                <tr class="table-text">
                    <td>Ball Possession</td>
                    <td>${data.api.statistics["Ball Possession"].home}</td>
                    <td>${data.api.statistics["Ball Possession"].away}</td>
                </tr>
                <tr class="table-text">
                    <td>Corner Kicks</td>
                    <td>${data.api.statistics["Corner Kicks"].home}</td>
                    <td>${data.api.statistics["Corner Kicks"].away}</td>
                </tr>
                <tr class="table-text">
                    <td>Fouls</td>
                    <td>${data.api.statistics["Fouls"].home}</td>
                    <td>${data.api.statistics["Fouls"].away}</td>
                </tr>
                <tr class="table-text">
                    <td>Goal Keeper Saves</td>
                    <td>${data.api.statistics["Goalkeeper Saves"].home}</td>
                    <td>${data.api.statistics["Goalkeeper Saves"].away}</td>
                </tr>
                <tr class="table-text">
                    <td>Offsides</td>
                    <td>${data.api.statistics["Offsides"].home}</td>
                    <td>${data.api.statistics["Offsides"].away}</td>
                </tr>
                <tr class="table-text">
                    <td>Passes %</td>
                    <td>${data.api.statistics["Passes %"].home}</td>
                    <td>${data.api.statistics["Passes %"].away}</td>
                </tr>
                <tr class="table-text">
                    <td>Passes Accurate</td>
                    <td>${data.api.statistics["Passes accurate"].home}</td>
                    <td>${data.api.statistics["Passes accurate"].away}</td>
                </tr>
                <tr class="table-text">
                    <td>Yellow Cards</td>
                    <td>${yellow_card_home}</td>
                    <td>${yellow_card_away}</td>
                </tr>
                <tr class="table-text">
                    <td>Red Cards</td>
                    <td>${red_card_home}</td>
                    <td>${red_card_away}</td>
                </tr>
                <tr class="table-text">
                    <td>Shots on Goal</td>
                    <td>${data.api.statistics["Shots on Goal"].home}</td>
                    <td>${data.api.statistics["Shots on Goal"].away}</td>
                </tr>     
            </table>  
        `
        );
    });
    $('#modalLabel').html(home_team+' v '+away_team);
    $('#fixture-modal').modal('show');
}

/**
 * Execute the function once the DOM is ready.
 */
$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // Extract the team_id and league_id from the page URL. This is passed from the home page.
    const team_id = urlParams.get('team_id');
    const league_id = urlParams.get('league_id');

    // Calculate one day in milliseconds = (day * hours * minutes * seconds * msec)
    var oneDay = 1 * 24 * 60 * 60 * 1000;
    
    // Request the team data from the API
    var url = "v2/teams/team/" + team_id;
    getData(url, 'team' + team_id, oneDay).then(data => {
        $("#team-info").html(updateTeamInfo(data));
    });

    // Request the last 5 results for the team from the API
    url = "v2/fixtures/team/" + team_id + "/last/5";
    getData(url, 'fixtures' + team_id, oneDay).then(data => {
        $("#results-table").html(updateResultsTable(data));
    });

    // Request the next 5 fixtures for the team from the API
    url = "v2/fixtures/team/" + team_id + "/next/5";
    getData(url, 'nextfixtures' + team_id, oneDay).then(data => {
        $("#team-fixtures-table").html(updateTeamFixturesTable(data));
    });

    // Request the league standings from the API
    url = "v2/leagueTable/" + league_id;
    getData(url, 'table', oneDay).then(data => {
        $("#league-table").html(updateLeagueTable(data, league_id));
    });
});