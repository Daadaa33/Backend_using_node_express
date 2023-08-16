const posts = require('../posts/post-model')



function validateUserId(req, res, next) {
    // DO YOUR MAGIC
  }
  
  function validateUser(req, res, next) {
    // DO YOUR MAGIC
    const body = req.body;

    if(!body) {
      return res.status(400).json({message: "fadlan meelaha banan buuxi"});
    }
    next()
  }
  
 async function validatePost(req, res, next) {
    // DO YOUR MAGIC
  const body = req.body;

    if(!body) {
      return res.status(400).json({message: "Invalid"});
    }
    next()
  }
  
  // do not forget to expose these functions to other modules
  
  module.exports = {
    validateUserId,
    validatePost,
    validateUser

  }