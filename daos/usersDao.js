
const insertUser = (name, email, hash, db) => {

    return db('users').insert({  // give this to userDao
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


// Method for retrieving ID with user's email

// Method for INSERTING user with inputted email, name, hash

// Method for DELETING users with given    ID

// Method for GETTING user's hash with email

// MAYBE Method for Updating, but will get front-end up before implementation
