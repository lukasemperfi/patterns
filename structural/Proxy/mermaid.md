classDiagram
class ProductDetail {
<<interface>>
+getDetails() string
}

    class RealProductDetail {
        -productId: string
        +constructor(productId: string)
        -loadFromDatabase() void
        +getDetails() string
    }

    class ProductDetailProxy {
        -realProductDetail: RealProductDetail
        -productId: string
        +constructor(productId: string)
        +getDetails() string
    }

    ProductDetail <|.. RealProductDetail : implements
    ProductDetail <|.. ProductDetailProxy : implements
    ProductDetailProxy o-- RealProductDetail : controls access
