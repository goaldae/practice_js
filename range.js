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