import React, {

  useMemo,

  useState,

} from "react";

import "./Orders.css";

import {

  useLanguage,

} from "./LanguageContext";

const API_BASE_URL = "https://api.maxigo.in";

function resolveProductImageUrl(value) {
  if (typeof value !== "string" || !value.trim()) return "";
  const image = value.trim();
  if (/^(https?:|data:|blob:)/i.test(image)) return image;
  if (image.startsWith("//")) return `https:${image}`;
  if (image.startsWith("/")) return `${API_BASE_URL}${image}`;
  return `${API_BASE_URL}/${image.replace(/^\.\//, "")}`;
}

function readProductImage(item) {
  if (!item || typeof item !== "object") return "";
  const product = item.product && typeof item.product === "object" ? item.product : {};
  const images = [
    item.productImageUrl, item.imageUrl, item.productImage, item.imageURL,
    item.image, item.photoUrl, item.thumbnailUrl, item.photo, item.picture,
    product.productImageUrl, product.imageUrl, product.productImage,
    product.imageURL, product.image, product.photoUrl, product.thumbnailUrl,
  ];
  const image = images.find((value) => typeof value === "string" && value.trim());
  return resolveProductImageUrl(image);
}

function findProductImage(item, products = []) {
  const direct = readProductImage(item);
  if (direct) return direct;
  const productId = item?.productId ?? item?.product?.id ?? item?.id;
  const productName = String(item?.productName ?? item?.name ?? item?.product?.name ?? "").trim().toLowerCase();
  const match = (Array.isArray(products) ? products : []).find((product) => {
    const sameId = productId != null && String(product?.id ?? product?.productId ?? "") === String(productId);
    const name = String(product?.name ?? product?.productName ?? "").trim().toLowerCase();
    return sameId || (productName && name === productName);
  });
  return readProductImage(match);
}

function formatStatus(

  status

) {

  return String(

    status || ""

  ).replaceAll(

    "_",

    " "

  );

}

function formatTime(

  value

) {

  if (!value) {

    return "";

  }

  const date =

    new Date(value);

  if (

    Number.isNaN(

      date.getTime()

    )

  ) {

    return value;

  }

  return date.toLocaleString(

    "en-IN",

    {

      day: "2-digit",

      month: "short",

      hour: "2-digit",

      minute: "2-digit",

    }

  );

}

function Orders({
  orders = [],
  products = [],

  storeOnline,

  updateOrderStatus,

}) {

  const { t } =

    useLanguage();

  const [filter, setFilter] =

    useState("ALL");

  const filters = [

    [

      "ALL",

      t("allOrders") ||

        "All Orders",

    ],

    [

      "PLACED",

      t("new") ||

        "New",

    ],

    [

      "ACCEPTED",

      "Accepted",

    ],

    [

      "PREPARING",

      t("preparing") ||

        "Preparing",

    ],

    [

      "READY_FOR_PICKUP",

      t("ready") ||

        "Ready",

    ],

    [

      "DELIVERED",

      t("delivered") ||

        "Delivered",

    ],

    [

      "REJECTED",

      t("rejected") ||

        "Rejected",

    ],

    [

      "CANCELLED",

      t("cancelled") ||

        "Cancelled",

    ],

  ];

  const filteredOrders =

    useMemo(() => {

      return filter ===

        "ALL"

        ? orders

        : orders.filter(

            (order) =>

              order.orderStatus ===

              filter

          );

    }, [

      orders,

      filter,

    ]);

  const getStatusClass =

    (status) => {

      switch (

        status

      ) {

        case "PLACED":

          return "order-status-new";

        case "ACCEPTED":

          return "order-status-preparing";

        case "PREPARING":

          return "order-status-preparing";

        case "READY_FOR_PICKUP":

          return "order-status-ready";

        case "DELIVERED":

          return "order-status-completed";

        case "REJECTED":

          return "order-status-rejected";

        case "CANCELLED":

          return "order-status-rejected";

        default:

          return "";

      }

    };

  const getCount =

    (status) => {

      if (

        status === "ALL"

      ) {

        return orders.length;

      }

      return orders.filter(

        (order) =>

          order.orderStatus ===

          status

      ).length;

    };

  const action = (

    id,

    type,

    message

  ) => {

    if (

      !storeOnline &&

      type !== "READY"

    ) {

      alert(

        "Store is Offline. Go Online to process new orders."

      );

      return;

    }

    if (

      message &&

      !window.confirm(

        message

      )

    ) {

      return;

    }

    updateOrderStatus(

      id,

      type

    );

  };

  return (

    <div className="orders-page">

      <div className="orders-page-header">

        <div>

          <h1>

            {t("orders") ||

              "Orders"}

          </h1>

          <p>

            {t(

              "ordersDescription"

            ) ||

              "Manage and track all your customer orders."}

          </p>

        </div>

        <div className="orders-total">

          <span>

            {t(

              "totalOrders"

            ) ||

              "Total Orders"}

          </span>

          <strong>

            {orders.length}

          </strong>

        </div>

      </div>

      {/* FILTERS */}

      <div className="order-filters">

        {filters.map(

          ([

            key,

            label,

          ]) => (

            <button

              key={key}

              className={

                filter === key

                  ? "order-filter active"

                  : "order-filter"

              }

              onClick={() =>

                setFilter(

                  key

                )

              }

            >

              <span>

                {label}

              </span>

              <b>

                {getCount(

                  key

                )}

              </b>

            </button>

          )

        )}

      </div>

      {/* ORDERS */}

      <div className="orders-container">

        {filteredOrders.length ===

        0 ? (

          <div className="orders-empty">

            <div className="orders-empty-icon">

              📭

            </div>

            <h2>

              {t(

                "noOrdersFound"

              ) ||

                "No Orders Found"}

            </h2>

            <p>

              {t(

                "noOrdersInCategory"

              ) ||

                "There are no orders in this category."}

            </p>

          </div>

        ) : (

          filteredOrders.map(

            (order) => (

              <div

                className="full-order-card"

                key={

                  order.id

                }

              >

                {/* HEADER */}

                <div className="full-order-header">

                  <div className="full-order-id">

                    <span>

                      ORDER ID

                    </span>

                    <strong>

                      #

                      {order.orderNumber ||

                        order.id}

                    </strong>

                  </div>

                  <div className="full-order-time">

                    {formatTime(

                      order.placedAt

                    )}

                  </div>

                  <div

                    className={`full-order-status ${getStatusClass(

                      order.orderStatus

                    )}`}

                  >

                    {formatStatus(

                      order.orderStatus

                    )}

                  </div>

                </div>

                {/* BODY */}

                <div className="full-order-body">

                  {/* CUSTOMER */}

                  <div className="order-section customer-section">

                    <div className="section-title">

                      {t(

                        "customer"

                      ) ||

                        "Customer"}

                    </div>

                    <div className="customer-details">

                      <div className="large-customer-avatar">

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

                          📞{" "}

                          {order.customerMobile ||

                            "Not available"}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* ITEMS */}

                  <div className="order-section items-section">

                    <div className="section-title">

                      {t(

                        "orderItems"

                      ) ||

                        "Order Items"}

                    </div>

                    <div className="order-items-list">

                      {(order.items || []).length > 0 ? (

                        order.items.map((item, index) => {

                          const productImage = findProductImage(item, products);

                          return (

                            <div

                              className="order-product-item"

                              key={item.id || item.productId || index}

                            >

                              {productImage ? (

                                <img

                                  className="order-product-image"

                                  src={productImage}

                                  alt={item.productName || item.name || "Product"}

                                  onError={(event) => {

                                    event.currentTarget.style.display = "none";

                                  }}

                                />

                              ) : (

                                <div className="order-product-image order-product-placeholder">

                                  🛍️

                                </div>

                              )}

                              <div className="order-product-info">

                                <strong>

                                  {item.productName || item.name || "Product"}

                                </strong>

                                <span>× {item.quantity || 1}</span>

                              </div>

                            </div>

                          );

                        })

                      ) : (

                        <span>No items</span>

                      )}

                    </div>

                  </div>

                  {/* AMOUNT */}

                  <div className="order-section amount-section">

                    <div className="section-title">

                      {t(

                        "orderAmount"

                      ) ||

                        "Order Amount"}

                    </div>

                    <strong className="full-order-amount">

                      ₹

                      {Number(

                        order.totalAmount ||

                          0

                      ).toLocaleString(

                        "en-IN"

                      )}

                    </strong>

                    <small>

                      {String(

                        order.paymentMethod ||

                          "COD"

                      ).toUpperCase()}

                    </small>

                  </div>

                </div>

                {/* NOTE */}

                <div className="full-order-address">

                  <span>

                    📦

                  </span>

                  <div>

                    <small>

                      ORDER NOTE

                    </small>

                    <p>

                      {order.customerNote ||

                        "No special instruction"}

                    </p>

                  </div>

                </div>

                {/* FOOTER */}

                <div className="full-order-footer">

                  <div className="order-progress">

                    {[

                      [

                        "PLACED",

                        "1",

                        "Placed",

                      ],

                      [

                        "ACCEPTED",

                        "2",

                        "Accepted",

                      ],

                      [

                        "PREPARING",

                        "3",

                        "Preparing",

                      ],

                      [

                        "READY_FOR_PICKUP",

                        "4",

                        "Ready",

                      ],

                      [

                        "DELIVERED",

                        "5",

                        "Delivered",

                      ],

                    ].map(

                      ([

                        stepStatus,

                        number,

                        label,

                      ], index) => {

                        const status =

                          order.orderStatus;

                        const completed =

                          index ===

                            0 &&

                          [

                            "ACCEPTED",

                            "PREPARING",

                            "READY_FOR_PICKUP",

                            "DELIVERED",

                          ].includes(

                            status

                          )

                            ? true

                            : index ===

                                1 &&

                              [

                                "PREPARING",

                                "READY_FOR_PICKUP",

                                "DELIVERED",

                              ].includes(

                                status

                              )

                            ? true

                            : index ===

                                2 &&

                              [

                                "READY_FOR_PICKUP",

                                "DELIVERED",

                              ].includes(

                                status

                              )

                            ? true

                            : index ===

                                3 &&

                              status ===

                                "DELIVERED"

                            ? true

                            : status ===

                              stepStatus;

                        const lineCompleted =

                          index === 0

                            ? [

                                "ACCEPTED",

                                "PREPARING",

                                "READY_FOR_PICKUP",

                                "DELIVERED",

                              ].includes(

                                status

                              )

                            : index ===

                                1

                            ? [

                                "PREPARING",

                                "READY_FOR_PICKUP",

                                "DELIVERED",

                              ].includes(

                                status

                              )

                            : index ===

                                2

                            ? [

                                "READY_FOR_PICKUP",

                                "DELIVERED",

                              ].includes(

                                status

                              )

                            : status ===

                              "DELIVERED";

                        return (

                          <React.Fragment

                            key={

                              stepStatus

                            }

                          >

                            <div

                              className={

                                completed

                                  ? "progress-step completed"

                                  : "progress-step"

                              }

                            >

                              <span>

                                {number}

                              </span>

                              <small>

                                {label}

                              </small>

                            </div>

                            {index <

                              4 && (

                              <div

                                className={

                                  lineCompleted

                                    ? "progress-line completed"

                                    : "progress-line"

                                }

                              />

                            )}

                          </React.Fragment>

                        );

                      }

                    )}

                  </div>

                  {/* ACTIONS */}

                  <div className="full-order-actions">

                    {order.orderStatus ===

                      "PLACED" && (

                      <>

                        <button

                          className="large-reject-btn"

                          onClick={() =>

                            action(

                              order.id,

                              "REJECT",

                              "Are you sure you want to reject this order?"

                            )

                          }

                        >

                          ✕{" "}

                          {t(

                            "reject"

                          ) ||

                            "Reject"}

                        </button>

                        <button

                          className="large-accept-btn"

                          onClick={() =>

                            action(

                              order.id,

                              "ACCEPT"

                            )

                          }

                        >

                          ✓{" "}

                          {t(

                            "acceptOrder"

                          ) ||

                            "Accept Order"}

                        </button>

                      </>

                    )}

                    {order.orderStatus ===

                      "ACCEPTED" && (

                      <button

                        className="large-ready-btn"

                        onClick={() =>

                          action(

                            order.id,

                            "PREPARING"

                          )

                        }

                      >

                        👨‍🍳 Mark as

                        Preparing

                      </button>

                    )}

                    {order.orderStatus ===

                      "PREPARING" && (

                      <button

                        className="large-ready-btn"

                        onClick={() =>

                          action(

                            order.id,

                            "READY"

                          )

                        }

                      >

                        ✓{" "}

                        {t(

                          "foodProductReady"

                        ) ||

                          "Food / Product Ready"}

                      </button>

                    )}

                    {order.orderStatus ===

                      "READY_FOR_PICKUP" && (

                      <div className="waiting-rider-box">

                        <span className="rider-icon">

                          🚴

                        </span>

                        <div>

                          <strong>

                            {t(

                              "waitingForRider"

                            ) ||

                              "Waiting for Rider"}

                          </strong>

                          <small>

                            Rider will pick up

                            this order.

                          </small>

                        </div>

                      </div>

                    )}

                    {order.orderStatus ===

                      "DELIVERED" && (

                      <div className="completed-box">

                        ✓ Delivered

                        Successfully

                      </div>

                    )}

                    {order.orderStatus ===

                      "REJECTED" && (

                      <div className="rejected-box">

                        ✕ This order

                        was rejected

                      </div>

                    )}

                    {order.orderStatus ===

                      "CANCELLED" && (

                      <div className="rejected-box">

                        ✕ This order

                        was cancelled

                      </div>

                    )}

                  </div>

                </div>

              </div>

            )

          )

        )}

      </div>

    </div>

  );

}

export default Orders;
