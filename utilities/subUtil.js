

const createSubObj = (subName, subPrice, subDate) => {
  const subObj = {
    sub_name: subName,
    sub_price: subPrice,
    start_date: subDate
  }

  return subObj;
}

module.exports = {
  createSubObj: createSubObj
}
