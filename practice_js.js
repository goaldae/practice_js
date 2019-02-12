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
  