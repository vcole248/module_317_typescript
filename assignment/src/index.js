class Vehicle {
  constructor(make, model, year, status) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.status = status;
  }

  printStatus() {
    console.log(`The ${this.make} ${this.model} is currently ${this.status}.`);
  }
}

class Car extends Vehicle {
  constructor(make, model, year, status, doors) {
    super(make, model, year, status);
    this.doors = doors;
  }

  printStatus() {
    console.log(`The ${this.make} ${this.model} has ${this.doors} doors and is ${this.status}.`);
  }
}

class MotorCycle extends Vehicle {
  constructor(make, model, year, status, sidecar) {
    super(make, model, year, status);
    this.sidecar = sidecar;
  }

  printStatus() {
    console.log(`The ${this.make} ${this.model} does ${this.sidecar ? "" : "not "}have a sidecar and is ${this.status}.`);
  }
}

function printStatus(vehicle) {
  vehicle.printStatus();
}

// Errors below - these will be caught by TypeScript
const myVehicle = new Vehicle("Toyota", "Camry", 2020, "hello");
printStatus(myVehicle);

const myCar = new Car("Honda", "Civic", 2021, "running", 4);
printStatus(myCar);

const myMotorCycle = new MotorCycle("Harley", "Sportster", 2022, "stopped", true);
printStatus(myMotorCycle);

// This will cause an error - passing wrong type
printStatus("not a vehicle");

// This will cause errors - invalid status value
const badVehicle = new Vehicle("Ford", "Mustang", 2022, "racing");
