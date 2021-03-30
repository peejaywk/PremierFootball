# Premier Football

[Visit Website](https://peejaywk.github.io/PremierFootball/)

![alt text](/assets/images/am-i-responsive.png "Am I Responsive Image")

Premier Football is a website for football fans who want to keep track of the Premier League and their favourite Premiership football team. The website utilises the [API-FOOTBALL](https://rapidapi.com/api-sports/api/api-football) 
API for all the football data presented on this site. This API is a freemium service with the basic service allowing 100 requests per day at a maximum rate of 30 requests per minute.
The main aims of the website are:
* Provide information on any football team in the English Premier League.
* Display previous results and any upcoming fixtures for the Premier League and indiviual teams.
* Display the current league standings.
* A stretch objective of using Google Maps to display the location of the stadium.
* A stretch goal is to display live results of any games in play.

## Table of Contents

[User Experience (UX)](#userexperience)

[Features](#features)

[Technologies Used](#technologies)

[Testing](#testing)

[Bugs / Issues](#bugs)

[Deployment](#deployment)

[Credits](#credits)

<a name="userexperience"></a>
## User Experience (UX)

### User Stories
#### New Users
* As a user, I want to easily find my team so I can stay up to date on fixtures and results.
* As a user, I want to see a list of up coming fixtures with location and kick-off times so I can plan ahead.
* As a user, I want to see the latest form of my team.
* As a user, I want to see live scores whenever there are any Premierships games being played so I can keep track of games when I can't watch live on TV.
* As a user, I want to see the league table for the Premiership so I can see where my team sit overall in the league.
* As a user, I want to be able to follow the website on social media to keep up to date on any changes to the website.
#### Returning Users
* As a returning user, I want the website to remember my team selection so I don't have to keep selecting my team each time I visit the site.
#### Website Owner
* As the owner, I want to display data in a clear and informative way that works on any platfrom.
* As the owner, I want the ability to expand the website in the future to add more leagues from the UK and around the world.
* As the owner, I want to minimise calls to the API to keep operating costs to a minimum.
* As the owner, I want the website to be responsive in design and work across all devices from desktops to mobile phones.

### Wireframe Mockups

The website is split into two pages - Home and Contact. Initial design ideas were captured using [Balsamiq](https://balsamiq.com/) and they are linked below:

* [Home Page](/assets/wireframes/HomePage.png)
* [Contact Page](/assets/wireframes/ContactPage.png)

<a name="features"></a>
## Features

### Common Features Across All pages
* Header
    * The header will be in a fixid position at the top of the screen and will not scroll with the page contents. This allows visitors easy access to navigate the site via the menu.
    * The header will include links to all the site pages. These will be aligned to the left hand side of the page.
    * On hovering over the navigation links with the mouse they will change colour indicating to the user that they are clickable (desktop only).
    * On mobile devices the navigation links will be clearly visible at the top of the screen so the user can easily switch between team and league views.
    * The site logo will be positioned to the left of the page and when cliked will take the user back to the home page.
* Footer
    * The footer will be located at the bottom of each page and will scroll with the page contents.
    * A disclaimer will be positioned in the footer stating that this website is for educational purposes only.
    * Social media links and other contact information will be positioned to the right of the footer.
    * Social media links will be represented by icons for each site and will increase when the user hovers over them.
    * There will be a contact link at the bottom of the page that will take the user to the contact page/form.
        * It was decided not to add a button in the footer that links to the Contact page as this page is easily accessible via the link in the nav bar.
    * There will be a reference to the [API-FOOTBALL](https://rapidapi.com/api-sports/api/api-football) website indicating to the user the source of the data used on the website.

### Individual Page Features
* Home Page
    * At the top of the home page will be a short summary of the website and any instruction the user may require.
    * The Home page will display an overall summary of the Premier League along with the logo of the Premier League.
    * A list of upcoming fixtures will be dispalyed next to the logo on desktop and tablet devices and below the logo on mobile devices.
    * Below this will be the league table for the Premier League.
    * Clicking on any of the team names on the page will open a modal window containing information on that particular team.
        * This was changed to open in a new page instead of a modal window.
* My Team Page
    * On first visiting this page the user will be asked to select a team from a dropdown menu. This will be remember for future visits and can also be changed if required.
        * Did not implement this as all the teams are clearly visible from the Home page and it didn't make for a satisfactory UX.
    * The My Team page will have a similar layout to that of the Home page to keep a consistent feel across the site.
    * The page will display details of the selected team at the top of the page with the teams logo positioned to the left. 
    * A list of upcoming fixtures for the selected team will be displayed next to the logo on desktop and tablet devices and below the logo on mobile devices.
    * Below this will be the league table for the Premier League with the current team highlighted.
* Contact Page
    * At the top of the page will be some instructions of how to contact the website. This will be via the form displayed on the page or via the email link provided.
    * The contact form will be below the text and will ask for the users contact details and a description of their enquiry.
    * Below the form will be a submit button.
    * This page can  be accessed by clicking on the 'Contact' link in the footer.

### 9/3/2021 Design Change
Decided to remove the MyTeam link from the navigation bar as the user can select any team from the home page to get more information for that team - clicking
a team name will open a new page for that team . Clicking the home button will take the user back to the home page.

### Colour Palette
The colour palatte for this website was chosen to complement the purple colour of the Premier League icon displayed on the home page. The RGB colour code for the Premier League icon
is #3D185C. The following color scheme was chosen from the [Colorate](https://colorate.azurewebsites.net/) website:

![alt text](/assets/images/colour_scheme.png "Website Colour Scheme")

* #583973 - Navbar and footer background colour and used as the main text colour for the site.
* #E3DEE7 - Table background colour for alternate rows and navlink active colour.
* #C7BDD0 - Table background colour for alternate rows and navbar brand icon colour.
* #AB9BB9 - Navlink colour.
* #EBE7EE - Background colour for the website - not part of the colour scheme above.

<a name="technologies"></a>
## Technologies Used
* This website uses HTML, CSS & JavaScript programming languages.
* [Bootstrap 5.0.0 beta2](https://getbootstrap.com/)
* [GitPod](https://gitpod.io/) was use as the development environment.
* [GitHub](https://github.com/) was used for configuration control and to host the website.
* [Font Awesome](https://fontawesome.com/) provided the social media icons and the icons for the concerts and set list sections.
* [Googel Fonts](https://fonts.google.com/) provided the Roboto font that is used throughout this website.
* [jQuery](https://jquery.com/). JavaScript library.
* [Obfustcator](https://obfuscator.io/). Obfustcator for JavaScript
* [Colorate](https://colorate.azurewebsites.net/). Colour scheme design website.
* [JS Lint](https://jslint.com/). Javascript code quality tool.
* [emailJS](https://www.emailjs.com/). Send email directly from JavaScript.

<a name="testing"></a>
## Testing
See [testing.md](assets/documentation/testing.md) for the testing documentation.


<a name="bugs"></a>
## Bugs / Issues
Code used to move the footer to the bottom of the screen without it being fixed in placenot.
[Stackoverflow](https://stackoverflow.com/questions/40853952/bootstrap-footer-at-the-bottom-of-the-page/40854221)

Removing a shadow from a button.
[Stackoverflow](https://stackoverflow.com/questions/39210985/remove-button-shadow)

To minimise API calls the website only allows the data for the home page or team to be refreshed every 24 hours. This can easliy be modified to
reduce the time or to remove the time limit completely. 

<a name="deployment"></a>
## Deployment
This project was developed using [GitPod](https://gitpod.io/) with [Github](https://github.com/) used for version control and deployment.

The instructions below detail the steps to deploy this website to GitHub pages:

1. Login to [Github](https://github.com/)
2. Select **peejaywk/PremierFootball** from the list of repositories.
3. Select **Settings** from the menu near the top of the screen.
4. Scroll down to the **GitHub Pages** section.
5. Under **Source** select the **Master Branch** from the drop-down menu.
6. The page is automatically refreshed on selecting Master Branch. The website is now deployed to Github pages.
7. Scroll back down to the **GitHub Pages** section and copy the link to the deployed website. **Note:** it can take several minutes for the site to be deployed by GitHub.

### How to run this project locally

To clone this project into Gitpod you will need the following:
1. A Github account. Create one [here](https://github.com/).
2. Installation of Chrome browser.

Then follow the following steps:
1. Install the [Gitpod Browser Extension](https://www.gitpod.io/docs/browser-extension/) for Chrome.
2. After instllation, restart the browser.
3. Log into [Gitpod](https://www.gitpod.io/) using your GitHub credentials.
4. In Github navigate to the [project repository](https://github.com/peejaywk/PremierFootball).
5. Click the green "Gitpod" button in the top right corner of the repository.
6. This will create a new Gitpod workspace from the Github repository for you to work on.

To work on the project within a local IDE follow these steps:
1. Navigate to the [Github repository](https://github.com/peejaywk/PremierFootball).
2. At the top of the screen click on the "Code" button.
3. Fron the drop down menu copy the link in the HTTPS section.
4. In your local IDE open a terminal window.
5. Change the current working directory to the location where you want the cloned directory to be made.
6. Type 'git clone' and then paste in the URL copied in Step 3.
7. Press Enter. This will create a clone within your local IDE.

<a name="credits"></a>
## Credits / Resources
* [W3Schools JavaScript](https://www.w3schools.com/js/default.asp)
* [Chaining together API calls](https://gomakethings.com/how-to-use-the-fetch-method-to-make-multiple-api-calls-with-vanilla-javascript/)
* [Working with date objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* Email JS Tutorial - Resume Project (Code Institute)
* [Stackoverflow](https://stackoverflow.com/questions/54163952/async-await-in-fetch-how-to-handle-errors) - Handling API errors.
* [PNG Egg](https://www.pngegg.com/en/png-bakbx) - PNG Egg was used to source the favicon.
* [Site Point](https://www.sitepoint.com/get-url-parameters-with-javascript/) - Extracting URL parameters using Javascript.

#### Acknowledgements
* I would like to thank my mentor Adegbenga Adeye for his guidance throughout this project.
* I would like to thank the members of the Slack community who provided feedback on my project in the #peer-code-review section.