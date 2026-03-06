//#region Command Interface
interface Command {
  execute(): void;
  undo(): void;
}
//#endregion

//#region Получатель (Receiver)
class CartService {
  private items: number[] = [];

  public addToCart(productId: number): void {
    this.items.push(productId);
    console.log(
      `Корзина: Товар ${productId} добавлен. Текущий состав: [${this.items}]`,
    );
  }

  public removeFromCart(productId: number): void {
    const index = this.items.indexOf(productId);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    console.log(
      `Корзина: Товар ${productId} удален. Текущий состав: [${this.items}]`,
    );
  }
}
//#endregion

//#region Concrete Command
class AddToCartCommand implements Command {
  constructor(
    private receiver: CartService,
    private productId: number,
  ) {}

  public execute(): void {
    this.receiver.addToCart(this.productId);
  }

  public undo(): void {
    this.receiver.removeFromCart(this.productId);
  }
}
//#endregion

//#region Invoker
class CommandHistory {
  private history: Command[] = [];

  public push(command: Command) {
    this.history.push(command);
  }

  public pop(): Command | undefined {
    return this.history.pop();
  }
}
//#endregion

//#region Клиентский код
const cart = new CartService();
const history = new CommandHistory();

//Функции-помощники
function runCommand(command: Command) {
  command.execute();
  history.push(command);
}

function undoLastAction() {
  const lastCommand = history.pop();
  if (lastCommand) {
    console.log("--- Отмена последнего действия ---");
    lastCommand.undo();
  } else {
    console.log("История пуста, отменять нечего.");
  }
}

console.log("--- Пользователь делает покупки ---");
runCommand(new AddToCartCommand(cart, 101));
runCommand(new AddToCartCommand(cart, 202));

undoLastAction();
undoLastAction();
undoLastAction();
//#endregion
