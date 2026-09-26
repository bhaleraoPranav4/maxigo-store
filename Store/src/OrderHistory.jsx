import React, {
  useMemo,
  useState,
} from "react";

import "./OrderHistory.css";

import {
  useLanguage,
} from "./LanguageContext";

function OrderHistory({
  orders = [],
}) {
  const { t } =
    useLanguage();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const historyOrders =
    useMemo(
      () =>
        orders.filter(
          (order) =>
            [
              "DELIVERED",
              "REJECTED",
              "CANCELLED",
            ].includes(
              order.orderStatus
            )
        ),
      [orders]
    );

  const filtered =
    historyOrders.filter(
      (order) => {
        const query =
          search
            .trim()
            .toLowerCase();

        const matchesSearch =
          !query ||
          String(
            order.id
          ).includes(
            query
          ) ||
          String(
            order.orderNumber ||
              ""
          )
            .toLowerCase()
            .includes(
              query
            ) ||
          String(
            order.customerName ||
              ""
          )
            .toLowerCase()
            .includes(
              query
            );

        const matchesStatus =
          status ===
            "ALL" ||
          order.orderStatus ===
            status;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

  const delivered =
    historyOrders.filter(
      (order) =>
        order.orderStatus ===
        "DELIVERED"
    );

  const rejected =
    historyOrders.filter(
      (order) =>
        order.orderStatus ===
        "REJECTED"
    );

  const cancelled =
    historyOrders.filter(
      (order) =>
        order.orderStatus ===
        "CANCELLED"
    );

  const revenue =
    delivered.reduce(
      (
        total,
        order
      ) =>
        total +
        Number(
          order.totalAmount ||
            0
        ),
      0
    );

  return (
    <div className="history-page">

      <div className="history-header">

        <div>

          <h1>
            {t(
              "orderHistory"
            ) ||
              "Order History"}
          </h1>

          <p>
            Completed,
            rejected and
            cancelled orders
            from the backend.
          </p>

        </div>

      </div>

      <div className="history-summary">

        <div className="history-summary-card">

          <div className="history-summary-icon">
            📜
          </div>

          <div>

            <span>
              Total History
            </span>

            <strong>
              {
                historyOrders.length
              }
            </strong>

          </div>

        </div>

        <div className="history-summary-card">

          <div className="history-summary-icon completed-icon">
            ✓
          </div>

          <div>

            <span>
              Delivered
            </span>

            <strong>
              {
                delivered.length
              }
            </strong>

          </div>

        </div>

        <div className="history-summary-card">

          <div className="history-summary-icon rejected-icon">
            ×
          </div>

          <div>

            <span>
              Rejected
            </span>

            <strong>
              {
                rejected.length
              }
            </strong>

          </div>

        </div>

        <div className="history-summary-card">

          <div className="history-summary-icon rejected-icon">
            ×
          </div>

          <div>

            <span>
              Cancelled
            </span>

            <strong>
              {
                cancelled.length
              }
            </strong>

          </div>

        </div>

        <div className="history-summary-card">

          <div className="history-summary-icon revenue-icon">
            ₹
          </div>

          <div>

            <span>
              Delivered
              Revenue
            </span>

            <strong>
              ₹
              {revenue.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

        </div>

      </div>

      <div className="history-toolbar">

        <div className="history-search">

          🔍

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search order ID or customer..."
          />

        </div>

        <div className="history-filter">

          <button
            className={
              status ===
              "ALL"
                ? "active"
                : ""
            }
            onClick={() =>
              setStatus(
                "ALL"
              )
            }
          >
            All
          </button>

          <button
            className={
              status ===
              "DELIVERED"
                ? "active"
                : ""
            }
            onClick={() =>
              setStatus(
                "DELIVERED"
              )
            }
          >
            Delivered
          </button>

          <button
            className={
              status ===
              "REJECTED"
                ? "active"
                : ""
            }
            onClick={() =>
              setStatus(
                "REJECTED"
              )
            }
          >
            Rejected
          </button>

          <button
            className={
              status ===
              "CANCELLED"
                ? "active"
                : ""
            }
            onClick={() =>
              setStatus(
                "CANCELLED"
              )
            }
          >
            Cancelled
          </button>

        </div>

      </div>

      {filtered.length ===
      0 ? (
        <div className="history-empty">

          <div className="history-empty-icon">
            📜
          </div>

          <h2>
            No Order History
          </h2>

          <p>
            Completed, rejected
            or cancelled orders
            will appear here.
          </p>

        </div>
      ) : (
        <div className="history-table-container">

          <table className="history-table">

            <thead>

              <tr>

                <th>
                  ORDER ID
                </th>

                <th>
                  CUSTOMER
                </th>

                <th>
                  ITEMS
                </th>

                <th>
                  AMOUNT
                </th>

                <th>
                  PAYMENT
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  TIME
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map(
                (order) => (
                  <tr
                    key={
                      order.id
                    }
                  >

                    <td>

                      <strong className="history-order-id">
                        #
                        {order.orderNumber ||
                          order.id}
                      </strong>

                    </td>

                    <td>

                      <div className="history-customer">

                        <div className="history-avatar">

                          {String(
                            order.customerName ||
                              "?"
                          )
                            .charAt(
                              0
                            )
                            .toUpperCase()}

                        </div>

                        <div>

                          <strong>
                            {order.customerName ||
                              "Customer"}
                          </strong>

                          <span>
                            {order.customerMobile ||
                              "-"}
                          </span>

                        </div>

                      </div>

                    </td>

                    <td>

                      <div className="history-items">

                        {(order.items ||
                          [])
                          .map(
                            (
                              item
                            ) =>
                              `${item.productName} × ${item.quantity}`
                          )
                          .join(
                            ", "
                          )}

                      </div>

                    </td>

                    <td>

                      <strong className="history-amount">

                        ₹
                        {Number(
                          order.totalAmount ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </strong>

                    </td>

                    <td>
                      {order.paymentMethod ||
                        "COD"}
                    </td>

                    <td>

                      <span
                        className={`history-status ${
                          order.orderStatus ===
                          "DELIVERED"
                            ? "history-completed"
                            : "history-rejected"
                        }`}
                      >
                        {
                          order.orderStatus
                        }
                      </span>

                    </td>

                    <td>

                      <span className="history-time">

                        {order.placedAt
                          ? new Date(
                              order.placedAt
                            ).toLocaleString(
                              "en-IN"
                            )
                          : "-"}

                      </span>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default OrderHistory;