const $ = (selector) => document.querySelector(selector);

function App() {
  // form 태그 자동 전송 막기
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  let count = 0;

  // 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const $espressoMenuName = $("#espresso-menu-name").value;

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

      // 총 메뉴 개수를 count하여 상단에 표시
      count++;
      $(".menu-count").innerText = `총 ${count}개`;
      $("#espresso-menu-name").value = "";

      //console.log(menuItemTemplate($espressoMenuName));
    }
  });
}

App();
