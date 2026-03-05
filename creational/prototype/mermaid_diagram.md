classDiagram
class Clonable {
<<interface>>
+clone() : this
}

    class Task {
        +id : string
        +title : string
        +tags : string[]
        +stats : object
        +constructor(title, tags)
        +clone() : this
        +logInfo() : void
    }

    Clonable <|.. Task : implements
    Task ..> Task : creates clone
