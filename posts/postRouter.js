const express = require('express');
const Posts = require('../posts/postDb');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Error retrieving posts.'
      })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  Posts.getById(id)
    .then( post => {
      res.status(200).json(post);
    })
    .catch( error => {
      res.status(500).json({
        error: 'Error retrieving post.'
      })
    })

});

router.delete('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  Posts.remove(id)
    .then( () => {
      res.status(200).json(id);
    })
    .catch( error => {
      console.log(error);
      res.status(500).json({
        error: 'Error deleting post.'
      })
    })
});

router.put('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  Posts.getById(id)
    .then( post => {
      const updatedPost = {
        id: id,
        user_id: post.user_id,
        text: req.body.text,
      }
      Posts.update(id, updatedPost)
        .then( () => {
          res.status(200).json(updatedPost);
        })
        .catch( error => {
          console.log(error => {
            res.status(500).json({
              error: 'Error updating post.'
            })
          })
        })
    })
    
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id;
  Posts.getById(id)
    .then( post => {
      if (post) {
        next();
      } else {
        res.status(400).json({
          message: 'Invalid post ID.'
        });
      }
    });
}

module.exports = router;
