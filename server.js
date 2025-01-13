
const express = require('express')
const { createServer } = require("http");
const WebSocket = require('ws');
const cookieParser = require('cookie-parser')
const db = require('./src/infra/database/models/user/index')
const userRoutes = require ('./src/interfaces/presentation/user/userRoutes')
const ip = require('ip');
const host = ip.address();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const fs = require('fs')
var options = {
  customCss: fs.readFileSync(("./swagger.css"), 'utf8')
};


const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// This creates the table if it doesn't exist (and does nothing if it already exists)
db.sequelize.sync().then(() => {
  console.log("db has been re sync")
})
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, x-access-token, Origin, Content-Type, Accept"
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use('/api', userRoutes)
const server = createServer(app);
//listening to server connection
server.listen(port, function (error) {
  if (error) console.log("Error in server setup");
  console.log(`Server is listening on http://${host}:${port}`);
})

app.on('close', function(){
  db.sequelize.close();
})


const socketServer = new WebSocket.Server({server});
socketServer.on('connection', (socketClient, req) => {
  app.locals.clients = socketServer.clients;
  const ip = req.socket.remoteAddress;
  console.log('[SERVER] connected - Ip:', ip);
  console.log('[SERVER] client Set length: ', socketServer.clients.size);
  socketClient.on('message', (data) => {
    console.log('[SERVER] data: ', JSON.stringify([data]));
    socketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify([data]), (err) => {
          if(err){
            console.log(`[SERVER] error:${err}`);
          }
        });
      }
    });
  });
  socketClient.on('close', (socketClient) => {
    console.log('[SERVER] Close connected');
    console.log('[SERVER] Number of clients: ', socketServer.clients.size);
  });
});