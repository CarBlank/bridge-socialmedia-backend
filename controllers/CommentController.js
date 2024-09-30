const Comment = require('../models/Comment')

const CommentController = {
 async create(req, res) {
   try {
     const comment = await Comment.create(req.body)
     res.status(201).send(comment)
   } catch (error) {
     console.error(error)
     res
       .status(500)
       .send({ message: 'Ha habido un problema al crear el comentario' })
   }
 },

 async insertComment(req, res) {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params._id,
      {$push: { posts: { comment: req.body.comment, userId: req.user._id }},
      }, { new: true })
    res.send(comment)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Ha habido un problema con tu comentario' })
  }
},

async update(req, res) {
  try {
    const comment = await Post.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    )
    res.send({ message: 'Comentario actualizada correctamente', comment })
  } catch (error) {
    console.error(error)
  }
},

async like(req, res) {
  try {
    const comment = await Comment.findByIdAndUpdate(
    req.params._id, { $push: { likes: req.user._id } },{ new: true })
    res.send(comment)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Huno un problema con tu request" })
    }
  },

  async deleteLikes(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params._id,
        { $pull: { likes: req.user._id }}, // Usar $pull para eliminar el like
        { new: true } // Para devolver el documento actualizado
      );
      if (!comment) {
        return res.status(404).send({ message: 'Like no encontrado' });
      }
      res.send({ post, message: 'Like eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Hubo un problema al eliminar el like',
      });
    }
  },


async delete(req, res) {
  try {
    const comment = await Comment.findByIdAndDelete(req.params._id)
    res.send({ comment, message: 'Comentario eliminado' })
  } catch (error) {
    console.error(error)
    res.status(500).send({
        message: 'Hubo un problema al eliminar el comentario',
      })
  }
},


}
module.exports = CommentController