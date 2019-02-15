//이터러블을 이터레이터 프로토콜을 활용해 데이터 순회하기
const log = console.log; 

const iterable = { //이터러블 선언
    [Symbol.iterator]() { //사용자 정의 이터레이터
      let i = 3;
  
      return{
        next(){
          return i==0 ? {done: true} : {value: i-- , done: false};
        },

        [Symbol.iterator](){return this;} //이터레이터 자체에 이터레이터를 가지고있어야함
      }
    }
  }
  const iter = iterable[Symbol.iterator](); //그래야 이터레이터에 직접 접근했을 때
   
  iter.next(); //이러한 연산을 할 수 있음
  
  for(const a of iter) log(a);
  
  for(const b of iterable) log(b);
  
  //전개 연산자
const log = console.log; 
const a = [1,2,3];
const b = [2,5,9];
log(...a, ...b);

// ... 연산자도 결국 for of와 같이 이터레이터를 이용해 전개하는 용법임
// 아래와 같이 해보면 알 수 있음
const iter = a[Symbol.iterator]();
iter.next();
log(...iter, ...b) // 2부터 출력됨

//이터레이터이자 이터러블을 생성하는 함수 제너레이터
//제너레이터는 자체로 이터레이터이자 well-formed 이터레이터임
function *gen(){
  yield 1;
  yield 2;
  yield 3; //이터레이터로 순회할 요소들
  return 100; //끝나면 value값으로 전달함
}

const iter = gen();
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

//짝수를 생성하는 제너레이터
const log = console.log;

function *infinity(i=0){ //0부터 무한히 숫자를 생성하는 제너레이터
  while(true) {
    yield i++;
  }
}

function *limit(l, iter){ //어떤 이터러블이 주어졌을때 주어진 수만큼 생성하는 제너레이터
  for(const i of iter){
    yield i;
    if(i==l) return;
  }
}

function *odds(l){ //홀수로 걸러서 생성하는 제너레이터
  for(const a of limit(l, infinity(0))){
    if(a%2) yield a;
  }
}

let odd = odds(10);
for(const a of odd) log(a);

//...전개 연산자 활용하기
const [a, ...b] = odds(10);
log(a);
log(b);

//map
const products = [ //상품정보를 담는 객체들을 담는 배열
  {name:"shoes", price:1000},
  {name:"bottle", price:2000},
  {name:"pants", price:2200},
  {name:"shocks", price:3000},
]

let prices = []; 
for(const a of products){
  prices.push(a.price); //상품정보중 가격만 따로 배열에 담음
}

let names = [];
for(const a of products){
  names.push(a.name);  //상품정보중 이름만 따로 배열에 담음
}

let map = (f, iter) => { //이러한 역할을 하는 map 함수 super awesome
  //f는 함수를 인자로 받음, iter는 이터레이터를 받음
  let res = [];
  for(const a of iter){ 
    res.push(f(a));//이터레이터의 모든 요소를 함수에 넣고 반환값을 res에 넣음
  }
  return res; //다 넣었으면 res반환
}

log(prices);
log(names);
log(map(a => a.name, products)); //익명함수를 전달 인자에 name만 반환하는 것으로 정의함
//제너레이터와 사용 가능함

function *gen1(){
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}

log(map(a => a*a, gen1()));

//맵 구조분해 사용
const log = console.log;
function map2(f, iter){
  res = [];
  for(const a of iter){
    res.push(f(a));
  }
  return res;
}
function *gen3(){
  yield 5;
  yield 6;
  yield 7;
}

let m = new Map([['a',3],['b',6]]);

log(new Map(map2(([a, b])=>[a+'b', b-8], m))); //새롭게 만들어진 맵을 새로운 맵으로 선언

//filter 함수 작성해보기

const products = [ //상품정보를 담는 객체들을 담는 배열
  {name:"shoes", price:1000},
  {name:"bottle", price:2000},
  {name:"pants", price:2200},
  {name:"shocks", price:3000},
];
//만약 그냥 무작정 만든다면
let over2000 = []; //가격이 2000이상인 물품만 담는 배열 선언

for(const a of products){
  if(a.price >= 2000){
    over2000.push(a);
  }
}

log(...over2000);

//이는 조건에 따라 계속 만들어야함.. 예를들어 under3000과 같은
//이터러블 프로토콜과 일급함수를 이용해 함수를 만듦

const filter = (f, iter) => {
  let n = [];
  for(const a of iter){
    if(f(a)) n.push(a);
  }
  return n;
}

log(...filter(a => a.price>=2000, products)); //조건을 익명 함수에 위임

log(filter(a => a*3 > 10, function *(){ //익명함수 제너레이터 활용해서 바로 적용 가능
  yield 1;
  yield 2;
  yield 3;
  yield 5;
}()));
