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
