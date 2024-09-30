const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");

const authentication = async (req, res, next) => {
  try {
    // const token = req.header.authentication;
    const token = req.header("Authorization").replace("Bearer", "");
    const payload = jwt.verify(token, jwt_secret); //verifica token y jwt
    const user = await User.findOne({ _id: payload._id, "tokens": token });
    if (!user) {
      return res.status(401).send({ message: "No estás autorizado" });
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error, message: "Ha habido un problema con el token" });
  }
};

const isAuthor = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id)
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: 'Este post no es tuyo' })
    }
    next()
  } catch (error) {
    console.error(error)
    return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría del post'})
  }
 }

module.exports = { authentication, isAuthor };


// const authentication = async (req, res, next) => {
//   try {
//     const token = req.header.Authorization;
//     // const token = req.header("Authorization").replace("Bearer", "");
//     const payload = jwt.verify(token, jwt_secret); //verifica token y jwt
//     const user = await User.findOne({ _id: payload._id, "tokens": token });
//     if (!user) {
//       return res.status(401).send({ message: "No estás autorizado" });
//     }
//     req.token = token;
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .send({ error, message: "Ha habido un problema con el token" });
//   }
// };
// module.exports = { authentication };
