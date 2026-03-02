//#region Component
interface Drink {
  getPrice(): number;
  getDescription(): string;
}
//#endregion

//#region ConcreteComponent
class SimpleCoffee implements Drink {
  getPrice(): number {
    return 100;
  }

  getDescription(): string {
    return "Простой кофе";
  }
}
//#endregion

//#region Base Decorator
abstract class DrinkDecorator implements Drink {
  constructor(protected drink: Drink) {}

  abstract getPrice(): number;
  abstract getDescription(): string;
}
//#endregion

//#region  Concrete Decorators
class MilkDecorator extends DrinkDecorator {
  getPrice(): number {
    return this.drink.getPrice() + 30;
  }

  getDescription(): string {
    return this.drink.getDescription() + ", с молоком";
  }
}

class SyrupDecorator extends DrinkDecorator {
  getPrice(): number {
    return this.drink.getPrice() + 50;
  }

  getDescription(): string {
    return this.drink.getDescription() + ", с сиропом";
  }
}
//#endregion

//#region Client code
// 1.
let myOrder: Drink = new SimpleCoffee();
console.log(`${myOrder.getDescription()} | Цена: ${myOrder.getPrice()}`);

// 2.
myOrder = new MilkDecorator(myOrder);
console.log(`${myOrder.getDescription()} | Цена: ${myOrder.getPrice()}`);

// 3.
myOrder = new SyrupDecorator(myOrder);
console.log(`${myOrder.getDescription()} | Цена: ${myOrder.getPrice()}`);
//#endregion
