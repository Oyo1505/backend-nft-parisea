require("dotenv").config();
require("./config/mongo");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
const session = require("express-session"); //sessions make data persist between http calls
var app = express();
const cors = require("cors");
app.use(express.json());
/*
Create a session middleware with the given options.
Note:  Session data is not saved in the cookie itself, just the session ID. 
Session data is stored server-side.
*/
// app.use(
//   session({
//     cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
//     resave: true,
//     saveUninitialized: true,
//     secret: process.env.SECRET_SESSION,
//   })
// );

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  /* credentials : Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials */
  credentials: true,
  optionsSuccessStatus: 200,
};

// cors middle on
app.use(cors(corsOptions));
//BACK END
app.get("/", (req, res) => {
  res.send("backend server is running");
});
//------
// ROUTES
// ----
const usersRouter = require("./routes/users");
app.use("/", usersRouter);
app.use("/", require("./routes/posts"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
