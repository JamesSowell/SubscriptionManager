const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

const subsController = require('./controllers/subsController');
const usersController = require('./controllers/usersController');

const db = knex ({
  client: 'pg',
  connection: {
    connectionString :  process.env.DATABASE_URL,
    ssl: true,
  }
});
const app = express();

app.use(bodyParser.json());
app.use(cors());

// user routes
app.post('/register', usersController.handleRegister(db, bcrypt));
app.post('/signin', usersController.handleSignin(db, bcrypt));
app.delete('/deleteaccount', usersController.handeDeleteAccount(db));


// subscription routes
app.post('/addsubscription', subsController.handleAddSubscription(db));
app.delete('/deletesubscription', subsController.handleDeleteSubscription(db));
app.post('/getsubscriptions', subsController.handGetSubscriptions(db))

//Test for fron-end
app.get('/', (req, res) => {
  res.json('front-end & back-end are connected');
})

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`app is running on port${process.env.PORT}`);
})
