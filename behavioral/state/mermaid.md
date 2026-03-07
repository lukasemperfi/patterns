classDiagram
class CheckoutButton {
-state: ButtonState
+constructor(state: ButtonState)
+transitionTo(state: ButtonState) void
+click() void
+render() void
}

    class ButtonState {
        <<abstract>>
        #context: CheckoutButton
        +setContext(context: CheckoutButton) void
        +handleClick() void*
        +handleRender() void*
    }

    class ReadyState {
        +handleClick() void
        +handleRender() void
    }

    class LoadingState {
        +handleClick() void
        +handleRender() void
    }

    class SuccessState {
        +handleClick() void
        +handleRender() void
    }

    ButtonState <|-- ReadyState : extends
    ButtonState <|-- LoadingState : extends
    ButtonState <|-- SuccessState : extends
    CheckoutButton o-- ButtonState : current state
    ButtonState o-- CheckoutButton : context
