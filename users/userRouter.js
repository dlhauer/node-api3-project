const express = require('express');
const Users = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  Users.get()
    .then( users => {
      res.status(200).json(users);
    })
    .catch( error => {
      console.log(error);
      res.status(500).json({
        error: "Error retrieving the users."
      });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Users.getById(id)
    .then( user => {
      res.status(200).json(user)
    })
    .catch( error => {
      console.log(error);
      res.status(500).json({
        error: 'Error retrieving the user.'
      });
    });
});

router.get('/:id/posts', (req, res) => {
  const id = req.params.id;
  Users.getUserPosts(id)
    .then( posts => {
      res.status(200).json(posts);
    })
    .catch( error => {
      console.log(error);
      res.status(500).json({
        error: 'Error retrieving the user\'s posts.'
      });
    });
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
