//#region Memento Interface
interface Memento {
  getState(): string; // Хранит билд (силу, ловкость и т.д.)
  getName(): string; // Название пресета
  getDate(): string;
}
//#endregion

//#region Memento Implementation
class CharacterSnapshot implements Memento {
  private readonly state: string;
  private readonly date: string;
  private readonly label: string;

  constructor(state: string, label: string) {
    this.state = state;
    this.label = label;
    this.date = new Date().toLocaleTimeString();
  }

  public getState(): string {
    return this.state;
  }
  public getDate(): string {
    return this.date;
  }

  public getName(): string {
    return `Preset: [${this.label}] | Created at: ${this.date}`;
  }
}
//#endregion

//#region Originator
class GameCharacter {
  private stats: string;

  constructor(buildName: string) {
    this.stats = buildName;
    console.log(`Character: Created with build: ${this.stats}`);
  }

  public changeBuild(newStats: string): void {
    console.log(`Character: Changing build to ${newStats}...`);
    this.stats = newStats;
  }

  public save(): Memento {
    return new CharacterSnapshot(
      this.stats,
      `Snapshot-${Math.floor(Math.random() * 100)}`,
    );
  }

  public restore(memento: Memento): void {
    this.stats = memento.getState();
    console.log(`Character: Successfully rolled back to: ${this.stats}`);
  }

  public currentStatus(): void {
    console.log(`Current stats: ${this.stats}\n`);
  }
}
//#endregion

//#region Caretaker
class SaveManager {
  private history: Memento[] = [];
  private hero: GameCharacter;

  constructor(hero: GameCharacter) {
    this.hero = hero;
  }

  public makeCheckpoint(): void {
    console.log("SaveManager: Saving current build...");
    this.history.push(this.hero.save());
  }

  public loadLastCheckpoint(): void {
    const snapshot = this.history.pop();
    if (!snapshot) {
      console.log("SaveManager: No checkpoints found!");
      return;
    }
    console.log(`SaveManager: Restoring ${snapshot.getName()}`);
    this.hero.restore(snapshot);
  }

  public listSaves(): void {
    console.log("SaveManager: Available checkpoints:");
    this.history.forEach((m) => console.log(` - ${m.getName()}`));
  }
}
//#endregion

//#region Client Code
const hero = new GameCharacter("Warrior (Strength Focus)");
const cloudSaves = new SaveManager(hero);

cloudSaves.makeCheckpoint();

hero.changeBuild("Mage (Intelligence Focus)");
cloudSaves.makeCheckpoint();

hero.changeBuild("Bard (Luck Focus)");
hero.currentStatus();

cloudSaves.listSaves();

console.log("\n--- Player decided to go back ---");
cloudSaves.loadLastCheckpoint();
hero.currentStatus();

cloudSaves.loadLastCheckpoint();
hero.currentStatus();
//#endregion
