document.write('<script type="text/javascript" src="practice_js.js"></script>');

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

