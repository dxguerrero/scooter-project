class Scooter{
  // scooter code here
  static nextSerial = 1;

  constructor(station) {
    this.station = station
    this.user = null;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial += 1;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user) {
    if (this.charge > 20 && this.isBroken == false) {
      this.station = null
      this.user = user
    } else {
      throw new Error('scooter needs to charge or scooter needs repair')
    }
  }

  dock(station) {
    this.station = station
    this.user = null
  }

}


module.exports = Scooter
