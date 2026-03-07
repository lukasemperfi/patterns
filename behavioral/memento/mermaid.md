classDiagram
class Memento {
<<interface>>
+getState() string
+getName() string
+getDate() string
}

    class CharacterSnapshot {
        -state: string
        -date: string
        -label: string
        +constructor(state: string, label: string)
        +getState() string
        +getDate() string
        +getName() string
    }

    class GameCharacter {
        -stats: string
        +constructor(buildName: string)
        +changeBuild(newStats: string) void
        +save() Memento
        +restore(memento: Memento) void
        +currentStatus() void
    }

    class SaveManager {
        -history: Memento[]
        -hero: GameCharacter
        +constructor(hero: GameCharacter)
        +makeCheckpoint() void
        +loadLastCheckpoint() void
        +listSaves() void
    }

    Memento <|.. CharacterSnapshot : implements
    GameCharacter ..> CharacterSnapshot : creates
    SaveManager o-- Memento : history
    SaveManager o-- GameCharacter : hero
