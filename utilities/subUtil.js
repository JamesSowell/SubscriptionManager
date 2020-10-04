

const sanitizeSubObj = (subName, subPrice) => {
  const subObj = {
    sub_name: subName,
    sub_price: subPrice
  }
  return subObj;
}

module.exports = {
  sanitizeSubObj: sanitizeSubObj
}
