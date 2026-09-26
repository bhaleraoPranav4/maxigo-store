import React, { useState } from "react";
import "./Settings.css";
import { useLanguage } from "./LanguageContext";

function Settings() {
  const { language, changeLanguage } = useLanguage();

  const [settings, setSettings] = useState({
    acceptOrders: true,
    newOrderAlerts: true,
    orderSound: true,
    autoAccept: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const translations = {
    en: {
      settings: "Settings",
      settingsDescription: "Manage your partner account and preferences.",
      orderSettings: "Order Settings",
      orderSettingsDescription:
        "Control how you receive and manage orders.",
      acceptOrders: "Accept Orders",
      acceptOrdersDescription:
        "Allow customers to place new orders.",
      autoAcceptOrders: "Auto Accept Orders",
      autoAcceptDescription:
        "Automatically accept incoming orders.",
      notifications: "Notifications",
      notificationsDescription:
        "Manage your order notification preferences.",
      newOrderAlerts: "New Order Alerts",
      newOrderAlertsDescription:
        "Get notified when a new order arrives.",
      orderSound: "Order Sound",
      orderSoundDescription:
        "Play sound for new order alerts.",
      language: "Language",
      languageDescription: "Choose your preferred language.",
      english: "English",
      hindi: "Hindi",
      marathi: "Marathi",
      changePassword: "Change Password",
      changePasswordDescription:
        "Update your partner account password.",
      currentPassword: "Current Password",
      currentPasswordPlaceholder: "Enter current password",
      newPassword: "New Password",
      newPasswordPlaceholder: "Enter new password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm new password",
      changePasswordButton: "Change Password",
      fillPasswordFields: "Please fill all password fields.",
      passwordMismatch:
        "New password and confirm password do not match.",
      passwordLength:
        "New password must be at least 6 characters.",
      passwordChanged: "Password changed successfully.",
      deleteAccount: "Delete Account",
      deleteAccountDescription:
        "Permanently remove your MaxiGo Partner account.",
      cannotUndo: "This action cannot be undone",
      deleteWarning:
        "Deleting your account will sign you out and remove your saved partner account information from this demo application.",
      deleteMyAccount: "Delete My Account",
      account: "Account",
      accountDescription: "Your partner account information.",
      partner: "Partner",
      phone: "Phone",
      email: "Email",
      loginSessions: "Login Sessions",
      loginSessionsDescription:
        "Devices currently logged into your account.",
      currentDevice: "Current device",
      activeNow: "Active now",
      logoutOtherDevices: "Log out other devices",
      otherDeviceMessage:
        "Other device logout will be connected with backend.",
      needHelp: "Need Help?",
      supportDescription: "Contact MaxiGo Partner Support.",
      contactSupport: "Contact Support →",
      supportMessage: "Support section will be connected later.",
      appVersion: "MaxiGo Partner Panel",
      version: "Version 1.0.0",
      deleteQuestion: "Delete Account?",
      deleteConfirmation:
        "Are you sure you want to permanently delete your MaxiGo Partner account?",
      pleaseNote: "Please Note",
      deleteModalWarning:
        "This action cannot be undone. Your account session and locally saved partner data will be removed.",
      typeDelete: "Type",
      toConfirm: "to confirm",
      deletePlaceholder: "Type DELETE",
      cancel: "Cancel",
      deleteAccountButton: "Delete Account",
      deleteConfirmError:
        'Please type "DELETE" to confirm account deletion.',
      deleteFailed:
        "Unable to delete account. Please try again.",
      deleteSuccess: "Account deleted successfully.",
    },

    hi: {
      settings: "सेटिंग्स",
      settingsDescription:
        "अपने पार्टनर अकाउंट और प्राथमिकताओं को मैनेज करें।",
      orderSettings: "ऑर्डर सेटिंग्स",
      orderSettingsDescription:
        "आप ऑर्डर कैसे प्राप्त और मैनेज करते हैं, इसे नियंत्रित करें।",
      acceptOrders: "ऑर्डर स्वीकार करें",
      acceptOrdersDescription:
        "ग्राहकों को नए ऑर्डर करने की अनुमति दें।",
      autoAcceptOrders: "ऑटो एक्सेप्ट ऑर्डर्स",
      autoAcceptDescription:
        "आने वाले ऑर्डर्स को अपने आप स्वीकार करें।",
      notifications: "नोटिफिकेशन",
      notificationsDescription:
        "अपने ऑर्डर नोटिफिकेशन की प्राथमिकताएं मैनेज करें।",
      newOrderAlerts: "नए ऑर्डर अलर्ट",
      newOrderAlertsDescription:
        "नया ऑर्डर आने पर नोटिफिकेशन प्राप्त करें।",
      orderSound: "ऑर्डर साउंड",
      orderSoundDescription:
        "नए ऑर्डर अलर्ट के लिए साउंड चलाएं।",
      language: "भाषा",
      languageDescription: "अपनी पसंदीदा भाषा चुनें।",
      english: "English",
      hindi: "हिंदी",
      marathi: "मराठी",
      changePassword: "पासवर्ड बदलें",
      changePasswordDescription:
        "अपने पार्टनर अकाउंट का पासवर्ड अपडेट करें।",
      currentPassword: "वर्तमान पासवर्ड",
      currentPasswordPlaceholder: "वर्तमान पासवर्ड दर्ज करें",
      newPassword: "नया पासवर्ड",
      newPasswordPlaceholder: "नया पासवर्ड दर्ज करें",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      confirmPasswordPlaceholder: "नया पासवर्ड दोबारा दर्ज करें",
      changePasswordButton: "पासवर्ड बदलें",
      fillPasswordFields: "कृपया सभी पासवर्ड फ़ील्ड भरें।",
      passwordMismatch:
        "नया पासवर्ड और कन्फर्म पासवर्ड समान नहीं हैं।",
      passwordLength:
        "नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",
      passwordChanged: "पासवर्ड सफलतापूर्वक बदल दिया गया।",
      deleteAccount: "अकाउंट डिलीट करें",
      deleteAccountDescription:
        "अपने MaxiGo Partner अकाउंट को स्थायी रूप से हटाएं।",
      cannotUndo: "यह कार्रवाई वापस नहीं की जा सकती",
      deleteWarning:
        "अकाउंट डिलीट करने पर आप साइन आउट हो जाएंगे और इस डेमो एप्लिकेशन में सेव पार्टनर अकाउंट की जानकारी हटा दी जाएगी।",
      deleteMyAccount: "मेरा अकाउंट डिलीट करें",
      account: "अकाउंट",
      accountDescription: "आपके पार्टनर अकाउंट की जानकारी।",
      partner: "पार्टनर",
      phone: "फोन",
      email: "ईमेल",
      loginSessions: "लॉगिन सेशन्स",
      loginSessionsDescription:
        "आपके अकाउंट में वर्तमान में लॉगिन किए गए डिवाइस।",
      currentDevice: "वर्तमान डिवाइस",
      activeNow: "अभी सक्रिय",
      logoutOtherDevices: "अन्य डिवाइस से लॉग आउट करें",
      otherDeviceMessage:
        "अन्य डिवाइस लॉगआउट को बैकएंड से जोड़ा जाएगा।",
      needHelp: "मदद चाहिए?",
      supportDescription: "MaxiGo Partner Support से संपर्क करें।",
      contactSupport: "सपोर्ट से संपर्क करें →",
      supportMessage: "सपोर्ट सेक्शन बाद में कनेक्ट किया जाएगा।",
      appVersion: "MaxiGo Partner Panel",
      version: "Version 1.0.0",
      deleteQuestion: "अकाउंट डिलीट करें?",
      deleteConfirmation:
        "क्या आप अपना MaxiGo Partner अकाउंट स्थायी रूप से डिलीट करना चाहते हैं?",
      pleaseNote: "कृपया ध्यान दें",
      deleteModalWarning:
        "यह कार्रवाई वापस नहीं की जा सकती। आपका अकाउंट सेशन और लोकली सेव किया गया पार्टनर डेटा हटा दिया जाएगा।",
      typeDelete: "कन्फर्म करने के लिए",
      toConfirm: "टाइप करें",
      deletePlaceholder: "DELETE टाइप करें",
      cancel: "रद्द करें",
      deleteAccountButton: "अकाउंट डिलीट करें",
      deleteConfirmError:
        'अकाउंट डिलीट करने की पुष्टि के लिए "DELETE" टाइप करें।',
      deleteFailed:
        "अकाउंट डिलीट नहीं हो सका। कृपया फिर से प्रयास करें।",
      deleteSuccess: "अकाउंट सफलतापूर्वक डिलीट हो गया।",
    },

    mr: {
      settings: "सेटिंग्ज",
      settingsDescription:
        "तुमचे पार्टनर अकाउंट आणि प्राधान्ये व्यवस्थापित करा.",
      orderSettings: "ऑर्डर सेटिंग्ज",
      orderSettingsDescription:
        "तुम्हाला ऑर्डर्स कशा मिळतील आणि व्यवस्थापित होतील हे नियंत्रित करा.",
      acceptOrders: "ऑर्डर्स स्वीकारा",
      acceptOrdersDescription:
        "ग्राहकांना नवीन ऑर्डर्स देण्याची परवानगी द्या.",
      autoAcceptOrders: "ऑटो एक्सेप्ट ऑर्डर्स",
      autoAcceptDescription:
        "येणाऱ्या ऑर्डर्स आपोआप स्वीकारा.",
      notifications: "नोटिफिकेशन्स",
      notificationsDescription:
        "तुमच्या ऑर्डर नोटिफिकेशनची प्राधान्ये व्यवस्थापित करा.",
      newOrderAlerts: "नवीन ऑर्डर अलर्ट",
      newOrderAlertsDescription:
        "नवीन ऑर्डर आल्यावर नोटिफिकेशन मिळवा.",
      orderSound: "ऑर्डर साउंड",
      orderSoundDescription:
        "नवीन ऑर्डर अलर्टसाठी साउंड वाजवा.",
      language: "भाषा",
      languageDescription: "तुमची आवडती भाषा निवडा.",
      english: "English",
      hindi: "हिंदी",
      marathi: "मराठी",
      changePassword: "पासवर्ड बदला",
      changePasswordDescription:
        "तुमच्या पार्टनर अकाउंटचा पासवर्ड अपडेट करा.",
      currentPassword: "सध्याचा पासवर्ड",
      currentPasswordPlaceholder: "सध्याचा पासवर्ड भरा",
      newPassword: "नवीन पासवर्ड",
      newPasswordPlaceholder: "नवीन पासवर्ड भरा",
      confirmPassword: "पासवर्डची पुष्टी करा",
      confirmPasswordPlaceholder: "नवीन पासवर्ड पुन्हा भरा",
      changePasswordButton: "पासवर्ड बदला",
      fillPasswordFields: "कृपया सर्व पासवर्ड फील्ड भरा.",
      passwordMismatch:
        "नवीन पासवर्ड आणि कन्फर्म पासवर्ड जुळत नाहीत.",
      passwordLength:
        "नवीन पासवर्ड किमान 6 अक्षरांचा असावा.",
      passwordChanged: "पासवर्ड यशस्वीरित्या बदलला.",
      deleteAccount: "अकाउंट डिलीट करा",
      deleteAccountDescription:
        "तुमचे MaxiGo Partner अकाउंट कायमचे हटवा.",
      cannotUndo: "ही कृती पूर्ववत करता येणार नाही",
      deleteWarning:
        "अकाउंट डिलीट केल्यावर तुम्ही साइन आउट व्हाल आणि या डेमो अॅप्लिकेशनमधील सेव्ह केलेली पार्टनर अकाउंट माहिती हटवली जाईल.",
      deleteMyAccount: "माझे अकाउंट डिलीट करा",
      account: "अकाउंट",
      accountDescription: "तुमच्या पार्टनर अकाउंटची माहिती.",
      partner: "पार्टनर",
      phone: "फोन",
      email: "ईमेल",
      loginSessions: "लॉगिन सेशन्स",
      loginSessionsDescription:
        "तुमच्या अकाउंटमध्ये सध्या लॉगिन असलेली डिव्हाइसेस.",
      currentDevice: "सध्याचे डिव्हाइस",
      activeNow: "आत्ता सक्रिय",
      logoutOtherDevices: "इतर डिव्हाइसेसमधून लॉगआउट करा",
      otherDeviceMessage:
        "इतर डिव्हाइस लॉगआउट बॅकएंडशी नंतर जोडले जाईल.",
      needHelp: "मदत हवी आहे?",
      supportDescription: "MaxiGo Partner Support शी संपर्क करा.",
      contactSupport: "सपोर्टशी संपर्क करा →",
      supportMessage: "सपोर्ट सेक्शन नंतर कनेक्ट केले जाईल.",
      appVersion: "MaxiGo Partner Panel",
      version: "Version 1.0.0",
      deleteQuestion: "अकाउंट डिलीट करायचे?",
      deleteConfirmation:
        "तुमचे MaxiGo Partner अकाउंट कायमचे डिलीट करायचे आहे का?",
      pleaseNote: "कृपया लक्षात ठेवा",
      deleteModalWarning:
        "ही कृती पूर्ववत करता येणार नाही. तुमचे अकाउंट सेशन आणि लोकली सेव्ह केलेला पार्टनर डेटा हटवला जाईल.",
      typeDelete: "कन्फर्म करण्यासाठी",
      toConfirm: "टाइप करा",
      deletePlaceholder: "DELETE टाइप करा",
      cancel: "रद्द करा",
      deleteAccountButton: "अकाउंट डिलीट करा",
      deleteConfirmError:
        'अकाउंट डिलीट करण्याची पुष्टी करण्यासाठी "DELETE" टाइप करा.',
      deleteFailed:
        "अकाउंट डिलीट करता आले नाही. कृपया पुन्हा प्रयत्न करा.",
      deleteSuccess: "अकाउंट यशस्वीरित्या डिलीट झाले.",
    },
  };

  const t = translations[language] || translations.en;

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setMessageType("");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setMessage(t.fillPasswordFields);
      setMessageType("error");
      return;
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      setMessage(t.passwordMismatch);
      setMessageType("error");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage(t.passwordLength);
      setMessageType("error");
      return;
    }

    // DEMO ONLY:
    // Production मध्ये Spring Boot API + hashed password वापरायचा आहे.
    setMessage(t.passwordChanged);
    setMessageType("success");

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const openDeleteModal = () => {
    setDeleteText("");
    setDeleteError("");
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteText("");
    setDeleteError("");
    setShowDeleteModal(false);
  };

  const handleDeleteAccount = () => {
    if (deleteText.trim().toUpperCase() !== "DELETE") {
      setDeleteError(t.deleteConfirmError);
      return;
    }

    try {
      localStorage.removeItem("maxigoPartner");
      localStorage.removeItem("maxigoPartnerLoggedIn");
      localStorage.removeItem("maxigoStoreOnline");
      localStorage.removeItem("maxigoProducts");
      localStorage.removeItem("maxigoOrders");
      localStorage.removeItem("maxigoEarnings");
      localStorage.removeItem("maxigoSettings");

      // Language preference intentionally remains so the login page
      // can open in the user's selected language.
      setShowDeleteModal(false);

      window.location.href = "/";
    } catch (error) {
      console.error("Account deletion error:", error);
      setDeleteError(t.deleteFailed);
    }
  };

  return (
    <div className="settings-page">
      {/* HEADER */}
      <div className="settings-header">
        <div>
          <h1>{t.settings}</h1>
          <p>{t.settingsDescription}</p>
        </div>
      </div>

      <div className="settings-layout">
        {/* LEFT */}
        <div className="settings-main">
          {/* ORDER SETTINGS */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-header-icon">📦</div>

              <div>
                <h2>{t.orderSettings}</h2>
                <p>{t.orderSettingsDescription}</p>
              </div>
            </div>

            <div className="settings-list">
              <div className="setting-row">
                <div className="setting-icon">✓</div>

                <div className="setting-info">
                  <strong>{t.acceptOrders}</strong>
                  <span>{t.acceptOrdersDescription}</span>
                </div>

                <button
                  type="button"
                  className={
                    settings.acceptOrders
                      ? "toggle active"
                      : "toggle"
                  }
                  onClick={() =>
                    toggleSetting("acceptOrders")
                  }
                >
                  <span></span>
                </button>
              </div>

              <div className="setting-row">
                <div className="setting-icon">⚡</div>

                <div className="setting-info">
                  <strong>{t.autoAcceptOrders}</strong>
                  <span>{t.autoAcceptDescription}</span>
                </div>

                <button
                  type="button"
                  className={
                    settings.autoAccept
                      ? "toggle active"
                      : "toggle"
                  }
                  onClick={() =>
                    toggleSetting("autoAccept")
                  }
                >
                  <span></span>
                </button>
              </div>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-header-icon">🔔</div>

              <div>
                <h2>{t.notifications}</h2>
                <p>{t.notificationsDescription}</p>
              </div>
            </div>

            <div className="settings-list">
              <div className="setting-row">
                <div className="setting-icon">🔔</div>

                <div className="setting-info">
                  <strong>{t.newOrderAlerts}</strong>
                  <span>
                    {t.newOrderAlertsDescription}
                  </span>
                </div>

                <button
                  type="button"
                  className={
                    settings.newOrderAlerts
                      ? "toggle active"
                      : "toggle"
                  }
                  onClick={() =>
                    toggleSetting("newOrderAlerts")
                  }
                >
                  <span></span>
                </button>
              </div>

              <div className="setting-row">
                <div className="setting-icon">🔊</div>

                <div className="setting-info">
                  <strong>{t.orderSound}</strong>
                  <span>{t.orderSoundDescription}</span>
                </div>

                <button
                  type="button"
                  className={
                    settings.orderSound
                      ? "toggle active"
                      : "toggle"
                  }
                  onClick={() =>
                    toggleSetting("orderSound")
                  }
                >
                  <span></span>
                </button>
              </div>
            </div>
          </div>

          {/* LANGUAGE */}
          <div className="settings-card language-settings-card">
            <div className="settings-card-header">
              <div className="settings-header-icon">🌐</div>

              <div>
                <h2>{t.language}</h2>
                <p>{t.languageDescription}</p>
              </div>
            </div>

            <div className="language-options">
              <button
                type="button"
                className={
                  language === "en"
                    ? "language-option active"
                    : "language-option"
                }
                onClick={() => changeLanguage("en")}
              >
                <span className="language-flag">🇬🇧</span>

                <div className="language-info">
                  <strong>{t.english}</strong>
                  <small>English</small>
                </div>

                {language === "en" && (
                  <span className="language-check">
                    ✓
                  </span>
                )}
              </button>

              <button
                type="button"
                className={
                  language === "hi"
                    ? "language-option active"
                    : "language-option"
                }
                onClick={() => changeLanguage("hi")}
              >
                <span className="language-flag">🇮🇳</span>

                <div className="language-info">
                  <strong>हिंदी</strong>
                  <small>Hindi</small>
                </div>

                {language === "hi" && (
                  <span className="language-check">
                    ✓
                  </span>
                )}
              </button>

              <button
                type="button"
                className={
                  language === "mr"
                    ? "language-option active"
                    : "language-option"
                }
                onClick={() => changeLanguage("mr")}
              >
                <span className="language-flag">🇮🇳</span>

                <div className="language-info">
                  <strong>मराठी</strong>
                  <small>Marathi</small>
                </div>

                {language === "mr" && (
                  <span className="language-check">
                    ✓
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-header-icon">🔐</div>

              <div>
                <h2>{t.changePassword}</h2>
                <p>{t.changePasswordDescription}</p>
              </div>
            </div>

            <form
              className="password-form"
              onSubmit={handlePasswordSubmit}
            >
              <div className="password-field">
                <label>{t.currentPassword}</label>

                <div className="password-input">
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="currentPassword"
                    value={
                      passwordForm.currentPassword
                    }
                    onChange={handlePasswordChange}
                    placeholder={
                      t.currentPasswordPlaceholder
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="password-row">
                <div className="password-field">
                  <label>{t.newPassword}</label>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    placeholder={
                      t.newPasswordPlaceholder
                    }
                  />
                </div>

                <div className="password-field">
                  <label>{t.confirmPassword}</label>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={
                      passwordForm.confirmPassword
                    }
                    onChange={handlePasswordChange}
                    placeholder={
                      t.confirmPasswordPlaceholder
                    }
                  />
                </div>
              </div>

              {message && (
                <div
                  className={
                    messageType === "success"
                      ? "password-message success"
                      : "password-message error"
                  }
                >
                  {messageType === "success"
                    ? "✓"
                    : "⚠️"}{" "}
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="change-password-btn"
              >
                🔐 {t.changePasswordButton}
              </button>
            </form>
          </div>

          {/* DANGER ZONE */}
          <div className="settings-card danger-zone-card">
            <div className="settings-card-header danger-header">
              <div className="settings-header-icon danger-icon">
                🗑️
              </div>

              <div>
                <h2>{t.deleteAccount}</h2>
                <p>{t.deleteAccountDescription}</p>
              </div>
            </div>

            <div className="danger-zone-content">
              <div className="danger-warning">
                <div className="danger-warning-icon">
                  ⚠️
                </div>

                <div>
                  <strong>{t.cannotUndo}</strong>
                  <span>{t.deleteWarning}</span>
                </div>
              </div>

              <button
                type="button"
                className="delete-account-btn"
                onClick={openDeleteModal}
              >
                🗑️ {t.deleteMyAccount}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="settings-sidebar">
          {/* ACCOUNT */}
          <div className="settings-card account-card">
            <div className="settings-card-header">
              <div className="settings-header-icon">👤</div>

              <div>
                <h2>{t.account}</h2>
                <p>{t.accountDescription}</p>
              </div>
            </div>

            <div className="account-profile">
              <div className="account-avatar">P</div>

              <div>
                <strong>Pranav</strong>
                <span>{t.partner}</span>
              </div>
            </div>

            <div className="account-details">
              <div>
                <span>{t.phone}</span>
                <strong>9876543210</strong>
              </div>

              <div>
                <span>{t.email}</span>
                <strong>partner@maxigo.in</strong>
              </div>
            </div>
          </div>

          {/* LOGIN SESSIONS */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-header-icon">💻</div>

              <div>
                <h2>{t.loginSessions}</h2>
                <p>{t.loginSessionsDescription}</p>
              </div>
            </div>

            <div className="session-item">
              <div className="session-device">💻</div>

              <div className="session-info">
                <strong>Windows / Chrome</strong>
                <span>{t.currentDevice}</span>
                <small>{t.activeNow}</small>
              </div>

              <div className="session-active">●</div>
            </div>

            <button
              type="button"
              className="logout-other-btn"
              onClick={() =>
                alert(t.otherDeviceMessage)
              }
            >
              {t.logoutOtherDevices}
            </button>
          </div>

          {/* SUPPORT */}
          <div className="support-card">
            <div className="support-icon">🎧</div>

            <div>
              <h3>{t.needHelp}</h3>

              <p>{t.supportDescription}</p>

              <button
                type="button"
                onClick={() =>
                  alert(t.supportMessage)
                }
              >
                {t.contactSupport}
              </button>
            </div>
          </div>

          {/* VERSION */}
          <div className="app-version">
            <span>{t.appVersion}</span>
            <strong>{t.version}</strong>
          </div>
        </div>
      </div>

      {/* DELETE ACCOUNT MODAL */}
      {showDeleteModal && (
        <div
          className="delete-modal-overlay"
          onClick={closeDeleteModal}
        >
          <div
            className="delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-modal-icon">
              🗑️
            </div>

            <h2>{t.deleteQuestion}</h2>

            <p className="delete-modal-description">
              {t.deleteConfirmation}
            </p>

            <div className="delete-modal-warning">
              <strong>⚠️ {t.pleaseNote}</strong>

              <span>{t.deleteModalWarning}</span>
            </div>

            <label className="delete-confirm-label">
              {t.typeDelete}{" "}
              <strong>DELETE</strong>{" "}
              {t.toConfirm}
            </label>

            <input
              type="text"
              className="delete-confirm-input"
              value={deleteText}
              onChange={(e) => {
                setDeleteText(e.target.value);
                setDeleteError("");
              }}
              placeholder={t.deletePlaceholder}
              autoComplete="off"
            />

            {deleteError && (
              <div className="delete-error">
                ⚠️ {deleteError}
              </div>
            )}

            <div className="delete-modal-actions">
              <button
                type="button"
                className="cancel-delete-btn"
                onClick={closeDeleteModal}
              >
                {t.cancel}
              </button>

              <button
                type="button"
                className="confirm-delete-btn"
                onClick={handleDeleteAccount}
              >
                {t.deleteAccountButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
