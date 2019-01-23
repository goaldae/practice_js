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
const title = document.getElementById("title"); // document라는 객체로 html의 id 접근
title.innerHTML = "Hi! from JS!";  // 문자열 수정
//title.style.color = "red";  //색깔 바꾸기

document.title = "change title"; //웹 제목 바꾸기

//title.querySelector("#title"); css선택자처럼 자식 선택해서 바꾸기: 자주쓰임

//자바스크립트는 이벤트에 반응하기 위해 만들어짐

console.dir(document);

/////////////이벤트/////////////

const CLICKED_CLASS = "clicked"; //추가할 클래스 이름

function handleColor(){
    const hasClass = title.classList.contains(CLICKED_CLASS); //클래스 리스트 확인후 t/f로 반환
    if(!hasClass){ //가지고있지 않으면
        title.classList.add = CLICKED_CLASS;//추가하고
    }else{//가지고있으면
        title.classList.remove = CLICKED_CLASS; //지워라
    }
}

function init(){
    title.addEventListener("click", handleColor);//이때 handleColor()라고 하면 이벤트와 상관없이 실행됨
}
init();

//이벤트들이 궁금할때는 MDN 검색하기