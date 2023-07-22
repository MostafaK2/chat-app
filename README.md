# chat-app (frontend and backend)
This is the code base for chat-app implemented using websockets

## Requirements
Java8. Install [java](https://www.oracle.com/java/technologies/downloads/) <br />
Apache Maven. v3.8.6 Install [maven](https://maven.apache.org/download.cgi) <br />
Node.js. v18.3.0 Install [node.js](https://nodejs.org/en/)  <br />
MySQL from [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) <br />

## MySQL
Set up your my sql server <br/>
Save your URI, Password and Username <br/>


## set up springboot 
* Navigate application.properties file <code>cd ./src/main/resources</code> </br>
* If using a database other than mySql, then change the following: </br>
<code>spring.datasource.url</code> to the sql server url </br>
<code>spring.datasource.driver-class-name</code> to respective driver name </br>
<code>spring.jpa.properties.hibernate.dialect</code> to respective dialect </br>
* Enter your username and password for the database in these two slots
<code>spring.datasource.username</code> and
<code>spring.datasource.password</code> <br/>


## Running Headless
### Frontend Application 
* Move to the frontend directory <br/>
<code>cd ./chat-app-frontend</code><br/>
* Install Required Dependencies <br/>
<code>npm install</code> <br/>
* Run the application <br/>
<code>npm start</code> <br/>
* Run the tests <br/>
<code>npm test</code> <br/>

### Backend Application
* Navigate to the root backend directory <br/>
* Install all the required maven dependency by running <br/>
<code>cd ./src</code><br/>
* Run the app
<code>mvn spring-boot:run</code> <br/>


## Deployement
Description: The jar file or the docker image would run the frontend and the backend on the same port. 

### Using a jar file
In the main chat-app application folder, run <code>mvn clean install</code> <br/>
This command will create a working jar file that could be deployed to a website. <br/>
The jar file would in the target folder. Its named a <code> chat-app-backend-0.0.1-SNAPSHOT.jar</code> </br> 
Run this jar file by running <code> java -jar path/to/your/jarfile.jar </code>  <br/>


### Using Docker container
The Docker container has enviroment varibles setup for the database credentials <br/>
<code>ENV DATABASE_URI = database</code> <br/>
<code>ENV DATABASE_USER = user</code> <br/>
<code>ENV DATABASE_PASSWORD = pass</code> <br/>
If you would like to change this, you need also the names in application.properties file as well <br/>

By default docker uses the Dockerfile of the current folder if you run a single command like <br/>
<code> docker build -e DATABASE_URI = <db_uri> -e DATABASE_USER = <db_user> -e DATABASE_PASSWORD = <db_pass> -t <your_docker_image></code></br>

Run your docker image by running the following:  </br>
<code>docker run -p 8080:8080 <your_docker_image></code> </br>




