class SettingsManager {
  static #instance: SettingsManager;

  private settings = {
    theme: "light",
    language: "ru",
  };

  private constructor() {
    console.log("SettingsManager: Инициализация настроек...");
  }

  public static get instance(): SettingsManager {
    if (!SettingsManager.#instance) {
      SettingsManager.#instance = new SettingsManager();
    }
    return SettingsManager.#instance;
  }

  public getTheme() {
    return this.settings.theme;
  }

  public setTheme(theme: string) {
    this.settings.theme = theme;
  }
}

function clientCode() {
  const appHeader = SettingsManager.instance;
  appHeader.setTheme("dark");

  const appFooter = SettingsManager.instance;

  console.log(`Тема в хедере: ${appHeader.getTheme()}`);
  console.log(`Тема в футере: ${appFooter.getTheme()}`);

  if (appHeader === appFooter) {
    console.log(
      "Singleton работает: обе переменные ссылаются на один и тот же объект.",
    );
  }
}

clientCode();
