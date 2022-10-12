/* html 요소 선택자 선언 */
const main_container = document.getElementById("main-container");
const result_container = document.getElementById("result-container");
const imoji_container = document.getElementById("imoji-container");
const start_btn = document.getElementById("start-btn");
const score_title = document.getElementById("score-title");
const socre_num = document.getElementById("socre-num");
const timer_num = document.getElementById("timer-num");
//승부 결과 창을 html에 삽입 및 css 수정
const result_box = document.createElement("div");
result_box.id = "result_box";
result_container.appendChild(result_box);
result_box.style.marginTop = "10px";

// appearRetrybtn이 버튼 클릭 시 반복해서 수행되지 않도록 막는 변수
let count = 0;

// 이미지 카드 배열
const img_files = [
  "../img/01_img.png", //액션가면
  "../img/01_img.png", //액션가면
  "../img/02_img.png", //아구몬
  "../img/02_img.png", //아구몬
  "../img/03_img.png", //바트심슨
  "../img/03_img.png", //바트심슨
  "../img/04_img.png", //코로몬
  "../img/04_img.png", //코로몬
  "../img/05_img.png", //도라에몽
  "../img/05_img.png", //도라에몽
  "../img/06_img.png", //호머심슨
  "../img/06_img.png", //호머심슨
  "../img/07_img.png", //도라미
  "../img/07_img.png", //도라미
  "../img/08_img.png", //토코몬
  "../img/08_img.png", //토코몬
  "../img/09_img.png", //피카츄
  "../img/09_img.png", //피카츄
];

// 이미지 카드 초기 셋팅 해주는 함수
function initialsetImg() {}

function shuffleImg() {
  let randomArray = [];
  let randomNumber = 0;
  for (let i = 0; i < img_files.length; i++) {
    randomNumber = Math.floor(Math.random() * img_files.length);
    if (randomArray.indexOf(randomNumber) === -1) {
      randomArray.push(randomNumber);
    } else {
      i--;
    }
  }

  for (let j = 0; j < img_files.length; j++) {
    const back_image = document.querySelector(`.back_image_${j}`);
    back_image.src = img_files[randomArray[j]];
  }
}

// 맨 처음 화면 로드 되자마자 카드 전체 뒤집어놓기
function initImg() {
  const backimg_file = "../img/back_img.png";
  for (let i = 0; i < 18; i++) {
    imoji_container.innerHTML += `<img src =${backimg_file} class = "back_image_${i}" ></img>`;
  }
}
// 카드 전체 뒤집기
function flipImg() {
  const backimg_file = "../img/back_img.png";

  for (let i = 0; i < 18; i++) {
    const back_image = document.querySelector(`.back_image_${i}`);
    back_image.src = backimg_file;
  }
}
// 게임 시작
function gameStart() {
  // 보여주는 시간
  let timer = 5;
  score_title.innerText = "";
  socre_num.innerText = "";
  //점수 초기화
  scoreCount();
  //이미지카드 섞기
  shuffleImg();
  //타이머 변수 감소하는 함수
  function timeDecrease() {
    timer_num.textContent = timer--;
  }
  //5초 세는 타이머
  let timeStart = setInterval(timeDecrease, 1000);
  setTimeout(() => {
    clearInterval(timeStart);
    flipImg();
    timer_num.innerText = "";
    score_title.innerText = "점수 : ";
    socre_num.innerText = "0";
  }, (timer + 1) * 1000);
}

// 카드를 선택했을 때

function scoreCount() {
  let score = 0;
  // socre_num.textContent = score;
}

// 승부 결과 확인
function matchResult(event) {}
// 다시하기 버튼 기능
function appearRetrybtn() {
  if (result_box.innerText !== "") {
    const btn = document.createElement("button");

    if (result_box.textContent.length !== 0 && count === 0) {
      btn.id = "retry-btn";
      result_container.appendChild(btn);
      btn.textContent = "다시하기";
      const retry_btn = document.getElementById("retry-btn");
      retry_btn.addEventListener("click", resetGame);
      count++;
    }
  }
}

function resetGame() {
  random = setInterval(initialsetImg, 200);
  result_box.innerText = "";
}

/* 이벤트 리스너 */
window.addEventListener("load", initImg);
start_btn.addEventListener("click", gameStart);
