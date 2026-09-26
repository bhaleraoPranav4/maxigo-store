import React from "react";

import "./Dashboard.css";

import {
  useLanguage,
} from "./LanguageContext";

function countStatus(
  orders,
  status
) {
  return (
    orders || []
  ).filter(
    (order) =>
      order.orderStatus ===
      status
  ).length;
}

function Dashboard({
  dashboard,
  orders = [],
  products = [],
  store,
  setActivePage,
  storeOnline,
  toggleStoreOnline,
  updateOrderStatus,
}) {
  const { t } =
    useLanguage();

  const placed =
    countStatus(
      orders,
      "PLACED"
    );

  const accepted =
    countStatus(
      orders,
      "ACCEPTED"
    );

  const preparing =
    countStatus(
      orders,
      "PREPARING"
    );

  const ready =
    countStatus(
      orders,
      "READY_FOR_PICKUP"
    );

  const delivered =
    countStatus(
      orders,
      "DELIVERED"
    );

  const activeProducts =
    products.filter(
      (product) =>
        String(
          product.status ||
            "ACTIVE"
        ).toUpperCase() ===
          "ACTIVE" &&
        product.isActive !== false
    );

  const newOrders =
    orders.filter(
      (order) =>
        order.orderStatus ===
        "PLACED"
    );

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>

          <h1>
            {t("dashboard") ||
              "Dashboard"}
          </h1>

          <p>
            {t(
              "dashboardDescription"
            ) ||
              "Manage your business, products and orders from here."}
          </p>

        </div>

        <button
          type="button"
          className={`online-status ${
            storeOnline
              ? "store-online"
              : "store-offline"
          }`}
          onClick={
            toggleStoreOnline
          }
        >
          <span className="online-dot" />

          <span>
            {storeOnline
              ? "Online"
              : "Offline"}
          </span>
        </button>

      </div>

      {/* STORE INFO */}

      <div className="business-selector-card">

        <div className="business-selector-left">

          <div className="business-selector-icon">
            {store?.category ===
            "RESTAURANT"
              ? "🍽️"
              : "🏪"}
          </div>

          <div>

            <span className="small-label">
              STORE
            </span>

            <h3>
              {store?.storeName ||
                "MaxiGo Partner"}
            </h3>

            <p>
              {store?.city ||
                ""}
              {store?.verificationStatus
                ? ` · ${store.verificationStatus}`
                : ""}
            </p>

          </div>

        </div>

        <div className="business-selector-actions">

          <button
            type="button"
            className="view-all-btn"
            onClick={() =>
              setActivePage(
                "profile"
              )
            }
          >
            Manage Profile
          </button>

        </div>

      </div>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card new-orders">

          <div className="stat-icon">
            🆕
          </div>

          <div className="stat-info">

            <span>
              {t(
                "newOrders"
              ) ||
                "New Orders"}
            </span>

            <strong>
              {dashboard?.placedOrders ??
                placed}
            </strong>

            <small>
              Waiting for action
            </small>

          </div>

        </div>

        <div className="stat-card preparing">

          <div className="stat-icon">
            👨‍🍳
          </div>

          <div className="stat-info">

            <span>
              {t(
                "preparing"
              ) ||
                "Preparing"}
            </span>

            <strong>
              {dashboard?.preparingOrders ??
                preparing}
            </strong>

            <small>
              Currently processing
            </small>

          </div>

        </div>

        <div className="stat-card ready">

          <div className="stat-icon">
            ✅
          </div>

          <div className="stat-info">

            <span>
              {t("ready") ||
                "Ready"}
            </span>

            <strong>
              {dashboard?.readyOrders ??
                ready}
            </strong>

            <small>
              Waiting for rider
            </small>

          </div>

        </div>

        <div className="stat-card completed">

          <div className="stat-icon">
            💰
          </div>

          <div className="stat-info">

            <span>
              {t(
                "completed"
              ) ||
                "Completed"}
            </span>

            <strong>
              {dashboard?.deliveredOrders ??
                delivered}
            </strong>

            <small>
              Delivered orders
            </small>

          </div>

        </div>

      </div>

      {/* NEW ORDERS */}

      <div className="dashboard-grid">

        <div className="dashboard-panel orders-panel">

          <div className="panel-header">

            <div>

              <h2>
                {t(
                  "newOrders"
                ) ||
                  "New Orders"}
              </h2>

              <p>
                Orders waiting for
                your action
              </p>

            </div>

            <button
              className="view-all-btn"
              onClick={() =>
                setActivePage(
                  "orders"
                )
              }
            >
              View All →
            </button>

          </div>

          {!storeOnline ? (
            <div className="offline-orders-message">

              <div className="offline-orders-icon">
                🔒
              </div>

              <div>

                <h3>
                  Store is Offline
                </h3>

                <p>
                  Go Online to receive
                  and process new
                  orders.
                </p>

                <button
                  type="button"
                  onClick={
                    toggleStoreOnline
                  }
                >
                  Go Online
                </button>

              </div>

            </div>
          ) : newOrders.length === 0 ? (
            <div className="no-active-orders">

              <div>📭</div>

              <p>
                {t(
                  "noNewOrders"
                ) ||
                  "No new orders."}
              </p>

            </div>
          ) : (
            newOrders
              .slice(0, 5)
              .map(
                (order) => (
                  <div
                    className="dashboard-order-row"
                    key={
                      order.id
                    }
                  >

                    <div>

                      <strong>
                        #
                        {order.orderNumber ||
                          order.id}
                      </strong>

                      <span>
                        {order.customerName ||
                          "Customer"}
                      </span>

                    </div>

                    <div>

                      <strong>
                        ₹
                        {Number(
                          order.totalAmount ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                      <span>
                        {(order.items ||
                          [])
                          .map(
                            (item) =>
                              `${item.productName} × ${item.quantity}`
                          )
                          .join(
                            ", "
                          )}
                      </span>

                    </div>

                    <div className="dashboard-order-actions">

                      <button
                        className="small-reject-btn"
                        onClick={() =>
                          updateOrderStatus(
                            order.id,
                            "REJECT"
                          )
                        }
                      >
                        Reject
                      </button>

                      <button
                        className="small-accept-btn"
                        onClick={() =>
                          updateOrderStatus(
                            order.id,
                            "ACCEPT"
                          )
                        }
                      >
                        Accept
                      </button>

                    </div>

                  </div>
                )
              )
          )}

        </div>

        {/* STORE SUMMARY */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>
                Store Summary
              </h2>

              <p>
                Current backend data
              </p>
            </div>

          </div>

          <div className="product-summary-stats">

            <div>
              <strong>
                {products.length}
              </strong>

              <span>
                Total Products
              </span>
            </div>

            <div>
              <strong>
                {
                  activeProducts.length
                }
              </strong>

              <span>
                Active Products
              </span>
            </div>

            <div>
              <strong>
                ₹
                {Number(
                  dashboard?.totalSales ||
                    0
                ).toLocaleString(
                  "en-IN"
                )}
              </strong>

              <span>
                Total Sales
              </span>
            </div>

          </div>

          <div className="recent-products">

            {products
              .slice(0, 5)
              .map(
                (product) => (
                  <div
                    className="mini-product"
                    key={
                      product.id
                    }
                  >

                    <div className="mini-product-icon">
                      🛍️
                    </div>

                    <div className="mini-product-info">

                      <strong>
                        {product.name}
                      </strong>

                      <small>
                        ₹
                        {Number(
                          product.price ||
                            0
                        )}
                        {" · "}
                        Stock{" "}
                        {product.stock ??
                          0}
                      </small>

                    </div>

                  </div>
                )
              )}

            {products.length ===
              0 && (
              <p>
                No products added
                yet.
              </p>
            )}

          </div>

        </div>

      </div>

      {/* ORDER STATUS */}

      <div className="dashboard-card">

        <div className="dashboard-card-header">

          <div>

            <h2>
              Order Status
            </h2>

            <p>
              Live status from
              backend
            </p>

          </div>

        </div>

        <div className="product-summary-stats">

          <div>
            <strong>
              {placed}
            </strong>
            <span>
              Placed
            </span>
          </div>

          <div>
            <strong>
              {accepted}
            </strong>
            <span>
              Accepted
            </span>
          </div>

          <div>
            <strong>
              {preparing}
            </strong>
            <span>
              Preparing
            </span>
          </div>

          <div>
            <strong>
              {ready}
            </strong>
            <span>
              Ready
            </span>
          </div>

          <div>
            <strong>
              {delivered}
            </strong>
            <span>
              Delivered
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;