const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const team_id = urlParams.get('team_id')
console.log(team_id);