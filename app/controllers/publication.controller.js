const Publication = require('../models/publication.model.js');

// Create and Save a new Post
exports.create = (req, res) => {
  // validate request
  if (!req.body.url_imagem) {
    return res.status(400).send({
      message: 'Post image can not be empty'
    });
  }
  Publication.init();
  // create a new post
  const newPost = new Publication({
    imgPath: req.body.url_imagem,
    title: req.body.title || 'Untiled'
  });
  newPost
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error ocurred while creating the new Post'
      });
    });
};
// Retrieve and return all posts
exports.findAll = (req, res) => {
  //   res.send('you just got here congratulations');

  Publication.find()
    .then(publications => {
      res.send(publications);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving posts'
      });
    });
};
// Find a single Post
exports.findOne = (req, res) => {
  Publication.findById(req.params.postId)
    .then(publication => {
      if (!postagem) {
        return res.status(404).send({
          message: `Post id ${req.params.id} not found`
        });
      }
      res.send(postagem);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Post id ${req.params.id} not found`
        });
      }
      return res.status(500).send({
        message: `Error retrieving post with id ${req.params.id}    `
      });
    });
};
// Update a post identified by id in request
exports.update = (req, res) => {
  Publication.findByIdAndUpdate(
    req.params.postId,
    {
      titulo: req.body.titulo || 'Untiled document',
      url_imagem: req.body.url_imagem
    },
    { new: true }
  )
    .then(postagem => {
      console.log(req.body);
      if (!postagem) {
        return res.status(404).send({
          message: `Post id ${req.params.postId} not found`
        });
      }
      res.send(postagem);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Post id ${req.params.postId} not found`
        });
      }
      return res.status(500).send({
        message: `Error retrieving post with id ${req.params.postId}    `
      });
    });
};
// Delete a post with the specific post id in the request
exports.delete = (req, res) => {
  Publication.findByIdAndRemove(req.params.postId)
    .then(postagem => {
      if (!postagem) {
        return res.status(404).send({
          message: `Post id ${req.params.id} not found`
        });
      }
      res.send({ message: 'Post removed successfully' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Post id ${req.params.id} not found`
        });
      }
      return res.status(500).send({
        message: `Error retrieving post with id ${req.params.id}    `
      });
    });
};
