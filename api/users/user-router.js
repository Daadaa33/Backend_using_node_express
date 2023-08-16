const express = require('express');
const UserModel = require('./user-model')
// You will need `users-model.js`
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res) => {

try{
  const users = await UserModel.find(req.query)
  console.log(users)
  res.status(200).json(users)
} catch(err){
  res.status(500).json({message: `failed to get users ${err}`})
}
});

router.get('/:id', async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
    const oneUser = await UserModel.getById(req.params.id)
    const {id} = req.params
    console.log(oneUser)
    if(oneUser) {
      res.status(200).json(oneUser)
    } else {
      res.status(404).json({ message: `the id: ${id} not found`} )
    }
  }  catch(err) {
    req.status(500).json({message : `failed to get this user`})
  }
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});


// do not forget to export the router

module.exports = router