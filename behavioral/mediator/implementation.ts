//#region Abstract
interface Mediator {
  notify(sender: object, event: string, data?: any): void;
}

abstract class DashboardModule {
  constructor(protected mediator: Mediator) {}
}

//#endregion

//#region Modules
class DateFilter extends DashboardModule {
  public selectRange(range: string) {
    console.log(`Фильтр: Выбран период ${range}`);
    this.mediator.notify(this, "dateRangeChanged", range);
  }
}

class ChartView extends DashboardModule {
  public refresh(range: string) {
    console.log(`График: Загрузка данных для ${range}... Рисую кривые.`);
  }

  public clear() {
    console.log("График: Очистка данных.");
  }
}

class ExportService extends DashboardModule {
  public toggle(isEnabled: boolean) {
    console.log(`Экспорт: Кнопка ${isEnabled ? "активна" : "заблокирована"}`);
  }
}
//#endregion

//#region Mediator
class DashboardManager implements Mediator {
  private dateFilter!: DateFilter;
  private chart!: ChartView;
  private exporter!: ExportService;

  // Связываем компоненты через медиатора
  public setComponents(
    dateFilter: DateFilter,
    chart: ChartView,
    exporter: ExportService,
  ) {
    this.dateFilter = dateFilter;
    this.chart = chart;
    this.exporter = exporter;
  }

  public notify(sender: object, event: string, data?: any): void {
    switch (event) {
      case "dateRangeChanged":
        console.log(`Медиатор: Вижу смену дат на "${data}". Координирую...`);

        this.chart.refresh(data);

        const canExport = !!data;
        this.exporter.toggle(canExport);
        break;

      case "chartError":
        this.exporter.toggle(false);
        break;
    }
  }
}
//#endregion

//#region Client Code
const manager = new DashboardManager();

const filter = new DateFilter(manager);
const chart = new ChartView(manager);
const exporter = new ExportService(manager);

manager.setComponents(filter, chart, exporter);

console.log("--- Действие пользователя: выбор дат ---");
filter.selectRange("2024-Q1");
//#endregion
