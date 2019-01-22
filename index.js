var info = {
    name: "goaldae",
    age: 26,
    gender : "student",
    favMovies: ["along the god", "LOTR"], //오브젝트 안에 배열을 넣을 수 있음
}

//배열 안에 오브젝트들을 넣을 수도 있음

console.log(info);

//함수 만들어보기

function sayHello(name, age){
    console.log("Hello!", name, " you have ", age);
}

sayHello("goaldae", 26);

//string을 ``로 변수와 함께 표현하고 값을 반환해보기

function sayHello2(name, age){
    return `Hello! ${name} you have ${age}`
}

const intro = sayHello2("Nayoung", 24);
console.log(intro);

//DOM 사용해보기, object개념