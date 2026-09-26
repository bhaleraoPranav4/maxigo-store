import React from "react";
import { useLanguage } from "./LanguageContext";
import "./LanguageSelector.css";

function LanguageSelector() {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <div className="language-selector">
      <span className="language-icon">🌐</span>

      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        aria-label={t("language")}
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
        <option value="mr">मराठी</option>
      </select>
    </div>
  );
}

export default LanguageSelector;