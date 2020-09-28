const handleAddSubscription = (db) => (req, res) => {
  const {subName, subPrice, subDate, userId } = req.body;
    db('subs').insert({
      sub_name: subName,
      sub_price: subPrice,
      start_date: subDate,
      user_id: userId
    }).then(data => {
      res.json("send back 'data' for front end to put into sub comp")
    }).catch(err => res.status(400).json('unable to add subs'))
}

const handleDeleteSubscription = (db) => (req, res) => {
  const {subName, userId } = req.body;
    db('subs').where({sub_name: subName})
      .andWhere({user_id: userId})
      .del()
      .then(data => {
        res.json('so we know this woiked')
      }).catch(err => res.status(400).json('unable to delete subs'))
}

module.exports = {
  handleAddSubscription: handleAddSubscription,
  handleDeleteSubscription: handleDeleteSubscription
};
