const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Servir les fichiers CSS
app.use(express.static("public"));

/*
Middleware personnalisé :
Autoriser seulement du lundi au vendredi
de 09:00 à 17:00
*/
function workingHours(req, res, next) {
  const now = new Date();

  const day = now.getDay(); 
  // 0=Dimanche, 1=Lundi ... 6=Samedi

  const hour = now.getHours();

  const isWeekday = day >= 1 && day <= 5;
  const isWorkingTime = hour >= 9 && hour < 17;

  if (isWeekday && isWorkingTime) {
    next();
  } else {
    res.send(`
      <h1>Application indisponible</h1>
      <p>Disponible du lundi au vendredi de 9h à 17h.</p>
    `);
  }
}

// Appliquer le middleware à toutes les routes
app.use(workingHours);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "services.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});