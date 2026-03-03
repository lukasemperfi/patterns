//#region Subject Interface
interface IProductDetail {
  getDetails(): string;
}
//#endregion

//#region Real Subject
class RealProductDetail implements IProductDetail {
  private productId: string;

  constructor(productId: string) {
    this.productId = productId;
    this.loadFromDatabase();
  }
  private loadFromDatabase() {
    console.log(
      `Загрузка данных для товара ${this.productId} из базы данных... ⏳`,
    );
  }

  getDetails(): string {
    return `Полное описание товара ${this.productId}: Это лучший товар в мире!`;
  }
}
//#endregion

//#region Proxy
class ProductDetailProxy implements IProductDetail {
  private realProductDetail: RealProductDetail | null = null;
  private productId: string;

  constructor(productId: string) {
    this.productId = productId;
  }

  getDetails(): string {
    if (this.realProductDetail === null) {
      console.log("[Proxy]: Объект еще не создан. Инициализирую...");
      this.realProductDetail = new RealProductDetail(this.productId);
    } else {
      console.log("[Proxy]: Использую уже созданный объект (Кеширование).");
    }

    return this.realProductDetail.getDetails();
  }
}
//#endregion

//#region Client code
const product = new ProductDetailProxy("iPhone-15");

console.log("--- Первый вызов ---");
console.log(product.getDetails());

console.log("\n--- Второй вызов ---");
console.log(product.getDetails());
//#endregion
