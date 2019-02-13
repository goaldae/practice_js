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

