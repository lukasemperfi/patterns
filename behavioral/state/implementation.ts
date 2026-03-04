//#region Abstract State
abstract class ButtonState {
  protected context!: CheckoutButton;

  public setContext(context: CheckoutButton) {
    this.context = context;
  }

  public abstract handleClick(): void;
  public abstract handleRender(): void;
}
//#endregion

//#region Concrete States
class ReadyState extends ButtonState {
  public handleClick(): void {
    console.log("Button: Starting payment process...");
    this.context.transitionTo(new LoadingState());
  }

  public handleRender(): void {
    console.log("UI: Rendering Blue Button with text 'Pay Now'");
  }
}

class LoadingState extends ButtonState {
  public handleClick(): void {
    console.log("Button: Please wait, payment is processing...");
  }

  public handleRender(): void {
    console.log("UI: Rendering Disabled Button with Spinner");

    setTimeout(() => {
      this.context.transitionTo(new SuccessState());
    }, 2000);
  }
}

class SuccessState extends ButtonState {
  public handleClick(): void {
    console.log("Button: Order already finished. Redirecting to receipt...");
  }

  public handleRender(): void {
    console.log("UI: Rendering Green Button with Checkmark 'Done!'");
  }
}
//#endregion

//#region Context
class CheckoutButton {
  private state!: ButtonState;

  constructor(state: ButtonState) {
    this.transitionTo(state);
  }

  public transitionTo(state: ButtonState): void {
    console.log(`Context: Switching to ${(<any>state).constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
    this.render();
  }

  public click(): void {
    this.state.handleClick();
  }

  public render(): void {
    this.state.handleRender();
  }
}
//#endregion

//#region Client Code
const checkoutBtn = new CheckoutButton(new ReadyState());

console.log("\n--- User clicks Pay ---");
checkoutBtn.click();

console.log("\n--- User clicks again during loading ---");
checkoutBtn.click();

//#endregion
