const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('scooter object', () => {
  test('Scooter class should create Scooter instance', () => {
    const scooter = new Scooter();
    expect(scooter).toBeInstanceOf(Scooter);
  });
})

//Method tests
const scooter = new Scooter("Station 1");
const scooter2 = new Scooter("Station 2");
const user = new User("Jow Bloggs", "test123", 21);


describe('scooter methods', () => {
  // tests here!
  test("scooter has a station", () => {
    expect(scooter.station).toBe('Station 1');
  })

  test("User is null", () => {
    expect(scooter.user).toBeNull();
  })

  test("scooter serial is 1", () => {
    expect(scooter.serial).toBe(1);
  })

  test("scooter 2 serial is 2", () => {
    expect(scooter2.serial).toBe(2);
  })

  test("charge is 100", () => {
    expect(scooter.charge).toBe(100);
  })

  //rent method
  test("checks out from station and assigns to user", () => {
    scooter.rent(user)
    expect(scooter.user).toBe(user);
    expect(scooter.station).toBeNull();
  })

  test('throws error when charge is under 20', () => {
    scooter.charge = 19
    expect(() => {
      scooter.rent(user)
    }).toThrow('scooter needs to charge or scooter needs repair');
  })

  test('throws error when scooter is broken', () => {
    scooter.isBroken = true;
    expect(() => {
      scooter.rent(user)
    }).toThrow('scooter needs to charge or scooter needs repair');
  })
  //dock method
  test('returns scooter to station and clears user', () => {
    scooter.dock('Station 1')
    expect(scooter.station).toBe("Station 1");
    expect(scooter.user).toBeNull();
  })
  //requestRepair method

  //charge method

})
