# The Spotify Music Browser

• A lightweight Angular-based Spotify music browser that allows you to log in with your Spotify account, browse artists, genres, albums, songs and play music in Spotify web player with a single click

•	Implemented with Angular/TypeScript, Express.js, HTTP request and OAuth (Spotify API)

![Demo Screenshot 1](Demo%201.png)

![Demo Screenshot 2](Demo%202.png)

![Demo Screenshot 3](Demo%203.png)

![Demo Screenshot 4](Demo%204.png)

## Project Setup Tutorial

1. A Spotify Developer account is required for the back-end Express webserver to connect with Spotify API. Create a Spotify account or log in at 
https://developer.spotify.com/dashboard/ and follow the instructions to create a client id. Name the app whatever you'd like
and enter the app description accordingly. Once you have created your application, be sure to set the redirect URI to http://localhost:8888/callback.

2. Once you get your client key and client secret, create the client_secret.json file in the webserver folder with the following data:
{
 "client_id": "Your Client Key",
 "client_secret": "Your Client Secret"
}.

3. Create the tokens.json file in the webserver folder with the following data:
{
 "access_token": null,
 "refresh_token": null
}.

4. Get Node.js, go to https://www.nodejs.org. Install npm from https://www.npmjs.com/get-npm.

5. Run the following command in commandlines/shell to install Angular global packages: [npm install -g @angular/cli].

6. In spotify/client folder, run [npm install].

7. In spotify/webserver folder, run [npm install].

8. In spotify/webserver folder, run [npm start]. Keep this process running and open a new commandline/shell window.

9. In spotify/client folder, run [ng serve].

10. Open browser and go to http://localhost:4200, you're all set.
