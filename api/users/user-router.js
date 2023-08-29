const express = require('express');
const UserModel = require('./user-model')
const {validateUser}  = require('../middleware/index')
const {validateUserId}  = require('../middleware/index')


const router = express.Router();

router.get('/', async(req, res) => {
try{
  const users = await UserModel.find(req.query)
  res.status(200).json(users)
} catch(err){
  res.status(500).json({ message: `failed to get users ${err}` });
}
});

router.get('/:id', async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
    const oneUser = await UserModel.getById(req.params.id)
    const {id} = req.params
    if(oneUser) {
      res.status(200).json(oneUser)
    } else {
      res.status(404).json({ message: `the id: ${id} not found`} )
    }
  }  catch(err) {
    req.status(500).json({message : `failed to get this user`})
  }
});

router.post('/',validateUser, async(req, res) => {
  try {
    const insertNewUser = await UserModel.insert(req.body);
    res.status(201).json(insertNewUser);
  } catch (err) {
    res.status(500).json({ message: `failed to post new user ${err}` });
  }
});

router.put('/:id',validateUserId,validateUser, async(req, res) => {
  try{
    const updateUser = await UserModel.update(req.params.id, req.body)
    if(updateUser){
      res.status(200).json(updateUser)
    }else{
      res.status(404).json({message: `user update not found`})
    }
  }catch(err){
    res.status(500).json({message : `failed to update this user`})
  }
});

router.delete('/:id', validateUserId,async (req, res) => {
  try{
    const dUser = await UserModel.remove(req.params.id)
    if(dUser){
      res.status(200).json(dUser)
    } else {
      res.status(404).json({ message: `the id: ${id} not found`})
    }
  }catch(err){
    res.status(500).json({message: `failed to delete this user`})
  }
});


// do not forget to export the router

module.exports = router;