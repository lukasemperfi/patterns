classDiagram
class Command {
<<interface>>
+execute() void
+undo() void
}

    class CartService {
        -items: number[]
        +addToCart(productId: number) void
        +removeFromCart(productId: number) void
    }

    class AddToCartCommand {
        -receiver: CartService
        -productId: number
        +constructor(receiver: CartService, productId: number)
        +execute() void
        +undo() void
    }

    class CommandHistory {
        -history: Command[]
        +push(command: Command) void
        +pop() Command
    }

    Command <|.. AddToCartCommand : implements
    AddToCartCommand o-- CartService : receiver
    CommandHistory o-- Command : stores
