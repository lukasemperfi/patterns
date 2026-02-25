//#region Abstract
interface Product {
  getDescription(): string;
}

abstract class Creator {
  public abstract factoryMethod(): Product;

  public orderPizza(): string {
    const product = this.factoryMethod();
    return `Creator: The pizzeria just prepared ${product.getDescription()}`;
  }
}
//#endregion

//#region MargheritaPizzeria Creator and its product
class MargheritaPizzeria extends Creator {
  public factoryMethod(): Product {
    return new MargheritaPizza();
  }
}

class MargheritaPizza implements Product {
  public getDescription(): string {
    return "a Margherita Pizza with tomato, mozzarella, and basil 🍕";
  }
}
//#endregion

//#region PepperoniPizzeria Creator and its product
class PepperoniPizzeria extends Creator {
  public factoryMethod(): Product {
    return new PepperoniPizza();
  }
}

class PepperoniPizza implements Product {
  public getDescription(): string {
    return "a Pepperoni Pizza with mozzarella and spicy pepperoni 🍕";
  }
}
//#endregion

//#region Client code
function clientCode(creator: Creator) {
  console.log("Client: I don't know the pizzeria type, but it still works.");
  console.log(creator.orderPizza());
}
//#endregion

//#region Execution
console.log("App: Launched with the MargheritaPizzeria.");
clientCode(new MargheritaPizzeria());
console.log("");

console.log("App: Launched with the PepperoniPizzeria.");
clientCode(new PepperoniPizzeria());
//#endregion
