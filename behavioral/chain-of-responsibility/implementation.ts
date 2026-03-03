//#region Handler Interface
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: any): string | null;
}
//#endregion

//#region AbstractHandler
abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: any): any {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}
//#endregion

//#region Handlers (Validators)
class ExistenceHandler extends AbstractHandler {
  private validCodes = ["SUMMER20", "WELCOME"];

  public handle(order: any): string {
    if (!this.validCodes.includes(order.promoCode)) {
      return `Ошибка: Промокод "${order.promoCode}" не существует.`;
    }
    return super.handle(order);
  }
}

class ExpiryHandler extends AbstractHandler {
  public handle(order: any): string {
    if (order.promoCode === "SUMMER20") {
      return `Ошибка: Срок действия промокода "SUMMER20" истек.`;
    }
    return super.handle(order);
  }
}

class MinimumAmountHandler extends AbstractHandler {
  public handle(order: any): string {
    if (order.totalAmount < 1000) {
      return `Ошибка: Промокод активен только для заказов от 1000. У вас ${order.totalAmount}.`;
    }
    return super.handle(order);
  }
}
//#endregion

//#region Client Code
function applyPromo(order: any) {
  console.log(
    `Проверяем заказ на сумму ${order.totalAmount} с кодом ${order.promoCode}...`,
  );

  const result = existence.handle(order);

  if (result) {
    console.log(`❌ ${result}`);
  } else {
    console.log(`✅ Промокод применен успешно!`);
  }
  console.log("---");
}

const existence = new ExistenceHandler();
const expiry = new ExpiryHandler();
const amount = new MinimumAmountHandler();

existence.setNext(expiry).setNext(amount);

applyPromo({ promoCode: "HELLO", totalAmount: 500 }); // Ошибка существования
applyPromo({ promoCode: "SUMMER20", totalAmount: 2000 }); // Ошибка срока
applyPromo({ promoCode: "WELCOME", totalAmount: 500 }); // Ошибка суммы
applyPromo({ promoCode: "WELCOME", totalAmount: 1500 }); // УСПЕХ!
//#endregion
