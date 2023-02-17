const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem(JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem("menu");
  },
};

function App() {
  this.menu = [];

  const addMenu = () => {
    const espressoMenuName = $("#espresso-menu-name").value;

    if (espressoMenuName === "") {
      alert("값을 입력해주세요!");
      return;
    }

    this.menu.push({ name: espressoMenuName });
    const template = this.menu
      .map((item) => {
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
      })
      .join("");

    $("#espresso-menu-list").innerHTML = template;

    setMenuCount();

    $("#espresso-menu-name").value = "";
  };

  const setMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
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

  // 메뉴 수정
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      const $menuName = e.target.closest("li").querySelector(".menu-name");
      const newMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
      $menuName.innerText = newMenuName;
    }

    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm("정말 삭제하시겠습니까?" === true)) {
        e.target.closest("li").remove();
        setMenuCount();
      }
    }
  });
}

const app = new App();
