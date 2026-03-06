classDiagram
class ThemeStyles {
<<interface>>
+titleStyle: string
+priceStyle: string
+containerStyle: string
}

    class LightTheme {
        +titleStyle: string
        +priceStyle: string
        +containerStyle: string
    }

    class DarkTheme {
        +titleStyle: string
        +priceStyle: string
        +containerStyle: string
    }

    class ProductCard {
        #styles: ThemeStyles
        +constructor(styles: ThemeStyles)
        +render(name: string, price: number) string
    }

    class CompactProductCard {
        +render(name: string, price: number) string
    }

    ThemeStyles <|.. LightTheme : implements
    ThemeStyles <|.. DarkTheme : implements
    ProductCard <|-- CompactProductCard : extends
    ProductCard o-- ThemeStyles : bridge/has
