// Method for retrieving ID with user's email

// Method for INSERTING user with inputted email, name, hash

// Method for DELETING users with given    ID

// Method for GETTING user's               email and hash

const insertUser = (name, email, hash) => {
  return
    db('users').insert({  // give this to userDao
        name: name,
        email: email,
        hash: hash
    });
}

module.exports = {

};
