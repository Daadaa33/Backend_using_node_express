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
 return db('users');
}

function getById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getUserPosts(id) {
    return db('users')
        .where({ id })
        .then(user => {
            return db('posts')
                .where({ user_id: user.id })
        });
}

function insert(post) {
  return db('users')
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del()
    

}
