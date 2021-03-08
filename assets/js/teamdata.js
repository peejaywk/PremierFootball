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

});