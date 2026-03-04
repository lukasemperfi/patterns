//#region Интерфейс Итератора
interface MyIterator<T> {
  current(): T;
  next(): T;
  key(): number;
  valid(): boolean;
  rewind(): void;
}
//#endregion

//#region Notification Interface
interface Notification {
  id: number;
  text: string;
  priority: "low" | "high";
}
//#endregion

//#region Итератор для уведомлений
class NotificationIterator implements MyIterator<Notification> {
  private position: number = 0;

  constructor(
    private collection: NotificationCollection,
    private onlyHighPriority: boolean = false,
  ) {
    this.rewind();
  }

  public rewind(): void {
    this.position = 0;
    if (this.onlyHighPriority && !this.isPriority(this.current())) {
      this.next();
    }
  }

  private isPriority(item: Notification | undefined): boolean {
    return item?.priority === "high";
  }

  public current(): Notification {
    return this.collection.getItems()[this.position];
  }

  public key(): number {
    return this.position;
  }

  public next(): Notification {
    const item = this.current();

    do {
      this.position++;
    } while (
      this.onlyHighPriority &&
      this.valid() &&
      !this.isPriority(this.current())
    );

    return item;
  }

  public valid(): boolean {
    return this.position < this.collection.getCount();
  }
}
//#endregion

//#region Итератор для обратного порядка
class ReverseNotificationIterator implements MyIterator<Notification> {
  private position: number = 0;

  constructor(private collection: NotificationCollection) {
    this.rewind();
  }

  public rewind(): void {
    this.position = this.collection.getCount() - 1;
  }

  public current(): Notification {
    return this.collection.getItems()[this.position];
  }

  public key(): number {
    return this.position;
  }

  public next(): Notification {
    const item = this.current();
    this.position--;
    return item;
  }

  public valid(): boolean {
    return this.position >= 0;
  }
}
//#endregion

//#region Общий интерфейс для всех коллекций (Aggregator)
interface Aggregator<T> {
  getIterator(): MyIterator<T>;
}
//#endregion

//#region Notification Collection
class NotificationCollection implements Aggregator<Notification> {
  private items: Notification[] = [];

  public addItem(item: Notification): void {
    this.items.push(item);
  }

  public getItems(): Notification[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public getIterator(): MyIterator<Notification> {
    return new NotificationIterator(this);
  }

  public getPriorityIterator(): MyIterator<Notification> {
    return new NotificationIterator(this, true);
  }

  public getReverseIterator(): MyIterator<Notification> {
    return new ReverseNotificationIterator(this);
  }
}
//#endregion

//#region Client Code
const notifications = new NotificationCollection();
notifications.addItem({ id: 1, text: "Скидка 5%", priority: "low" });
notifications.addItem({ id: 2, text: "АККАУНТ ВЗЛОМАН", priority: "high" });
notifications.addItem({ id: 3, text: "Обновление системы", priority: "low" });

const allIter = notifications.getIterator();
console.log("--- Все уведомления ---");
while (allIter.valid()) {
  console.log(allIter.next().text);
}

const priorityIter = notifications.getPriorityIterator();
console.log("\n--- ТОЛЬКО ВАЖНЫЕ ---");
while (priorityIter.valid()) {
  console.log(priorityIter.next().text);
}

console.log("\n--- Сначала новые (Reverse) ---");
const reverseIter = notifications.getReverseIterator();

while (reverseIter.valid()) {
  console.log(reverseIter.next().text);
}
//#endregion
