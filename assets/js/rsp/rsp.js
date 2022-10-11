/* html 요소 선택자 선언 */
const button_scissor = document.getElementById("button-scissor");
const button_rock = document.getElementById("button-rock");
const button_paper = document.getElementById("button-paper");

const main_container = document.querySelector("main");
const result_container = document.getElementById("result-container");
const imoji_container = document.getElementById("imoji-container");
const random_img = document.getElementById("random-img");
//승부 결과 창을 html에 삽입 및 css 수정
const result_box = document.createElement("div");
result_box.id = "result_box";
result_container.appendChild(result_box);
result_box.style.marginTop = "10px";

//random : 전역에 선언하여 stopImg에서 호출 가능
let random = 0;

//appearRetrybtn이 버튼 클릭 시 반복해서 수행되지 않도록 막는 변수
let count = 0;

//랜덤한 이미지를 선택해주는 함수
function selectImg() {
  const img_files = [
    "../img/paper_img.png",
    "../img/scissor_img.png",
    "../img/rock_img.png",
  ];
  // 랜덤하게 이미지파일 뽑기
  const selectedImg = img_files[Math.floor(Math.random() * img_files.length)];
  random_img.innerHTML = `<img src ="${selectedImg}"></img>`;
}

//정해진 간격만큼 반복하는 함수
function randomImg() {
  random = setInterval(selectImg, 200);
}

function stopImg() {
  clearInterval(random);
}

function matchResult(event) {
  stopImg();
  let current_state = event.currentTarget;
  //random_img 태그의 자식으로 만든 img 태그 ===   random_img.children[0]
  const paper_state = random_img.children[0].src.includes("paper");
  const scissor_state = random_img.children[0].src.includes("scissor");
  const rock_state = random_img.children[0].src.includes("rock");
  //비겼을 때
  if (
    (paper_state === true && current_state.innerText === "보") ||
    (scissor_state === true && current_state.innerText === "가위") ||
    (rock_state === true && current_state.innerText === "바위")
  ) {
    result_box.innerText = "비겼습니다.";
    appearRetrybtn();
  }
  //이겼을 때
  if (
    (paper_state === true && current_state.innerText === "가위") ||
    (scissor_state === true && current_state.innerText === "바위") ||
    (rock_state === true && current_state.innerText === "보")
  ) {
    result_box.innerText = "이겼습니다.";
    appearRetrybtn();
  }
  //졌을 때
  if (
    (paper_state === true && current_state.innerText === "바위") ||
    (scissor_state === true && current_state.innerText === "보") ||
    (rock_state === true && current_state.innerText === "가위")
  ) {
    result_box.innerText = "졌습니다.";
    appearRetrybtn();
  }
}

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
  random = setInterval(selectImg, 200);
  result_box.innerText = "";
}

/* 이벤트 리스너 */
window.addEventListener("load", randomImg);
button_scissor.addEventListener("click", matchResult);
button_rock.addEventListener("click", matchResult);
button_paper.addEventListener("click", matchResult);
