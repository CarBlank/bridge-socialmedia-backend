const Post = require("../models/Post");

const PostController = {
  async create(req, res) {

    const { textPost } = req.body;
    const userId = req.user._id; // Asegúrate de que req.user esté disponible
    if (!textPost || !userId) {
      return res.status(400).send('Error: Falta algún campo por rellenar');
    }
  
    try {
      // const post = await Post.create(req.body);
      const post = await Post.create({ textPost, userId });
      res.status(201).send({ message: "Post creado correctamente", post });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el post" });
    }
  },

  async getAll(req, res) {
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch (error) {
      console.error(error);
    }
  },

  async getById(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      res.send(post);
    } catch (error) {
      console.error(error);
    }
  },

  async getPostsByTitle(req, res) {
    try {
      if (req.params.title.length > 20) {
        return res.status(400).send("Búsqueda demasiado larga");
      }
      //   const name = new RegExp(req.params.name, "i");
      //   const products = await Product.find({ name });
      console.log(req.params.title);

      // -------- REVISAR ----------------------------

      // NOOO - const posts = await Post.find({
      //   $text: {
      //     $search: req.params.title,
      //   },
      // });

      // const posts = await Post.find({ title: req.params.title });

      // const posts = await Post.find({
      //   title: { $regex: req.params.title, $options: "i" },
      // });

      const posts = await Post.find({
        title: new RegExp(req.params.title, "i"),
      });

      if (posts.length === 0) {
        return res.status(404).send("No se encontraron posts con ese título");
      }
      console.log(posts);
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "No se pudo encontrar el post",
      });
    }
  },

  async getAllPages(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const posts = await Post.find()
        // Populate post author (userId)
        .populate({ path: 'userId', select: 'name + email' })
        // Populate comments with username from userId
        .populate({
          path: 'comments',
          populate: { path: 'userId', select: 'name + email' },
        })
        .limit(limit)
        .skip((page - 1) * limit);
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: 'Problema al mostrar los posts' });
    }
  },
  

  async insertComment(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        {$push: { comments: { comment: req.body.comment, userId: req.user._id }},
        }, { new: true })
      res.send(post)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Hay un problema con el post' })
    }
  },

  async like(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
      req.params._id, { $push: { likes: req.user._id } },{ new: true })
      res.send(post)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: "Hay un problema con tu petición" })
      }
    },

    async deletelikes(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $pull: { likes: req.user._id }}, // Usar $pull para eliminar el like
        { new: true } // Para devolver el documento actualizado
      );
      if (!post) {
        return res.status(404).send({ message: 'Post no encontrado' });
      }
      res.send({ post, message: 'Like eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Hubo un problema al eliminar el like',
      });
    }
  },


  async deletePost(req, res) {
    try {
      const postDeleted = await Post.findByIdAndDelete(req.params._id);
      res.status(200).send({ postDeleted, message: "Post eliminado" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "there was a problem trying to remove the post",
      });
    }
  },

  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      res.send({ message: "post actualizado correctamente", post });
    } catch (error) {
      console.error(error);
    }
  },
};


module.exports = PostController;
