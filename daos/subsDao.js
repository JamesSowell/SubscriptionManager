const insertSub = (subName, subPrice, userId, db) => {
    return db('subs').insert({
      sub_name: subName,
      sub_price: subPrice,
      user_id: userId
    });
}

const deleteSub = (subName, userId, db) => {
  return db('subs').where({sub_name: subName}) 
    .andWhere({user_id: userId})
    .del();
}

const deleteSubsOfUserId = (userId, db) => {
    return db.select('*').from('subs')
      .where('user_id', '=', userId)
      .del()
}

const getSubs = (userId, db) => {
  return db.select('sub_name', 'sub_price')
           .from('subs').where('user_id', '=', userId);
}

module.exports = {
  insertSub: insertSub,
  deleteSub: deleteSub,
  deleteSubsOfUserId: deleteSubsOfUserId,
  getSubs: getSubs
};
