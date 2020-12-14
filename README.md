# Star Wars App 

## General info
A responsive React.js app that displays Star Wars films and characters short descriptions. Integrated with an external API - https://swapi.dev/.

The website has been built with a mobile-first mindset, but it should work well on all devices. The API data is downloaded only on the initial request and retrieved from local storage when requesting additional information.

<p align="center">
  <img src = "https://i.imgur.com/8ljIV8O.jpg" width=300px>
  <img src = "https://i.imgur.com/Ek6QbHw.jpg" width=300px>
  <img src = "https://i.imgur.com/j8kROPN.png" width=300px>
</p>

### Live demo

The application is currently available on Netlify under [https://star-wars-moon.netlify.app/](https://star-wars-moon.netlify.app/)

## Technologies
Project is created with:
* React.js (with Redux)
* CSS3
* HTML
* Jest & Enzyme for tests

## Setup

To run project locally, in the project directory run:

### `npm install`

firstly, to install all the dependencies for the app.

### `npm start`

to run the app in the development mode.
By default, the app will run on port 3000.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

to launch the test runner in the interactive watch mode.

### `npm run build`

to build the app for production to the `build` folder.

## Deployment

After running npm run build command, to do a manual deploy to Netlify’s CDN run:
`npm install netlify-cli -g`
`netlify deploy`

## Metrics

I used [LogRocket](https://logrocket.com) for collecting metrics and error tracking. To track this information in your own deployment, you'd have to [set up a LogRocket account](https://docs.logrocket.com/docs/getting-started) and change the `LogRocket.init` line in the `index.js` file to reflect your app ID.
