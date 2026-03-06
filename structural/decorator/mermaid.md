classDiagram
class Drink {
<<interface>>
+getPrice() number
+getDescription() string
}

    class SimpleCoffee {
        +getPrice() number
        +getDescription() string
    }

    class DrinkDecorator {
        <<abstract>>
        #drink: Drink
        +constructor(drink: Drink)
        +getPrice() number*
        +getDescription() string*
    }

    class MilkDecorator {
        +getPrice() number
        +getDescription() string
    }

    class SyrupDecorator {
        +getPrice() number
        +getDescription() string
    }

    Drink <|.. SimpleCoffee : implements
    Drink <|.. DrinkDecorator : implements
    DrinkDecorator <|-- MilkDecorator : extends
    DrinkDecorator <|-- SyrupDecorator : extends
    DrinkDecorator o-- Drink : wraps
