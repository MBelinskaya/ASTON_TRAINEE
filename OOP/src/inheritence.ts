// //Наследование позволяет одному классу наследовать свойства и методы другого класса
//
// class Developer {
//   // public isDeveloper: boolean;
//
//   constructor(
//     public name: string,
//     public salary: number,
//   ) {
//     // this.isDeveloper = true;
//   }
//
//   getInfo() {
//     console.log('name', this.name);
//     console.log('salary', this.salary);
//   }
// }
//
// const generalDeveloper = new Developer('Max', 3000)
// generalDeveloper.getInfo()
// //
// class SeniorDeveloper extends Developer {
//   constructor(
//     public name: string,
//     public salary: number,
//   ) {
//     super(name, salary);
//   }
//
//   teachJuniorDevs(): void {
//     console.log(`${this.name} teaches junior devs.`);
//   }
// }
//
// const developer = new SeniorDeveloper('Alex', 5000);
// developer.getInfo()
