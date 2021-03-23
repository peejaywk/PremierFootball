### User Story Testing
#### New Users

* *"As a user, I want to easily find my team so I can stay up to date on fixtures and results."*
    * All the current Premier League teams are listed in the league table on the home page allowing the user to select their team. Clicking any team name
	on the home page will open a dedicated page to that team that will list previous results and upcoming fixtures for that team.
* *"As a user, I want to see a list of up coming fixtures with location and kick-off times so I can plan ahead."*
    * The team page lists all upcoming fixtures with dates and kickoff times. The address of the home team is also displayed on the page below the team logo.
* *"As a user, I want to see the latest form of my team."*
    * The team page shows the form of the team covering the last five games. These are colour coded to show wins, losses and draws.
* *"As a user, I want to see live scores whenever there are any Premierships games being played so I can keep track of games when I can't watch live on TV."*
    * This feature hasn't been implemented as part of this development cycle - this was to limit the number of calls to the API. This could be added in the future
	as a premium feature as the data is available via the API.
* *"As a user, I want to see the league table for the Premiership so I can see where my team sit overall in the league."*
    * The league table is clearly displayed on both the Home and Team page. On the Team page the team currently being viewed is highlighted in the league table.
* *"As a user, I want to be able to follow the website on social media to keep up to date on any changes to the website."*
    * Social media links are listed in the footer - these are visible on all pages.

#### Returning Users
* *"As a returning user, I want the website to remember my team selection so I don't have to keep selecting my team each time I visit the site."*
    

#### Website Owner
* *"As the owner, I want display data in a clear and informative way that works on any platfrom."*

* *"As the owner, I want the ability to expand the website in the future to add more leagues from the UK and around the world."*
    * The API covers all the major leagues across a wide range of counties so the website can be updated to make use of this data. 
    The API call function can accept any URL so	can be used to retrieve data for any league in any country. There are no 'hard coded' league / club names 
    in the html so everything can be customised via Javascript.
* *"As the owner, I want to minimise calls to the API to keep operating costs to a minimum."*
    * A custom function has been written to retrieve the API data. Any data read by the API function will be stored locally within the browser so next the data 
    is requested no API call is required as the data can be obtained from local storage. However, if the data is stale then the API will request new data and 
    update the local storage. The expiration time of the data is determinied by a parameter passed into the function - this can be anything from a few minutes to a few days.
* *"As the owner, I want the website to be responsive in design and work across all devices from desktops to mobile phones."*
    * The website uses the Bootstrap framework that enables a responsive design that works across all devices/screen sizes. Table columns are hidden when viewed 
    on devices with small screens so the data is easily readable.


