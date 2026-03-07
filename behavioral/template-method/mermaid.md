classDiagram
class BaseDataLoader {
<<abstract>>
+loadData() Promise~void~
#showLoader() void
#parseResponse() void
#hideLoader() void
#fetchData()_ Promise~void~
#render()_ void
#onBeforeRender() void
#onComplete() void
}

    class UserListLoader {
        #fetchData() Promise~void~
        #render() void
    }

    class ProductLoader {
        #fetchData() Promise~void~
        #render() void
        #onBeforeRender() void
        #onComplete() void
    }

    BaseDataLoader <|-- UserListLoader : extends
    BaseDataLoader <|-- ProductLoader : extends
