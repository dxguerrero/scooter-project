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

  test("throws error if age under 20", () => {
    expect(() => {
      scooterApp.registerUser("Mark", "test123", 15)
    }).toThrow("Too young to register");
  })

  test("throws error if already registered", () => {
    expect(() => {
      scooterApp.registerUser("Joe Bloggs", "test123", 21)
    }).toThrow("Already registered");
  })
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

// create scooter
describe("createScooter method tests", () => {
  const scooter = scooterApp.createScooter("Station 1");
  test("adds scooter to station", () => {
    expect(scooterApp.stations["Station 1"]).toEqual([scooter]);
  })

  test("throws error when station does not exist", () => {
    expect(() => {
      scooterApp.createScooter("Station 4")
    }).toThrow("no such station")
  })
})

// rent scooter
describe("rentScooter method tests", () => {
  const scooter1 = scooterApp.createScooter("Station 1");
  const user1 = scooterApp.registerUser("Bob", "test123", 50);
  scooterApp.rentScooter(scooter1, user1);

  test("rents scooter to user", () => {
    expect(scooter1.user).toBe(user1);
  })

  test("throws error if scooter is already rented", () => {
    const user2 = scooterApp.registerUser("John", "test123", 25);
    expect(() => {
      scooterApp.rentScooter(scooter1, user2);
    }).toThrow("scooter already rented");
  })
})

//  dock scooter
describe("dockScooter method tests", () => {
  const scooter2 = scooterApp.createScooter("Station 1");
  const user1 = scooterApp.registerUser("Jeff", "test123", 50);
  scooterApp.rentScooter(scooter2, user1);
  
  test("scooter is added to station", () => {
    scooterApp.dockScooter(scooter2, "Station 1");
    expect(scooter2.station).toBe("Station 1");
  })

  test("throws error if station does not exist", () => {
    expect(() => {
      scooterApp.dockScooter(scooter2, "Station 5")
    }).toThrow("no such station");
  })

  test("throws error if scooter already at station", () => {
    expect(() => {
      scooterApp.dockScooter(scooter2, "Station 1")
    }).toThrow("scooter already at station");
  })
})
