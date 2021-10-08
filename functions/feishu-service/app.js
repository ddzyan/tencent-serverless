const express = require("express");
require("express-async-errors");

const logger = require("./common/logger");
const router = require("./router");
const requestLog = require("./middleware/requestLog");

const app = express();

app.set("x-powered-by", false);

app.use(requestLog);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.use((err, req, res, next) => {
  logger.error(err.message, err);
  if (req.xhr) {
    return res.json({
      state: false,
      msg: err.message,
    });
  }
  return res.send(err.message);
});

app.listen(3000, function () {
  console.log("服务启动");
});
