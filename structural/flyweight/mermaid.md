classDiagram
class IconFlyweight {
-brandData: object
+constructor(brandData: any)
+renderOnMap(uniqueState: object) void
}

    class IconFactory {
        -flyweights: Map~string, IconFlyweight~
        -getKey(brand: string, color: string) string
        +getIcon(brand: string, logoUrl: string, color: string) IconFlyweight
    }

    IconFactory o-- IconFlyweight : manages/caches

    class Client {
        <<code block>>
    }
    Client ..> IconFactory : requests flyweight
    Client ..> IconFlyweight : passes unique state
