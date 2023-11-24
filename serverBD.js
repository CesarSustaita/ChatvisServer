// parte de variables para el documento
const express = require("express");
const ConectarDB = require("./config/db");

// parte de accesos de variables
ConectarDB();
const app = express();
app.use(express.json());
app.use("/api/user", require("./routes/routes"));

app.listen(8000, function check(error) {
  if (error) {
    console.log("mal");
  } else {
    console.log("Se conecto bien el puerto 8000");
  }
});

// server.post("/login", (req, res) => {
//   console.log("se conecto el postman");
// });
// server.use(routes);
