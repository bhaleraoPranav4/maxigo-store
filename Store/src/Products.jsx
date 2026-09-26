import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./Products.css";

import {
  getCategories,
  uploadProductImage,
} from "./api";

import {
  useLanguage,
} from "./LanguageContext";

function Products({
  products = [],
  addProduct,
  updateProduct,
  deleteProduct,
  toggleProduct,
  updateStock,
  businessType,
  currentBusiness,
}) {
  const { t } =
    useLanguage();

  // =====================================================
  // FILTER STATE
  // =====================================================

  const [search, setSearch] =
    useState("");

  const [
    availability,
    setAvailability,
  ] = useState("All");

  const [
    categoryId,
    setCategoryId,
  ] = useState("All");

  // =====================================================
  // CATEGORY
  // =====================================================

  const [
    categories,
    setCategories,
  ] = useState([]);

  // =====================================================
  // PRODUCT DETAIL
  // =====================================================

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);

  // =====================================================
  // MODAL
  // =====================================================

  const [
    showModal,
    setShowModal,
  ] = useState(false);

  const [
    editingProduct,
    setEditingProduct,
  ] = useState(null);

  // =====================================================
  // SAVING
  // =====================================================

  const [saving, setSaving] =
    useState(false);

  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  const [
    uploadingImage,
    setUploadingImage,
  ] = useState(false);

  const [
    imagePreview,
    setImagePreview,
  ] = useState("");

  // =====================================================
  // STOCK
  // =====================================================

  const [
    stockDraft,
    setStockDraft,
  ] = useState("");

  // =====================================================
  // FORM
  // =====================================================

  const [form, setForm] =
    useState({
      name: "",
      categoryId: "",
      subCategoryId: "",
      description: "",
      price: "",
      discountPrice: "",

      unit:
        businessType ===
        "RESTAURANT"
          ? "Plate"
          : "Piece",

      brand: "",

      productImage: "",
      imageUrl: "",

      stock: "0",

      isActive: true,
      status: "ACTIVE",
    });

  // =====================================================
  // LOAD CATEGORIES
  // =====================================================

  useEffect(() => {
    let mounted =
      true;

    getCategories()
      .then((data) => {

        if (!mounted) {
          return;
        }

        setCategories(
          Array.isArray(data)
            ? data
            : []
        );
      })
      .catch((error) => {

        console.error(
          "Category load failed:",
          error
        );

        if (mounted) {
          setCategories([]);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // CATEGORY MAP
  // =====================================================

  const categoryMap =
    useMemo(() => {

      return new Map(
        categories.map(
          (item) => [
            String(item.id),
            item.name,
          ]
        )
      );

    }, [categories]);

  // =====================================================
  // EFFECTIVE STATUS
  // =====================================================

  const getEffectiveStatus =
    (product) => {

      if (product?.status) {

        return String(
          product.status
        ).toUpperCase();
      }

      return product?.isActive
        ? "ACTIVE"
        : "INACTIVE";
    };

  // =====================================================
  // SUMMARY
  // =====================================================

  const summary =
    useMemo(() => {

      const all =
        products.length;

      const inStock =
        products.filter(
          (product) => {

            const stock =
              Number(
                product?.stock || 0
              );

            return (
              stock > 0 &&
              getEffectiveStatus(
                product
              ) ===
                "ACTIVE"
            );
          }
        ).length;

      const lowStock =
        products.filter(
          (product) => {

            const stock =
              Number(
                product?.stock || 0
              );

            return (
              stock > 0 &&
              stock <= 5
            );
          }
        ).length;

      const outOfStock =
        products.filter(
          (product) =>
            Number(
              product?.stock || 0
            ) <= 0
        ).length;

      const uniqueCategories =
        new Set(
          products
            .map(
              (product) =>
                product?.categoryId
            )
            .filter(Boolean)
        );

      return {
        all,
        inStock,
        lowStock,
        outOfStock,
        categories:
          uniqueCategories.size,
      };

    }, [products]);

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts =
    useMemo(() => {

      const query =
        search
          .trim()
          .toLowerCase();

      return products.filter(
        (product) => {

          const status =
            getEffectiveStatus(
              product
            );

          const stock =
            Number(
              product?.stock || 0
            );

          const stockStatus =
            stock <= 0
              ? "Out of Stock"
              : stock <= 5
              ? "Low Stock"
              : "In Stock";

          const categoryName =
            categoryMap.get(
              String(
                product?.categoryId
              )
            ) || "";

          const matchesSearch =
            !query ||
            String(
              product?.id ?? ""
            )
              .toLowerCase()
              .includes(query) ||
            String(
              product?.name || ""
            )
              .toLowerCase()
              .includes(query) ||
            String(
              product?.brand || ""
            )
              .toLowerCase()
              .includes(query) ||
            categoryName
              .toLowerCase()
              .includes(query);

          const matchesAvailability =
            availability ===
              "All" ||
            stockStatus ===
              availability;

          const matchesCategory =
            categoryId ===
              "All" ||
            String(
              product?.categoryId
            ) ===
              String(
                categoryId
              );

          return (
            matchesSearch &&
            matchesAvailability &&
            matchesCategory &&
            status !==
              "DELETED"
          );
        }
      );

    }, [
      products,
      search,
      availability,
      categoryId,
      categoryMap,
    ]);

  // =====================================================
  // RESET IMAGE
  // =====================================================

  const resetImageState =
    () => {

      setImagePreview(
        ""
      );

      setUploadingImage(
        false
      );
    };

  // =====================================================
  // ADD MODAL
  // =====================================================

  const openAddModal =
    () => {

      setEditingProduct(
        null
      );

      setSelectedProduct(
        null
      );

      setForm({
        name: "",

        categoryId:
          categories[0]?.id
            ? String(
                categories[0].id
              )
            : "",

        subCategoryId: "",

        description: "",

        price: "",

        discountPrice: "",

        unit:
          businessType ===
          "RESTAURANT"
            ? "Plate"
            : "Piece",

        brand: "",

        productImage: "",

        imageUrl: "",

        stock: "0",

        isActive: true,

        status:
          "ACTIVE",
      });

      resetImageState();

      setShowModal(
        true
      );
    };

  // =====================================================
  // EDIT MODAL
  // =====================================================

  const openEditModal =
    (product) => {

      setEditingProduct(
        product
      );

      setForm({
        name:
          product?.name ||
          "",

        categoryId:
          product?.categoryId !=
          null
            ? String(
                product.categoryId
              )
            : "",

        subCategoryId:
          product?.subCategoryId !=
          null
            ? String(
                product.subCategoryId
              )
            : "",

        description:
          product?.description ||
          "",

        price:
          product?.price ??
          "",

        discountPrice:
          product?.discountPrice ??
          "",

        unit:
          product?.unit ||
          "Piece",

        brand:
          product?.brand ||
          "",

        productImage:
          product?.productImage ||
          "",

        imageUrl:
          product?.imageUrl ||
          "",

        stock:
          product?.stock ??
          0,

        isActive:
          product?.isActive !==
          false,

        status:
          getEffectiveStatus(
            product
          ),
      });

      setImagePreview(
        product?.productImage ||
          product?.imageUrl ||
          ""
      );

      setUploadingImage(
        false
      );

      setShowModal(
        true
      );

      setSelectedProduct(
        null
      );
    };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal =
    () => {

      setShowModal(
        false
      );

      setEditingProduct(
        null
      );

      resetImageState();
    };

  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  const handleProductImageChange =
    async (event) => {

      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      // -------------------------------------------------
      // FILE TYPE
      // -------------------------------------------------

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];

      if (
        !allowedTypes.includes(
          file.type
        )
      ) {

        alert(
          "Only JPG, PNG, WEBP and GIF images are allowed."
        );

        event.target.value =
          "";

        return;
      }

      // -------------------------------------------------
      // FILE SIZE
      // -------------------------------------------------

      if (
        file.size >
        5 * 1024 * 1024
      ) {

        alert(
          "Image size must be 5 MB or less."
        );

        event.target.value =
          "";

        return;
      }

      // -------------------------------------------------
      // LOCAL PREVIEW
      // -------------------------------------------------

      const localPreview =
        URL.createObjectURL(
          file
        );

      setImagePreview(
        localPreview
      );

      setUploadingImage(
        true
      );

      try {

        // -----------------------------------------------
        // UPLOAD
        // -----------------------------------------------

        const response =
          await uploadProductImage(
            file
          );

        const uploadedUrl =
          response?.url;

        if (!uploadedUrl) {

          throw new Error(
            "Image URL was not returned by server."
          );
        }

        // -----------------------------------------------
        // SAVE URL IN FORM
        // -----------------------------------------------

        setForm(
          (prev) => ({
            ...prev,

            productImage:
              uploadedUrl,

            imageUrl:
              uploadedUrl,
          })
        );

        // -----------------------------------------------
        // SERVER PREVIEW
        // -----------------------------------------------

        setImagePreview(
          uploadedUrl
        );

        URL.revokeObjectURL(
          localPreview
        );

      } catch (error) {

        console.error(
          "PRODUCT IMAGE UPLOAD ERROR:",
          error
        );

        URL.revokeObjectURL(
          localPreview
        );

        // ---------------------------------------------
        // RESTORE OLD IMAGE
        // ---------------------------------------------

        const oldImage =
          editingProduct?.productImage ||
          editingProduct?.imageUrl ||
          "";

        setImagePreview(
          oldImage
        );

        setForm(
          (prev) => ({
            ...prev,

            productImage:
              editingProduct?.productImage ||
              "",

            imageUrl:
              editingProduct?.imageUrl ||
              "",
          })
        );

        alert(
          error?.message ||
            "Unable to upload product image."
        );

      } finally {

        setUploadingImage(
          false
        );

        event.target.value =
          "";
      }
    };

  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const removeImage =
    () => {

      setImagePreview(
        ""
      );

      setForm(
        (prev) => ({
          ...prev,

          productImage:
            "",

          imageUrl:
            "",
        })
      );
    };

  // =====================================================
  // SAVE PRODUCT
  // =====================================================

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      // -------------------------------------------------
      // NAME
      // -------------------------------------------------

      if (
        !form.name.trim()
      ) {

        alert(
          "Product name is required."
        );

        return;
      }

      // -------------------------------------------------
      // CATEGORY
      // -------------------------------------------------

      if (
        !form.categoryId
      ) {

        alert(
          "Please select a category."
        );

        return;
      }

      // -------------------------------------------------
      // PRICE
      // -------------------------------------------------

      if (
        form.price ===
          "" ||
        Number(
          form.price
        ) < 0
      ) {

        alert(
          "Valid product price is required."
        );

        return;
      }

      // -------------------------------------------------
      // DISCOUNT
      // -------------------------------------------------

      if (
        form.discountPrice !==
          "" &&
        Number(
          form.discountPrice
        ) >
          Number(
            form.price
          )
      ) {

        alert(
          "Discount price cannot be greater than the product price."
        );

        return;
      }

      // -------------------------------------------------
      // IMAGE UPLOAD WAIT
      // -------------------------------------------------

      if (
        uploadingImage
      ) {

        alert(
          "Please wait until image upload is completed."
        );

        return;
      }

      setSaving(
        true
      );

      try {

        const payload = {

          categoryId:
            Number(
              form.categoryId
            ),

          subCategoryId:
            form.subCategoryId
              ? Number(
                  form.subCategoryId
                )
              : null,

          name:
            form.name.trim(),

          description:
            form.description.trim() ||
            null,

          price:
            Number(
              form.price
            ),

          discountPrice:
            form.discountPrice ===
            ""
              ? null
              : Number(
                  form.discountPrice
                ),

          unit:
            form.unit.trim() ||
            null,

          brand:
            form.brand.trim() ||
            null,

          productImage:
            form.productImage.trim() ||
            null,

          imageUrl:
            form.imageUrl.trim() ||
            null,

          stock: Math.max(
            0,
            Number(
              form.stock || 0
            )
          ),

          isActive:
            Boolean(
              form.isActive
            ),

          status:
            form.isActive
              ? "ACTIVE"
              : "INACTIVE",
        };

        if (
          editingProduct
        ) {

          await updateProduct(
            editingProduct.id,
            payload
          );

        } else {

          await addProduct(
            payload
          );
        }

        closeModal();

      } catch (error) {

        console.error(
          "SAVE PRODUCT ERROR:",
          error
        );

        alert(
          error?.message ||
            "Unable to save product."
        );

      } finally {

        setSaving(
          false
        );
      }
    };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete =
    async (product) => {

      if (!product) {
        return;
      }

      const confirmed =
        window.confirm(
          `Delete ${product.name}?`
        );

      if (!confirmed) {
        return;
      }

      try {

        await deleteProduct(
          product.id
        );

        if (
          selectedProduct?.id ===
          product.id
        ) {

          setSelectedProduct(
            null
          );
        }

        if (
          editingProduct?.id ===
          product.id
        ) {

          closeModal();
        }

      } catch (error) {

        console.error(
          "DELETE PRODUCT ERROR:",
          error
        );

        alert(
          error?.message ||
            "Unable to delete product."
        );
      }
    };

  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const handleToggle =
    async (product) => {

      if (!product) {
        return;
      }

      try {

        await toggleProduct(
          product
        );

        setSelectedProduct(
          (prev) => {

            if (
              !prev ||
              prev.id !==
                product.id
            ) {
              return prev;
            }

            const currentStatus =
              getEffectiveStatus(
                product
              );

            const nextStatus =
              currentStatus ===
              "ACTIVE"
                ? "INACTIVE"
                : "ACTIVE";

            return {
              ...prev,

              status:
                nextStatus,

              isActive:
                nextStatus ===
                "ACTIVE",
            };
          }
        );

      } catch (error) {

        console.error(
          "TOGGLE PRODUCT ERROR:",
          error
        );

        alert(
          error?.message ||
            "Unable to update product status."
        );
      }
    };

  // =====================================================
  // SAVE STOCK
  // =====================================================

  const saveStock =
    async (product) => {

      const value =
        Number(
          stockDraft
        );

      if (
        !Number.isInteger(
          value
        ) ||
        value < 0
      ) {

        alert(
          "Stock must be a non-negative whole number."
        );

        return;
      }

      try {

        await updateStock(
          product.id,
          value
        );

        setSelectedProduct(
          (prev) =>
            prev
              ? {
                  ...prev,

                  stock:
                    value,
                }
              : prev
        );

        setStockDraft(
          ""
        );

      } catch (error) {

        console.error(
          "UPDATE STOCK ERROR:",
          error
        );

        alert(
          error?.message ||
            "Unable to update stock."
        );
      }
    };

  // =====================================================
  // PRODUCT IMAGE
  // =====================================================

  const getProductImage =
    (product) => {

      return (
        product?.productImage ||
        product?.imageUrl ||
        ""
      );
    };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      className="admin-products-page"
    >

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="products-title-row">

        <div>

          <span className="products-breadcrumb">
            Store / Products
          </span>

          <h1>
            {t(
              "productsList"
            ) ||
              "Products"}
          </h1>

          <p>
            Manage your own
            products, pricing,
            stock and
            availability.
          </p>

        </div>

        <div className="products-title-actions">

          <button
            type="button"
            className="products-primary-btn"
            onClick={
              openAddModal
            }
          >
            +{" "}
            {t(
              "addProduct"
            ) ||
              "Add Product"}
          </button>

        </div>

      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="products-summary-grid">

        {/* ALL */}

        <button
          type="button"
          className={`products-summary-card ${
            availability ===
            "All"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            setAvailability(
              "All"
            )
          }
        >

          <span className="product-summary-icon purple">
            🛍️
          </span>

          <div>

            <small>
              Total Products
            </small>

            <strong>
              {summary.all}
            </strong>

          </div>

        </button>

        {/* IN STOCK */}

        <button
          type="button"
          className={`products-summary-card ${
            availability ===
            "In Stock"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            setAvailability(
              "In Stock"
            )
          }
        >

          <span className="product-summary-icon green">
            ✓
          </span>

          <div>

            <small>
              In Stock
            </small>

            <strong>
              {summary.inStock}
            </strong>

          </div>

        </button>

        {/* LOW STOCK */}

        <button
          type="button"
          className={`products-summary-card ${
            availability ===
            "Low Stock"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            setAvailability(
              "Low Stock"
            )
          }
        >

          <span className="product-summary-icon orange">
            !
          </span>

          <div>

            <small>
              Low Stock
            </small>

            <strong>
              {summary.lowStock}
            </strong>

          </div>

        </button>

        {/* OUT OF STOCK */}

        <button
          type="button"
          className={`products-summary-card ${
            availability ===
            "Out of Stock"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            setAvailability(
              "Out of Stock"
            )
          }
        >

          <span className="product-summary-icon red">
            ×
          </span>

          <div>

            <small>
              Out of Stock
            </small>

            <strong>
              {summary.outOfStock}
            </strong>

          </div>

        </button>

        {/* CATEGORIES */}

        <div className="products-summary-card static-card">

          <span className="product-summary-icon blue">
            ▦
          </span>

          <div>

            <small>
              Categories
            </small>

            <strong>
              {summary.categories}
            </strong>

          </div>

        </div>

      </div>

      {/* =================================================
          FILTER
      ================================================= */}

      <div className="products-filter-card">

        <div className="products-search-box">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search product, brand or ID..."
            value={
              search
            }
            onChange={(event) =>
              setSearch(
                event.target
                  .value
              )
            }
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                setSearch(
                  ""
                )
              }
            >
              ✕
            </button>
          )}

        </div>

        <select
          className="products-select"
          value={
            availability
          }
          onChange={(event) =>
            setAvailability(
              event.target
                .value
            )
          }
        >

          <option value="All">
            All
          </option>

          <option value="In Stock">
            In Stock
          </option>

          <option value="Low Stock">
            Low Stock
          </option>

          <option value="Out of Stock">
            Out of Stock
          </option>

        </select>

        <select
          className="products-select"
          value={
            categoryId
          }
          onChange={(event) =>
            setCategoryId(
              event.target
                .value
            )
          }
        >

          <option value="All">
            All Categories
          </option>

          {categories.map(
            (category) => (

              <option
                key={
                  category.id
                }
                value={
                  category.id
                }
              >
                {
                  category.name
                }
              </option>

            )
          )}

        </select>

      </div>

      {/* =================================================
          PRODUCT TABLE
      ================================================= */}

      <div className="products-table-card">

        <div className="products-card-head">

          <div>

            <h2>
              {
                currentBusiness?.[1] ||
                "My Products"
              }
            </h2>

            <p>
              Showing{" "}
              {
                filteredProducts.length
              }{" "}
              of{" "}
              {products.length}{" "}
              products
            </p>

          </div>

          <span className="products-result-pill">
            {
              filteredProducts.length
            }{" "}
            Results
          </span>

        </div>

        <div className="products-table-wrap">

          <table className="products-table">

            <thead>

              <tr>

                <th>
                  Product
                </th>

                <th>
                  Category
                </th>

                <th>
                  Price
                </th>

                <th>
                  Stock
                </th>

                <th>
                  Unit
                </th>

                <th>
                  Availability
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.map(
                (product) => {

                  const stock =
                    Number(
                      product?.stock ||
                        0
                    );

                  const stockStatus =
                    stock <= 0
                      ? "Out of Stock"
                      : stock <= 5
                      ? "Low Stock"
                      : "In Stock";

                  const image =
                    getProductImage(
                      product
                    );

                  const status =
                    getEffectiveStatus(
                      product
                    );

                  return (
                    <tr
                      key={
                        product.id
                      }
                    >

                      {/* PRODUCT */}

                      <td>

                        <div className="product-profile-cell">

                          <span className="product-avatar">

                            {image ? (

                              <img
                                src={image}
                                alt={
                                  product.name
                                }
                                style={{
                                  width:
                                    "100%",
                                  height:
                                    "100%",
                                  objectFit:
                                    "cover",
                                  borderRadius:
                                    "inherit",
                                }}
                                onError={(
                                  event
                                ) => {
                                  event.currentTarget.style.display =
                                    "none";
                                }}
                              />

                            ) : (
                              "🛍️"
                            )}

                          </span>

                          <div>

                            <button
                              type="button"
                              className="product-name-btn"
                              onClick={() => {

                                setSelectedProduct(
                                  product
                                );

                                setStockDraft(
                                  String(
                                    stock
                                  )
                                );
                              }}
                            >
                              {
                                product.name
                              }
                            </button>

                            <small>
                              #
                              {
                                product.id
                              }
                            </small>

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td>
                        {
                          categoryMap.get(
                            String(
                              product.categoryId
                            )
                          ) ||
                            `Category ${product.categoryId}`
                        }
                      </td>

                      {/* PRICE */}

                      <td>

                        <strong>
                          ₹
                          {Number(
                            product.discountPrice ??
                              product.price ??
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </td>

                      {/* STOCK */}

                      <td>

                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap:
                              6,
                          }}
                        >

                          <span
                            className={`stock-number ${stockStatus
                              .toLowerCase()
                              .replaceAll(
                                " ",
                                "-"
                              )}`}
                          >
                            {stock}
                          </span>

                          <button
                            type="button"
                            className="product-view-btn"
                            onClick={() => {

                              setSelectedProduct(
                                product
                              );

                              setStockDraft(
                                String(
                                  stock
                                )
                              );

                            }}
                          >
                            Edit
                          </button>

                        </div>

                      </td>

                      {/* UNIT */}

                      <td>
                        {
                          product.unit ||
                          "-"
                        }
                      </td>

                      {/* STATUS */}

                      <td>

                        <button
                          type="button"
                          className={`product-status ${
                            status ===
                            "ACTIVE"
                              ? "in-stock"
                              : "out-of-stock"
                          }`}
                          onClick={() =>
                            handleToggle(
                              product
                            )
                          }
                        >
                          {
                            status ===
                            "ACTIVE"
                              ? "Active"
                              : "Inactive"
                          }
                        </button>

                      </td>

                      {/* ACTION */}

                      <td>

                        <button
                          type="button"
                          className="product-view-btn"
                          onClick={() => {

                            setSelectedProduct(
                              product
                            );

                            setStockDraft(
                              String(
                                stock
                              )
                            );

                          }}
                        >
                          View
                        </button>

                      </td>

                    </tr>
                  );
                }
              )}

              {filteredProducts.length ===
                0 && (

                <tr>

                  <td
                    colSpan="7"
                  >

                    <div className="products-empty">

                      <div>
                        🔍
                      </div>

                      <h3>
                        No products found
                      </h3>

                      <p>
                        Try another
                        search or
                        filter.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showModal && (

        <div
          className="product-modal-backdrop"
          onClick={
            closeModal
          }
        >

          <div
            className="product-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="product-modal-head">

              <div className="product-modal-user">

                <span className="product-modal-avatar">
                  🛍️
                </span>

                <div>

                  <span>
                    {editingProduct
                      ? "Edit Product"
                      : "Add Product"}
                  </span>

                  <h2>
                    {
                      editingProduct?.name ||
                      "New Product"
                    }
                  </h2>

                </div>

              </div>

              <button
                type="button"
                onClick={
                  closeModal
                }
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={
                handleSubmit
              }
            >

              <div className="product-detail-grid">

                {/* NAME */}

                <div>

                  <small>
                    Name
                  </small>

                  <input
                    value={
                      form.name
                    }
                    onChange={(event) =>
                      setForm(
                        (prev) => ({
                          ...prev,

                          name:
                            event.target
                              .value,
                        })
                      )
                    }
                    placeholder="Product name"
                  />

                </div>

                {/* CATEGORY */}

                <div>

                  <small>
                    Category
                  </small>

                  <select
                    value={
                      form.categoryId
                    }
                    onChange={(event) =>
                      setForm(
                        (prev) => ({
                          ...prev,

                          categoryId:
                            event.target
                              .value,
                        })
                      )
                    }
                  >

                    <option value="">
                      Select Category
                    </option>

                    {categories.map(
                      (category) => (

                        <option
                          key={
                            category.id
                          }
                          value={
                            category.id
                          }
                        >
                          {
                            category.name
                          }
                        </option>

                      )
                    )}

                  </select>

                </div>

                {/* PRICE */}

                <div>

                  <small>
                    Price
                  </small>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={
                      form.price
                    }
                    onChange={(event) =>
                      setForm(
                        (prev) => ({
                          ...prev,

                          price:
                            event.target
                              .value,
                        })
                      )
                    }
                    placeholder="0"
                  />

                </div>

                {/* DISCOUNT */}

                <div>

                  <small>
                    Discount Price
                  </small>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={
                      form.discountPrice
                    }
                    onChange={(event) =>
                      setForm(
                        (prev) => ({
                          ...prev,

                          discountPrice:
                            event.target
                              .value,
                        })
                      )
                    }
                    placeholder="Optional"
                  />

                </div>

                {/* STOCK */}

                <div>

                  <small>
                    Stock
                  </small>

                  <input
                    type="number"
                    min="0"
                    value={
                      form.stock
                    }
                    onChange={(event) =>
                      setForm(
                        (prev) => ({
                          ...prev,

                          stock:
                            event.target
                              .value,
                        })
                      )
                    }
                  />

                </div>

                {/* UNIT */}

                <div>

                  <small>
                    Unit
                  </small>

                  <input
                    value={
                      form.unit
                    }
                    onChange={(event) =>
                      setForm(
                        (prev) => ({
                          ...prev,

                          unit:
                            event.target
                              .value,
                        })
                      )
                    }
                    placeholder="Piece / Kg / Plate"
                  />

                </div>

                {/* BRAND */}

                <div>

                  <small>
                    Brand
                  </small>

                  <input
                    value={
                      form.brand
                    }
                    onChange={(event) =>
                      setForm(
                        (prev) => ({
                          ...prev,

                          brand:
                            event.target
                              .value,
                        })
                      )
                    }
                    placeholder="Optional"
                  />

                </div>

                {/* =================================================
                    PRODUCT IMAGE
                ================================================= */}

                <div
                  style={{
                    gridColumn:
                      "1 / -1",
                  }}
                >

                  <small>
                    Product Image
                  </small>

                  <div
                    style={{
                      marginTop:
                        "8px",

                      padding:
                        "16px",

                      border:
                        "1px solid #e8e3f4",

                      borderRadius:
                        "14px",

                      background:
                        "#fbfaff",
                    }}
                  >

                    {/* IMAGE PREVIEW */}

                    <div
                      style={{
                        width:
                          "150px",

                        height:
                          "150px",

                        margin:
                          "0 auto 14px",

                        borderRadius:
                          "14px",

                        overflow:
                          "hidden",

                        display:
                          "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        background:
                          "#eee8ff",

                        border:
                          "1px solid #ddd5f5",
                      }}
                    >

                      {imagePreview ? (

                        <img
                          src={
                            imagePreview
                          }
                          alt="Product Preview"
                          style={{
                            width:
                              "100%",

                            height:
                              "100%",

                            objectFit:
                              "cover",
                          }}
                        />

                      ) : (

                        <span
                          style={{
                            fontSize:
                              "42px",
                          }}
                        >
                          🛍️
                        </span>

                      )}

                    </div>

                    {/* BUTTONS */}

                    <div
                      style={{
                        display:
                          "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        gap:
                          "10px",

                        flexWrap:
                          "wrap",
                      }}
                    >

                      <label
                        htmlFor="product-image-input"
                        style={{
                          minHeight:
                            "42px",

                          padding:
                            "0 16px",

                          borderRadius:
                            "10px",

                          background:
                            "#6738ee",

                          color:
                            "#ffffff",

                          display:
                            "inline-flex",

                          alignItems:
                            "center",

                          justifyContent:
                            "center",

                          cursor:
                            uploadingImage
                              ? "not-allowed"
                              : "pointer",

                          fontSize:
                            "11px",

                          fontWeight:
                            800,

                          opacity:
                            uploadingImage
                              ? 0.65
                              : 1,
                        }}
                      >

                        {uploadingImage
                          ? "Uploading..."
                          : "📷 Choose Image"}

                        <input
                          id="product-image-input"
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          onChange={
                            handleProductImageChange
                          }
                          disabled={
                            uploadingImage
                          }
                          style={{
                            display:
                              "none",
                          }}
                        />

                      </label>

                      {imagePreview &&
                        !uploadingImage && (

                          <button
                            type="button"
                            onClick={
                              removeImage
                            }
                            style={{
                              minHeight:
                                "42px",

                              padding:
                                "0 15px",

                              border:
                                "1px solid #f0cad3",

                              borderRadius:
                                "10px",

                              background:
                                "#fff5f7",

                              color:
                                "#c33d62",

                              cursor:
                                "pointer",

                              fontSize:
                                "11px",

                              fontWeight:
                                800,
                            }}
                          >
                            Remove
                          </button>

                        )}

                    </div>

                    <p
                      style={{
                        margin:
                          "10px 0 0",

                        textAlign:
                          "center",

                        color:
                          "#8d8798",

                        fontSize:
                          "10px",
                      }}
                    >
                      JPG, PNG, WEBP or GIF
                      • Max 5 MB
                    </p>

                  </div>

                </div>

                {/* DESCRIPTION */}

                <div
                  style={{
                    gridColumn:
                      "1 / -1",
                  }}
                >

                  <small>
                    Description
                  </small>

                  <textarea
                    rows="3"
                    value={
                      form.description
                    }
                    onChange={(event) =>
                      setForm(
                        (prev) => ({
                          ...prev,

                          description:
                            event.target
                              .value,
                        })
                      )
                    }
                    placeholder="Product description"
                  />

                </div>

              </div>

              {/* MODAL ACTIONS */}

              <div className="product-modal-actions">

                {editingProduct && (

                  <button
                    type="button"
                    className="products-secondary-btn"
                    onClick={() =>
                      handleDelete(
                        editingProduct
                      )
                    }
                  >
                    Delete
                  </button>

                )}

                <button
                  type="button"
                  className="products-secondary-btn"
                  onClick={
                    closeModal
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="products-primary-btn"
                  disabled={
                    saving ||
                    uploadingImage
                  }
                >
                  {uploadingImage
                    ? "Uploading Image..."
                    : saving
                    ? "Saving..."
                    : editingProduct
                    ? "Update Product"
                    : "Save Product"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =================================================
          PRODUCT DETAIL MODAL
      ================================================= */}

      {selectedProduct &&
        !showModal && (

        <div
          className="product-modal-backdrop"
          onClick={() =>
            setSelectedProduct(
              null
            )
          }
        >

          <div
            className="product-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="product-modal-head">

              <div className="product-modal-user">

                <div
                  style={{
                    width:
                      "54px",

                    height:
                      "54px",

                    borderRadius:
                      "15px",

                    overflow:
                      "hidden",

                    display:
                      "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    background:
                      "#eee8ff",

                    flexShrink:
                      0,
                  }}
                >

                  {getProductImage(
                    selectedProduct
                  ) ? (

                    <img
                      src={
                        getProductImage(
                          selectedProduct
                        )
                      }
                      alt={
                        selectedProduct.name
                      }
                      style={{
                        width:
                          "100%",

                        height:
                          "100%",

                        objectFit:
                          "cover",
                      }}
                    />

                  ) : (
                    "🛍️"
                  )}

                </div>

                <div>

                  <span>
                    Product Details
                  </span>

                  <h2>
                    {
                      selectedProduct.name
                    }
                  </h2>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedProduct(
                    null
                  )
                }
              >
                ✕
              </button>

            </div>

            {/* PRODUCT LARGE IMAGE */}

            {getProductImage(
              selectedProduct
            ) && (

              <div
                style={{
                  width:
                    "100%",

                  height:
                    "220px",

                  marginBottom:
                    "16px",

                  overflow:
                    "hidden",

                  borderRadius:
                    "16px",

                  background:
                    "#f4f0fb",
                }}
              >

                <img
                  src={
                    getProductImage(
                      selectedProduct
                    )
                  }
                  alt={
                    selectedProduct.name
                  }
                  style={{
                    width:
                      "100%",

                    height:
                      "100%",

                    objectFit:
                      "contain",
                  }}
                />

              </div>

            )}

            <div className="product-detail-grid">

              <div>

                <small>
                  Category
                </small>

                <strong>
                  {
                    categoryMap.get(
                      String(
                        selectedProduct.categoryId
                      )
                    ) ||
                      selectedProduct.categoryId
                  }
                </strong>

              </div>

              <div>

                <small>
                  Price
                </small>

                <strong>
                  ₹
                  {Number(
                    selectedProduct.price ||
                      0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div>

                <small>
                  Discount Price
                </small>

                <strong>
                  {
                    selectedProduct.discountPrice !=
                    null
                      ? `₹${Number(
                          selectedProduct.discountPrice
                        ).toLocaleString(
                          "en-IN"
                        )}`
                      : "-"
                  }
                </strong>

              </div>

              <div>

                <small>
                  Stock
                </small>

                <strong>
                  {
                    selectedProduct.stock ??
                    0
                  }
                </strong>

              </div>

              <div>

                <small>
                  Unit
                </small>

                <strong>
                  {
                    selectedProduct.unit ||
                    "-"
                  }
                </strong>

              </div>

              <div>

                <small>
                  Status
                </small>

                <strong>
                  {
                    getEffectiveStatus(
                      selectedProduct
                    )
                  }
                </strong>

              </div>

            </div>

            {/* DESCRIPTION */}

            {selectedProduct.description && (

              <div
                style={{
                  marginTop:
                    "15px",

                  padding:
                    "14px",

                  borderRadius:
                    "12px",

                  background:
                    "#fbfaff",

                  border:
                    "1px solid #eeeaf5",
                }}
              >

                <small
                  style={{
                    color:
                      "#8d8798",
                  }}
                >
                  Description
                </small>

                <p
                  style={{
                    margin:
                      "6px 0 0",

                    color:
                      "#4e4859",

                    fontSize:
                      "11px",

                    lineHeight:
                      "1.55",
                  }}
                >
                  {
                    selectedProduct.description
                  }
                </p>

              </div>

            )}

            {/* ACTIONS */}

            <div className="product-modal-actions">

              <input
                type="number"
                min="0"
                placeholder="New stock"
                value={
                  stockDraft
                }
                onChange={(event) =>
                  setStockDraft(
                    event.target
                      .value
                  )
                }
              />

              <button
                type="button"
                className="products-secondary-btn"
                onClick={() =>
                  saveStock(
                    selectedProduct
                  )
                }
              >
                Update Stock
              </button>

              <button
                type="button"
                className="products-secondary-btn"
                onClick={() =>
                  openEditModal(
                    selectedProduct
                  )
                }
              >
                Edit
              </button>

              <button
                type="button"
                className="products-secondary-btn"
                onClick={() =>
                  setSelectedProduct(
                    null
                  )
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default Products;