import React, { useState } from "react";
import "./Register.css";
import { useLanguage } from "./LanguageContext";

import {
  registerStore,
  getMyStore,
} from "./api";

/* =========================================================
   BUSINESS TYPES
========================================================= */

const BUSINESS_TYPES = [
  ["RESTAURANT", "Restaurant / Hotel", "🍽️"],
  ["KIRANA", "Kirana Store", "🛒"],
  ["VEGETABLE", "Vegetables & Fruits", "🥦"],
  ["CHICKEN", "Chicken Shop", "🍗"],
  ["DAIRY", "Dairy", "🥛"],
  ["BAKERY", "Bakery", "🍰"],
  ["TAPRI", "Tea / Tapri", "☕"],
  ["GENERAL_STORE", "General Store", "🧴"],
  ["JUICE_CENTER", "Juice Center", "🥤"],
  ["SWEET_SHOP", "Sweet Shop", "🍬"],
];

/* =========================================================
   REGISTER
========================================================= */

function Register({
  onRegisterSuccess,
  onLogin,
}) {
  const { language } = useLanguage();

  /* =======================================================
     FORM STATE
  ======================================================= */

  const [form, setForm] = useState({
    ownerName: "",
    phone: "",
    email: "",

    businessName: "",
    businessType: "RESTAURANT",
    address: "",
    city: "",
    state: "",
    pincode: "",

    latitude: "",
    longitude: "",

    openingTime: "09:00",
    closingTime: "22:00",

    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* =======================================================
     TRANSLATION HELPER
  ======================================================= */

  const tr = (
    english,
    hindi,
    marathi
  ) => {
    if (language === "hi") {
      return hindi;
    }

    if (language === "mr") {
      return marathi;
    }

    return english;
  };

  /* =======================================================
     HANDLE CHANGE
  ======================================================= */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* =======================================================
     CURRENT LOCATION
  ======================================================= */

  const getLocation = () => {
    setError("");
    setSuccess("");

    if (!navigator.geolocation) {
      setError(
        tr(
          "Geolocation is not supported by your browser.",
          "आपके ब्राउज़र में लोकेशन सपोर्ट नहीं है।",
          "तुमच्या ब्राउझरमध्ये लोकेशन सपोर्ट नाही."
        )
      );

      return;
    }

    setSuccess(
      tr(
        "Getting your current location...",
        "आपकी वर्तमान लोकेशन प्राप्त की जा रही है...",
        "तुमचे वर्तमान लोकेशन मिळवत आहे..."
      )
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        setForm((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));

        setSuccess(
          tr(
            "Location captured successfully.",
            "लोकेशन सफलतापूर्वक सेव हो गई।",
            "लोकेशन यशस्वीपणे सेव झाले."
          )
        );
      },

      () => {
        setError(
          tr(
            "Unable to get your location. Please allow location permission or continue without it.",
            "लोकेशन प्राप्त नहीं हो सकी। कृपया लोकेशन परमिशन दें या बिना लोकेशन के आगे बढ़ें।",
            "लोकेशन मिळू शकले नाही. कृपया लोकेशन permission द्या किंवा location शिवाय पुढे जा."
          )
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    /* ---------------------------------------------
       BASIC VALIDATION
    --------------------------------------------- */

    if (
      !form.ownerName.trim() ||
      !form.phone.trim() ||
      !form.businessName.trim() ||
      !form.address.trim() ||
      !form.password
    ) {
      setError(
        tr(
          "Please fill all required fields.",
          "कृपया सभी आवश्यक जानकारी भरें।",
          "कृपया सर्व आवश्यक माहिती भरा."
        )
      );

      return;
    }

    /* ---------------------------------------------
       MOBILE
    --------------------------------------------- */

    if (!/^\d{10}$/.test(form.phone)) {
      setError(
        tr(
          "Please enter a valid 10-digit mobile number.",
          "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।",
          "कृपया योग्य 10 अंकी मोबाईल नंबर भरा."
        )
      );

      return;
    }

    /* ---------------------------------------------
       PASSWORD
    --------------------------------------------- */

    if (form.password.length < 6) {
      setError(
        tr(
          "Password must be at least 6 characters.",
          "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",
          "पासवर्ड किमान 6 characters चा असावा."
        )
      );

      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        tr(
          "Password and confirm password do not match.",
          "पासवर्ड और कन्फर्म पासवर्ड एक जैसे नहीं हैं।",
          "Password आणि Confirm Password match होत नाहीत."
        )
      );

      return;
    }

    /* ---------------------------------------------
       PINCODE
    --------------------------------------------- */

    if (
      form.pincode &&
      !/^\d{6}$/.test(form.pincode)
    ) {
      setError(
        tr(
          "Please enter a valid 6-digit pincode.",
          "कृपया सही 6 अंकों का पिनकोड दर्ज करें।",
          "कृपया योग्य 6 अंकी pincode भरा."
        )
      );

      return;
    }

    /* ---------------------------------------------
       OPENING/CLOSING TIME
    --------------------------------------------- */

    if (
      form.openingTime &&
      form.closingTime &&
      form.openingTime ===
        form.closingTime
    ) {
      setError(
        tr(
          "Opening and closing time cannot be the same.",
          "Opening और closing time समान नहीं हो सकते।",
          "Opening आणि closing time सारखे असू शकत नाहीत."
        )
      );

      return;
    }

    /* ---------------------------------------------
       LOADING
    --------------------------------------------- */

    setLoading(true);

    try {
      /* -------------------------------------------
         BACKEND REQUEST
         
         StoreRegistrationRequest मध्ये सध्या:
         name
         mobile
         email
         password
         storeCode
         storeName
         ownerName
         logoUrl
         address
         city
         state
         pincode
         latitude
         longitude
         category
         openingTime
         closingTime
      ------------------------------------------- */

      const payload = {
        /* USER DETAILS */

        name: form.ownerName.trim(),

        mobile: form.phone.trim(),

        email:
          form.email.trim() || null,

        password:
          form.password,

        /* STORE DETAILS */

        storeCode: null,

        storeName:
          form.businessName.trim(),

        ownerName:
          form.ownerName.trim(),

        logoUrl: null,

        address:
          form.address.trim(),

        city:
          form.city.trim() || null,

        state:
          form.state.trim() || null,

        pincode:
          form.pincode.trim() || null,

        latitude:
          form.latitude === ""
            ? null
            : Number(
                form.latitude
              ),

        longitude:
          form.longitude === ""
            ? null
            : Number(
                form.longitude
              ),

        category:
          form.businessType,

        openingTime:
          form.openingTime || null,

        closingTime:
          form.closingTime || null,
      };

      /* -------------------------------------------
         REGISTER STORE
      ------------------------------------------- */

      const authResponse =
        await registerStore(
          payload
        );

      /* -------------------------------------------
         TOKEN आहे का?
      ------------------------------------------- */

      if (!authResponse?.token) {
        throw new Error(
          "Store registration succeeded but JWT token was not received."
        );
      }

      /* -------------------------------------------
         GET LOGGED-IN STORE PROFILE
         
         /api/store/me
      ------------------------------------------- */

      const storeResponse =
        await getMyStore();

      /* -------------------------------------------
         SUCCESS MESSAGE
      ------------------------------------------- */

      setSuccess(
        tr(
          "Store registered successfully.",
          "स्टोर सफलतापूर्वक रजिस्टर हो गया।",
          "स्टोअर यशस्वीपणे register झाले."
        )
      );

      /* -------------------------------------------
         SEND DATA TO APP
      ------------------------------------------- */

      onRegisterSuccess({
        ...authResponse,

        role: "STORE",

        store:
          storeResponse,
      });

    } catch (err) {
      console.error(
        "STORE REGISTER ERROR:",
        err
      );

      setError(
        err?.message ||
          tr(
            "Registration failed. Please try again.",
            "रजिस्ट्रेशन विफल हुआ। कृपया फिर से प्रयास करें।",
            "Registration failed. कृपया पुन्हा प्रयत्न करा."
          )
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     SELECTED BUSINESS
  ======================================================= */

  const selectedBusiness =
    BUSINESS_TYPES.find(
      (item) =>
        item[0] ===
        form.businessType
    ) ||
    BUSINESS_TYPES[0];

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="register-page">

      {/* ===================================================
          TOP BAR
      =================================================== */}

      <div className="register-top">

        {/* BRAND */}

        <div className="register-brand">

          <div className="register-logo">
            ⚡
          </div>

          <div>

            <strong>
              MaxiGo
            </strong>

            <span>
              Partner Panel
            </span>

          </div>

        </div>

        {/* LOGIN */}

        <div className="register-login">

          <span>
            {tr(
              "Already have an account?",
              "क्या आपका अकाउंट पहले से है?",
              "आधीच account आहे?"
            )}
          </span>

          <button
            type="button"
            onClick={
              onLogin
            }
          >
            {tr(
              "Login",
              "लॉगिन",
              "Login"
            )}
          </button>

        </div>

      </div>

      {/* ===================================================
          MAIN CONTAINER
      =================================================== */}

      <div className="register-container">

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="register-heading">

          <span className="register-badge">
            🏪{" "}
            {tr(
              "Become a MaxiGo Partner",
              "MaxiGo पार्टनर बनें",
              "MaxiGo Partner बना"
            )}
          </span>

          <h1>
            {tr(
              "Register your",
              "अपना",
              "तुमचा"
            )}

            <span>
              {" "}
              {tr(
                "business",
                "बिज़नेस रजिस्टर करें",
                "business register करा"
              )}
            </span>
          </h1>

          <p>
            {tr(
              "Join MaxiGo and start receiving orders from customers in your city.",
              "MaxiGo से जुड़ें और अपने शहर के ग्राहकों से ऑर्डर प्राप्त करना शुरू करें।",
              "MaxiGo सोबत जुळा आणि तुमच्या शहरातील customers कडून orders मिळवायला सुरुवात करा."
            )}
          </p>

        </div>

        {/* =================================================
            FORM CARD
        ================================================= */}

        <form
          className="register-card"
          onSubmit={
            handleRegister
          }
        >

          {/* =================================================
              OWNER INFORMATION
          ================================================= */}

          <div className="register-section-title">

            <div>
              👤
            </div>

            <div>

              <h2>
                {tr(
                  "Owner Information",
                  "मालिक की जानकारी",
                  "Owner Information"
                )}
              </h2>

              <p>
                {tr(
                  "Enter your personal details.",
                  "अपनी व्यक्तिगत जानकारी दर्ज करें।",
                  "तुमची personal माहिती भरा."
                )}
              </p>

            </div>

          </div>

          <div className="register-grid">

            {/* OWNER NAME */}

            <div className="register-field">

              <label>
                {tr(
                  "Owner Name",
                  "मालिक का नाम",
                  "Owner Name"
                )}{" "}
                <b>
                  *
                </b>
              </label>

              <input
                type="text"
                name="ownerName"
                value={
                  form.ownerName
                }
                onChange={
                  handleChange
                }
                placeholder={tr(
                  "Enter owner name",
                  "मालिक का नाम दर्ज करें",
                  "Owner name भरा"
                )}
                autoComplete="name"
              />

            </div>

            {/* MOBILE */}

            <div className="register-field">

              <label>
                {tr(
                  "Mobile Number",
                  "मोबाइल नंबर",
                  "Mobile Number"
                )}{" "}
                <b>
                  *
                </b>
              </label>

              <input
                type="tel"
                name="phone"
                value={
                  form.phone
                }
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    phone:
                      e.target.value.replace(
                        /\D/g,
                        ""
                      ),
                  }))
                }
                maxLength="10"
                inputMode="numeric"
                placeholder={tr(
                  "10-digit mobile number",
                  "10 अंकों का मोबाइल नंबर",
                  "10 अंकी mobile number"
                )}
                autoComplete="tel"
              />

            </div>

            {/* EMAIL */}

            <div className="register-field full">

              <label>
                {tr(
                  "Email Address",
                  "ईमेल पता",
                  "Email Address"
                )}
              </label>

              <input
                type="email"
                name="email"
                value={
                  form.email
                }
                onChange={
                  handleChange
                }
                placeholder={tr(
                  "Enter email address",
                  "ईमेल पता दर्ज करें",
                  "Email address भरा"
                )}
                autoComplete="email"
              />

            </div>

          </div>

          {/* =================================================
              BUSINESS INFORMATION
          ================================================= */}

          <div className="register-section-title business-title">

            <div>
              🏪
            </div>

            <div>

              <h2>
                {tr(
                  "Business Information",
                  "बिज़नेस जानकारी",
                  "Business Information"
                )}
              </h2>

              <p>
                {tr(
                  "Tell us about your business.",
                  "अपने बिज़नेस के बारे में बताएं।",
                  "तुमच्या business बद्दल माहिती भरा."
                )}
              </p>

            </div>

          </div>

          <div className="register-grid">

            {/* BUSINESS NAME */}

            <div className="register-field">

              <label>
                {tr(
                  "Business Name",
                  "बिज़नेस का नाम",
                  "Business Name"
                )}{" "}
                <b>
                  *
                </b>
              </label>

              <input
                type="text"
                name="businessName"
                value={
                  form.businessName
                }
                onChange={
                  handleChange
                }
                placeholder={tr(
                  "Enter business name",
                  "बिज़नेस का नाम दर्ज करें",
                  "Business name भरा"
                )}
                autoComplete="organization"
              />

            </div>

            {/* BUSINESS TYPE */}

            <div className="register-field">

              <label>
                {tr(
                  "Business Type",
                  "बिज़नेस प्रकार",
                  "Business Type"
                )}{" "}
                <b>
                  *
                </b>
              </label>

              <select
                name="businessType"
                value={
                  form.businessType
                }
                onChange={
                  handleChange
                }
              >

                {BUSINESS_TYPES.map(
                  (item) => (
                    <option
                      key={
                        item[0]
                      }
                      value={
                        item[0]
                      }
                    >
                      {item[2]}{" "}
                      {item[1]}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* ADDRESS */}

            <div className="register-field full">

              <label>
                {tr(
                  "Business Address",
                  "बिज़नेस का पता",
                  "Business Address"
                )}{" "}
                <b>
                  *
                </b>
              </label>

              <textarea
                name="address"
                value={
                  form.address
                }
                onChange={
                  handleChange
                }
                rows="3"
                placeholder={tr(
                  "Enter complete business address",
                  "पूरा बिज़नेस पता दर्ज करें",
                  "Complete business address भरा"
                )}
                autoComplete="street-address"
              />

            </div>

            {/* CITY */}

            <div className="register-field">

              <label>
                {tr(
                  "City",
                  "शहर",
                  "City"
                )}
              </label>

              <input
                type="text"
                name="city"
                value={
                  form.city
                }
                onChange={
                  handleChange
                }
                placeholder={tr(
                  "Enter city",
                  "शहर दर्ज करें",
                  "City भरा"
                )}
              />

            </div>

            {/* STATE */}

            <div className="register-field">

              <label>
                {tr(
                  "State",
                  "राज्य",
                  "State"
                )}
              </label>

              <input
                type="text"
                name="state"
                value={
                  form.state
                }
                onChange={
                  handleChange
                }
                placeholder={tr(
                  "Enter state",
                  "राज्य दर्ज करें",
                  "State भरा"
                )}
              />

            </div>

            {/* PINCODE */}

            <div className="register-field">

              <label>
                {tr(
                  "Pincode",
                  "पिनकोड",
                  "Pincode"
                )}
              </label>

              <input
                type="tel"
                name="pincode"
                value={
                  form.pincode
                }
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    pincode:
                      e.target.value.replace(
                        /\D/g,
                        ""
                      ),
                  }))
                }
                maxLength="6"
                inputMode="numeric"
                placeholder={tr(
                  "6-digit pincode",
                  "6 अंकों का पिनकोड",
                  "6 अंकी pincode"
                )}
                autoComplete="postal-code"
              />

            </div>

            {/* LOCATION */}

            <div className="register-field">

              <label>
                {tr(
                  "Business Location",
                  "बिज़नेस लोकेशन",
                  "Business Location"
                )}
              </label>

              <button
                type="button"
                onClick={
                  getLocation
                }
                style={{
                  width: "100%",
                  minHeight: "48px",
                  border:
                    "1px solid #dedce8",
                  borderRadius:
                    "11px",
                  background:
                    "#fbfbfe",
                  color:
                    "#6d28d9",
                  fontSize:
                    "14px",
                  fontWeight:
                    700,
                  cursor:
                    "pointer",
                  padding:
                    "10px 14px",
                }}
              >
                📍{" "}
                {tr(
                  "Use Current Location",
                  "वर्तमान लोकेशन इस्तेमाल करें",
                  "Current Location वापरा"
                )}
              </button>

              <small>
                {form.latitude !==
                  "" &&
                form.longitude !==
                  ""
                  ? `${Number(
                      form.latitude
                    ).toFixed(
                      6
                    )}, ${Number(
                      form.longitude
                    ).toFixed(
                      6
                    )}`
                  : tr(
                      "Coordinates optional",
                      "कोऑर्डिनेट्स वैकल्पिक हैं",
                      "Coordinates optional आहेत"
                    )}
              </small>

            </div>

          </div>

          {/* =================================================
              OPERATING HOURS
          ================================================= */}

          <div className="register-section-title business-title">

            <div>
              🕒
            </div>

            <div>

              <h2>
                {tr(
                  "Operating Hours",
                  "कामकाज का समय",
                  "Operating Hours"
                )}
              </h2>

              <p>
                {tr(
                  "Set your regular opening and closing time.",
                  "अपने बिज़नेस का ओपनिंग और क्लोजिंग टाइम सेट करें।",
                  "तुमचा opening आणि closing time सेट करा."
                )}
              </p>

            </div>

          </div>

          <div className="register-grid">

            {/* OPENING */}

            <div className="register-field">

              <label>
                {tr(
                  "Opening Time",
                  "ओपनिंग टाइम",
                  "Opening Time"
                )}
              </label>

              <input
                type="time"
                name="openingTime"
                value={
                  form.openingTime
                }
                onChange={
                  handleChange
                }
              />

            </div>

            {/* CLOSING */}

            <div className="register-field">

              <label>
                {tr(
                  "Closing Time",
                  "क्लोजिंग टाइम",
                  "Closing Time"
                )}
              </label>

              <input
                type="time"
                name="closingTime"
                value={
                  form.closingTime
                }
                onChange={
                  handleChange
                }
              />

            </div>

          </div>

          {/* =================================================
              ACCOUNT SECURITY
          ================================================= */}

          <div className="register-section-title business-title">

            <div>
              🔐
            </div>

            <div>

              <h2>
                {tr(
                  "Account Security",
                  "अकाउंट सुरक्षा",
                  "Account Security"
                )}
              </h2>

              <p>
                {tr(
                  "Create a secure password for your account.",
                  "अपने अकाउंट के लिए सुरक्षित पासवर्ड बनाएं।",
                  "तुमच्या account साठी secure password तयार करा."
                )}
              </p>

            </div>

          </div>

          <div className="register-grid">

            {/* PASSWORD */}

            <div className="register-field">

              <label>
                {tr(
                  "Password",
                  "पासवर्ड",
                  "Password"
                )}{" "}
                <b>
                  *
                </b>
              </label>

              <div className="register-password">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={
                    form.password
                  }
                  onChange={
                    handleChange
                  }
                  placeholder={tr(
                    "Minimum 6 characters",
                    "कम से कम 6 अक्षर",
                    "किमान 6 characters"
                  )}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (
                        prev
                      ) =>
                        !prev
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="register-field">

              <label>
                {tr(
                  "Confirm Password",
                  "पासवर्ड कन्फर्म करें",
                  "Confirm Password"
                )}{" "}
                <b>
                  *
                </b>
              </label>

              <div className="register-password">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={
                    form.confirmPassword
                  }
                  onChange={
                    handleChange
                  }
                  placeholder={tr(
                    "Confirm password",
                    "पासवर्ड फिर से दर्ज करें",
                    "Password पुन्हा भरा"
                  )}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (
                        prev
                      ) =>
                        !prev
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="register-error">
              ⚠️{" "}
              {error}
            </div>
          )}

          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (
            <div
              style={{
                marginTop:
                  "20px",
                padding:
                  "13px 15px",
                borderRadius:
                  "11px",
                background:
                  "#eefbf3",
                border:
                  "1px solid #cbeed8",
                color:
                  "#1e7b45",
                fontSize:
                  "14px",
                fontWeight:
                  600,
              }}
            >
              ✓{" "}
              {success}
            </div>
          )}

          {/* =================================================
              SUBMIT
          ================================================= */}

          <div className="register-submit-area">

            <p>
              {tr(
                "By registering, you agree to MaxiGo Partner Terms & Conditions and Privacy Policy.",
                "रजिस्टर करके आप MaxiGo Partner Terms & Conditions और Privacy Policy से सहमत होते हैं।",
                "Register करून तुम्ही MaxiGo Partner Terms & Conditions आणि Privacy Policy ला सहमती देता."
              )}
            </p>

            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              {loading
                ? tr(
                    "Creating Account...",
                    "अकाउंट बनाया जा रहा है...",
                    "Account तयार होत आहे..."
                  )
                : tr(
                    "Create Partner Account →",
                    "पार्टनर अकाउंट बनाएं →",
                    "Partner Account तयार करा →"
                  )}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default Register;