//#region Component
interface CartItem {
  getPrice(): number;
  getName(): string;
}
//#endregion

//#region Leaf
class Product implements CartItem {
  constructor(
    private name: string,
    private price: number,
  ) {}

  getPrice(): number {
    return this.price;
  }

  getName(): string {
    return this.name;
  }
}
//#endregion

//#region Composite
class GiftBox implements CartItem {
  private children: CartItem[] = [];

  constructor(private name: string) {}

  add(item: CartItem): void {
    this.children.push(item);
  }

  getPrice(): number {
    return this.children.reduce((total, item) => total + item.getPrice(), 0);
  }

  getName(): string {
    return `${this.name} (содержит: ${this.children.map((i) => i.getName()).join(", ")})`;
  }
}
//#endregion

//#region Client code
const iphone = new Product("iPhone 15", 1000);
const case1 = new Product("Чехол", 50);
const charger = new Product("Зарядка", 30);

const accessoryKit = new GiftBox("Набор для защиты");
accessoryKit.add(case1);
accessoryKit.add(charger);

const vipBox = new GiftBox("VIP Подарок");
vipBox.add(iphone);
vipBox.add(accessoryKit);
//#endregion

//#region Пример использования
function printTotal(item: CartItem) {
  console.log(`Объект: ${item.getName()}`);
  console.log(`Итоговая цена: ${item.getPrice()} руб.`);
}

printTotal(iphone);
console.log("-----");

printTotal(accessoryKit);
console.log("-----");
printTotal(vipBox);
//#endregion
