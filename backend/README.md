# masterTrade Backend

## How to Run
### Quick Start:
under the backend folder run:
```
npm run start
```

alternatively, you can run the script:
```
.\scripts\run.bat

npm install mysql

#for ORM
-<npm install sequelize mysql2>

NOTE TO PPL ON FRONTEND
- cd to relevant folder and run <node <js file>> to run the respective backend apps

NOTE (FOR TESTING):
- Create a mySQL WAMP connection, create schema called <myDB> before running database-reliant app components

#for websocket (chat feature)
- <npm install ws>
- can test using the templatePage file next to chatServer.js
- front end ppl can cannibalise the <script> in templatePage.html to implement frontend chat
