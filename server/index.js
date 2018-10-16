require("dotenv").config();
const express = require("express"),
  app = express(),
  port = 3001,
  { json } = require("body-parser"),
  cors = require("cors"),
  session = require("express-session"),
  { login } = require("./ctrl");

app.use(json());
app.use(cors());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: {
      maxAge: 100000
    }
  })
);

app.get("/api/test", (req, res) => {
  console.log(req);
});
app.post("/api/login", login);
app.get("/api/isLoggedIn", (req, res) => {
  if (req.session.username) {
    return res.status(200).json(req.session);
  } else {
    return res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
