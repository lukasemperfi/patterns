classDiagram
%% Иерархия продуктов
class Product {
<<interface>>
+render() string
}

    class LaptopProduct {
        +render() string
    }

    class SmartphoneProduct {
        +render() string
    }

    class HeadphoneProduct {
        +render() string
    }

    Product <|.. LaptopProduct : implements
    Product <|.. SmartphoneProduct : implements
    Product <|.. HeadphoneProduct : implements

    %% Иерархия фабрик
    class ProductFactory {
        <<abstract>>
        +createProduct()* Product
        +getProductHtml() string
    }

    class LaptopFactory {
        +createProduct() Product
    }

    class SmartphoneFactory {
        +createProduct() Product
    }

    class HeadphoneFactory {
        +createProduct() Product
    }

    ProductFactory <|-- LaptopFactory : extends
    ProductFactory <|-- SmartphoneFactory : extends
    ProductFactory <|-- HeadphoneFactory : extends

    %% Зависимости
    ProductFactory ..> Product : depends on
