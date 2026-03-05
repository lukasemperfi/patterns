//#region Abstract Product and Creator
interface Product {
  render(): string;
}

abstract class ProductFactory {
  public abstract createProduct(): Product;

  public getProductHtml(): string {
    const product = this.createProduct();
    return `<div>${product.render()}</div>`;
  }
}
//#endregion

//#region Concrete Products
class LaptopProduct implements Product {
  public render(): string {
    return `
      <h2>Laptop</h2>
      <p>Powerful laptop for all your needs.</p>
      <button>Add Laptop to Cart</button>
    `;
  }
}

class SmartphoneProduct implements Product {
  public render(): string {
    return `
      <h2>Smartphone</h2>
      <p>Latest model smartphone with amazing features.</p>
      <button>Add Smartphone to Cart</button>
    `;
  }
}

class HeadphoneProduct implements Product {
  public render(): string {
    return `
      <h2>Headphones</h2>
      <p>High-quality headphones for immersive audio.</p>
      <button>Add Headphones to Cart</button>
    `;
  }
}
//#endregion

//#region Concrete Product Factories
class LaptopFactory extends ProductFactory {
  public createProduct(): Product {
    return new LaptopProduct();
  }
}

class SmartphoneFactory extends ProductFactory {
  public createProduct(): Product {
    return new SmartphoneProduct();
  }
}

class HeadphoneFactory extends ProductFactory {
  public createProduct(): Product {
    return new HeadphoneProduct();
  }
}
//#endregion

//#region Client Code
function displayProductsInConsole(
  factory: ProductFactory,
  sectionName: string,
) {
  console.log(`--- ${sectionName} ---`);
  console.log(factory.getProductHtml());
  console.log("\n");
}

console.log("App: Displaying products in the console.");

displayProductsInConsole(new LaptopFactory(), "Featured Products");
displayProductsInConsole(new SmartphoneFactory(), "New Arrivals");
displayProductsInConsole(new HeadphoneFactory(), "Accessories");

//#endregion
