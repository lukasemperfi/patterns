//#region Целевой интерфейс (Target)
class UserDisplay {
  public getFullName(): string {
    return "Имя Фамилия (по умолчанию)";
  }
}
//#endregion

//#region Адаптируемый класс (Adaptee)
class LegacyApiService {
  public get_user_data(): { first_name: string; last_name: string } {
    return {
      first_name: "Иван",
      last_name: "Иванов",
    };
  }
}
//#endregion

//#region Адаптер (Adapter)
class UserAdapter extends UserDisplay {
  private legacyApi: LegacyApiService;

  constructor(legacyApi: LegacyApiService) {
    super();
    this.legacyApi = legacyApi;
  }

  public getFullName(): string {
    const data = this.legacyApi.get_user_data();
    const result = `${data.first_name} ${data.last_name}`;
    return `Adapter: (API_CONVERTED) ${result}`;
  }
}
//#endregion

//#region Клиентский код
function renderUserCard(user: UserDisplay) {
  console.log(`Отображаем в UI: ${user.getFullName()}`);
}

// 1. Работа с обычным объектом (Target)
console.log("Client: Работаю с обычным объектом пользователя:");
const standardUser = new UserDisplay();
renderUserCard(standardUser);

console.log("");

// 2. Попытка работы с Legacy API напрямую (не сработает, так как методы разные!)
const legacyService = new LegacyApiService();
console.log(
  "Client: Данные из Legacy API приходят в сыром виде, UI их не понимает.",
);
// renderUserCard(legacyService); // Ошибка: методы не совпадают!

console.log("");

// 3. Работа через Адаптер (Adapter)
console.log(
  "Client: Теперь UI может отобразить данные из Legacy API через Адаптер:",
);
const adapter = new UserAdapter(legacyService);

renderUserCard(adapter);

//#endregion

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   currency: string;
// }

// class ProductCard {
//   public render(product: Product): void {
//     console.log("product", product);
//   }
// }

// interface NewProductResponse {
//   product_id: string;
//   product_title: string;
//   pricing: {
//     amount: number;
//     currency: string;
//   };
// }

// class NewProductAPI {
//   public async fetchProduct(id: string): Promise<NewProductResponse> {
//     return Promise.resolve({
//       product_id: "p1",
//       product_title: "MacBook Pro",
//       pricing: {
//         amount: 2500,
//         currency: "USD",
//       },
//     });
//   }
// }

// class ProductAdapter {
//   public static toProduct(external: NewProductResponse): Product {
//     return {
//       id: external.product_id,
//       name: external.product_title,
//       price: external.pricing.amount,
//       currency: external.pricing.currency,
//     };
//   }
// }

// async function clientCode(): Promise<void> {
//   const api = new NewProductAPI();
//   const productCard = new ProductCard();

//   const externalData = await api.fetchProduct("p1");

//   const product = ProductAdapter.toProduct(externalData);

//   productCard.render(product);
// }

// clientCode();
