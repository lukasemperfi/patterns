interface Shape {
  clone(): Shape;
  render(): void;
}

class Rectangle implements Shape {
  public width: number;
  public height: number;
  public color: string;

  constructor(source?: Rectangle) {
    if (source) {
      this.width = source.width;
      this.height = source.height;
      this.color = source.color;
    } else {
      this.width = 0;
      this.height = 0;
      this.color = "black";
    }
  }

  public clone(): Shape {
    return new Rectangle(this);
  }

  public render(): void {
    console.log(
      `Rectangle: ${this.width}x${this.height}, Color: ${this.color}`,
    );
  }
}

class Circle implements Shape {
  public radius: number;

  constructor(source?: Circle) {
    if (source) {
      this.radius = source.radius;
    } else {
      this.radius = 0;
    }
  }

  public clone(): Shape {
    return new Circle(this);
  }

  public render(): void {
    console.log(`Circle: radius ${this.radius}`);
  }
}

function runGraphicEditor() {
  const redRect = new Rectangle();
  redRect.width = 100;
  redRect.height = 50;
  redRect.color = "red";

  const anotherRect = redRect.clone();

  console.log("Original:");
  redRect.render();

  console.log("Clone:");
  anotherRect.render();

  console.log("Are they the same object?", redRect === anotherRect);
}

runGraphicEditor();
