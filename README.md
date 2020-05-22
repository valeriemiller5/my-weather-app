# my-weather-app

## About this App
> This is a basic weather app that calls to the OpenWeatherMap.org API for current weather conditions in the city input by the user, as well as that city's 5 day forecast.  The background color of the app changes depending on the UV index for that day: green for favorable, yellow for moderate, and red for severe.

This app was build using the OpenWeatherMap.org API, jQuery, UIkit for CSS styling, and Firebase. Note: the assignment called for students to use local storage; however, I chose to use Firebase instead since previous assignments used local storage. 

## Demo
> Below are a couple of Gifs demonstrating the functionality of this app.  The first shows that upon opening the app, the last value stored in Firebase will populate on the screen.  As cities are added, the weather information for that city is populated in the browser.  The cities UV Index will affect the background color of the app. In this example, Fountain Valley, CA and Los Angeles both have UV Index over 7, so the background is red.  Bangor, MN has an index below 7, but above 3, so the background is yellow.
<br />

![My-Weather-App Demo Part 1](demo/my-weather-app-demo.gif)

In the second demonstration, it is shown that the cities that were searched are being added to the database, which will then create a list of the cities in the database each time the browser is opened, and the information from the last city entered will be the default information displayed.
<br />

![My-Weather-App Demo Part 2](demo/mwa-demo-part-2.gif)

## Background
> As a tutor and TA for a coding bootcamp, I'm frequently asked questions on homework assignments.  While I could just look at the provided solutions, I prefer to create a solution "in my own writing".  This way, I can better help my students find their own problem solving solutions by explaining to them how I would go about the assignment.

## Need to Knows
> This app is built with Firebase and an API that requires an API key.  Since there is not a Node server attached to this app, the keys were removed for security purposes.  If a user would like to try this app, they will need to create a local copy and obtain their own keys.  A demo video will be posted soon showing the functionality of this app.