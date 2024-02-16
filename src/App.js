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
  let [likes, increaseLikes] = useState([0, 0, 0]);

  // id 는 변수랑 똑같이 자료 저장
  // b 는 state 변경을 도와주는 함수 이름
  // 왜 state를 쓰느냐? 변수는 변경이 되어도 바로 안고쳐짐 새로고침해야함. state는 근데 자동으로 재랜더링됨.

  // <tag onClick = {함수}></tag> tag라는 html 요소를 클릭했을 때 함수를 실행할 수 있게 해줌 onClick 이벤트 핸들러

  // state 값 변경은 함수로 해주어야함 그냥 변경해주면 재랜더링이 일어남
  // increaseLikes(변경될 값) [0,0,0] 을 [1,0,0] 으로 변경하려면 increaseLike([1,0,0])

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
      <div className="list">
        <h4>
          {titles[0]}
          <span
            onClick={() => {
              increaseLikes([likes[0] + 1, likes[1], likes[2]]);
            }}
          >
            🙄
          </span>
          {likes[0]}
        </h4>
        <p>2월 15일 {id} 발행</p>
      </div>
      <div className="list">
        <h4>
          {titles[1]} <span>🙄</span> {likes[1]}
        </h4>
        <p>2월 15일 {id} 발행</p>
      </div>
      <div className="list">
        <h4>
          {titles[2]} <span>🙄</span> {likes[2]}
        </h4>
        <p>2월 15일 {id} 발행</p>
      </div>
      <Modal></Modal>
    </div>
  );
}

// 컴포넌트 만들기 == 함수 만들기
// 대문자로 시작하는게 관습
// return() 안에 html을 담는다 <div></div> 하나
function Modal() {
  return (
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;
