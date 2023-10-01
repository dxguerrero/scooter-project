const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  // ScooterApp code here
  constructor() {
    this.stations = {
      "Station 1" : [],
      "Station 2" : [],
      "Station 3" : []
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if(!this.registeredUsers[username] && age >= 18) {
      this.registeredUsers[username] = new User(username, password, age);
      console.log("user has been registered");
      return this.registeredUsers[username];
    } else {
      throw new Error(
        this.registeredUsers[username] ? "Already registered" : "Too young to register"
      );
    }
  }

  loginUser(username, password) {
    if (this.registeredUsers[username]) {
      this.registeredUsers[username].login(password);
      console.log("user has been logged in");
    } else {
      throw new Error('username or password is incorrect');
    }
  }

  logoutUser(username) {
      const user = this.registeredUsers[username];
      if (user) {
        user.logout();
        console.log("user is logged out");
      } else {
        throw new Error('no such user is logged in');
      }
  }

  createScooter(station) {
    if(!this.stations[station]) {
      throw new Error("no such station error");
    }

    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log("created new scooter");
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("no such station");
    } 
    
    if (this.stations[station].includes(scooter)) {
      throw new Error("scooter already at station");
    }

    this.stations[station].push(scooter);
    scooter.dock(station);
    console.log("scooter is docked");
  }

  rentScooter(scooter, user) {
    if (this.stations[station].includes(scooter)) {
      this.stations[scooter.station].splice(this.stations[scooter.station].indexOf(scooter), 1);
      console.log("scooter is rented");
    } else {
      throw new Error("scooter already rented")
    }
  }

  print() {
    console.log("Registered Users: ");
    for (const [username, user] of Object.entries(this.registeredUsers)) {
      console.log(`${username} (${age})`);
    }

    console.log("Stations: ");
    for (const [station, scooters] of Object.entries(this.stations)) {
      console.log(`${station}: ${scooters.length} scooters`);
    }
  }
}


module.exports = ScooterApp
