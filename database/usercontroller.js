// import User from "../model/User";
const User = require("./User");

exports.creaUser = async (req, res) => {
  try {
    let usern;
    usern = new User(req.body);
    await usern.save();
    res.send(usern);
  } catch (error) {
    res.status(500).send("problemas");
  }
};

exports.allUser = async (req, res) => {
  try {
    const userall = await User.find();
    res.json(userall);
  } catch (error) {
    res.status(500).send("problemas");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: "credenciales incorrectas" });
    }
    if (usuario.password == password) {
      res.json(usuario);
      console.log("se inicio sesion");
    } else {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).send("problemas");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) {
      return res.status(401).json({ message: "No existe el usuario" });
    }
    await User.findOneAndRemove({ _id: req.params.id });
    res.json({ message: "eliminado correctamente" });
  } catch (error) {
    res.status(500).send("problemas");
  }
};
