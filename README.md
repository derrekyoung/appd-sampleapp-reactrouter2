# Sample Browser RUM app for react-router version 2.x

# Introduction

This repo has 2 apps in it: the before and the after states. The Before does not have the JavaScript agent, but the After does.

The After has 2 changes:

1. Modify the index.html page to include the JS agent.
1. Modify the config/routes.js file to hook into the history listener and send a virtual page each time the route changes.

# Usage
Navigate into each directory and run `npm install`.

`npm start`

Navigate between the pages. You can get different results by using different GitHub usernames in the app.

You must use a valid EUM App Key if you want to see the results in your Controller. Modify index.html to do that.
