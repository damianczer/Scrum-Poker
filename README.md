# Scrum-Poker
React scrum poker application - estimate tasks

![GitHub stars](https://img.shields.io/github/stars/damianczer/scrum-poker?style=social) <br>
![GitHub watchers](https://img.shields.io/github/watchers/damianczer/scrum-poker?style=social) <br>
![GitHub issues](https://img.shields.io/github/issues/damianczer/scrum-poker?style=flat-square) <br>

**Authors:** [Damian Czerwiński](https://github.com/damianczer/)

Technology: <br><br>
React.js  - https://react.dev/ <br> 
Sass - https://sass-lang.com/documentation/syntax/ <br>
Firebase - https://firebase.google.com/

The frontend is built as an SPA (Single-Page-Application) <br>

Welcome to Scrum Poker! In this application you will be able to estimate tasks (User Stories and others), which are worked on in modern working methodologies for example Agile. The application works with anonymous accounts and sessions. You provide a user name, then you can create a session and share it with others, or you can join an existing session using a unique ID. When everyone is ready to estimate - there is a stage of selecting cards with estimates, all votes are hidden but you can see who cast the vote. When we have a set one person reveals the cards and we get the average estimate and the individual estimates. Everything works in real time (UI refreshes) I personally use this tool in my daily work and encourage you to use it! Have fun with it!
<br>

The application allows you to change the interface language and change the theme so the UI doesn't get boring quickly :) <br>

The application focuses 100% on desktop so mobile responsiveness is limited, there is support for smaller resolutions but only up to a certain scale.

 <h1>How do you get the Frontend up and running?</h1>

 You need Node.js along with npm: https://nodejs.org/en

 Then, using any terminal, navigate to the application's frontend directory and run the command _“npm install”_ - needed to install the necessary runtime environment packages.

 ```
 npm install
 ```

![image](https://github.com/user-attachments/assets/9b9893a8-5d7f-44a0-bab0-b2b6c2b2f52f)


Then use the _“npm start”_ command to start the application:

 ```
 npm start
 ```

![image](https://github.com/user-attachments/assets/2a2865ef-fd2c-493d-b958-a9dde0856f4b)

The application will run on the default port 3000 - if it is busy you will receive such information in the console, enjoy!

![image](https://github.com/user-attachments/assets/5a791c0d-3fd0-4b5a-9e90-aaf196607f39)

The whole application is based on Webpack, making the application secure and efficient: https://webpack.js.org/

Live application preview - if you want to test 🤖

https://www.damianczerwinski.pl/scrum-poker/

## Usage
Once the application is running, you can access it at:

Frontend - `http://localhost:3000/`

## Preview

Login Panel:

![image](https://github.com/user-attachments/assets/dba26b66-683b-4090-953e-41ca7fecf66f)

Estimation:

![image](https://github.com/user-attachments/assets/d8dd3d3f-134d-4eab-a1db-830c27680d57)

