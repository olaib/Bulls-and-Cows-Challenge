# Cow & Bulls Challenge Game

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/YDg-_nm7)

![game](/react-client/src/assets/img/game.png)

![rules](/react-client/src/assets/img/rules.png)

![highscores](/react-client/src/assets/img/highscores.png)

## Explanations

### The game
* The game is a simple game of cows and bulls.
* player must guess 4 different digits.
* if the player guesses a digit in the right place, he gets a cow.
* if the player guesses a digit in the wrong place, he gets a bull.
* 4 bulls means the player won the game.
* for example, if the number is 1234 and the player guesses 4321, he gets 4 bulls and 0 cows. 

### The next steps
* then when the player won the game, he can enter his name and save his score.
* if was error from the server (unreachable or something happened), the player will get an error message.
* and can't continue (the form will be available till he successfully save his score).
* then the player can see the highscores table. (top 5 scores sorted by descending order).

## How to use this template
This is the template for a project where front-end and back-end are separated.
The front-end is a React application, the back-end is a Java Web application
including a Servlet for REST API endpoints.

### Create a run configuration for the Server
* In IntelliJ, go to Run->Edit Configurations
* Click on the + sign and select Tomcat Server -> Local
* In the Tomcat Server Settings, select your local installation of tomcat (you can download it from https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.45/bin/apache-tomcat-9.0.45.tar.gz)
* In the Deployment tab, select the java-react:war file to deploy (the war file in the target folder of your project), IntelliJ should automatically detect it and display a "Fix" button. Click on it.
* uncheck the "After launch: Open in browser" checkbox (we don't want to open the browser when we run the server, it's a REST API server)
* Click on the OK button

### Note:
* score.dat is created into the target folder of the project(target/java-react-1.0-SNAPSHOT/scores.dat). It is a file that contains the highscores.

### initializing IntelliJ
In case you get into trouble with IntelliJ, you should close the project,
delete the .idea folder, re-open the project and follow the instructions above to
recreate a run configuration.

###  dependencies
The template depends on:
* your local installation of tomcat, this template uses
  tomcat 9.0.45 that can be downloaded from https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.45/bin/apache-tomcat-9.0.45.tar.gz.
  In order to point to your own installation of tomcat, edit configuration in IntelliJ change the application server.
* your local installation of nodejs, this template is based on nodejs v18.15.0 (npm 9.5.0). You can download it from https://nodejs.org/en/download.
* your local installation of java (select one SDK at: File->Project Structure->Platform SDK). You can add SDK from IntelliJ by cliking on  File->Project Structure->Platform Settings-> +).
  This template is based on version 19, you can also download it from https://jdk.java.net/19/).

###  source files
The template includes:
* a Java Web template with an empty Servlet to implement your server side REST API under the src/main/java folder
* a React template under the reac-client folder, with an initialized npm project.

## In order to run your exercise you:
* run the server side; with IntelliJ configuration at the upper right (created above)
* run the client side: open the terminal:
```bash
cd react-client
npm install
npm start
```

Then browse:
* your react client at http://localhost:3000
* your server will be available at http://localhost:8080/api/highscores (you have of course to implement the REST API).
  Note that you should never specify the host and port in your React code! (use 'api/' instead of 'http://localhost:8080/api/')
