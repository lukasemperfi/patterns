classDiagram
class Clonable {
<<interface>>
+clone() this
}

    class Task {
        +id: string
        +title: string
        +tags: string[]
        +stats: object
        +constructor(title: string, tags: string[])
        +clone() Task
        +logInfo() void
    }

    Clonable <|.. Task : implements

    %% Client interaction
    class Client {
        <<code block>>
    }
    Client ..> Task : creates & clones
