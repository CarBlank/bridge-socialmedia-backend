const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");

const UserController = {
  async register(req, res) {
    //hash de las password y el numero es la longitud de la mezcla que se hara
    const passwordEncripted = bcrypt.hashSync(req.body.password, 10);

    try {
      const user = await User.create({
        ...req.body,
        password: passwordEncripted,
      }); //body ={name:'Ana' , password: 123}( password del const encripta)
      res.status(201).send({ message: "Usuario registrado con exito", user });
    } catch (error) {
      console.error(error);
    }
  },


  async login(req, res) {
    
    try {
      const user = await User.findOne({
        email: req.body.email,
      
      });

      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      //   console.log(req.body.password);
      //   console.log(user.password);
      const isMatch = bcrypt.compareSync(req.body.password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }

      const token = jwt.sign({ _id: user._id }, jwt_secret);
// console.log(user)
      if (user.tokens.length > 4) user.tokens.shift();

      user.tokens.push(token);

      await user.save();
      res.send({ message: "Bienvenid@ " + user.name, user, token });
    } catch (error) {
      console.error(error);
    }
  },

  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar desconectar al usuario",
      });
    }
  },

  async getAll(req, res) {
    try {
      const user = await User.find();
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },

  async getById(req, res) {
    try {
      const user = await User.findById(req.params._id);
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },

  async getUsersByName(req, res) {
    try {
      if (req.params.name.length > 20) {
        return res.status(400).send("Búsqueda demasiado larga");
      }
      //   const name = new RegExp(req.params.name, "i");
      //   const products = await Product.find({ name });

      const users = await User.find({
        $text: {
          $search: req.params.name,
        },
      });

      res.send(users);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const userDeleted = await User.findByIdAndDelete(req.params._id);
      res.status(200).send({ userDeleted, message: "User deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "there was a problem trying to remove the user",
      });
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      res.send({ message: "user successfully updated", user });
    } catch (error) {
      console.error(error);
    }
  },
};
module.exports = UserController;
