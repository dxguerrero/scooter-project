const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

const scooterApp = new ScooterApp();
// ScooterApp tests here

// register user
describe("registerUser method tests", () => {
  test("Should return instance of User", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(response).toBeInstanceOf(User);
  });
});


// log in
describe("loginUser method tests", () => {
  test("isLoggedIn true if user exists and password correct", () =>{
    scooterApp.registerUser("Caly", "test123", 21);
    scooterApp.loginUser("Caly", "test123");
    expect(scooterApp.registeredUsers["Caly"].loggedIn).toBe(true);
  })

  test("throws error if user does not exist", () => {
    expect(() => {
      scooterApp.loginUser("Prince", "test123");
    }).toThrow("username or password is incorrect");
  })

  test("throws error if password is incorrect", () => {
    scooterApp.registerUser("Prince", "test123", 21);
    expect(() => {
      scooterApp.loginUser("Prince", "123test");
    }).toThrow("incorrect password")
  })
})

// log out
describe("logoutUser method tests", () => {
  test("loggedIn changed to false", () => {
    scooterApp.registerUser("Daniel", "test123", 21);
    scooterApp.loginUser("Daniel", "test123");
    scooterApp.logoutUser("Daniel");
    expect(scooterApp.registeredUsers["Daniel"].loggedIn).toBe(false);
  })

  test("throws error if user not located", () => {
    expect(() => {
      scooterApp.logoutUser("Dave");
    }).toThrow("no such user is logged in");
  })
})

// rent scooter

// dock scooter