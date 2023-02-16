const $ = (selector) => document.querySelector(selector);

function App() {
  const addMenu = () => {
    const $espressoMenuName = $("#espresso-menu-name").value;

    if ($espressoMenuName === "") {
      alert("값을 입력해주세요!");
      return;
    }

    //입력한 값을 메뉴 리스트에 추가
    const menuItemTemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
              <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
              >
                수정
              </button>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
              >
                삭제
              </button>
            </li>`;
    };

    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate($espressoMenuName)
    );
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;

    $("#espresso-menu-name").value = "";
  };

  // form 태그 자동 전송 막기
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 메뉴의 이름을 입력 받고 확인 버튼 클릭으로 추가한다.
  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenu();
  });

  // 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addMenu();
    }
  });
}

App();
