const BASE_URL = "http://localhost:3000/api";

const headers = { "Content-Type": "application/json" };

const HTTP_METHOD = {
  POST(data) {
    return {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };
  },
  PUT(data) {
    return {
      method: "PUT",
      headers: headers,
      body: data ? JSON.stringify(data) : null,
    };
  },
  DELETE() {
    return {
      method: "DELETE",
    };
  },
};

const request = async (url, option) => {
  const response = await fetch(url, option);

  if (!response.ok) {
    alert("에러가 발생했습니다.");
    console.error(response);
  }

  return response.json();
};

const requestWithoutJson = async (url, option) => {
  const response = await fetch(url, option);

  if (!response.ok) {
    alert("에러가 발생했습니다.");
    console.error(response);
  }

  return response;
};

const api = {
  getMenuList(category) {
    return request(`${BASE_URL}/category/${category}/menu`);
  },
  createMenu(category, name) {
    return request(
      `${BASE_URL}/category/${category}/menu`,
      HTTP_METHOD.POST({ name })
    );
  },
  updateMenu(category, menuId, name) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.PUT({ name })
    );
  },
  toggleSoldOutMenu(category, menuId) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      HTTP_METHOD.PUT()
    );
  },
  deleteMenu(category, menuId) {
    return requestWithoutJson(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.DELETE()
    );
  },
};

export default api;
