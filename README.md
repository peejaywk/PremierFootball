# Premier Football

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
* As the owner, I want display data in a clear and informative way that works on any platfrom.
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
    * The header will include links to all the site pages. These will be aligned to the right hand side of the page.
    * On hovering over the navigation links with the mouse they will change colour indicating to the user that they are clickable (desktop only).
    * On mobile devidews the navigation links will be clearly visible at the top of the screen so the user can easily switch between team and league views.
    * The site logo will be positioned to the left of the page and when cliked will take the user back to the home page.
* Footer
    * The footer will be located at the bottom of each page and will scroll with the page contents.
    * A disclaimer will be positioned to the left of the footer stating that this website is for educational purposes only.
    * Social media links and other contact information will be positioned to the right of the footer.
    * Social media links will be represented by icons for each site and will increase when the user hovers over them.
    * There will be a contact link at the bottom of the page that will take the user to the contact page/form.
    * There will be a reference to the [API-FOOTBALL](https://rapidapi.com/api-sports/api/api-football) website indicating to the user the source of the data used on the website.

### Individual Page Features
* Home Page
    * At the top of the home page will be a short summary of the website and any instruction the user may require.
    * The Home page will display an overall summary of the Premier League along with the logo of the Premier League.
    * A list of upcoming fixtures will be dispalyed next to the logo on desktop and tablet devices and below the logo on mobile devices.
    * Below this will be the league table for the Premier League.
    * Clicking on any of the team names on the page will open a modal window containing information on that particular team.
* My Team Page
    * On first visiting this page the user will be asked to select a team from a dropdown menu. This will be remember for future visits and can also be changed if required.
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
* This website uses HTML and CSS programming languages.
* [Bootstrap 5.0.0 beta2](https://getbootstrap.com/)
* [GitPod](https://gitpod.io/) was use as the development environment.
* [GitHub](https://github.com/) was used for configuration control and to host the website.
* [Font Awesome](https://fontawesome.com/) provided the social media icons and the icons for the concerts and set list sections.
* [Googel Fonts](https://fonts.google.com/) provided the Roboto font that is used throughout this website.
* [jQuery](https://jquery.com/). JavaScript library.
* [Obfustcator](https://obfuscator.io/). Obfustcator for JavaScript
* [Colorate](https://colorate.azurewebsites.net/). Colour scheme design website.
* [JS Lint](https://jslint.com/). Javascript code quality tool.

<a name="testing"></a>
## Testing

<a name="bugs"></a>
## Bugs / Issues
Code used to move the footer to the bottom of the screen (not fixed).
[Stackoverflow](https://stackoverflow.com/questions/40853952/bootstrap-footer-at-the-bottom-of-the-page/40854221)

Removing a shadow from a button.
[Stackoverflow](https://stackoverflow.com/questions/39210985/remove-button-shadow)
<a name="deployment"></a>
## Deployment

<a name="credits"></a>
## Credits / Resources
* [W3Schools JavaScript](https://www.w3schools.com/js/default.asp)
* [Chaining together API calls](https://gomakethings.com/how-to-use-the-fetch-method-to-make-multiple-api-calls-with-vanilla-javascript/)
* [Working with date objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

https://www.sitepoint.com/get-url-parameters-with-javascript/