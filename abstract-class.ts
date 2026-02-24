abstract class Person {
  abstract position: string;

  constructor(public name: string) {}

  public sayHello(): void {
    console.log(
      `Привет! Меня зовут ${this.name}. Моя должность: ${this.position}.`,
    );
  }

  abstract doWork(): void;
}

class Developer extends Person {
  position = "Frontend Разработчик";

  doWork(): void {
    console.log(`${this.name} пишет код на TypeScript и пьет много кофе...`);
  }
}

class Cook extends Person {
  position = "Шеф-повар";

  doWork(): void {
    console.log(
      `${this.name} готовит фирменный бургер и следит за чистотой кухни.`,
    );
  }
}

const alex = new Developer("Алекс");
const maria = new Cook("Мария");

const office: Person[] = [alex, maria];

office.forEach((person) => {
  person.sayHello();
  person.doWork();
  console.log("---");
});
