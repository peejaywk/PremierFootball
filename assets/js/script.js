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
        <img src="${leagueData.logo}" min-width="80" min-height="80" alt="League Logo">
        <p>Season Start: ${leagueData.season_start}</p>
        <p>Season End: ${leagueData.season_end}</p>
    `
}

// Create a table containing the upcoming fixtures.
function updateFixturesTable(fixtureList) {
    var fixtureTable = `<table class="fixture-table">`;
    fixtureTable += `
    <tr class="table-header">
        <td>Date</td>
        <td></td>
        <td>Home Team</td>
        <td></td>
        <td>Away Team</td>
        <td>Kickoff</td>
    </tr>`
 
    $.each(fixtureList.api.fixtures, function (index, value) {
        var fixtureDate = new Date(value.event_date);
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

        fixtureTable += `
        <tr class="table-text">
            <td>${fixtureDate.toLocaleDateString('en-GB', options)}</td>
            <td><img src="${value.homeTeam.logo}" width="20" height="20" alt="Home Team Logo"></td>
            <td class="uppercase table-teamname"><a href="team.html?league_id=${value.league_id}&team_id=${value.homeTeam.team_id}">${value.homeTeam.team_name}</a></td>
            <td><img src="${value.awayTeam.logo}" width="20" height="20" alt="Home Team Logo"></td>
            <td class="uppercase table-teamname"><a href="team.html?league_id=${value.league_id}&team_id=${value.awayTeam.team_id}">${value.awayTeam.team_name}</a></td>
             <td>${fixtureDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</td>
        </tr>`
    });
    fixtureTable += `</table>`;
    return fixtureTable;
}

// Execute the function once the DOM is ready.
$(document).ready(function () {
    // Calculate one day in milliseconds = (day * hours * minutes * seconds * msec)
    var oneDay = 1 * 24 * 60 * 60 * 1000;

    // Get a list of the current active leagues in England
    const country = 'england';
    var url = "v2/leagues/current/" + country;
    getData(url, 'league', oneDay).then(data => {
        // Find the league data for the Premiership
        var leagueData = getLeagueData(data, 'Premier League');
        console.log(leagueData);

        $("#league-info").html(updateHomePage(leagueData));

        return leagueData.league_id;
    }).then(league_id => {
        var url = "v2/fixtures/league/" + league_id + "/next/10?timezone=Europe%2FLondon";
        getData(url, 'fixtures', oneDay).then(data => {
            console.log(data);
            $("#fixtures-table").html(updateFixturesTable(data));
        });
        var url = "v2/leagueTable/" + league_id;
        getData(url, 'table', oneDay).then(data => {
            console.log(data);
            $("#league-table").html(updateLeagueTable(data, league_id));
        });
    });
})

