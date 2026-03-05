//#region Abstract Products
interface Laptop {
  brand: string;
  render(): string;
}

interface Smartphone {
  brand: string;
  render(): string;
  syncWith(laptop: Laptop): string;
}

interface Headphones {
  brand: string;
  render(): string;
  pairWith(smartphone: Smartphone): string;
}
//#endregion

//#region Abstract Factory
interface TechFactory {
  createLaptop(): Laptop;
  createSmartphone(): Smartphone;
  createHeadphones(): Headphones;
}
//#endregion

//#region Apple Brand Factory and its products
class AppleFactory implements TechFactory {
  public createLaptop = () => new MacBook();
  public createSmartphone = () => new IPhone();
  public createHeadphones = () => new AirPods();
}

class MacBook implements Laptop {
  brand = "Apple";
  render = () => "MacBook Pro (M3 Chip)";
}

class IPhone implements Smartphone {
  brand = "Apple";
  render = () => "iPhone 15 Pro";
  syncWith(laptop: Laptop): string {
    // Проверка совместимости
    if (laptop.brand !== this.brand) {
      return `[Incompatible] Cannot sync ${this.render()} with ${laptop.render()}. Ecosystem mismatch!`;
    }
    return `[AirDrop] Syncing with ${laptop.render()}`;
  }
}

class AirPods implements Headphones {
  brand = "Apple";
  render = () => "AirPods Pro 2";
  pairWith(smartphone: Smartphone): string {
    if (smartphone.brand !== this.brand) {
      return `[Incompatible] ${this.render()} cannot pair with ${smartphone.render()}. Only Apple devices supported.`;
    }
    return `[H1 Chip] Instant pairing with ${smartphone.render()}. Battery 100%.`;
  }
}
//#endregion

//#region Sony Brand Factory and its products
class SonyFactory implements TechFactory {
  public createLaptop = () => new VaioLaptop();
  public createSmartphone = () => new XperiaPhone();
  public createHeadphones = () => new SonyWH1000();
}

class VaioLaptop implements Laptop {
  brand = "Sony";
  render = () => "Sony VAIO Z";
}

class XperiaPhone implements Smartphone {
  brand = "Sony";
  render = () => "Sony Xperia 1 V";
  syncWith(laptop: Laptop): string {
    if (laptop.brand !== this.brand) {
      return `[Incompatible] ${this.render()} cannot link to ${laptop.render()}. Requires Sony hardware.`;
    }
    return `[Cross-Device] Linking to ${laptop.render()}`;
  }
}

class SonyWH1000 implements Headphones {
  brand = "Sony";
  render = () => "Sony WH-1000XM5";
  pairWith(smartphone: Smartphone): string {
    if (smartphone.brand !== this.brand) {
      return `[Incompatible] ${this.render()} limited features with ${smartphone.render()}. No LDAC support.`;
    }
    return `[LDAC] High-res audio pairing with ${smartphone.render()}. Noise cancelling active.`;
  }
}
//#endregion

//#region Client Code
function clientCode(factory: TechFactory) {
  const laptop = factory.createLaptop();
  const phone = factory.createSmartphone();
  const audio = factory.createHeadphones();

  console.log(`UI: ${laptop.render()}`);
  console.log(`UI: ${phone.render()}`);
  console.log(`UI: ${audio.render()}`);

  console.log(`Sync: ${phone.syncWith(laptop)}`);
  console.log(`Pair: ${audio.pairWith(phone)}`);
}
//#endregion

//#region Execution
console.log("--- Brand: APPLE ---");
clientCode(new AppleFactory());

console.log("\n--- Brand: SONY ---");
clientCode(new SonyFactory());

console.log("\n--- Manual Check: Incompatibility ---");
const applePhone = new IPhone();
const sonyLaptop = new VaioLaptop();
const sonyAudio = new SonyWH1000();

console.log(applePhone.syncWith(sonyLaptop));
console.log(sonyAudio.pairWith(applePhone));
//#endregion
