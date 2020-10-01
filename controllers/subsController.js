const subsModel = require('../models/subsModel');

const handleAddSubscription = (db) => (req, res) => {
  const {subName, subPrice, subDate, userEmail } = req.body;
  subsModel.addSubscription(subName, subPrice, subDate, userEmail, db)
    .then(subObj => res.json(subObj))
    .catch(err => {
      res.status(400).json(err.message)}
    );
}

const handleDeleteSubscription = (db) => (req, res) => {
  const {subName, userEmail } = req.body;
  subsModel.deleteSubscription(subName, userEmail, db)
    .then(sucess => res.json('db updated, now erase front end sub component'))
    .catch(err => {
      res.status(400).json(err.message)}
    );
}

const handGetSubscriptions = (db) => (req, res) => {
  const { email } = req.body;
  subsModel.getSubscriptions(email, db)
    .then(subs => res.json(subs))
    .catch(err => {
      res.status(400).json(err.message)}
    );
}

module.exports = {
  handleAddSubscription: handleAddSubscription,
  handleDeleteSubscription: handleDeleteSubscription,
  handGetSubscriptions: handGetSubscriptions
};
