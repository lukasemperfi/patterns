classDiagram
class UserDisplay {
+getFullName() string
}

    class LegacyApiService {
        +get_user_data() object
    }

    class UserAdapter {
        -legacyApi: LegacyApiService
        +constructor(legacyApi: LegacyApiService)
        +getFullName() string
    }

    UserDisplay <|-- UserAdapter : extends
    UserAdapter o-- LegacyApiService : wraps
