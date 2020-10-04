
const insertUser = (name, email, hash, db) => {
    return db('users').insert({
        name: name,
        email: email,
        hash: hash
    });
}

const getUserByEmail = (email, db) => {
   return db.select('email', 'hash', 'name').from('users')
            .where('email', '=', email);
}

const getUserIdByEmail = (email, db) => {
   return db.select('id').from('users').where('email', '=', email);
}

const deleteUser = (userId, db) => {
    return db.select('*').from('users')
            .where('id', '=', userId)
            .del()
}

module.exports = {
  insertUser: insertUser,
  getUserByEmail: getUserByEmail,
  getUserIdByEmail: getUserIdByEmail,
  deleteUser: deleteUser
};
