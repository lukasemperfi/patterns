classDiagram
%% Builder Interface
class ComputerBuilder {
<<interface>>
+addCPU() void
+addRAM() void
+addStorage() void
}

    %% Product
    class Computer {
        +components: string[]
        +listComponents() void
    }

    %% Concrete Builder
    class GamingComputerBuilder {
        -computer: Computer
        +constructor()
        +reset() void
        +addCPU() void
        +addRAM() void
        +addStorage() void
        +getComputer() Computer
    }

    %% Director
    class ComputerAssemblyDirector {
        -builder: ComputerBuilder
        +setBuilder(builder: ComputerBuilder) void
        +buildBasicComputer() void
        +buildFullGamingComputer() void
    }

    %% Relationships
    ComputerBuilder <|.. GamingComputerBuilder : implements
    GamingComputerBuilder o-- Computer : creates/contains
    ComputerAssemblyDirector o-- ComputerBuilder : uses

    %% Client code dependencies
    class Client {
        <<function>>
        clientCode(director)
    }
    Client ..> ComputerAssemblyDirector : controls
    Client ..> GamingComputerBuilder : instantiates
