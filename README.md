### Chat Application: A single page - multi-user chat application to send and receive messages

### Web Technologies Used
HTML,CSS,ExpressJS, NodeJS, Polling mechanism

### How to Run the Project

* step-1:Download the Project from git repository
* step-2: npm install to download the necessary packages
* step-3:run `npm run build` and `npm run start`to start the project

## Features

A multi-user chat application built with webpack
- that works as a SPA (only a single page load in the browser)
- that requires a login (no password, but username "dog" is not allowed)
- that has RESTful services and makes async calls to perform:
  - Login
  - Logout
  - getting the list of messages
  - getting the list of logged in users
  - sending a new message
- The RESTful services will send and receive JSON-formatted data
- that uses a cookie to store a uid (holding a uuid) to track if a user is logged in
- that checks the cookie on every service call
- that polls for new messages while user is logged in

### Program Structure

- Use a node express server for the RESTful services
- Serve a single static HTML file for the index.html
- Serve a static CSS file(s) for styling
- Serve a single static client-side JS file that is built with webpack and babel
- Client-side JS will be built from multiple files using ES6 import syntax
- Service-side JS will be used without webpack/babel and will use node require() syntax
- Both client-side and server-side JS will use separation of concerns with multiple files


### Authentication

- The user is unable to see messages unless they are authenticated (logged in)
- When the user logs in, they must provide a username
- A username of "dog" is denied access
- On login a username is added to a list of current users
- On login a `uid` cookie is set
- The uid cookie will be set to a uuid using the `uuidv4` npm module
- On logout that uid is considered logged out
- If the same username logs in from multiple browsers
  - The username is listed multiple times in the "current users" list
  - If one of those users logs out, the others of the same name are not
- When a user provides a valid username, the page will show the list of messages and current users
- Any service call without a valid uid cookie will return an appropriate error and the page will require the user to login
- If the user logs out they return to the login screen

### User list

- The currently logged in list of users is displayed
- This list will update periodically (Polling)
- This list will be scrollable if the list is too large for the window

### Reading Messages

- All messages will have a date/time stamp
- All messages will show the username that posted them
- Messages will be in sequential order
- This list will be scrollable if the list is too large for the window
- This list will periodically update (Polling)

### Posting Messages

- A user can send a message by sending the text to a RESTful service
- The service will add the date/time data and the username to the message
- The page will show the updated list of messages
- The service will respond with appropriate errors if an empty message is sent to it
- The page will display errors if the service rejects the message

### Polling

- Every few seconds (you pick the exact value) the SPA will request the list of messages and users from services
- If these services fail to connect or have other errors or authentication issues, an appropriate message will display to the user
- If the user is not logged in (initial load or logout) this polling will not happen


