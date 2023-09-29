const User = require('../src/User');

const user = new User("Jow Bloggs", "test123", 21);

// User tests here
describe("User property tests", () => {
  // test username
  test("username should be a string", () => {
    expect(typeof user.username).toBe("string");
  })
  // test password
  test("user has password", () => {
    expect(user.password).toBe("test123");
  })
  // test age
  test("user has age", () => {
    expect(user.age).toBe(21);
  })
})


// test login
describe("login function", () => {
    test("user can log in with correct password", () => {
      user.login("test123");
      expect(user.loggedIn).toBe(true);
    })

    test("throws error for wrong password", () => {
      expect(() =>{
        user.login('123test')
      }).toThrow('incorrect password')
    })
})

// test logout
describe("logout function", () => {
  test("logout changes loggedIn to false", () => {
    user.login('test123');
    user.logout();
    expect(user.loggedIn).toBe(false);
  })
})