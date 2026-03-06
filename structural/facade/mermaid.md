classDiagram
class OrderFacade {
-inventory: Inventory
-packing: Packing
-shipping: Shipping
-notification: Notification
+placeOrder(productId: string) void
}

    class Inventory {
        +checkStock(productId: string) boolean
    }

    class Packing {
        +packProduct(productId: string) void
    }

    class Shipping {
        +assignCourier() void
    }

    class Notification {
        +sendSMS(message: string) void
    }

    OrderFacade o-- Inventory : uses
    OrderFacade o-- Packing : uses
    OrderFacade o-- Shipping : uses
    OrderFacade o-- Notification : uses

    class Client {
        <<code block>>
    }
    Client ..> OrderFacade : calls
