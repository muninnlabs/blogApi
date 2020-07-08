module.exports = app => {
  const publication = require('../controllers/publication.controller.js');
  //create new post
  app.post('/publication', publication.create);
  //   get all posts
  app.get('/publication', publication.findAll);
  //   get a single post
  app.get('/publication/:postId', publication.findOne);
  //   update a post
  app.put('/publication/:postId', publication.update);
  //   delete a note with postId
  app.delete('/publication/:postId', publication.delete);
};
