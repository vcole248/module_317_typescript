 @ts-check

/**
 * ALAB 317.1.1: Working with TypeScript
 * Completed TypeScript implementation with classes, generics, and type safety
 */

type VehicleStatus = "started" | "stopped";

class Vehicle {
  make: string;
  model: string;
  year: number;
  status: VehicleStatus;

  constructor(make: string, model: string, year: number, status: VehicleStatus) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.status = status;
  }

  printStatus(): void {
    console.log(`The ${this.make} ${this.model} is currently ${this.status}.`);
  }
}

class Car extends Vehicle {
  doors: number;

  constructor(make: string, model: string, year: number, status: VehicleStatus, doors: number) {
    super(make, model, year, status);
    this.doors = doors;
  }

  printStatus(): void {
    console.log(`The ${this.make} ${this.model} has ${this.doors} doors and is ${this.status}.`);
  }
}

class MotorCycle extends Vehicle {
  sidecar: boolean;

  constructor(make: string, model: string, year: number, status: VehicleStatus, sidecar: boolean) {
    super(make, model, year, status);
    this.sidecar = sidecar;
  }

  printStatus(): void {
    console.log(`The ${this.make} ${this.model} does ${this.sidecar ? "" : "not "}have a sidecar and is ${this.status}.`);
  }
}

function printStatus(vehicle: Vehicle): void {
  vehicle.printStatus();
}

/**
 * Generic NCycle class that accepts a type parameter
 * Make and model can be either the generic type or an array of the generic type
 */
class NCycle<T> {
  make: T | T[];
  model: T | T[];
  year: number;

  constructor(make: T | T[], model: T | T[], year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  /**
   * Prints information about a specific index in the make/model arrays
   * @param index - The index to print from (default: 0)
   */
  print(index: number = 0): void {
    // Check if both make and model are not arrays
    if (!Array.isArray(this.make) && !Array.isArray(this.model)) {
      console.log(`This is a ${this.make} ${this.model} NCycle.`);
    }
    // Check if both are arrays and the index exists in both
    else if (Array.isArray(this.make) && Array.isArray(this.model)) {
      if (index < this.make.length && index < this.model.length) {
        console.log(`This NCycle has a ${this.make[index]} ${this.model[index]} at ${index}.`);
      } else {
        console.log("This NCycle was not created properly.");
      }
    }
    // Neither condition met
    else {
      console.log("This NCycle was not created properly.");
    }
  }

  /**
   * Prints all matching pairs in the make and model arrays
   * Falls back to standard print if not arrays
   */
  printAll(): void {
    // Check if both make and model are not arrays
    if (!Array.isArray(this.make) && !Array.isArray(this.model)) {
      console.log(`This is a ${this.make} ${this.model} NCycle.`);
    }
    // Check if both are arrays
    else if (Array.isArray(this.make) && Array.isArray(this.model)) {
      const maxLength = Math.min(this.make.length, this.model.length);
      if (maxLength === 0) {
        console.log("This NCycle was not created properly.");
      } else {
        for (let i = 0; i < maxLength; i++) {
          console.log(`This NCycle has a ${this.make[i]} ${this.model[i]} at ${i}.`);
        }
      }
    }
    // Neither condition met
    else {
      console.log("This NCycle was not created properly.");
    }
  }
}

// ===== TESTING CODE =====

console.log("\n=== Corrected Original Code ===");
const myVehicle = new Vehicle("Toyota", "Camry", 2020, "stopped");
printStatus(myVehicle);

const myCar = new Car("Honda", "Civic", 2021, "started", 4);
printStatus(myCar);

const myMotorCycle = new MotorCycle("Harley", "Sportster", 2022, "stopped", true);
printStatus(myMotorCycle);

console.log("\n=== NCycle Generic Class Tests ===");

// Test 1: NCycle with number type
const testCycle1 = new NCycle<number>(1, 2, 3);
console.log("Test 1: NCycle<number>(1, 2, 3)");
testCycle1.print();
testCycle1.printAll();

// Test 2: NCycle with string type (mixed - string make, number model)
const testCycle2 = new NCycle<string>("This", "That", 4);
console.log("\nTest 2: NCycle<string>('This', 'That', 4)");
testCycle2.print();
testCycle2.printAll();

// Test 3: NCycle with string type (mixed - string make, number model)
const testCycle3 = new NCycle<string>("Make", 10, 4);
console.log("\nTest 3: NCycle<string>('Make', 10, 4)");
testCycle3.print(4);
testCycle3.printAll();

// Test 4: NCycle with string arrays
const makes4 = ["Volkswagon", "Tesla", "Audi"];
const models4 = ["Passat", "Model X", "A4"];
const testCycle4 = new NCycle<string[]>(makes4, models4, 4);
console.log("\nTest 4: NCycle<string[]>(makes4, models4, 4)");
testCycle4.print(2);
testCycle4.printAll();

// Test 5: NCycle with number arrays
const makes5 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const models5 = [1, 1, 2, 3, 5];
const testCycle5 = new NCycle<number[]>(makes5, models5, 0);
console.log("\nTest 5: NCycle<number[]>(makes5, models5, 0)");
testCycle5.print(7);
testCycle5.printAll();

console.log("\n=== Type Safety Tests ===");

// This should work - both are numbers
function add(x: number, y: number): number {
  return x + y;
}

// Valid: testCycle1.make is number and testCycle5.model[1] is number
const result1 = add(testCycle1.make as number, testCycle5.model[1] as number);
console.log(`add(testCycle1.make, testCycle5.model[1]) = ${result1}`);

// Error expected here - testCycle2.make is string and testCycle4.model[1] would be string[]
// This is intentionally commented to prevent runtime error
// add(testCycle2.make as any, testCycle4.model[1] as any);
console.log("Note: testCycle2.make (string) cannot be added to testCycle4.model[1] (string[]) - Type Error as expected");

