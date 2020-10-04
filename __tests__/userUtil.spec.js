const userUtil = require('../utilities/userUtil');

describe('isValidInput(): did user leave an input blank, logically', () =>{
  const inputEmail = "notNull";
  const inputPassword = "notNull";

  const inputNull = "";
  test('returns true with two non null inputs', () =>{
    expect(userUtil.isValidInput(inputEmail, inputPassword)).toBeTruthy();
  });
  test('returns false with password left null', () =>{
    expect(userUtil.isValidInput(inputNull, inputPassword)).toBeFalsy();
  });
  test('returns false with email left null', () =>{
    expect(userUtil.isValidInput(inputEmail, inputNull)).toBeFalsy();
  });
  test('return false if both email and password are null', () =>{
    expect(userUtil.isValidInput(inputNull, inputNull)).toBeFalsy();
  });
});

describe('isValidRegisterInput(): if user leaves input blank in reg', () =>{
  const inputName = "notNullName"
  const inputEmail = "notNullEmail";
  const inputPassword = "notNullPassword";
  const inputNull = "";

  test('returns true with all values not null', () =>{
    expect(userUtil.isValidRegisterInput(inputName, inputEmail, inputPassword)).toBeTruthy();
  });
});

describe('sanitizeUser(): sanitize user from db to just name and email', () =>{
  test('copies object with fewer of the same properties', () =>{
    const input = {
      id: 101,
      name: "Fred",
      email: "fred@gmail.com",
      hash: "$2a$10$A6bztg4mPw50b4FMwDv3d"
    }
    const output = {
      name: "Fred",
      email: "fred@gmail.com"
    }
    expect(userUtil.sanitizeUser(input)).toStrictEqual(output);
  });
});

describe('createUser;', () =>{
  test('copies object with fewer of the same properties', () =>{
    const inputName = "Fred";
    const inputEmail = "fred@gmail.com";
    const output = {
      email: "fred@gmail.com",
      name: "Fred"
    }
    expect(userUtil.createUser(inputEmail, inputName)).toStrictEqual(output);
  });
});
