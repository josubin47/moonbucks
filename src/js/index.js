const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    dessert: [],
  };
  this.category = "espresso";
  this.init = () => {
    if (
      store.getLocalStorage() !== null &&
      store.getLocalStorage() !== "" &&
      store.getLocalStorage() !== undefined
    ) {
      this.menu = store.getLocalStorage();
    }
    render();
  };

  // 메뉴 리스트 랜더링
  const render = () => {
    const template = this.menu[this.category]
      .map((menuItem, index) => {
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
              <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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

    $("#menu-list").innerHTML = template;
    setMenuCount();
  };

  const addMenu = () => {
    const espressoMenuName = $("#menu-name").value;

    if (espressoMenuName === "") {
      alert("값을 입력해주세요!");
      return;
    }

    this.menu[this.category].push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);

    render();

    $("#menu-name").value = "";
  };

  const updateMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const newMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    this.menu[this.category][menuId].name = newMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = newMenuName;
  };

  const deleteMenu = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu[this.category].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      e.target.closest("li").remove();
      setMenuCount();
    }
  };

  const setMenuCount = () => {
    const menuCount = $("#menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  // form 태그 자동 전송 막기
  $("#menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 메뉴의 이름을 입력 받고 확인 버튼 클릭으로 추가한다.
  $("#menu-submit-button").addEventListener("click", () => {
    addMenu();
  });

  // 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
  $("#menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addMenu();
    }
  });

  // 메뉴 수정, 삭제
  $("#menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenu(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      deleteMenu(e);
    }
  });

  // 메뉴 종류 선택
  $("nav").addEventListener("click", (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.category = categoryName;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      render();
    }
  });
}

const app = new App();
app.init();
