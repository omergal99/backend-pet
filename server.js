const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')


const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


const socketRoute = require('./routes/socket-route')
const dogsRoute = require('./routes/dogs-route')
const usersRoute = require('./routes/users-route')
const pushRoute = require('./routes/push-route')

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true // enable set cookie
}));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
  secret: 'omer12333',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(bodyParser.urlencoded({ extended: true }));

socketRoute(io)
dogsRoute(app)
usersRoute(app)
pushRoute(app)



const port = process.env.PORT || 9090;
http.listen(port, () => console.log(`server on *:${port}`));