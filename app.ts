var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/api/index.ts");
var usersRouter = require("./routes/api/users.ts");

const swaggerUi = require("swagger-ui-express");

var app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//  module.exports = app;

const swaggerDocument = require("./swagger.json");

var options = {
  explorer: true,
};

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
