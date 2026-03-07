classDiagram
class ValidationStrategy {
<<interface>>
+errorMessage: string
+validate(value: string) boolean
}

    class EmailValidation {
        +errorMessage: string
        +validate(value: string) boolean
    }

    class PhoneValidation {
        +errorMessage: string
        +validate(value: string) boolean
    }

    class InputField {
        -strategy: ValidationStrategy
        +constructor(strategy: ValidationStrategy)
        +setStrategy(strategy: ValidationStrategy) void
        +handleInput(text: string) void
    }

    ValidationStrategy <|.. EmailValidation : implements
    ValidationStrategy <|.. PhoneValidation : implements
    InputField o-- ValidationStrategy : strategy
