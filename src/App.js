/* eslint-disable */

// 위에 거는 warning 메시지 없애주는 플래그 같은거임

import { useState } from "react";
import "./App.css";

function App() {
  let today = "2024.02.13";

  let [id] = useState("zackinthebox");
  let [titles, c] = useState([
    "nodejs에 관한 글",
    "react에 관한 글",
    "감자탕에 관한 글",
  ]);
  let [current, setCurrent] = useState(-1);
  let [modal, setModal] = useState(-1); // UI의 상태
  let [input, setInput] = useState("");

  // id 는 변수랑 똑같이 자료 저장
  // b 는 state 변경을 도와주는 함수 이름
  // 왜 state를 쓰느냐? 변수는 변경이 되어도 바로 안고쳐짐 새로고침해야함. state는 근데 자동으로 재랜더링됨.

  // <tag onClick = {함수}></tag> tag라는 html 요소를 클릭했을 때 함수를 실행할 수 있게 해줌 onClick 이벤트 핸들러

  // state 값 변경은 함수로 해주어야함 그냥 변경해주면 재랜더링이 일어남
  // increaseLikes(변경될 값) [0,0,0] 을 [1,0,0] 으로 변경하려면 increaseLike([1,0,0])

  /*
  map 함수
  [1,2,3].map(function()=>{console.log(1)}) : 1을 array의 크기만큼 반복 출력
  [1,2,3].map(function(a)=>{console.log(a)}) : 1,2,3을 순차적으로 출력
  [1,2,3].map(function() => {return 9}) : [9,9,9] 를 리턴해줌
  */

  return (
    <div className="App">
      <div className="blacktitle">
        <h4>홍삼룡의 블로그</h4>
        <div>{today}</div>
      </div>
      <div className="list">
        <button
          onClick={() => {
            let copy = [...titles]; // ...은 깊은복사 state 변경함수는 기존state와 파라미터를 비교해서 다르면 수행됨
            // 근데 얕은 복사를 하면 주소값이 똑같기 때문에 그냥 아무일도 안일어나게 됨.
            copy[0] = "롤에 관한글";
            copy[1] = "메랜에 관한 글";
            copy[2] = "감자탕에 관한글";
            c(copy);
          }}
        >
          앰생 버튼
        </button>
        <button
          onClick={() => {
            let copy = [...titles];

            copy.sort();

            c(copy);
          }}
        >
          정렬 버튼
        </button>
      </div>
      <div>
        {titles &&
          titles.map((title, num) => {
            //map 함수 : 반복문 두번째 파라미터 num은 index임
            return (
              <div className="list">
                <h4
                  onClick={() => {
                    if (modal == -1) {
                      setModal(modal * -1);
                    }
                    setCurrent(num);
                  }}
                >
                  {num + 1}. {title}
                  <Like />
                </h4>

                <p>2월 15일 {id} 발행</p>
                <button
                  onClick={() => {
                    let copy = [...titles];
                    copy.splice(num, 1);
                    c(copy);
                  }}
                >
                  글 삭제
                </button>
              </div>
            ); //list도 리액트에서는 알아서 잘 표현해줌
          })}
      </div>
      <input
        onChange={(e) => {
          setInput(e.target.value); // 오래걸리는 함수임
        }}
      ></input>
      <button
        onClick={() => {
          let copy = [...titles];
          copy.push(input);
          c(copy);
        }}
      >
        글 추가
      </button>

      {
        //삼항연산자 : 조건식 ? 참 : 거짓  html안에 if문을 사용할 수 없어서 조건문은 삼항연산자로 구현
        modal == 1 ? (
          <Modal color="yellow" titles={titles} func={c} num={current} />
        ) : null //자식에서 사용할 state를 이런식으로 명시해줌
      }
    </div>
  );
}

/*
컴포넌트 만들기 == 함수 만들기
대문자로 시작하는게 관습
return() 안에 html을 담는다 <div></div> 하나
만약 두개이상을 쓰고 싶다? 그르면 <div></div>로 묶거나 <></>와 같은 의미없는 거로 묶어도뎀
컴포넌트 사용할때 <Modal></Modal> 로 사용하기도 하고 <Modal/> 하나만 써도 같은 효과

컴포넌트 사용하기 좋은 상황
1. 반복적인 html을 축약
2. 페이지 전환 할때 큰 페이지를 컴포넌트로
3. 자주 변경되는 html ui 들을 컴포넌트로
*/
/*
동적인 UI 만들기
1. html css 로 일단 디자인 부터 하셈
2. UI의 상태를 state로 저장
3. 상태에 따라 UI가 보여지는 모습을 작성
*/
//props 로 함수 밖의 변수를 가져올 수 있음.
//우리가 만든 페이지의 구조는 <App></App> 안에 <Modal/>이 있다. Modal 밖의 변수를 Modal 안에서 사용하는게 props
// <App>에서는 props로 Modal로 변수를 전달 할 수 있음(부모에서 자식으로 전송) 자식에서 부모로는 불가능
function Modal(props) {
  return (
    <div className="modal" style={{ background: props.color }}>
      <h4>{props.titles[props.num]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  );
}

function Like() {
  let [like, increaseLike] = useState(0);
  return (
    <span>
      <span
        onClick={(e) => {
          e.stopPropagation(); // 이거는 이제 상위 html로 이벤트 버블링이 일어나는 것을 막아주는 함수
          increaseLike(like + 1);
        }}
      >
        🙄
      </span>
      {like}
    </span>
  );
}

export default App;
