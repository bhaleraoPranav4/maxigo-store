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







function resolveProductImageUrl(value) {

  if (typeof value !== "string" || !value.trim()) return "";



  const image = value.trim();



  if (

    image.startsWith("https://") ||

    image.startsWith("http://") ||

    image.startsWith("data:") ||

    image.startsWith("blob:")

  ) {

    return image;

  }



  const apiBase = "https://api.maxigo.in";



  // Backend image paths must load from the API domain, not store.maxigo.in.

  if (image.startsWith("/")) {

    return `${apiBase}${image}`;

  }



  return `${apiBase}/${image}`;

}



function getProductImage(item, products = []) {

  const directImage =

    item?.productImage ||

    item?.productImageUrl ||

    item?.imageUrl ||

    item?.imageURL ||

    item?.image ||

    item?.photoUrl ||

    item?.thumbnailUrl ||

    item?.photo ||

    item?.picture ||

    item?.product?.productImage ||

    item?.product?.imageUrl;



  if (directImage) return resolveProductImageUrl(directImage);



  const itemId = item?.productId ?? item?.product?.id ?? item?.id;

  const itemName = String(

    item?.productName || item?.name || item?.product?.name || ""

  ).trim().toLowerCase();



  const matchedProduct = (products || []).find((product) => {

    const sameId =

      itemId != null &&

      String(product?.id ?? product?.productId ?? "") === String(itemId);

    const productName = String(

      product?.name || product?.productName || ""

    ).trim().toLowerCase();



    return sameId || (itemName && productName === itemName);

  });



  const matchedImage =

    matchedProduct?.productImage ||

    matchedProduct?.imageUrl ||

    matchedProduct?.productImageUrl ||

    matchedProduct?.imageURL ||

    matchedProduct?.image ||

    matchedProduct?.photoUrl ||

    matchedProduct?.thumbnailUrl ||

    matchedProduct?.photo ||

    matchedProduct?.picture;



  return resolveProductImageUrl(matchedImage);

}



function safeDisplay(value, fallback = "") {
  if (value == null) return fallback;
  if (typeof value === "string" || typeof value === "number") return value;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  // API/context values can occasionally be objects (including RegExp); never render them directly.
  return fallback;
}

function getItemName(item) {

  return item?.productName || item?.name || item?.product?.name || "Product";

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



  const { t: rawTranslate } = useLanguage();



  // Translation entries must be renderable text. If a malformed entry is a

  // RegExp/object, return an empty string instead of crashing the whole page.

  const t = (key) => {

    try {

      const value = rawTranslate?.(key);

      return typeof value === "string" || typeof value === "number"

        ? value

        : "";

    } catch (error) {

      console.error("Store Panel translation error for key:", key, error);

      return "";

    }

  };







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







      {/**\\\*** STORE INFO \*/}







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



              {safeDisplay(store?.storeName, "MaxiGo Partner")}



            </h3>







            <p>



              {safeDisplay(store?.city)}



              {safeDisplay(store?.verificationStatus) ? ` · ${safeDisplay(store?.verificationStatus)}` : ""}



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







      {/**\\\*** STATS \*/}







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



              {safeDisplay(dashboard?.placedOrders, placed)}



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



              {safeDisplay(dashboard?.preparingOrders, preparing)}



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



              {safeDisplay(dashboard?.readyOrders, ready)}



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



              {safeDisplay(dashboard?.deliveredOrders, delivered)}



            </strong>







            <small>



              Delivered orders



            </small>







          </div>







        </div>







      </div>







      {/**\\\*** NEW ORDERS \*/}







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



                  <div className="dashboard-order-row dashboard-order-row-with-products" key={order.id}>

                    <div className="dashboard-order-main">

                      <div className="dashboard-order-heading">

                        <strong>#{order.orderNumber || order.id}</strong>

                        <span>{order.customerName || "Customer"}</span>

                      </div>



                      <div className="dashboard-order-products">

                        {(Array.isArray(order.items) ? order.items : []).length > 0 ? (

                          order.items.map((item, index) => {

                            const image = getProductImage(item, products);

                            const name = getItemName(item);

                            const quantity = Number(item?.quantity ?? item?.qty ?? 1);



                            return (

                              <div

                                className="dashboard-order-product"

                                key={item?.id || item?.productId || `${order.id}-${index}`}

                              >

                                {image ? (

                                  <img

                                    className="dashboard-order-product-image"

                                    src={image}

                                    alt={name}

                                    loading="lazy"

                                    onError={(event) => {

                                      event.currentTarget.style.display = "none";

                                      event.currentTarget.nextElementSibling?.classList.remove("is-hidden");

                                    }}

                                  />

                                ) : null}

                                <div className={`dashboard-order-product-placeholder ${image ? "is-hidden" : ""}`}>

                                  🛍️

                                </div>

                                <div className="dashboard-order-product-details">

                                  <span className="dashboard-order-product-name">{name}</span>

                                  <small>Qty: {quantity}</small>

                                </div>

                              </div>

                            );

                          })

                        ) : (

                          <span className="dashboard-order-no-items">Product details unavailable</span>

                        )}

                      </div>

                    </div>



                    <div className="dashboard-order-total">

                      <strong>₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}</strong>

                    </div>



                    <div className="dashboard-order-actions">

                      <button

                        type="button"

                        className="small-reject-btn"

                        onClick={() => updateOrderStatus(order.id, "REJECT")}

                      >

                        Reject

                      </button>

                      <button

                        type="button"

                        className="small-accept-btn"

                        onClick={() => updateOrderStatus(order.id, "ACCEPT")}

                      >

                        Accept

                      </button>

                    </div>

                  </div>



                )



              )



          )}







        </div>







        {/**\\\*** STORE SUMMARY \*/}







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



                        {safeDisplay(product.name, "Product")}



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







      {/**\\\*** ORDER STATUS \*/}







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