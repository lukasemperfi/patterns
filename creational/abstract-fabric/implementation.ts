//#region Abstract
interface FurnitureFactory {
  createChair(): Chair;
  createTable(): Table;
}

interface Chair {
  sitOn(): string;
}

interface Table {
  putOn(): string;
  checkCompatibility(chair: Chair): string;
}
//#endregion

//#region Modern Furniture Factory and its products
class ModernFurnitureFactory implements FurnitureFactory {
  public createChair(): Chair {
    return new ModernChair();
  }

  public createTable(): Table {
    return new ModernTable();
  }
}

class ModernChair implements Chair {
  public sitOn(): string {
    return "Sitting on a modern chair.";
  }
}

class ModernTable implements Table {
  public putOn(): string {
    return "Putting items on a modern table.";
  }

  public checkCompatibility(chair: Chair): string {
    const result = chair.sitOn();
    return `Modern table works well with -> (${result})`;
  }
}
//#endregion

//#region Classic Furniture Factory and its products
class ClassicFurnitureFactory implements FurnitureFactory {
  public createChair(): Chair {
    return new ClassicChair();
  }

  public createTable(): Table {
    return new ClassicTable();
  }
}

class ClassicChair implements Chair {
  public sitOn(): string {
    return "Sitting on a classic wooden chair.";
  }
}

class ClassicTable implements Table {
  public putOn(): string {
    return "Putting items on a classic table.";
  }

  public checkCompatibility(chair: Chair): string {
    const result = chair.sitOn();
    return `Classic table works well with -> (${result})`;
  }
}
//#endregion

//#region Client code
function clientCode(factory: FurnitureFactory) {
  const chair = factory.createChair();
  const table = factory.createTable();

  console.log(table.putOn());
  console.log(table.checkCompatibility(chair));
}
//#endregion

//#region Execution
console.log("Client: Using modern furniture factory...");
clientCode(new ModernFurnitureFactory());

console.log("");

console.log("Client: Using classic furniture factory...");
clientCode(new ClassicFurnitureFactory());
//#endregion
