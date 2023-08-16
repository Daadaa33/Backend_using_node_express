const db = require('../../data/dbConfig');

module.exports = {
  find,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
};

function find() {
 return db("user");
   
}

function getById(id) {
  return db('user')
    .where({ id })
    .first();
}

function getUserPosts(id) {
    return db('user')
        .where({ id })
        .then(user => {
            return db('posts')
                .where({ user_id: user.id })
        });
}

function insert(post) {
  return db('user')
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('user')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('user')
    .where('id', id)
    .del()
    

}
