//#region Element Interface
interface Person {
  accept(visitor: Inspector): void;
}
//#endregion

//#region Concrete Elements
class Passenger implements Person {
  public accept(visitor: Inspector): void {
    visitor.visitPassenger(this);
  }

  public getSuitcaseWeight(): number {
    return 23;
  }
}

class Pilot implements Person {
  public accept(visitor: Inspector): void {
    visitor.visitPilot(this);
  }

  public getFlightLicense(): string {
    return "ID-9901-FLY";
  }
}

class Military implements Person {
  public accept(visitor: Inspector): void {
    visitor.visitMilitary(this);
  }

  public getWeaponType(): string {
    return "Service Pistol";
  }
}
//#endregion

//#region Visitor Interface
interface Inspector {
  visitPassenger(p: Passenger): void;
  visitPilot(p: Pilot): void;
  visitMilitary(p: Military): void;
}
//#endregion

//#region Visitor Interface
interface Inspector {
  visitPassenger(p: Passenger): void;
  visitPilot(p: Pilot): void;
  visitMilitary(p: Military): void;
}
//#endregion

//#region Concrete Visitors
class CustomsOfficer implements Inspector {
  public visitPassenger(p: Passenger): void {
    console.log(`Customs: Checking suitcase (${p.getSuitcaseWeight()}kg). OK.`);
  }

  public visitPilot(p: Pilot): void {
    console.log(`Customs: Checking License ${p.getFlightLicense()}. Clear.`);
  }

  public visitMilitary(p: Military): void {
    console.log(`Customs: Checking ${p.getWeaponType()} permit. Authorized.`);
  }
}

class HealthOfficer implements Inspector {
  public visitPassenger(p: Passenger): void {
    console.log("Health: Measuring temperature of Passenger.");
  }

  public visitPilot(p: Pilot): void {
    console.log("Health: Quick fatigue check for Pilot.");
  }

  public visitMilitary(p: Military): void {
    console.log("Health: Military is exempt from health check.");
  }
}
//#endregion

//#region Client Code
const queue: Person[] = [new Passenger(), new Pilot(), new Military()];

// console.log("--- Customs Check Starts ---");
// const customs = new CustomsOfficer();
// queue.forEach((person) => person.accept(customs));

console.log("\n--- Health Check Starts ---");
const health = new HealthOfficer();
queue.forEach((person) => person.accept(health));
//#endregion
