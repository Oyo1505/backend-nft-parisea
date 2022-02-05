require("dotenv").config();
require("./config/mongo");
var createError = require("http-errors");
var express = require("express");
var app = express();
const cors = require("cors");
app.use(express.json());



const corsOptions = {
  origin: process.env.CLIENT_URL,
  /* credentials : Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials */
  credentials: true,
};
//? Services like heroku use something called a proxy and you need to add this to your server
app.set("trust proxy", 1);

app.use(express.urlencoded({ extended: false }));
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
const nftsRouter = require("./routes/nfts");
const loginRouter = require("./routes/auth");
app.use("/", nftsRouter);
app.use("/", require("./routes/posts"));

app.use("/", usersRouter);
app.use("/", loginRouter);

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
  res.status(err.status || 500).json(err.message);
});

module.exports = app;
