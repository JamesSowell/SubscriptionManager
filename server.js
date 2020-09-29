const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

const subsController = require('./controllers/subsController');
const signin = require('./controllers/signin');
const register = require('./controllers/register');

const db = knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'subscriptionmanager'
  }
});
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('please work');
})

// register will put users password and email in logins and user database. DONE
// new data will go to front-end state which will use ID to match with foreign keys
app.post('/register', register.handleRegister(db, bcrypt))

// signin is responsible for responding users SUBSCRIPTIONS. DONE
app.post('/signin', signin.handleSignin(db, bcrypt))



app.post('/addsubscription', subsController.handleAddSubscription(db))

app.delete('/deletesubscription', subsController.handleDeleteSubscription(db))


app.listen(3000, (req, res) => {
  console.log('app is running on port 3000');
})


/*
at home page:
  register(POST)

  signin(POST)

  Might even have the ability to delete account. IS THIS A GOOD IDEA?

at user's page:
  addSubscription(POST)
    db.select('subscriptions')

  updateSubscription(PUT)
    db.select('subscriptions').where('subscription_name').update('subscription.body')

  deleteSubscription(DELETE)
    db.delete('subscriptions').where('subscription_name').DELETE('subscription_name')

    db.select('*').from('users').then(data => {
      //console.log(data);
    });

  CREATE TABLE users (
   id BIGSERIAL NOT NULL PRIMARY KEY,
   name VARCHAR(100),
   email text UNIQUE NOT NULL,
   subId BIGINT REFERENCES subs (id),
   UNIQUE(subId) );

   CREATE TABLE subs (
   id BIGINT NOT NULL PRIMARY KEY,
   subName VARCHAR(100) NOT NULL,
   subPrice INT,
   startDate DATE NOT NULL);

*/
