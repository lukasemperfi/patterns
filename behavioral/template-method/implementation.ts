//#region Abstract Class
abstract class BaseDataLoader {
  public async loadData(): Promise<void> {
    this.showLoader(); // Базовая операция
    await this.fetchData(); // Абстрактная (обязательная)
    this.parseResponse(); // Базовая операция
    this.onBeforeRender(); // Хук (необязательный)
    this.render(); // Абстрактная (обязательная)
    this.hideLoader(); // Базовая операция
    this.onComplete(); // Хук (необязательный)
  }

  // Базовые операции
  protected showLoader(): void {
    console.log("Abstract: Showing global spinner...");
  }

  protected parseResponse(): void {
    console.log("Abstract: Basic JSON parsing completed.");
  }

  protected hideLoader(): void {
    console.log("Abstract: Hiding spinner.");
  }

  // Абстрактные(Обязательные) операции
  protected abstract fetchData(): Promise<void>;
  protected abstract render(): void;

  // Хуки(Необязательные)
  protected onBeforeRender(): void {}
  protected onComplete(): void {}
}
//#endregion

//#region Concrete Imlementations
class UserListLoader extends BaseDataLoader {
  protected async fetchData(): Promise<void> {
    console.log("UserLoader: Fetching users from /api/users...");
  }

  protected render(): void {
    console.log("UserLoader: Building <ul> list of users.");
  }
}

class ProductLoader extends BaseDataLoader {
  protected async fetchData(): Promise<void> {
    console.log("ProductLoader: Fetching products from /api/products...");
  }

  protected render(): void {
    console.log("ProductLoader: Building a grid of product cards.");
  }

  protected onBeforeRender(): void {
    console.log("ProductLoader: Applying filters before display.");
  }

  protected onComplete(): void {
    console.log("ProductLoader: Tracking page_view event.");
  }
}
//#endregion

//#region Client Code
async function initializeComponent(loader: BaseDataLoader) {
  await loader.loadData();
}

(async () => {
  await initializeComponent(new UserListLoader());
  console.log(" ");
  await initializeComponent(new ProductLoader());
})();

//#endregion
