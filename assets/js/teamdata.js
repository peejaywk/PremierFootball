function updateTeamInfo(teamData) {
    return `
        <h4>${teamData.api.teams[0].name}</h4>
        <img src="${teamData.api.teams[0].logo}" min-width="80" min-height="80" alt="League Logo">
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
    <tr>
        <td>Date</td>
        <td></td>
        <td>Home Team</td>
        <td></td>
        <td></td>
        <td></td>
        <td>Away Team</td>
     </tr>`
 
    $.each(resultsData.api.fixtures, function (index, value) {
        var fixtureDate = new Date(value.event_date);
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

        resultsTable += `
        <tr class="table-text">
            <td>${fixtureDate.toLocaleDateString('en-GB', options)}</td>
            <td><img src="${value.homeTeam.logo}" width="20" height="20" alt="Home Team Logo"></td>
            <td><a href="team.html?team_id=${value.homeTeam.team_id}">${value.homeTeam.team_name}</a></td>
            <td>${value.goalsHomeTeam}</td>
            <td>${value.goalsAwayTeam}</td>
            <td><img src="${value.awayTeam.logo}" width="20" height="20" alt="Home Team Logo"></td>
            <td><a href="team.html?team_id=${value.awayTeam.team_id}">${value.awayTeam.team_name}</a></td>
        </tr>`
    });
    resultsTable += `</table>`;
    return resultsTable;
}

function updateTeamFixturesTable(teamFixturesData) {
    var teamFixtureTable = `<table class="fixture-table">`;
    teamFixtureTable += `
    <tr>
        <td>Date</td>
        <td></td>
        <td>Home Team</td>
        <td></td>
        <td>Away Team</td>
        <td>Kickoff</td>
    </tr>`
 
    $.each(teamFixturesData.api.fixtures, function (index, value) {
        var fixtureDate = new Date(value.event_date);
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

        teamFixtureTable += `
        <tr class="table-text">
            <td>${fixtureDate.toLocaleDateString('en-GB', options)}</td>
            <td><img src="${value.homeTeam.logo}" width="20" height="20" alt="Home Team Logo"></td>
            <td><a href="team.html?team_id=${value.homeTeam.team_id}">${value.homeTeam.team_name}</a></td>
            <td><img src="${value.awayTeam.logo}" width="20" height="20" alt="Home Team Logo"></td>
            <td><a href="team.html?team_id=${value.awayTeam.team_id}">${value.awayTeam.team_name}</a></td>
             <td>${fixtureDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</td>
        </tr>`
    });
    teamFixtureTable += `</table>`;
    return teamFixtureTable;
}

// Execute the function once the DOM is ready.
$(document).ready(function () {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const team_id = urlParams.get('team_id')
    console.log(team_id);

    // Calculate one day in milliseconds = (day * hours * minutes * seconds * msec)
    var oneDay = 1 * 24 * 60 * 60 * 1000;
    var url = "v2/teams/team/" + team_id;
    
    getData(url, 'team'+team_id, oneDay).then(data => {
        console.log(data);
        $("#team-info").html(updateTeamInfo(data));
    });

    url = "v2/fixtures/team/" + team_id + "/last/5";
    getData(url, 'fixtures'+team_id, oneDay).then(data => {
        console.log('Team Fixtures:', data);
        $("#results-table").html(updateResultsTable(data));
    })

    url = "v2/fixtures/team/" + team_id + "/next/5";
    getData(url, 'nextfixtures'+team_id, oneDay).then(data => {
        console.log('Next Fixtures:', data);
        $("#team-fixtures-table").html(updateTeamFixturesTable(data));
    })
});