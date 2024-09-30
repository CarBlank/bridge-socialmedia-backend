const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    textPost: { type: String, required: true }, // Corregido
    userId: { type: ObjectId, ref: 'User', required: true }, // Relación con el usuario que crea el post
    comments: [
      {
        userId: { type: ObjectId, ref: 'User', required: true }, // Relación con el usuario que comenta
        comment: { type: String, required: true }, // El comentario es obligatorio
      },
    ],
    likes: [{ type: ObjectId, ref: 'User' }], // Referencia a los usuarios que dieron like
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

// const PostSchema = new mongoose.Schema(
//   {
//     title: String,
//     text: String,
//   },
//   { timestamps: true }
// );

// PostSchema.index({
//   title: "text",
// });

// const Post = mongoose.model("Post", PostSchema);

// module.exports = Post;
