const posts = require('../posts/post-model')



async function validateUserId(req, res, next) {
  // Perform your user ID validation logic here
  // For example, check if th
  const {id} = req.body
  // console.log("fuction kan wuu shaqeeyay",id)
  if (!id) {
    return res.status(404).json({ error: 'from middleware => User id wax jijro ma ahan' });
  }

  next();
  }
  
  async function validateUser(req, res, next) {

    const body =req.body.name;
    // console.log("middleware waa uu shaqeeyay", body);
    if(!body) {
      return res.status(400).json({message: "from middleware => fadlan magac ku soo dar"});
    }
    next()
  }
  
 async function validatePost(req, res, next) {
    // DO YOUR MAGIC
  const body =req.body.text && req.body.user_id;
  // console.log("waad ku guulaystay ",body)
    if(!body) {
      return res.status(400).json({message: "from middleware => wraa body waa not found"});
    }
    next()
  }
  
  
  module.exports = {
    validateUserId,
    validatePost,
    validateUser
  }