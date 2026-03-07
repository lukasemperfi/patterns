classDiagram
class Observer {
<<interface>>
+update(productName: string) void
}

    class Subject {
        <<interface>>
        +attach(observer: Observer) void
        +detach(observer: Observer) void
        +notify(productName: string) void
    }

    class Cart {
        -observers: Observer[]
        -items: string[]
        +attach(observer: Observer) void
        +detach(observer: Observer) void
        +notify(productName: string) void
        +addItem(name: string) void
    }

    class HeaderCounter {
        +update(productName: string) void
    }

    class ToastNotification {
        +update(productName: string) void
    }

    class AnalyticsTracker {
        +update(productName: string) void
    }

    Subject <|.. Cart : implements
    Observer <|.. HeaderCounter : implements
    Observer <|.. ToastNotification : implements
    Observer <|.. AnalyticsTracker : implements
    Cart o-- Observer : notifies
