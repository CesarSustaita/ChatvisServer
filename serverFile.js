const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const port = 3000;

app.use(fileUpload());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/lector", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No se ha subido ningún archivo.");
  }
  const archivo = req.files.archivo;
  const destino = __dirname + "/uploads/" + archivo.name;
  archivo.mv(destino, (err) => {
    if (err) {
      console.error("Error al mover el archivo:", err);
      return res.status(500).send(err);
    }
    // Ahora que el archivo se ha subido, vamos a leerlo y analizarlo
    const fs = require("fs");
    const readline = require("readline");
    const archivoStream = readline.createInterface({
      input: fs.createReadStream(destino),
    });
    const mensajes = [];
    archivoStream.on("line", (line) => {
      //console.log('Línea analizada:', line);
      const match = /\[(.*?)\] (.+): (.+)/.exec(line);
      if (match) {
        const fecha = match[1];
        const remitente = match[2];
        const mensaje = match[3];
        mensajes.push({ fecha, remitente, mensaje });
      }
    });
    archivoStream.on("close", () => {
      // Cuando se haya leído todo el archivo, mensajes contendrá todos los mensajes analizados.
      res.send(mensajes);
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
