import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import "./App.css";
import "./StorePanelFix.css";

/* =====================================================
   COMPONENT CSS
===================================================== */

import "./Dashboard.css";
import "./Orders.css";
import "./Products.css";
import "./Earnings.css";
import "./OrderHistory.css";
import "./BusinessProfile.css";

/* =====================================================
   COMPONENTS
===================================================== */

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Products from "./Products";
import Earnings from "./Earnings";
import OrderHistory from "./OrderHistory";
import BusinessProfile from "./BusinessProfile";
import Settings from "./Settings";
import TermsConditions from "./TermsConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import LanguageSelector from "./LanguageSelector";

import { useLanguage } from "./LanguageContext";

/* =====================================================
   API
===================================================== */

import {
  acceptStoreOrder,
  addStoreProduct,
  clearAuth,
  deleteStoreProduct,
  getMyProducts,
  getMySettlements,
  getMyStore,
  getStoreDashboard,
  getStoreOrders,
  getStoredUser,
  isLoggedIn,
  readyStoreOrder,
  rejectStoreOrder,
  startPreparingStoreOrder,
  updateMyStore,
  updateMyStoreStatus,
  updateStoreProduct,
  updateStoreProductStatus,
  updateStoreProductStock,
} from "./api";

/* =====================================================
   BUSINESS TYPES
===================================================== */

const BUSINESS_TYPES = [
  [
    "RESTAURANT",
    "Restaurant / Hotel",
    "🍽️",
  ],
  [
    "KIRANA",
    "Kirana Store",
    "🛒",
  ],
  [
    "VEGETABLE",
    "Vegetables & Fruits",
    "🥦",
  ],
  [
    "CHICKEN",
    "Chicken Shop",
    "🍗",
  ],
  [
    "DAIRY",
    "Dairy",
    "🥛",
  ],
  [
    "BAKERY",
    "Bakery",
    "🍰",
  ],
  [
    "TAPRI",
    "Tea / Tapri",
    "☕",
  ],
  [
    "GENERAL_STORE",
    "General Store",
    "🧴",
  ],
  [
    "JUICE_CENTER",
    "Juice Center",
    "🥤",
  ],
  [
    "SWEET_SHOP",
    "Sweet Shop",
    "🍬",
  ],
];

/* =====================================================
   APP
===================================================== */

function App() {
  const { t } = useLanguage();

  /* =====================================================
     AUTH PAGE
  ===================================================== */

  const [authPage, setAuthPage] =
    useState(() =>
      isLoggedIn()
        ? "dashboard"
        : "login"
    );

  /* =====================================================
     PARTNER
  ===================================================== */

  const [partner, setPartner] =
    useState(() => getStoredUser());

  /* =====================================================
     STORE
  ===================================================== */

  const [store, setStore] =
    useState(null);

  /* =====================================================
     DASHBOARD
  ===================================================== */

  const [dashboard, setDashboard] =
    useState(null);

  /* =====================================================
     ORDERS
  ===================================================== */

  const [orders, setOrders] =
    useState([]);

  /* =====================================================
     PRODUCTS
  ===================================================== */

  const [products, setProducts] =
    useState([]);

  /* =====================================================
     SETTLEMENTS
  ===================================================== */

  const [settlements, setSettlements] =
    useState([]);

  /* =====================================================
     LOADING
  ===================================================== */

  const [loading, setLoading] =
    useState(false);

  /* =====================================================
     GLOBAL ERROR
  ===================================================== */

  const [globalError, setGlobalError] =
    useState("");

  /* =====================================================
     ACTIVE PAGE
  ===================================================== */

  const [activePage, setActivePage] =
    useState("dashboard");

  /* =====================================================
     LEGAL PAGES
  ===================================================== */

  const [showTerms, setShowTerms] =
    useState(false);

  const [showPrivacy, setShowPrivacy] =
    useState(false);

  /* =====================================================
     BUSINESS TYPE
  ===================================================== */

  const businessType =
    store?.category ||
    "RESTAURANT";

  const currentBusiness =
    useMemo(
      () =>
        BUSINESS_TYPES.find(
          ([value]) =>
            value === businessType
        ) ||
        BUSINESS_TYPES[0],
      [businessType]
    );

  /* =====================================================
     STORE ONLINE / OFFLINE
  ===================================================== */

  const storeOnline =
    String(
      store?.storeStatus ||
        "ACTIVE"
    ).toUpperCase() === "ACTIVE";

  /* =====================================================
     LOAD ALL STORE DATA
  ===================================================== */

  const loadStoreData =
    useCallback(async () => {
      if (!isLoggedIn()) {
        return;
      }

      setLoading(true);
      setGlobalError("");

      try {
        const [
          storeData,
          dashboardData,
          orderData,
          productData,
          settlementData,
        ] = await Promise.all([
          getMyStore(),
          getStoreDashboard(),
          getStoreOrders(),
          getMyProducts(),
          getMySettlements(),
        ]);

        /* STORE */

        setStore(
          storeData
        );

        /* DASHBOARD */

        setDashboard(
          dashboardData
        );

        /* ORDERS */

        setOrders(
          Array.isArray(orderData)
            ? orderData
            : []
        );

        /* PRODUCTS */

        setProducts(
          Array.isArray(productData)
            ? productData
            : []
        );

        /* SETTLEMENTS */

        setSettlements(
          Array.isArray(
            settlementData
          )
            ? settlementData
            : []
        );

        /* UPDATE PARTNER */

        setPartner((prev) => ({
          ...(prev || {}),

          userId:
            storeData?.user?.id ??
            prev?.userId ??
            null,

          name:
            storeData?.ownerName ??
            storeData?.user?.name ??
            prev?.name ??
            null,

          mobile:
            storeData?.mobile ??
            storeData?.user?.mobile ??
            prev?.mobile ??
            null,

          role: "STORE",
        }));
      } catch (error) {
        setGlobalError(
          error?.message ||
            "Unable to load Store Panel data."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  /* =====================================================
     AUTO LOAD AFTER LOGIN
  ===================================================== */

  useEffect(() => {
    if (
      authPage === "dashboard" &&
      isLoggedIn()
    ) {
      loadStoreData();
    }
  }, [
    authPage,
    loadStoreData,
  ]);

  /* =====================================================
     REFRESH ORDERS + DASHBOARD
  ===================================================== */

  const refreshOrdersAndDashboard =
    async () => {
      try {
        const [
          orderData,
          dashboardData,
        ] = await Promise.all([
          getStoreOrders(),
          getStoreDashboard(),
        ]);

        setOrders(
          Array.isArray(orderData)
            ? orderData
            : []
        );

        setDashboard(
          dashboardData
        );
      } catch (error) {
        setGlobalError(
          error?.message ||
            "Unable to refresh orders."
        );
      }
    };

  /* =====================================================
     REFRESH PRODUCTS
  ===================================================== */

  const refreshProducts =
    async () => {
      try {
        const data =
          await getMyProducts();

        setProducts(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        setGlobalError(
          error?.message ||
            "Unable to refresh products."
        );
      }
    };

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleLogin =
    async (authData) => {
      setGlobalError("");

      setPartner({
        userId:
          authData?.userId,

        name:
          authData?.name,

        mobile:
          authData?.mobile,

        role:
          authData?.role ||
          "STORE",
      });

      setAuthPage(
        "dashboard"
      );

      setActivePage(
        "dashboard"
      );
    };

  /* =====================================================
     REGISTER SUCCESS
  ===================================================== */

  const handleRegisterSuccess =
    (data) => {
      setGlobalError("");

      setPartner({
        userId:
          data?.userId ??
          data?.store?.user?.id ??
          null,

        name:
          data?.store?.ownerName ??
          data?.name ??
          null,

        mobile:
          data?.store?.mobile ??
          data?.mobile ??
          null,

        role: "STORE",
      });

      setStore(
        data?.store || null
      );

      setAuthPage(
        "dashboard"
      );

      setActivePage(
        "dashboard"
      );
    };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    clearAuth();

    setPartner(null);
    setStore(null);
    setDashboard(null);
    setOrders([]);
    setProducts([]);
    setSettlements([]);

    setGlobalError("");

    setAuthPage("login");
    setActivePage("dashboard");
  };

  /* =====================================================
     ORDER STATUS ACTION
  ===================================================== */

  const updateOrderStatus =
    async (
      orderId,
      nextAction
    ) => {
      setGlobalError("");

      try {
        if (
          nextAction ===
          "ACCEPT"
        ) {
          await acceptStoreOrder(
            orderId
          );

        } else if (
          nextAction ===
          "REJECT"
        ) {
          await rejectStoreOrder(
            orderId
          );

        } else if (
          nextAction ===
          "PREPARING"
        ) {
          await startPreparingStoreOrder(
            orderId
          );

        } else if (
          nextAction ===
          "READY"
        ) {
          await readyStoreOrder(
            orderId
          );
        }

        await refreshOrdersAndDashboard();
      } catch (error) {
        setGlobalError(
          error?.message ||
            "Order status update failed."
        );
      }
    };

  /* =====================================================
     ADD PRODUCT
  ===================================================== */

  const addProduct =
    async (
      payload
    ) => {
      try {
        const saved =
          await addStoreProduct(
            payload
          );

        setProducts((prev) => [
          saved,
          ...prev,
        ]);

        return saved;
      } catch (error) {
        setGlobalError(
          error?.message ||
            "Unable to add product."
        );

        throw error;
      }
    };

  /* =====================================================
     UPDATE PRODUCT
  ===================================================== */

  const updateProduct =
    async (
      id,
      payload
    ) => {
      try {
        const updated =
          await updateStoreProduct(
            id,
            payload
          );

        setProducts((prev) =>
          prev.map((item) =>
            item.id === id
              ? updated
              : item
          )
        );

        return updated;
      } catch (error) {
        setGlobalError(
          error?.message ||
            "Unable to update product."
        );

        throw error;
      }
    };

  /* =====================================================
     DELETE PRODUCT
  ===================================================== */

  const deleteProduct =
    async (
      id
    ) => {
      try {
        await deleteStoreProduct(
          id
        );

        setProducts((prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
        );
      } catch (error) {
        setGlobalError(
          error?.message ||
            "Unable to delete product."
        );

        throw error;
      }
    };

  /* =====================================================
     TOGGLE PRODUCT STATUS
  ===================================================== */

  const toggleProduct =
    async (
      product
    ) => {
      try {
        const currentStatus =
          String(
            product.status ||
              (product.isActive
                ? "ACTIVE"
                : "INACTIVE")
          ).toUpperCase();

        const nextStatus =
          currentStatus ===
          "ACTIVE"
            ? "INACTIVE"
            : "ACTIVE";

        const updated =
          await updateStoreProductStatus(
            product.id,
            nextStatus
          );

        setProducts((prev) =>
          prev.map((item) =>
            item.id ===
            product.id
              ? updated
              : item
          )
        );

        return updated;
      } catch (error) {
        setGlobalError(
          error?.message ||
            "Unable to change product status."
        );

        throw error;
      }
    };

  /* =====================================================
     UPDATE STOCK
  ===================================================== */

  const updateStock =
    async (
      productId,
      stock
    ) => {
      try {
        const updated =
          await updateStoreProductStock(
            productId,
            Number(stock)
          );

        setProducts((prev) =>
          prev.map((item) =>
            item.id ===
            productId
              ? updated
              : item
          )
        );

        return updated;
      } catch (error) {
        setGlobalError(
          error?.message ||
            "Unable to update stock."
        );

        throw error;
      }
    };

  /* =====================================================
     SAVE STORE PROFILE
  ===================================================== */

  const saveStoreProfile =
    async (
      payload
    ) => {
      try {
        const updated =
          await updateMyStore(
            payload
          );

        setStore(updated);

        await loadStoreData();

        return updated;
      } catch (error) {
        setGlobalError(
          error?.message ||
            "Unable to save store profile."
        );

        throw error;
      }
    };

  /* =====================================================
     ONLINE / OFFLINE
  ===================================================== */

  const toggleStoreOnline =
    async () => {
      const nextStatus =
        storeOnline
          ? "INACTIVE"
          : "ACTIVE";

      setGlobalError("");

      try {
        const updated =
          await updateMyStoreStatus(
            nextStatus
          );

        setStore(updated);

        await refreshOrdersAndDashboard();
      } catch (error) {
        setGlobalError(
          error?.message ||
            "Unable to update store status."
        );
      }
    };

  /* =====================================================
     LOGIN PAGE
  ===================================================== */

  if (authPage === "login") {
    return (
      <Login
        onLogin={
          handleLogin
        }
        onRegister={() =>
          setAuthPage(
            "register"
          )
        }
      />
    );
  }

  /* =====================================================
     REGISTER PAGE
  ===================================================== */

  if (authPage === "register") {
    return (
      <Register
        onRegisterSuccess={
          handleRegisterSuccess
        }
        onLogin={() =>
          setAuthPage("login")
        }
      />
    );
  }

  /* =====================================================
     TERMS
  ===================================================== */

  if (showTerms) {
    return (
      <TermsConditions
        onBack={() =>
          setShowTerms(false)
        }
      />
    );
  }

  /* =====================================================
     PRIVACY
  ===================================================== */

  if (showPrivacy) {
    return (
      <PrivacyPolicy
        onBack={() =>
          setShowPrivacy(false)
        }
      />
    );
  }

  /* =====================================================
     MAIN APP
  ===================================================== */

  return (
    <div className="app">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="sidebar">

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="logo">
          <img
            src="/maxigo-store-logo.png"
            alt="MaxiGo Store"
            className="maxigo-logo"
          />
        </div>

        {/* =================================================
            BUSINESS CARD
        ================================================= */}

        <div className="business-card">

          <div className="business-icon">
            {currentBusiness[2]}
          </div>

          <div>

            <strong>
              {store?.storeName ||
                "MaxiGo Partner"}
            </strong>

            <span>
              {currentBusiness[1]}
            </span>

          </div>

        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav>

          {/* ================= DASHBOARD ================= */}

          <button
            className={
              activePage ===
              "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage(
                "dashboard"
              )
            }
          >
            <img
              src="/dashboard-logo.png"
              alt="Dashboard"
              className="sidebar-dashboard-logo"
            />

            <span>
              {t("dashboard") ||
                "Dashboard"}
            </span>

          </button>

          {/* ================= ORDERS ================= */}

          <button
            className={
              activePage ===
              "orders"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage(
                "orders"
              )
            }
          >
            <img
              src="/orders-logo.png"
              alt="Orders"
              className="sidebar-orders-logo"
            />

            <span>
              {t("orders") ||
                "Orders"}
            </span>

            <b>
              {storeOnline
                ? orders.filter(
                    (order) =>
                      order.orderStatus ===
                      "PLACED"
                  ).length
                : 0}
            </b>

          </button>

          {/* ================= PRODUCTS ================= */}

          <button
            className={
              activePage ===
              "products"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage(
                "products"
              )
            }
          >
            <img
              src="/food-menu.png"
              alt="Products"
              className="sidebar-food-logo"
            />

            <span>
              {businessType ===
              "RESTAURANT"
                ? t("foodMenu") ||
                  "Food / Menu"
                : t("products") ||
                  "Products"}
            </span>

          </button>

          {/* ================= EARNINGS ================= */}

          <button
            className={
              activePage ===
              "earnings"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage(
                "earnings"
              )
            }
          >
            <img
              src="/earnings.png"
              alt="Earnings"
              className="sidebar-earnings-logo"
            />

            <span>
              {t("earnings") ||
                "Earnings"}
            </span>

          </button>

          {/* ================= HISTORY ================= */}

          <button
            className={
              activePage ===
              "history"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage(
                "history"
              )
            }
          >
            <img
              src="/order-history.png"
              alt="Order History"
              className="sidebar-history-logo"
            />

            <span>
              {t("orderHistory") ||
                "Order History"}
            </span>

          </button>

          {/* ================= PROFILE ================= */}

          <button
            className={
              activePage ===
              "profile"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage(
                "profile"
              )
            }
          >
            <img
              src="/business-profile.png"
              alt="Business Profile"
              className="sidebar-profile-logo"
            />

            <span>
              {t("businessProfile") ||
                "Business Profile"}
            </span>

          </button>

        </nav>

        {/* =================================================
            BOTTOM SIDEBAR
        ================================================= */}

        <div className="sidebar-bottom">

          {/* ================= SETTINGS ================= */}

          <button
            className={
              activePage ===
              "settings"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage(
                "settings"
              )
            }
          >
            <img
              src="/settings-logo.png"
              alt="Settings"
              className="sidebar-settings-logo"
            />

            <span>
              {t("settings") ||
                "Settings"}
            </span>

          </button>

          {/* ================= LOGOUT ================= */}

          <button
            className="logout"
            onClick={
              handleLogout
            }
          >
            <img
              src="/logout-logo.png"
              alt="Logout"
              className="sidebar-logout-logo"
            />

            <span>
              {t("logout") ||
                "Logout"}
            </span>

          </button>

        </div>

      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <section className="main">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="header">

          {/* SEARCH */}

          <div className="search">
            🔍

            <input
              placeholder={`${t(
                "search"
              ) || "Search"} orders, products...`}
            />
          </div>

          {/* HEADER RIGHT */}

          <div className="header-right">

            {/* LANGUAGE */}

            <LanguageSelector />

            {/* NOTIFICATION */}

            <button
              className="notification"
              type="button"
            >
              🔔
            </button>

            {/* AVATAR */}

            <div className="owner-avatar">

              {(
                store?.ownerName ||
                partner?.name ||
                "P"
              )
                .charAt(0)
                .toUpperCase()}

            </div>

            {/* OWNER NAME */}

            <div className="owner-name">

              <strong>
                {store?.ownerName ||
                  partner?.name ||
                  "Partner"}
              </strong>

              <span>
                Store Partner
              </span>

            </div>

          </div>

        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <main className="content">

          {/* =================================================
              GLOBAL ERROR
          ================================================= */}

          {globalError && (
            <div className="global-api-error">
              ⚠️ {globalError}
            </div>
          )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading &&
            !store && (
              <div className="global-loading">
                Loading Store Panel...
              </div>
            )}

          {/* =================================================
              DASHBOARD
          ================================================= */}

          {activePage ===
            "dashboard" && (
            <Dashboard
              dashboard={
                dashboard
              }

              orders={
                orders
              }

              products={
                products
              }

              store={
                store
              }

              setActivePage={
                setActivePage
              }

              storeOnline={
                storeOnline
              }

              toggleStoreOnline={
                toggleStoreOnline
              }

              updateOrderStatus={
                updateOrderStatus
              }
            />
          )}

          {/* =================================================
              ORDERS
          ================================================= */}

          {activePage ===
            "orders" && (
            <Orders
              orders={
                orders
              }

              storeOnline={
                storeOnline
              }

              updateOrderStatus={
                updateOrderStatus
              }
            />
          )}

          {/* =================================================
              PRODUCTS
          ================================================= */}

          {activePage ===
            "products" && (
            <Products
              products={
                products
              }

              addProduct={
                addProduct
              }

              updateProduct={
                updateProduct
              }

              deleteProduct={
                deleteProduct
              }

              toggleProduct={
                toggleProduct
              }

              updateStock={
                updateStock
              }

              businessType={
                businessType
              }

              currentBusiness={
                currentBusiness
              }
            />
          )}

          {/* =================================================
              EARNINGS
          ================================================= */}

          {activePage ===
            "earnings" && (
            <Earnings
              dashboard={
                dashboard
              }

              settlements={
                settlements
              }

              orders={
                orders
              }
            />
          )}

          {/* =================================================
              ORDER HISTORY
          ================================================= */}

          {activePage ===
            "history" && (
            <OrderHistory
              orders={
                orders
              }
            />
          )}

          {/* =================================================
              BUSINESS PROFILE
          ================================================= */}

          {activePage ===
            "profile" && (
            <BusinessProfile
              store={
                store
              }

              businessType={
                businessType
              }

              businessTypes={
                BUSINESS_TYPES
              }

              onSave={
                saveStoreProfile
              }
            />
          )}

          {/* =================================================
              SETTINGS
          ================================================= */}

          {activePage ===
            "settings" && (
            <Settings />
          )}

        </main>

        {/* =================================================
            LEGAL FOOTER
        ================================================= */}

        <footer className="app-legal-footer">

          {/* LEFT */}

          <div className="app-legal-left">

            <strong>
              MaxiGo
            </strong>

            <span>
              Partner Panel
            </span>

          </div>

          {/* LEGAL LINKS */}

          <div className="app-legal-links">

            {/* TERMS */}

            <button
              type="button"
              onClick={() =>
                setShowTerms(true)
              }
            >
              Terms &amp;
              Conditions
            </button>

            {/* PRIVACY */}

            <button
              type="button"
              onClick={() =>
                setShowPrivacy(true)
              }
            >
              Privacy Policy
            </button>

            {/* PARTNER AGREEMENT */}

            <button
              type="button"
              onClick={() =>
                alert(
                  "Partner Agreement page coming soon."
                )
              }
            >
              Partner Agreement
            </button>

            {/* REFUND */}

            <button
              type="button"
              onClick={() =>
                alert(
                  "Refund & Cancellation page coming soon."
                )
              }
            >
              Refund &amp;
              Cancellation
            </button>

            {/* HELP */}

            <button
              type="button"
              onClick={() =>
                alert(
                  "Help & Support page coming soon."
                )
              }
            >
              Help &amp;
              Support
            </button>

          </div>

          {/* COPYRIGHT */}

          <div className="app-legal-copy">
            © 2026 MaxiGo.
            All rights reserved.
          </div>

        </footer>

      </section>

    </div>
  );
}

export default App;