// parte de variables para el documento
const express = require("express");
const cors = require("cors");
const ConectarDB = require("./config/db");
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// Habilita CORS con opciones específicas
// parte de accesos de variables
ConectarDB();
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/user", require("./routes/routes"));

app.listen(8000, function check(error) {
  if (error) {
    console.log("mal");
  } else {
    console.log("Se conecto bien el puerto 8000");
  }
});
