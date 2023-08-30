const express = require('express');
const postModel = require('./post-model')
const {validatePost} = require('../middleware/index')
const {validateUserId} = require('../middleware/index')

const router = express.Router();

router.get('/', async (req, res) => {
    try{
      const posts = await postModel.find(req.query)
     
      res.status(200).json(posts)
    } catch(err){
      res.status(500).json({message: `failed to get posts ${err}`})
    }
  });
  
router.get('/:id', async (req, res) => {
    try {
      const onePost = await postModel.getById(req.params.id)
      // console.log(userId)
      if(onePost) {
        res.status(200).json(onePost)
      } else {
        res.status(404).json({ message: `the id: ${id} not found`} )
      }
    }  catch(err) {
      res.status(500).json({message : `failed to get this post`})
    }
  });

  router.get('/:id/posts',validateUserId, (req, res) => {
    // RETURN THE ARRAY OF USER POSTS
    try{
      const {id} =  postModel.getById(req.params);

    }catch(err) {
      res.status(500).json({message: `failed to find array of users`})
    }
  });
  

  router.post('/:id/posts', validatePost,validateUserId,async (req, res) => {
    try{
      const insertNewPost = await postModel.insert(req.body)
      res.status(201).json(insertNewPost);
    }catch(err){
      res.status(500).json({message : `failed to post new user ${err}`})
    }
  });

  router.put('/:id', validatePost , async(req, res) => {
    try {
      const postUpdate = await postModel.update(req.params.id, req.body)
      
      if(postUpdate){
        res.status(200).json(postUpdate)
      }else {
        res.status(404).json({message: `your Post update was not found`})
      }
    } catch (err) {
      res.status(500).json({message : `failed to update the id `})
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const postDelete = await postModel.remove(req.params.id);
      const { id } = req.params;
      if (postDelete) {
        res.status(200).json(postDelete);
      } else {
        res.status(404).json({ message: `the id: ${id} not found` });
      }
    } catch (err) {
      res.status(500).json({ message: `failed to delete post: ${id} error: ` });
    }
  });
  

  module.exports = router;