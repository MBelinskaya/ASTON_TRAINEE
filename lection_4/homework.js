// Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):
// 1)
console.log('1');
setTimeout(() => console.log('2'), 1);
let promiseNew = new Promise((resolve) => {
    console.log('3');
    resolve();
});
promiseNew.then(() => console.log('4'));
setTimeout(() => console.log('5'));
console.log('6');
//Вывод в консоли: 1, 3, 6, 4, 5, 2
// 1 (синхронный); 3 (синхронный в промисе); 6 (синхронный); теперь очередь микротасок: 4 (из промиса); теперь макротаски: 5 (т.к. задержка 0), 2 (т.к задержка 1 > 0)
//////////////////////////////
// 2)
let promiseTree = new Promise((resolve, reject) => {
    resolve("a");
    console.log("1");
    setTimeout(() => {
        console.log("2");
    }, 0);
    console.log("3");
});
//Вывод в консоли: "1", "3", "2" 
//"1" и "3" (сначала синхронный), "2" (из очереди макротасок)
/////////////////////////
// 3)
let promiseTwo = new Promise((resolve, reject) => {
    resolve("a");
});
promiseTwo
    .then((res) => {
        return res + "b";
    })
    .then((res) => {
        return res + "с";
    })
    .finally((res) => {
        return res + "!!!!!!!";
    })
    .catch((res) => {
        return res + "d";
    })
    .then((res) => {
        console.log(res);
    });
//Вывод в консоли: abc
// результат "a", его конкатенируем в .then c "b", дальше конкатенируем в .then "с", .finally выполняется при завершении, ничего не принимает и не возвращает
/////////////////////////////
// 4)
function doSmth() {
    return Promise.resolve("123");
}
doSmth()
    .then(function (a) {
        console.log("1", a); //
        return a;
    })
    .then(function (b) {
        console.log("2", b);
        return Promise.reject("321");
    })
    .catch(function (err) {
        console.log("3", err);
    })
    .then(function (c) {
        console.log("4", c);
        return c;
    });
//Порядок: 1 123, 2 123, 3 321, 4
//консоль + результат 123, консоль + результат 123 (вернул предыдущий then), консоль + ошибка 321 (вернул предыдущий then), консоль + undefined (предыдущий не вернул)
///////////////////////////
// 5)
console.log("1");
setTimeout(function () {
    console.log("2");
}, 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
//Порядок: 1, 4, 3, 2
//1, 4 (синхронный) 3 (микротаска), 2 (макротаска)
////////////////////////////
//7)
async function a() {
  console.log("a");
}

console.log("1");

(async function () {
  console.log("f1");
  await a();
  console.log("f2");
})();
console.log("2");
//Порядок: 1, f1 , а, 2,  f2
// 1 (синхронная), f1 (синхронная в функции), а (синхронная в функции), 2 (синхронная),  f2 (из очереди микротасок)
////////////////////////////////
//8)
console.log(1);

setTimeout(() => console.log(2));

async function func() {
  console.log(3);

  await new Promise((resolve) => {
    console.log(4);
    resolve();
    console.log(5);
  })
    .then(() => console.log(6))
    .then(() => console.log(7));

  console.log(8);
}

setTimeout(() => console.log(9));

func();

console.log(10);
//Порядок: 1, 3, 4, 5, 10, 6, 7, 8, 2, 9
//1 (синхронная), 3 (синхронная в функции), 4, 5 (синхронная в промисе), 10 (синхронная), 6, 7 (микротаски), 8 (после выполнения await), 2, 9 (из очереди макротасок)
///////////////////////////////////
// 9)*
function foo(callback) {
    setTimeout(() => {
        callback('A');
    }, Math.random() * 100);
}
function bar(callback) {
    setTimeout(() => {
        callback('B');
    }, Math.random() * 100);
}
function baz(callback) {
    setTimeout(() => {
        callback('C');
    }, Math.random() * 100);
}
//
// foo(console.log)
// bar(console.log)
// baz(console.log)

// Написать функцию, чтобы починить последовательность выполнения A,B,C без использования колбэк хэлла
// в функциях foo, bar,baz запрещено что-либо менять
// подсказка: нужны промисы =))
function withPromise(funcName) {
    return new Promise((resolve, reject) => {
        funcName((result) => {
            resolve(result);
        });
    });
};

withPromise(foo)
    .then((result1) => {
        console.log(result1);
        return withPromise(bar);
    })
    .then((result2) => {
        console.log(result2);
        return withPromise(baz);
    })
    .then((result3) => {
        console.log(result3);
    });