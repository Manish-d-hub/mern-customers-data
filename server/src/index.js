import "dotenv/config";
import express from "express";

import indexRouter from "./api/components/router.js";
import globalErrorHandler from "./api/middleware/errorHandler.js";
import ExpressError from "./api/utils/expressError.js";

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", indexRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
