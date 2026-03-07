classDiagram
class Mediator {
<<interface>>
+notify(sender: object, event: string, data: any) void
}

    class DashboardModule {
        <<abstract>>
        #mediator: Mediator
        +constructor(mediator: Mediator)
    }

    class DateFilter {
        +selectRange(range: string) void
    }

    class ChartView {
        +refresh(range: string) void
        +clear() void
    }

    class ExportService {
        +toggle(isEnabled: boolean) void
    }

    class DashboardManager {
        -dateFilter: DateFilter
        -chart: ChartView
        -exporter: ExportService
        +setComponents(dateFilter: DateFilter, chart: ChartView, exporter: ExportService) void
        +notify(sender: object, event: string, data: any) void
    }

    Mediator <|.. DashboardManager : implements
    DashboardModule <|-- DateFilter : extends
    DashboardModule <|-- ChartView : extends
    DashboardModule <|-- ExportService : extends
    DashboardManager o-- DateFilter : manages
    DashboardManager o-- ChartView : manages
    DashboardManager o-- ExportService : manages
    DashboardModule o-- Mediator : communicates via
