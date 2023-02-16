function App() {
  // form 태그 자동 전송 막기
  document
    .querySelector("#espresso-menu-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
    });

  // 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
  document
    .querySelector("#espresso-menu-name")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        document.querySelector("#espresso-menu-name").value;
      }
    });
}

App();
