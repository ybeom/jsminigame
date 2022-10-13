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
let rertyCount = 0;
let gameState = "";
let selectedCard1 = "";
let selectedCard2 = "";
let clcikStore = "";
let clickCount = 0;

const backimg_file = "../img/back_img.png";
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
  return randomArray;
}

// 맨 처음 화면 로드 되자마자 카드 전체 뒤집어놓기
function initImg() {
  for (let i = 0; i < 18; i++) {
    imoji_container.innerHTML += `<img src =${backimg_file} class = "back_image_${i}" ></img>`;
    // js에서 만든 태그이므로 전역에서는 반환 안하면 못씀.
    const img = document.querySelectorAll("img");
    img.forEach((elem) => elem.addEventListener("click", selectedImg));
  }
}
// 카드 전체 뒤집기
function flipImgAll(random_arr) {
  for (let i = 0; i < 18; i++) {
    const back_image = document.querySelector(`.back_image_${i}`);
    // id는 고유한 값이며, 각 카드의 인덱스를 id에 넣는다.
    // 인덱스값을 기억함으로써 src가 바뀌어도 원래 무슨 카드였는지 알아낼 수 있고, 뒤집어서 확인하게 할 수 있다!
    // console.log(`idx = ${random_arr[i]}, value = ${random_arr[i]}`);
    back_image.id = random_arr[i];

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
  let random_arr = shuffleImg();

  //타이머 변수 감소하는 함수
  function timeDecrease() {
    timer_num.textContent = timer--;
  }
  //5초 세는 타이머
  let timeStart = setInterval(timeDecrease, 1000);
  setTimeout(() => {
    clearInterval(timeStart);
    flipImgAll(random_arr);
    timer_num.innerText = "";
    score_title.innerText = "점수 : ";
    socre_num.innerText = "0";
    gameState = "";
  }, (timer + 1) * 1000);
}

// 카드를 선택했을 때
function selectedImg(e) {
  if (gameState !== "") return;
  if (clickCount <= 1) {
    if (clcikStore === "") {
      //id 에 저장된 원래 카드의 인덱스를 통해 이미지를 확인(flipImgAll)

      let idOne = e.target.id;
      e.target.src = img_files[idOne];
      clcikStore = e.target.src;
      selectedCard1 = e.target.src;
      clickCount++;
    } else {
      //id 에 저장된 원래 카드의 인덱스를 통해 이미지를 확인(flipImgAll)
      let idTwo = e.target.id;
      e.target.src = img_files[idTwo];
      selectedCard2 = e.target.src;
      if (selectedCard1 === selectedCard2) {
        clickCount++;
        clcikStore = "";
        clickCount = 0;
        const img_current = document.querySelectorAll("img");
        img_current.forEach((elem) => {
          //같은 카드면 클래스 done 추가하여 구별
          if (elem.src === selectedCard1) {
            elem.classList.add("done");
            elem.classList.add("done");
          }
        });
      } else {
        clickCount++;
        function flipBack() {
          const img_current = document.querySelectorAll("img");
          img_current.forEach((elem) => {
            if (elem.src !== backimg_file && !elem.className.includes("done")) {
              elem.src = backimg_file;
            }
          });
        }
        setTimeout(flipBack, 2000);

        clcikStore = "";
        clickCount = 0;
      }
    }
  } else {
    clcikStore = "";
    clickCount = 0;
  }
}

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

    if (result_box.textContent.length !== 0 && rertyCount === 0) {
      btn.id = "retry-btn";
      result_container.appendChild(btn);
      btn.textContent = "다시하기";
      const retry_btn = document.getElementById("retry-btn");
      retry_btn.addEventListener("click", resetGame);
      rertyCount++;
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
