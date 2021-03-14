function updateTeamInfo(teamData) {
    return `
        <h4 class="uppercase table-title">${teamData.api.teams[0].name}</h4>
        <img src="${teamData.api.teams[0].logo}" class="logo-img" alt="League Logo">
        <p>Founded: ${teamData.api.teams[0].founded}</p>
        <p>Venue: ${teamData.api.teams[0].venue_name}</p>
        <p>Venue Address: ${teamData.api.teams[0].venue_address}</p>
        <p>Venue City: ${teamData.api.teams[0].venue_city}</p>
        <p>Venue Capacity: ${teamData.api.teams[0].venue_capacity}</p>
    `
}

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
            <td><button type="button" class="btn btn-primary shadow-none btn-stats" onClick="statsButtonClicked(${value.fixture_id})">stats</button></td>
        </tr>`
    });
    resultsTable += `</table>`;
    resultsTable += `
        <div class="modal fade" id="fixture-modal" tabindex="-1" aria-labelledby="fixture-window" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p id=modal-teamid></p>
                </div>
            </div>
        </div>
        </div>
    `;
    //<td><button type="button" class="btn btn-primary btn-stats" data-bs-toggle="modal" data-bs-target="#exampleModal">stats</button></td>
    return resultsTable;
}

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

    $.each(teamFixturesData.api.fixtures, function (index, value) {
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

function statsButtonClicked(fixture_id) {
    console.log('Model: ',fixture_id);

    var oneDay = 1 * 24 * 60 * 60 * 1000;
    var url = "v2/statistics/fixture/" + fixture_id;

    getData(url, 'fixture' + fixture_id, oneDay).then(data => {
        console.log('Fixture Data:', data);
        $('#modal-teamid').html(`
            <tr>
                <td></td>
                <td>Home</td>
                <td>Away</td>
            </tr>    
            <tr>
                <td>Ball Possession</td>
                <td>${data.api.statistics["Ball Possession"].home}</td>
                <td>${data.api.statistics["Ball Possession"].away}</td>
            </tr>
            <tr>
                <td>Corner Kicks</td>
                <td>${data.api.statistics["Corner Kicks"].home}</td>
                <td>${data.api.statistics["Corner Kicks"].away}</td>
            </tr>
            <tr>
                <td>Fouls</td>
                <td>${data.api.statistics["Fouls"].home}</td>
                <td>${data.api.statistics["Fouls"].away}</td>
            </tr>
            <tr>
                <td>Goal Keeper Saves</td>
                <td>${data.api.statistics["Goalkeeper Saves"].home}</td>
                <td>${data.api.statistics["Goalkeeper Saves"].away}</td>
            </tr>
            <tr>
                <td>Offsides</td>
                <td>${data.api.statistics["Offsides"].home}</td>
                <td>${data.api.statistics["Offsides"].away}</td>
            </tr>
            <tr>
                <td>Passes %</td>
                <td>${data.api.statistics["Passes %"].home}</td>
                <td>${data.api.statistics["Passes %"].away}</td>
            </tr>
            <tr>
                <td>Passes Accurate</td>
                <td>${data.api.statistics["Passes accurate"].home}</td>
                <td>${data.api.statistics["Passes accurate"].away}</td>
            </tr>
            <tr>
                <td>Yellow Cards</td>
                <td>${data.api.statistics["Yellow Cards"].home}</td>
                <td>${data.api.statistics["Yellow Cards"].away}</td>
            </tr>
            <tr>
                <td>Red Cards</td>
                <td>${data.api.statistics["Red Cards"].home}</td>
                <td>${data.api.statistics["Red Cards"].away}</td>
            </tr>
            <tr>
                <td>Shots on Goal</td>
                <td>${data.api.statistics["Shots on Goal"].home}</td>
                <td>${data.api.statistics["Shots on Goal"].away}</td>
            </tr>
        
        `
        );
    });

    $('#modal-teamid').html(fixture_id);
    $('#fixture-modal').modal('show');
}

// Execute the function once the DOM is ready.
$(document).ready(function () {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const team_id = urlParams.get('team_id');
    const league_id = urlParams.get('league_id');
    console.log(team_id);
    console.log(league_id);
    // Calculate one day in milliseconds = (day * hours * minutes * seconds * msec)
    var oneDay = 1 * 24 * 60 * 60 * 1000;
    var url = "v2/teams/team/" + team_id;

    getData(url, 'team' + team_id, oneDay).then(data => {
        console.log(data);
        $("#team-info").html(updateTeamInfo(data));
    });

    url = "v2/fixtures/team/" + team_id + "/last/5";
    getData(url, 'fixtures' + team_id, oneDay).then(data => {
        console.log('Team Fixtures:', data);
        $("#results-table").html(updateResultsTable(data));
    });

    url = "v2/fixtures/team/" + team_id + "/next/5";
    getData(url, 'nextfixtures' + team_id, oneDay).then(data => {
        console.log('Next Fixtures:', data);
        $("#team-fixtures-table").html(updateTeamFixturesTable(data));
    });

    url = "v2/leagueTable/" + league_id;
    getData(url, 'table', oneDay).then(data => {
        console.log(data);
        $("#league-table").html(updateLeagueTable(data, league_id));
    });
});