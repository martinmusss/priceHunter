require('dotenv').config();
// const { Server } = require('socket.io'); //========
const http = require('http'); //=======
const cookieSession = require('cookie-session');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const passport = require('passport');
const upload = require('./middlewares/upload.middleware');
require('./auth/passport');
require('./auth/passportGoogleSSO');

require('./db/models/user');
const { Role } = require('./db/models');

const authRouter = require('./routes/auth.router');
const indexRouter = require('./routes');
const productRouter = require('./routes/product.router');
const errorMiddleware = require('./middlewares/error.middleware');
const api = require('./api');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

// const server = http.createServer(app); //=========

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(
  session({
    name: 'sid',
    store: new FileStore(),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/categories', productRouter);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', api);
app.use(errorMiddleware);

// Chat

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

module.exports = app;
