const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then( user => {
      res.status(201).json(user)
    })
    .catch( error => {
      console.log(error => {
        res.status(500).json({
          error: "Error saving new user."
        });
      });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const id = req.params.id;
  const newPost = {
    user_id: id,
    text: req.body.text
  };
  Posts.insert(newPost)
    .then( post => {
      res.status(201).json(post)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error saving new post.'
      })
    })
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

router.get('/:id', validateUserId, (req, res) => {
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

router.get('/:id/posts', validateUserId, (req, res) => {
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

router.delete('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then( () => {
      res.status(200).json(id);
    })
    .catch( error => {
      console.log(error);
      res.status(500).json({
        error: "Error deleting user."
      })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  const updatedUser = {
    id: id,
    name: req.body.name
  }
  Users.update(id, updatedUser)
    .then( () => {
      Users.getById(id)
        .then( user => {
          res.status(200).json(user);
        })
        .catch( error => {
          console.log(error);
          res.status(500).json({
            error: 'Error updating user.'
          });
        });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  Users.getById(id)
    .then( user => {
      if (user) {
        next();
      } else {
        res.status(400).json({
          message: 'Invalid user id.'
        })
      }
    })
}

function validateUser(req, res, next) {
  if (Object.entries(req.body).length > 0) {
    if (req.body.name){
      next();
    } else {
      res.status(400).json({
        message: 'Missing required \'name\' field.'
      });
    }
  } else {
    res.status(400).json({
      message: 'Missing user data.'
    });
  }
}

function validatePost(req, res, next) {
  if (Object.entries(req.body).length > 0) {
    if (req.body.text){
      next();
    } else {
      res.status(400).json({
        message: 'Missing required \'text\' field.'
      });
    }
  } else {
    res.status(400).json({
      message: 'Missing post data.'
    });
  }
}

module.exports = router;
