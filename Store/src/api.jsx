const API_BASE = "https://api.maxigo.in/api";

const TOKEN_KEY = "maxigoStoreToken";
const USER_KEY = "maxigoStoreUser";

// =====================================================
// AUTH STORAGE
// =====================================================

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  try {
    return JSON.parse(
      localStorage.getItem(USER_KEY) || "null"
    );
  } catch {
    return null;
  }
}

export function saveAuth(data) {
  if (data?.token) {
    localStorage.setItem(
      TOKEN_KEY,
      data.token
    );
  }

  const user = {
    userId: data?.userId ?? null,
    name: data?.name ?? null,
    mobile: data?.mobile ?? null,
    role: data?.role ?? "STORE",
  };

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );

  localStorage.removeItem(
    "maxigoPartnerLoggedIn"
  );

  localStorage.removeItem(
    "maxigoPartner"
  );
}

export function clearAuth() {
  localStorage.removeItem(
    TOKEN_KEY
  );

  localStorage.removeItem(
    USER_KEY
  );

  localStorage.removeItem(
    "maxigoPartnerLoggedIn"
  );

  localStorage.removeItem(
    "maxigoPartner"
  );

  localStorage.removeItem(
    "maxigoStoreRememberMe"
  );
}

export function isLoggedIn() {
  return Boolean(getToken());
}

// =====================================================
// RESPONSE PARSER
// =====================================================

async function parseResponse(response) {
  const text =
    await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// =====================================================
// COMMON API REQUEST
// SUPPORTS JSON + FORMDATA
// =====================================================

async function apiRequest(
  path,
  options = {}
) {
  const isFormData =
    typeof FormData !==
      "undefined" &&
    options.body instanceof
      FormData;

  const headers = {
    ...(options.body &&
    !isFormData
      ? {
          "Content-Type":
            "application/json",
        }
      : {}),

    ...(options.headers || {}),
  };

  const token =
    getToken();

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  const response =
    await fetch(
      `${API_BASE}${path}`,
      {
        ...options,
        headers,
      }
    );

  const data =
    await parseResponse(
      response
    );

  if (!response.ok) {
    const message =
      typeof data ===
      "string"
        ? data
        : data?.message ||
          data?.error ||
          `Request failed (${response.status})`;

    const error =
      new Error(message);

    error.status =
      response.status;

    error.data =
      data;

    throw error;
  }

  return data;
}

// =====================================================
// AUTH
// =====================================================

export async function loginStore(
  mobile,
  password
) {
  const data =
    await apiRequest(
      "/auth/login",
      {
        method: "POST",

        body: JSON.stringify({
          mobile,
          password,
        }),
      }
    );

  if (
    data?.role &&
    String(data.role).toUpperCase() !==
      "STORE"
  ) {
    throw new Error(
      "This account is not a Store account."
    );
  }

  saveAuth(data);

  return data;
}

export async function registerStore(
  payload
) {
  const data =
    await apiRequest(
      "/store/register",
      {
        method: "POST",

        body: JSON.stringify(
          payload
        ),
      }
    );

  if (data?.token) {
    saveAuth(data);
  }

  return data;
}

// =====================================================
// STORE PROFILE
// =====================================================

export const getMyStore =
  () =>
    apiRequest(
      "/store/me"
    );

export const updateMyStore =
  (payload) =>
    apiRequest(
      "/store/me",
      {
        method: "PUT",

        body: JSON.stringify(
          payload
        ),
      }
    );

export const updateMyStoreStatus =
  (status) =>
    apiRequest(
      `/store/me/status?status=${encodeURIComponent(
        status
      )}`,
      {
        method: "PUT",
      }
    );

// =====================================================
// DASHBOARD
// =====================================================

export const getStoreDashboard =
  () =>
    apiRequest(
      "/store/dashboard"
    );

// =====================================================
// ORDERS
// =====================================================

export const getStoreOrders =
  () =>
    apiRequest(
      "/store/orders"
    );

export const getStoreOrdersByStatus =
  (status) =>
    apiRequest(
      `/store/orders/status/${encodeURIComponent(
        status
      )}`
    );

export const getStoreOrder =
  (orderId) =>
    apiRequest(
      `/store/orders/${orderId}`
    );

export const getStoreOrderItems =
  (orderId) =>
    apiRequest(
      `/store/orders/${orderId}/items`
    );

export const acceptStoreOrder =
  (orderId) =>
    apiRequest(
      `/store/orders/${orderId}/accept`,
      {
        method: "PUT",
      }
    );

export const rejectStoreOrder =
  (orderId) =>
    apiRequest(
      `/store/orders/${orderId}/reject`,
      {
        method: "PUT",
      }
    );

export const startPreparingStoreOrder =
  (orderId) =>
    apiRequest(
      `/store/orders/${orderId}/preparing`,
      {
        method: "PUT",
      }
    );

export const readyStoreOrder =
  (orderId) =>
    apiRequest(
      `/store/orders/${orderId}/ready`,
      {
        method: "PUT",
      }
    );

// =====================================================
// STORE PRODUCTS
// =====================================================

export const getMyProducts =
  () =>
    apiRequest(
      "/store/products"
    );

export const getMyProduct =
  (productId) =>
    apiRequest(
      `/store/products/${productId}`
    );

// =====================================================
// ADD PRODUCT
// =====================================================

export const addStoreProduct =
  (payload) =>
    apiRequest(
      "/store/products",
      {
        method: "POST",

        body: JSON.stringify(
          payload
        ),
      }
    );

// =====================================================
// UPDATE PRODUCT
// =====================================================

export const updateStoreProduct =
  (
    productId,
    payload
  ) =>
    apiRequest(
      `/store/products/${productId}`,
      {
        method: "PUT",

        body: JSON.stringify(
          payload
        ),
      }
    );

// =====================================================
// PRODUCT IMAGE UPLOAD
// =====================================================

export const uploadProductImage =
  async (file) => {

    if (!file) {
      throw new Error(
        "Please select an image."
      );
    }

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    return apiRequest(
      "/store/products/upload-image",
      {
        method: "POST",

        body: formData,
      }
    );
  };

// =====================================================
// UPDATE STOCK
// =====================================================

export const updateStoreProductStock =
  (
    productId,
    stock
  ) =>
    apiRequest(
      `/store/products/${productId}/stock?stock=${encodeURIComponent(
        stock
      )}`,
      {
        method: "PUT",
      }
    );

// =====================================================
// UPDATE STATUS
// =====================================================

export const updateStoreProductStatus =
  (
    productId,
    status
  ) =>
    apiRequest(
      `/store/products/${productId}/status?status=${encodeURIComponent(
        status
      )}`,
      {
        method: "PUT",
      }
    );

// =====================================================
// DELETE PRODUCT
// =====================================================

export const deleteStoreProduct =
  (productId) =>
    apiRequest(
      `/store/products/${productId}`,
      {
        method: "DELETE",
      }
    );

// =====================================================
// CATEGORY
// =====================================================

export const getCategories =
  () =>
    apiRequest(
      "/categories"
    );

// =====================================================
// SETTLEMENT
// =====================================================

export const getMySettlements =
  () =>
    apiRequest(
      "/store/settlements"
    );

export const getMySettlement =
  (settlementId) =>
    apiRequest(
      `/store/settlements/${settlementId}`
    );

export const getMySettlementsByStatus =
  (status) =>
    apiRequest(
      `/store/settlements/status/${encodeURIComponent(
        status
      )}`
    );

// =====================================================
// STORE BANK ACCOUNT
// =====================================================

export const getStoreBankAccount =
  async () => {
    return apiRequest(
      "/store/bank-account",
      {
        method: "GET",
      }
    );
  };

export const addStoreBankAccount =
  async (payload) => {
    return apiRequest(
      "/store/bank-account",
      {
        method: "POST",
        body: JSON.stringify(
          payload
        ),
      }
    );
  };

export const updateStoreBankAccount =
  async (payload) => {
    return apiRequest(
      "/store/bank-account",
      {
        method: "PUT",
        body: JSON.stringify(
          payload
        ),
      }
    );
  };

export const deleteStoreBankAccount =
  async () => {
    return apiRequest(
      "/store/bank-account",
      {
        method: "DELETE",
      }
    );
  };