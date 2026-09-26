import React, {
  useState,
} from "react";

import "./Login.css";

import {
  useLanguage,
} from "./LanguageContext";

import {
  loginStore,
} from "./api";

function Login({
  onLogin,
  onRegister,
}) {
  const { t } =
    useLanguage();

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
    async (e) => {
      e.preventDefault();

      setError("");

      if (
        phone.length !== 10 ||
        !password
      ) {
        setError(
          "Please enter a valid 10-digit mobile number and password."
        );
        return;
      }

      setLoading(true);

      try {
        const response =
          await loginStore(
            phone,
            password
          );

        if (rememberMe) {
          localStorage.setItem(
            "maxigoStoreRememberMe",
            "true"
          );
        } else {
          localStorage.removeItem(
            "maxigoStoreRememberMe"
          );
        }

        onLogin(response);
      } catch (err) {
        setError(
          err?.message ||
            "Login failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="auth-page">

      <div className="auth-left">

        <div className="auth-brand">

          <div className="auth-logo">
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

        <div className="auth-left-content">

          <span className="auth-badge">
            🚀{" "}
            {t(
              "growBusiness"
            ) ||
              "Grow your business with MaxiGo"}
          </span>

          <h1>
            {t(
              "manageYourBusiness"
            ) ||
              "Manage your business."}

            <br />

            <span>
              {t(
                "growWithMaxiGo"
              ) ||
                "Grow with MaxiGo."}
            </span>
          </h1>

          <p>
            {t(
              "loginDescription"
            ) ||
              "Accept orders, manage products, track sales and serve your customers easily from one powerful panel."}
          </p>

          <div className="auth-features">

            <div>
              <span>✓</span>

              <div>
                <strong>
                  {t(
                    "manageOrders"
                  ) ||
                    "Manage Orders"}
                </strong>

                <small>
                  {t(
                    "manageOrdersDescription"
                  ) ||
                    "Accept and prepare customer orders"}
                </small>
              </div>
            </div>

            <div>
              <span>✓</span>

              <div>
                <strong>
                  {t(
                    "manageProducts"
                  ) ||
                    "Manage Products"}
                </strong>

                <small>
                  {t(
                    "manageProductsDescription"
                  ) ||
                    "Add, edit and update availability"}
                </small>
              </div>
            </div>

            <div>
              <span>✓</span>

              <div>
                <strong>
                  {t(
                    "growYourSales"
                  ) ||
                    "Grow Your Sales"}
                </strong>

                <small>
                  {t(
                    "growYourSalesDescription"
                  ) ||
                    "Reach more customers with MaxiGo"}
                </small>
              </div>
            </div>

          </div>

        </div>

        <div className="auth-footer">
          © 2026 MaxiGo.{" "}
          {t(
            "allRightsReserved"
          ) ||
            "All rights reserved."}
        </div>

      </div>

      <div className="auth-right">

        <div className="auth-card">

          <div className="mobile-logo">

            <div className="auth-logo">
              ⚡
            </div>

            <strong>
              MaxiGo
            </strong>

          </div>

          <div className="auth-title">

            <h2>
              {t(
                "welcomeBack"
              ) ||
                "Welcome Back"}{" "}
              👋
            </h2>

            <p>
              {t(
                "loginToPartnerAccount"
              ) ||
                "Login to your MaxiGo Partner account"}
            </p>

          </div>

          <form
            onSubmit={
              handleLogin
            }
          >

            <div className="auth-field">

              <label>
                {t("phone") ||
                  "Mobile Number"}
              </label>

              <div className="auth-input">

                <span>
                  📱
                </span>

                <input
                  type="tel"
                  maxLength="10"
                  inputMode="numeric"
                  placeholder={
                    t(
                      "enterMobileNumber"
                    ) ||
                    "Enter mobile number"
                  }
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

              </div>

            </div>

            <div className="auth-field">

              <label>
                {t(
                  "password"
                ) ||
                  "Password"}
              </label>

              <div className="auth-input">

                <span>
                  🔒
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder={
                    t(
                      "enterPassword"
                    ) ||
                    "Enter password"
                  }
                  value={
                    password
                  }
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className="password-eye"
                  onClick={() =>
                    setShowPassword(
                      (value) =>
                        !value
                    )
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>

            <div className="auth-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                  checked={
                    rememberMe
                  }
                  onChange={(e) =>
                    setRememberMe(
                      e.target.checked
                    )
                  }
                />

                <span>
                  {t(
                    "rememberMe"
                  ) ||
                    "Remember me"}
                </span>

              </label>

              <button
                type="button"
                className="forgot-btn"
                onClick={() =>
                  alert(
                    "Forgot password / OTP will be connected later."
                  )
                }
              >
                {t(
                  "forgotPassword"
                ) ||
                  "Forgot Password?"}
              </button>

            </div>

            {error && (
              <div className="auth-error">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : t(
                    "loginToPartnerPanel"
                  ) ||
                  "Login to Partner Panel"}{" "}
              →
            </button>

          </form>

          <div className="auth-divider">
            <span>
              {t("or") ||
                "OR"}
            </span>
          </div>

          <div className="register-text">

            {t(
              "dontHaveAccount"
            ) ||
              "Don't have a partner account?"}

            <button
              type="button"
              onClick={
                onRegister
              }
            >
              {t(
                "registerNow"
              ) ||
                "Register Now"}
            </button>

          </div>

          <div className="auth-security">
            🔐{" "}
            {t(
              "secureAccountInformation"
            ) ||
              "Your account information is securely protected."}
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;