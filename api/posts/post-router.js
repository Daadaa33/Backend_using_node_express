const express = require('express');

const postModel = require('./post-model')
// You will need `posts-model.js`
const validatePost = require('../middleware/index')
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res) => {
    // RETURN AN ARRAY WITH ALL THE POSTS
    try{
      const posts = await postModel.find(req.query)
      res.status(200).json(posts)
    } catch(err){
      res.status(500).json({message: `failed to get posts ${err}`})
    }
  });
  
  router.get('/:id', async (req, res) => {
    // RETURN THE POST OBJECT
    try {
      const onePost = await postModel.getById(req.params.id)
      const {id} = req.params
      if(onePost) {
        res.status(200).json(onePost)
      } else {
        res.status(404).json({ message: `the id: ${id} not found`} )
      }
    }  catch(err) {
      req.status(500).json({message : `failed to get this post`})
    }
  });

  router.get('/:id/posts', (req, res) => {
    // RETURN THE ARRAY OF USER POSTS
    // this needs a middleware to verify user id
  });
  

  router.post('/:id/posts', (req, res) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
  });

  router.put('/:id', async(req, res) => {
    // RETURN THE FRESHLY UPDATED POST OBJECT
    // and another middleware to check that the request body is valid

    try {
      const postUpdate = await postModel.update(req.params.id)
      
      if(postUpdate){
        res.status(200).json(postUpdate)
      }else {
        res.status(404).json({message: `the  you want to update was not found`})
      }
    } catch (err) {
      res.status(500).json({message : `failed to update the id `})
    }
  });

    router.delete('/:id', async (req, res) => {
    try{
      const postDelete = await postModel.remove(req.params.id)
      const {id} = req.params
      if(postDelete){
        res.status(200).json(postDelete)
      } else {
        res.status(404).json({ message: `the id: ${id} not found`})
      }
    }catch(err){
      res.status(500).json({ message: `failed to delete post: ${id} error: `})

    }
  })
  

  module.exports = router;