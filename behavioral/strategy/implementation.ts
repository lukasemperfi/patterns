//#region Context
class InputField {
  private strategy: ValidationStrategy;

  constructor(strategy: ValidationStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: ValidationStrategy): void {
    this.strategy = strategy;
  }

  public handleInput(text: string): void {
    console.log(`\nInputField: User typed "${text}"`);

    const isValid = this.strategy.validate(text);

    if (!isValid) {
      console.log(`UI Error: ${this.strategy.errorMessage}`);
      console.log("UI: Rendering red border.");
    } else {
      console.log("UI: Data is valid! Rendering green border.");
    }
  }
}
//#endregion

//#region Strategy Interface
interface ValidationStrategy {
  validate(value: string): boolean;
  errorMessage: string;
}
//#endregion

//#region Concrete Strategies
class EmailValidation implements ValidationStrategy {
  public errorMessage = "Некорректный формат email (нужна @ и точка)";

  public validate(value: string): boolean {
    const isValid = value.includes("@") && value.includes(".");
    console.log(`[Strategy] Checking email: ${isValid}`);
    return isValid;
  }
}

class PhoneValidation implements ValidationStrategy {
  public errorMessage =
    "Номер должен начинаться с + и содержать минимум 10 цифр";

  public validate(value: string): boolean {
    const isValid = value.startsWith("+") && value.length >= 10;
    console.log(`[Strategy] Checking phone: ${isValid}`);
    return isValid;
  }
}
//#endregion

//#region Client Code
const myInput = new InputField(new EmailValidation());
myInput.handleInput("test@example.com");

console.log("\n--- Client: Switch to Phone validation ---");
myInput.setStrategy(new PhoneValidation());
myInput.handleInput("12345");

myInput.handleInput("+79991234567");
//#endregion
