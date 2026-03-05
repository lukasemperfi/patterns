interface Clonable {
  clone(): this;
}

class Task implements Clonable {
  public id: string;
  public title: string;
  public tags: string[];
  public stats: { views: number; priority: string };

  constructor(title: string, tags: string[]) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.tags = tags;
    this.stats = { views: 0, priority: "normal" };
  }

  public clone(): this {
    const clone = structuredClone(this);

    Object.setPrototypeOf(clone, Task.prototype);

    clone.id = Math.random().toString(36).substr(2, 9);
    clone.title = `Копия: ${this.title}`;

    return clone;
  }

  public logInfo() {
    console.log(
      `Task [${this.id}]: ${this.title}. Tags: ${this.tags.join(", ")}`,
    );
  }
}

const originalTask = new Task("Написать отчет", ["работа", "срочно"]);
originalTask.stats.priority = "high";

const duplicatedTask = originalTask.clone();

duplicatedTask.logInfo();

duplicatedTask.tags.push("копия");

console.log("Оригинальные теги:", originalTask.tags);
console.log("Теги дубликата:", duplicatedTask.tags);
