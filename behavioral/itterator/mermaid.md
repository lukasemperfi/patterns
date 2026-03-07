classDiagram
class MyIterator~T~ {
<<interface>>
+current() T
+next() T
+key() number
+valid() boolean
+rewind() void
}

    class Notification {
        <<interface>>
        +id: number
        +text: string
        +priority: string
    }

    class Aggregator~T~ {
        <<interface>>
        +getIterator() MyIterator~T~
    }

    class NotificationCollection {
        -items: Notification[]
        +addItem(item: Notification) void
        +getItems() Notification[]
        +getCount() number
        +getIterator() MyIterator~Notification~
        +getPriorityIterator() MyIterator~Notification~
        +getReverseIterator() MyIterator~Notification~
    }

    class NotificationIterator {
        -position: number
        -collection: NotificationCollection
        -onlyHighPriority: boolean
        +constructor(collection: NotificationCollection, onlyHighPriority: boolean)
        +rewind() void
        -isPriority(item: Notification) boolean
        +current() Notification
        +key() number
        +next() Notification
        +valid() boolean
    }

    class ReverseNotificationIterator {
        -position: number
        -collection: NotificationCollection
        +constructor(collection: NotificationCollection)
        +rewind() void
        +current() Notification
        +key() number
        +next() Notification
        +valid() boolean
    }

    MyIterator <|.. NotificationIterator : implements
    MyIterator <|.. ReverseNotificationIterator : implements
    Aggregator <|.. NotificationCollection : implements
    NotificationIterator o-- NotificationCollection : iterates
    ReverseNotificationIterator o-- NotificationCollection : iterates
    NotificationCollection o-- Notification : contains
