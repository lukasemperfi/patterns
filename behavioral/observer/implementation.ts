//#region Abstract
interface Observer {
  update(productName: string): void;
}

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(productName: string): void;
}

//#endregion

//#region Subject Implementation
class Cart implements Subject {
  private observers: Observer[] = [];
  private items: string[] = [];

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist)
      return console.log("Subject: Observer has been attached already.");

    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1)
      return console.log("Subject: Nonexistent observer.");

    this.observers.splice(observerIndex, 1);
  }

  public notify(productName: string): void {
    for (const observer of this.observers) {
      observer.update(productName);
    }
  }

  public addItem(name: string): void {
    console.log(`\nCart: Adding "${name}" to cart...`);
    this.items.push(name);
    this.notify(name);
  }
}
//#endregion

//#region Observer Implementation
class HeaderCounter implements Observer {
  public update(productName: string): void {
    console.log(`[Header]: Updating total items count (added: ${productName})`);
  }
}

class ToastNotification implements Observer {
  public update(productName: string): void {
    console.log(`[Toast]: Popup: "${productName}" added to your cart!`);
  }
}

class AnalyticsTracker implements Observer {
  public update(productName: string): void {
    console.log(
      `[Analytics]: Sending "add_to_cart" event for ${productName} to server...`,
    );
  }
}
//#endregion

//#region Client Code
const cart = new Cart();

const counter = new HeaderCounter();
const toast = new ToastNotification();
const analytics = new AnalyticsTracker();

cart.attach(counter);
cart.attach(toast);
cart.attach(analytics);

cart.addItem("Mechanical Keyboard");

cart.detach(toast);

cart.addItem("Gaming Mouse");
//#endregion
