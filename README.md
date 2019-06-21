# Vanilla Node REST API

`"dependencies": {}`

## Technologies:

* Node
* fs module for persistence
* NPM


## Features

* Serves JSON
* Error handling
* Schema/ validation
* Seperate router, controller, and model files
* ES6, modular design

## Challenges

I've been coding Express apps for over three years and never built one from scratch! I wasn't sure what the challenges would be, but really there has been only two:

* Persistence and Deployment.

Persistence is challenging without any libraries. I went through a few ideas and settled on just writing to a JSON file using the `fs` node module (which is built in to node)

This worked, but then I ran intro trouble with deploying. I was using heroku, which does not require any dependencies for the app. However, the persistence on the JSON file was simply not reliable. The server instance would sleep, and it would lose the file, and often PUT requests just didn't work at all. 

Fortunately I found something simpler, with Localtunnel. Localtunnel is a super simple way to expose an application running locally to the web through a secure tunnel to your machine. This is ideal for me, since this application is only for teaching and learning purposes. 

## Takeaways

I believe that exercises like this are the best way to learn what is actually going on underneath the frameworks that we love. This exercise was very informative for me on what Express.js is really doing. 

My next similar project will be to build a modular based SPA on the front end that mimics React, but without React or any other library. Wish me luck!