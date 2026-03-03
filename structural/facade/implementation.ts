//#region Facade
class OrderFacade {
  private inventory = new Inventory();
  private packing = new Packing();
  private shipping = new Shipping();
  private notification = new Notification();

  public placeOrder(productId: string): void {
    console.log("--- Начало оформления заказа ---");

    if (!this.inventory.checkStock(productId)) {
      console.log("Ошибка: Товара нет в наличии.");
      return;
    }

    this.packing.packProduct(productId);
    this.shipping.assignCourier();
    this.notification.sendSMS(`Ваш заказ ${productId} в пути!`);

    console.log("--- Заказ успешно оформлен! ---");
  }
}

//#endregion

//#region Complex Subsystems
class Inventory {
  checkStock(productId: string): boolean {
    console.log(`Проверяем наличие товара ${productId} на складе...`);
    return true;
  }
}

class Packing {
  packProduct(productId: string): void {
    console.log(`Товар ${productId} упакован в коробку.`);
  }
}

class Shipping {
  assignCourier(): void {
    console.log("Курьер назначен и уже выезжает.");
  }
}

class Notification {
  sendSMS(message: string): void {
    console.log(`SMS отправлено: ${message}`);
  }
}
//#endregion

//#region Client code
const shop = new OrderFacade();

shop.placeOrder("iPhone 15");
//#endregion
