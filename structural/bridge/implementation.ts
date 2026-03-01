interface ThemeStyles {
  titleStyle: string;
  priceStyle: string;
  containerStyle: string;
}

//#region Themes implementation
class LightTheme implements ThemeStyles {
  public titleStyle = "color: black;";
  public priceStyle = "color: green;";
  public containerStyle = "background: white; padding: 16px;";
}

class DarkTheme implements ThemeStyles {
  public titleStyle = "color: white;";
  public priceStyle = "color: lightgreen;";
  public containerStyle = "background: black; padding: 16px;";
}
//#endregion

//#region Product Card implementation
class ProductCard {
  protected styles: ThemeStyles;

  constructor(styles: ThemeStyles) {
    this.styles = styles;
  }

  public render(name: string, price: number): string {
    return `
      <div style="${this.styles.containerStyle}">
        <h2 style="${this.styles.titleStyle}">${name}</h2>
        <p style="${this.styles.priceStyle}">$${price}</p>
      </div>
    `;
  }
}

class CompactProductCard extends ProductCard {
  public render(name: string, price: number): string {
    return `
      <div style="${this.styles.containerStyle}">
        <span style="${this.styles.titleStyle}">${name}</span>
        <span style="${this.styles.priceStyle}">$${price}</span>
      </div>
    `;
  }
}
//#endregion

//#region Client code
function clientCode(card: ProductCard): void {
  const html = card.render("MacBook Pro", 2500);
  console.log(html);
}
//#endregion

//#region Пример использования
const lightTheme = new LightTheme();
const darkTheme = new DarkTheme();

const simpleLightCard = new ProductCard(lightTheme);
const simpleDarkCard = new ProductCard(darkTheme);

const compactLightCard = new CompactProductCard(lightTheme);
const compactDarkCard = new CompactProductCard(darkTheme);

clientCode(simpleLightCard);
clientCode(simpleDarkCard);

console.log("");

clientCode(compactLightCard);
clientCode(compactDarkCard);

//#endregion
