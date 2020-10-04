const subUtil = require('../utilities/subUtil');

describe('sanitizing sub object', () => {
  test('simplifies sub from database, to object with only name & price', () =>{
    const inputName = "Hulu";
    const inputPrice = 15;
    const output = {
      sub_name: "Hulu",
      sub_price: 15
    }
    expect(subUtil.sanitizeSubObj(inputName, inputPrice)).toStrictEqual(output);
  });
});
