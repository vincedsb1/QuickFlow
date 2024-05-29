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

// Définir une liste d'origines autorisées
const allowedOrigins = [
  "http://localhost:3000", // URL de développement
  "http://localhost:80",
  "http://localhost:8080",
  "http://localhost:5026",
  "http://5.250.176.153:80",
  "http://5.250.176.153", // URL de production ou autre environnement
  "https://5.250.176.153", // Si vous avez également une version sécurisée
];

// Configuration CORS avec fonction de filtrage dynamique des origines
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // Pour les navigateurs legacy
};

app.use(cors(corsOptions));

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
