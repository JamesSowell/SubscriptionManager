const insertSub = (subName, subPrice, subDate, userId, db) =>{
  return db('subs').insert({
    sub_name: subName,
    sub_price: subPrice,
    start_date: subDate,
    user_id: userId
  });
}

const deleteSub = (subName, userId, db) => { //make email instead of id
  return db('subs').where({sub_name: subName}) // use join to erase all subs at once
    .andWhere({user_id: userId})            // fron END DOESN't need ID from db
    .del();
}

const deleteSubsOfUserId = (userId, db) => {
    return db.select('*').from('subs')
      .where('user_id', '=', userId)
      .del()
}

const getSubs = (userId, db) => {
  return db.select('sub_name', 'sub_price', 'start_date')
           .from('subs').where('user_id', '=', userId);
}

module.exports = {
  insertSub: insertSub,
  deleteSub: deleteSub,
  deleteSubsOfUserId: deleteSubsOfUserId,
  getSubs: getSubs
};
