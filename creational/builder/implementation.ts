// Интерфейс строителя
interface ComputerBuilder {
  addCPU(): void;
  addRAM(): void;
  addStorage(): void;
}

// Продукт — компьютер
class Computer {
  public components: string[] = [];

  public listComponents(): void {
    console.log(`Computer components: ${this.components.join(", ")}\n`);
  }
}

// Конкретный строитель
class GamingComputerBuilder implements ComputerBuilder {
  private computer!: Computer;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.computer = new Computer();
  }

  public addCPU(): void {
    this.computer.components.push("High-end CPU");
  }

  public addRAM(): void {
    this.computer.components.push("32GB RAM");
  }

  public addStorage(): void {
    this.computer.components.push("1TB SSD");
  }

  public getComputer(): Computer {
    const result = this.computer;
    this.reset();
    return result;
  }
}

// Директор — управляет процессом сборки
class ComputerAssemblyDirector {
  private builder!: ComputerBuilder;

  public setBuilder(builder: ComputerBuilder): void {
    this.builder = builder;
  }

  public buildBasicComputer(): void {
    this.builder.addCPU();
  }

  public buildFullGamingComputer(): void {
    this.builder.addCPU();
    this.builder.addRAM();
    this.builder.addStorage();
  }
}

// Клиентский код
function clientCode(director: ComputerAssemblyDirector) {
  const builder = new GamingComputerBuilder();
  director.setBuilder(builder);

  console.log("Basic computer:");
  director.buildBasicComputer();
  builder.getComputer().listComponents();

  console.log("Full gaming computer:");
  director.buildFullGamingComputer();
  builder.getComputer().listComponents();

  console.log("Custom computer:");
  builder.addCPU();
  builder.addStorage();
  builder.getComputer().listComponents();
}

const director = new ComputerAssemblyDirector();
clientCode(director);
