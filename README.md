# chat-app (frontend and backend)
This is the code base for chat-app implemented using websockets

## Requirements
Java8. Install [java](https://www.oracle.com/java/technologies/downloads/) <br />
Apache Maven. Install [maven](https://maven.apache.org/download.cgi) <br />
Node.js. Install [node.js](https://nodejs.org/en/)  <br />
MySQL from [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) <br />

## MySQL
Set up your my sql server <br/>
Use the Url

## set up springboot
* Navigate application.properties file <code>cd ./src/main/resources</code> </br>
* If using a database other than mySql, then change the following: </br>
<code>spring.datasource.url</code> to the sql server url </br>
<code>spring.datasource.driver-class-name</code> to respective driver name </br>
<code>spring.jpa.properties.hibernate.dialect</code> to respective dialect </br>
* Enter your username and password for the database in these two slots
<code>spring.datasource.username</code> and
<code>spring.datasource.password</code>

## Running Headless
### Frontend Application 
* Move to the frontend directory <br/>
<code>cd ./chat-app-frontend</code><br/>
* Install Required Dependencies <br/>
<code>npm install</code> <br/>
* Run the application <br/>
<code>npm run</code> <br/>
* Run the tests <br/>
<code>npm test</code> <br/>

### Backend Application
* Navigate to the root backend directory <br/>
<code>cd ./src</code><br/>
* Run the app
<code>mvn spring-boot:run</code> <br/>


## Deployement
In the main chat-app application folder, run <code>mvn clean install</code> <br/>
This command will create a working jar file that could be deployed to a website. 


