import { $ } from "./utils/dom.js";
import api from "./api/index.js";

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.category = "espresso";
  this.init = async () => {
    this.menu[this.category] = await api.getMenuList(this.category);
    render();
    initEventListener();
  };

  // 메뉴 리스트 랜더링
  const render = async () => {
    this.menu[this.category] = await api.getMenuList(this.category);

    const template = this.menu[this.category]
      .map((menuItem) => {
        return `<li data-menu-id="${menuItem.id}" class="${
          menuItem.isSoldOut ? "sold-out" : ""
        } menu-list-item d-flex items-center py-2">
              <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
              <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
              >
                품절
              </button>
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

  const addMenu = async () => {
    const menuName = $("#menu-name").value;

    if (menuName === "") {
      alert("값을 입력해주세요!");
      return;
    }

    const isDuplicatedItem = this.menu[this.category].some(
      (menuItem) => menuItem.name === menuName
    );

    if (isDuplicatedItem) {
      alert("이미 등록된 메뉴입니다.");
      $("#menu-name").value = "";
      return;
    }

    await api.createMenu(this.category, menuName);

    render();
    $("#menu-name").value = "";
  };

  const updateMenu = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const newMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);

    await api.updateMenu(this.category, menuId, newMenuName);
    render();
  };

  const deleteMenu = async (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      await api.deleteMenu(this.category, menuId);
      render();
    }
  };

  const soldOutMenu = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    await api.toggleSoldOutMenu(this.category, menuId);
    render();
  };

  const setMenuCount = () => {
    $(".menu-count").innerText = `총 ${this.menu[this.category].length}개`;
  };

  const changeCategory = (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.category = categoryName;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      render();
    }
  };

  const initEventListener = () => {
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

    // 메뉴 수정, 삭제, 품절 처리
    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenu(e);
        return;
      }

      if (e.target.classList.contains("menu-remove-button")) {
        deleteMenu(e);
        return;
      }

      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });

    // 메뉴 종류 선택
    $("nav").addEventListener("click", (e) => {
      changeCategory(e);
    });
  };
}

const app = new App();
app.init();
