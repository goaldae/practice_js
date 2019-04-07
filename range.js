const range = l => {
    var res = [];
    var i = -1;
    while(++i<l){
        res.push(i);
    }
    return res;
}

log(range(5)); //0부터 4까지 배열을 만드는 일반적인 함수 range
//배열을 바로 만들어버림

const L = {};

L.range = function *(l) { //제너레이터
    var i = -1;
    while(++i<l){
        yield i;
    }
};

const list = L.range(5); //제너레이터를 만듦

log(reduce2(add, list));
console.clear();
//원하는 수만큼 자르는 take함수
const take = curry((l, iter) => {
    let res = [];

    for(const a of iter){
        res.push(a);
        if(res.length == l) return res;
    }
    return res;
});

console.time('');
log(take(5, range(10000))); //배열을 모두 만든 뒤에 잘라냄
console.timeEnd('');

console.time('');
log(take(5, L.range(10000))); //필요한 부분만 만들어냄 (지연성)
console.timeEnd('');

//이것을 go를 사용해 평가하면
//curry로 리팩토링 하면 더 간결한 코드 가능

go(
    L.range(1000),
    a => take(10, a),
    log
);

//curry 이용
console.time('');
go(
    L.range(10000), //무한대를 인자로 해도 상관없음
    take(10),
    reduce2(add),
    log
);
console.timeEnd('');

//L.map, L.filter 함수
L.map = curry(function *(f, iter) {
    for(const a of iter) yield f(a);
});

L.filter = curry(function *(f, iter) {
    for(const a of iter) if(f(a)) yield a;
});

log(L.filter(p => p.price < 2000, products).next().value);

go(
    L.range(10),
    L.map(a=>a+10),
    L.filter(a=>a%2),
    take(2),
    log
);

const join = curry((sep = ',', iter) => { //iterable을 이용한 join function
    reduce2((a,b) => `${a}${sep}${b}`);
});

log({limit : 10, offset : 10, type : "notice"})

L.entries = function *(obj) {
    for(const k in obj){ //주의!!! obj를 돌때 of가 아니라 in임!!!!!
        yield [k, obj[k]];
    }
};

const queryStr = pipe(
    L.entries,
    L.map(([k, v])=> `${k}=${v}`),
    join('+'),
    log
);

const takeAll = take(infinity);

queryStr({limit : 10, offset : 10, type : "notice"});

const users = [
    {age : 34},
    {age : 26},
    {age : 28},
    {age : 40},
    {age : 18},
    {age : 21},
    {age : 30},
    {age : 29},
];

const find = curry((f, iter) => go(
    iter,
    filter(f),
    take(1),
    ([a]) => a));

log(find(u => u.age <= 30)( users));

log(filter(a => a.age >= 20, users));

const tarr = 1;
//tarr[Symbol.iterator]() 뒤에 ()는 함수 호출 : 함수가 존재함을 전재로 함
//tarr[Symbol.iterator]은 함수 자체를 확인할 수 있음

//tarr[Symbol.iterator]() 따라서 이것은 존재하지 않는 함수를 호출해서 오류
//tarr[Symbol.iterator] 하지만 이것은 함수가 존재하는지 확인할 수 있음

const isIterable = a => a && a[Symbol.iterator];

const narr = [[1,2],3,[4,5,6],7];

L.flatten = function *(iter){
    for(const a of iter){
        if(isIterable(a)) for(const b of a) yield b;
        else yield a;
    }
};

const flatten = pipe(
    L.flatten,
    take(infinity));

log(L.flatten(narr).next().value);
log(flatten(narr));

L.flatten2 = function *(iter) { //yield *iterable은 for (const val of iterable) yield val; 과 같음
    for (const a of iter) {
        if (isIterable(a)) yield *a;
        else yield a;
    }
};

L.deepFlat = function *f(iter) { //만일 깊은 Iterable을 모두 펼치고 싶다면 아래와 같이 L.deepFlat을 구현하여 사용할 수 있음
    for (const a of iter) {
        if (isIterable(a)) yield *f(a);
        else yield a;
    }
};

log([...L.deepFlat([1, [2, [3, 4], [[5]]]])]);
// [1, 2, 3, 4, 5];

//flatMap : flatten과 map을 동시에 하는 함수
log([[1,2,3],[4,5],[6]].flatMap(a=>a.map(a=>a*a))); //내장되어있는 flatMap 방식

log(flatten([[1,2,3],[4,5],[6]].map(a=>a.map(a=>a*a)))); //내장 + 내가 만든 flatten

L.flatMap = pipe(L.flatten, L.map(a=>a*a)); //내가 생각한 방식
//먼저 flatten을 하고 L.map을 함
var it = L.flatMap([[1,2,3],[4,5],[6]]); 
log([...it]);

L.flatMap = curry(pipe2(L.map, L.flatten)); //제시해준 방식
//var it1 = L.flatMap(map(a=>a*a));
var it2 = L.flatMap(a=>a, [[1,2,3],[4,5],[6]]);
//log([...it1]);
log([...it2]);

//2차원 배열 다루기
const arr4 = [
    [1, 2, 3],
    [4, 5],
    [6,7,8],
    [9]
];

go( //모든 값을 순회하는 비효율적인 방식
    arr4,
    flatten,
    map(a=>a*a),
    log);

go( //이터러블 프로토콜을 따르는 비동기적방식
    arr4,
    L.flatten,
    L.map(a=>a*a),
    takeAll,
    log);


//실무에서 활용할법하게 바꾼 코드

const users3 = [
    { name: 'a', age: 21, family: [
        { name: 'a1', age: 53 }, { name: 'a2', age: 47 },
        { name: 'a3', age: 16 }, { name: 'a4', age: 15 }
        ] },
    { name: 'b', age: 24, family: [
        { name: 'b1', age: 58 }, { name: 'b2', age: 51 },
        { name: 'b3', age: 19 }, { name: 'b4', age: 22 }
        ] },
    { name: 'c', age: 31, family: [
        { name: 'c1', age: 64 }, { name: 'c2', age: 62 }
        ] },
    { name: 'd', age: 20, family: [
        { name: 'd1', age: 42 }, { name: 'd2', age: 42 },
        { name: 'd3', age: 11 }, { name: 'd4', age: 7 }
        ] }
    ];

go( users3,
    L.flatMap(u => u.family),
    L.filter(u => u.age >= 20),
    L.map(u => u.age),
    take(3),
    log);

function add10(n, callback){
    setTimeout(()=>callback(n+10), 1000);
}

add10(10, log);

function add20(n){
    return new Promise(resolve => setTimeout(()=>resolve(n+20), 100));
}

add20(23)
    .then(log);

const delay100 = a => new Promise(resolve => 
    setTimeout(() => resolve(a), 100));
    //100ms 후에 값을 만들어내는 상수

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);
const add5 = a => a + 5;

log(go1(5, add5)); //동기적 값 계산
log(go1(go1(delay100(100), add5),log)); //일급을 이용한 비동기적 값 계산 , 값을 계속 가지고 이어서 사용할 수 있음

//어떤 값을 함수 합성할 때 안전하게 이어질 수 있도록 하는 것 : 모나드
const tempf = a => a+10;
const tempg = a => a*a;

[3].map(tempf).map(tempg).forEach(a => log(a)); //배열로 값을 감싸서 만드는 경우(동기적 방식) : 값을 안줘도 괜찮음
new Promise(resolve=>setTimeout(()=>resolve(20), 100)).then(tempf).then(tempg).then(r => log(r)); // 비동기적 방식으로 then을 이용해 함수를 순차적으로 실행하는 경우
