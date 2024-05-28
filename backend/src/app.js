// import some node modules for later yeye

const fs = require("fs");
const path = require("path");

// create express app

const express = require("express");

const app = express();

// Middleware pour logger les requêtes
app.use((req, res, next) => {
  console.log(
    `Requête reçue : ${req.method} ${
      req.path
    } - Time: ${new Date().toISOString()}`
  );
  next(); // Passe à la prochaine fonction middleware dans la pile
});

// use some application-level middlewares

app.use(express.json());

const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

// serve the `backend/public` folder for public resources

app.use(express.static(path.join(__dirname, "../public")));

// import and mount the API routes

const router = require("./routes/routes");

app.use(router);
// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export

module.exports = app;
