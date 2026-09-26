import React from "react";
import "./PrivacyPolicy.css";
import { useLanguage } from "./LanguageContext";

function PrivacyPolicy({ onBack }) {
  const { t } = useLanguage();

  return (
    <div className="privacy-page">

      {/* ================= HEADER ================= */}

      <header className="privacy-header">

        <div className="privacy-header-inner">

          <button
            className="privacy-back-btn"
            onClick={onBack}
          >
            ← {t("backToMaxiGoPartner") || "Back to MaxiGo Partner"}
          </button>

          <div className="privacy-brand">

            <div className="privacy-brand-icon">
              M
            </div>

            <div className="privacy-brand-text">

              <strong>
                MaxiGo
              </strong>

              <span>
                Partner
              </span>

            </div>

          </div>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="privacy-container">

        {/* ================= HERO ================= */}

        <section className="privacy-hero">

          <div className="privacy-hero-icon">
            🔐
          </div>

          <h1>
            {t("privacyPolicy") || "Privacy Policy"}
          </h1>

          <p className="privacy-hero-subtitle">
            {t("privacyHeroSubtitle") ||
              "Information about the privacy and security of your information on the MaxiGo Partner Platform."}
          </p>

          <span className="privacy-updated">
            {t("lastUpdated") || "Last Updated"}: September 09, 2026
          </span>

        </section>


        {/* ================= IMPORTANT NOTICE ================= */}

        <div className="privacy-notice">

          <div className="privacy-notice-icon">
            ℹ️
          </div>

          <div className="privacy-notice-content">

            <h3>
              {t("privacyReadCarefully") ||
                "Please read this Privacy Policy carefully"}
            </h3>

            <p>
              {t("privacyNoticeText") ||
                "This Privacy Policy explains what information we may collect when you use the MaxiGo Partner Platform, why it may be used, and how we work to protect it."}
            </p>

          </div>

        </div>


        {/* =====================================================
            01 INFORMATION WE COLLECT
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            01
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyInformationWeCollect") ||
                "Information We Collect"}
            </h2>

            <p>
              {t("privacyInformationCollectText") ||
                "We may collect information required for business operations, account management and order fulfilment when you use the MaxiGo Partner Platform."}
            </p>

            <ul>

              <li>
                {t("privacyPartnerBusinessName") ||
                  "Partner / business name"}
              </li>

              <li>
                {t("privacyMobileNumber") ||
                  "Mobile number"}
              </li>

              <li>
                {t("privacyEmailAddress") ||
                  "Email address"}
              </li>

              <li>
                {t("privacyBusinessAddress") ||
                  "Business address"}
              </li>

              <li>
                {t("privacyBusinessInformation") ||
                  "Business information"}
              </li>

              <li>
                {t("privacyBankPayout") ||
                  "Bank and payout information"}
              </li>

              <li>
                {t("privacyProductsMenu") ||
                  "Products and menu information"}
              </li>

              <li>
                {t("privacyOrderInformation") ||
                  "Order-related information"}
              </li>

            </ul>

          </div>

        </section>


        {/* =====================================================
            02 ACCOUNT INFORMATION
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            02
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyAccountInformation") ||
                "Account Information"}
            </h2>

            <p>
              {t("privacyAccountInformationText") ||
                "Information provided while creating a Partner account may be used to create, manage and verify the account."}
            </p>

            <ul>

              <li>
                {t("privacyRegistrationInfo") ||
                  "Account registration information"}
              </li>

              <li>
                {t("privacyLoginInformation") ||
                  "Login information"}
              </li>

              <li>
                {t("privacyBusinessDetails") ||
                  "Business details"}
              </li>

              <li>
                {t("privacyContactInformation") ||
                  "Contact information"}
              </li>

            </ul>


            <div className="privacy-callout">

              <strong>
                {t("privacyAccountSecurity") ||
                  "Account Security"}
              </strong>

              <p>
                {t("privacyAccountSecurityText") ||
                  "Partners are responsible for keeping their login credentials secure and informing MaxiGo Support if unauthorized access is suspected."}
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            03 LOCATION INFORMATION
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            03
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyLocationInformation") ||
                "Location Information"}
            </h2>

            <p>
              {t("privacyLocationText") ||
                "If location-related features are used within MaxiGo services, location information may be collected or processed where necessary."}
            </p>

            <ul>

              <li>
                {t("privacyBusinessLocation") ||
                  "Business location"}
              </li>

              <li>
                {t("privacyDeliveryLocation") ||
                  "Delivery-related location"}
              </li>

              <li>
                {t("privacyMapDirection") ||
                  "Map and direction related information"}
              </li>

            </ul>

            <p>
              {t("privacyLocationPermission") ||
                "Where location access is required, device permissions and applicable settings may apply."}
            </p>

          </div>

        </section>


        {/* =====================================================
            04 ORDER INFORMATION
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            04
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyOrderInformationTitle") ||
                "Order Information"}
            </h2>

            <p>
              {t("privacyOrderInfoText") ||
                "Information related to orders received by Partners may be processed on the platform."}
            </p>

            <ul>

              <li>
                {t("privacyOrderDetails") ||
                  "Order details"}
              </li>

              <li>
                {t("privacyProductsItems") ||
                  "Products / items"}
              </li>

              <li>
                {t("privacyOrderAmount") ||
                  "Order amount"}
              </li>

              <li>
                {t("privacyOrderStatus") ||
                  "Order status"}
              </li>

              <li>
                {t("privacyCustomerDelivery") ||
                  "Customer delivery information where required"}
              </li>

              <li>
                {t("privacyOrderTimestamps") ||
                  "Order timestamps"}
              </li>

            </ul>

            <p>
              {t("privacyOrderUsage") ||
                "This information may be used for order processing, preparation, delivery coordination and support."}
            </p>

          </div>

        </section>


        {/* =====================================================
            05 PAYMENT & PAYOUT
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            05
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyPaymentPayout") ||
                "Payment & Payout Information"}
            </h2>

            <p>
              {t("privacyPaymentPayoutText") ||
                "Payment-related information may be collected when required for Partner payout and settlement processes."}
            </p>

            <ul>

              <li>
                {t("privacyAccountHolderName") ||
                  "Account holder name"}
              </li>

              <li>
                {t("privacyBankName") ||
                  "Bank name"}
              </li>

              <li>
                {t("privacyBankAccountInfo") ||
                  "Bank account information"}
              </li>

              <li>
                {t("privacyIFSC") ||
                  "IFSC code"}
              </li>

              <li>
                {t("privacyUPI") ||
                  "UPI information, where applicable"}
              </li>

              <li>
                {t("privacySettlementInfo") ||
                  "Settlement-related information"}
              </li>

            </ul>


            <div className="privacy-callout">

              <strong>
                {t("privacyPaymentSecurity") ||
                  "Payment Security"}
              </strong>

              <p>
                {t("privacyPaymentSecurityText") ||
                  "Payment and payout information may be used for applicable payment processing, verification and settlement purposes."}
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            06 HOW WE USE INFORMATION
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            06
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyHowWeUse") ||
                "How We Use Information"}
            </h2>

            <p>
              {t("privacyHowWeUseText") ||
                "Collected information may be used to operate, maintain and improve MaxiGo services."}
            </p>

            <ul>

              <li>
                {t("privacyManagePartnerAccount") ||
                  "To manage Partner accounts"}
              </li>

              <li>
                {t("privacyProcessOrders") ||
                  "To process orders"}
              </li>

              <li>
                {t("privacyCoordinateDelivery") ||
                  "To coordinate deliveries"}
              </li>

              <li>
                {t("privacyProcessPayments") ||
                  "To process payments and payouts"}
              </li>

              <li>
                {t("privacyCustomerPartnerSupport") ||
                  "To provide customer / partner support"}
              </li>

              <li>
                {t("privacyMaintainSecurity") ||
                  "To maintain platform security"}
              </li>

              <li>
                {t("privacyDetectFraud") ||
                  "To detect fraud or misuse"}
              </li>

              <li>
                {t("privacyImproveService") ||
                  "To improve service quality"}
              </li>

            </ul>

          </div>

        </section>


        {/* =====================================================
            07 INFORMATION SHARING
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            07
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyInformationSharing") ||
                "Information Sharing"}
            </h2>

            <p>
              {t("privacyInformationSharingText1") ||
                "MaxiGo generally does not intend to sell personal or business information without a necessary business purpose."}
            </p>

            <p>
              {t("privacyInformationSharingText2") ||
                "Where necessary to provide services, information may be shared or processed with applicable service providers, payment processors, technology providers or authorized parties."}
            </p>

            <p>
              {t("privacyInformationSharingText3") ||
                "Information may also be disclosed where required by applicable law, legal process or security requirements."}
            </p>

          </div>

        </section>


        {/* =====================================================
            08 CUSTOMER INFORMATION
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            08
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyCustomerInformation") ||
                "Customer Information"}
            </h2>

            <p>
              {t("privacyCustomerInformationText") ||
                "Partners may receive certain customer information for order fulfilment."}
            </p>

            <ul>

              <li>
                {t("privacyCustomerAuthorized") ||
                  "Use customer information only for authorized purposes."}
              </li>

              <li>
                {t("privacyCustomerNoShare") ||
                  "Do not share customer information with unauthorized persons."}
              </li>

              <li>
                {t("privacyCustomerNoMisuse") ||
                  "Do not sell or misuse customer information."}
              </li>

              <li>
                {t("privacyCustomerAfterOrder") ||
                  "Do not unnecessarily use customer information after the order is completed."}
              </li>

            </ul>

          </div>

        </section>


        {/* =====================================================
            09 DATA SECURITY
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            09
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyDataSecurity") ||
                "Data Security"}
            </h2>

            <p>
              {t("privacyDataSecurityText") ||
                "MaxiGo attempts to use reasonable security measures to protect information from unauthorized access, misuse, alteration or unauthorized disclosure."}
            </p>

            <ul>

              <li>
                {t("privacySecureAuthentication") ||
                  "Secure authentication"}
              </li>

              <li>
                {t("privacyAccessControl") ||
                  "Access control"}
              </li>

              <li>
                {t("privacySecureCommunication") ||
                  "Secure communication"}
              </li>

              <li>
                {t("privacyDataProtection") ||
                  "Data protection measures"}
              </li>

            </ul>

            <p>
              {t("privacyNoRiskFreeSystem") ||
                "No online system can be guaranteed to be completely risk-free."}
            </p>

          </div>

        </section>


        {/* =====================================================
            10 COOKIES
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            10
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyCookies") ||
                "Cookies & Technologies"}
            </h2>

            <p>
              {t("privacyCookiesText") ||
                "MaxiGo websites or platforms may use cookies or similar technologies for functionality, security, preferences or analytics."}
            </p>

            <p>
              {t("privacyCookiesSettings") ||
                "Depending on browser or device settings, options may be available to control some technologies."}
            </p>

          </div>

        </section>


        {/* =====================================================
            11 DATA RETENTION
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            11
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyDataRetention") ||
                "Data Retention"}
            </h2>

            <p>
              {t("privacyDataRetentionText") ||
                "Information may be retained for as long as necessary for business operations, legal requirements, dispute resolution, security or legitimate business purposes."}
            </p>

            <p>
              {t("privacyRetentionPeriod") ||
                "Retention periods may vary depending on the type of information and applicable requirements."}
            </p>

          </div>

        </section>


        {/* =====================================================
            12 DATA DELETION
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            12
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyDataDeletion") ||
                "Data Deletion & Account Closure"}
            </h2>

            <p>
              {t("privacyDataDeletionText") ||
                "Partners may request account closure or deletion of applicable information through MaxiGo Support processes."}
            </p>


            <div className="privacy-callout">

              <strong>
                {t("important") || "Important"}
              </strong>

              <p>
                {t("privacyDataDeletionImportant") ||
                  "Some information may be retained for a required period due to legal, security, accounting, transaction or dispute-related requirements."}
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            13 THIRD PARTY
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            13
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyThirdParty") ||
                "Third-Party Services"}
            </h2>

            <p>
              {t("privacyThirdPartyText") ||
                "The MaxiGo platform may use payment gateways, maps, hosting, analytics, messaging or other third-party services."}
            </p>

            <p>
              {t("privacyThirdPartyPolicies") ||
                "Such services may have their own privacy policies and terms."}
            </p>

          </div>

        </section>


        {/* =====================================================
            14 CHILDREN
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            14
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyChildren") ||
                "Children's Privacy"}
            </h2>

            <p>
              {t("privacyChildrenText") ||
                "The MaxiGo Partner Platform is designed for business partners. Minors should not attempt to create or use a business partner account."}
            </p>

          </div>

        </section>


        {/* =====================================================
            15 CHANGES
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            15
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyChanges") ||
                "Changes to Privacy Policy"}
            </h2>

            <p>
              {t("privacyChangesText") ||
                "MaxiGo may update this Privacy Policy when there are changes to technology, business requirements or applicable laws."}
            </p>

            <p>
              {t("privacyUpdatedPolicy") ||
                "An updated Privacy Policy may become effective after it is published on the platform. The Last Updated date indicates the latest version of this policy."}
            </p>

          </div>

        </section>


        {/* =====================================================
            16 CONTACT
        ===================================================== */}

        <section className="privacy-section">

          <span className="privacy-number">
            16
          </span>

          <div className="privacy-section-content">

            <h2>
              {t("privacyContactQuestions") ||
                "Contact & Privacy Questions"}
            </h2>

            <p>
              {t("privacyContactText") ||
                "For questions related to privacy, account information, data or security, you can contact MaxiGo Support."}
            </p>


            <div className="privacy-contact-box">

              <div>

                <span>
                  📧
                </span>

                <div>

                  <small>
                    {t("emailSupport") ||
                      "Email Support"}
                  </small>

                  <strong>
                    support@maxigo.in
                  </strong>

                </div>

              </div>


              <div>

                <span>
                  📞
                </span>

                <div>

                  <small>
                    {t("partnerSupport") ||
                      "Partner Support"}
                  </small>

                  <strong>
                    {t("availablePartnerPanel") ||
                      "Available through Partner Panel"}
                  </strong>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            PRIVACY ACKNOWLEDGEMENT
        ===================================================== */}

        <section className="privacy-agreement">

          <div className="privacy-agreement-icon">
            ✓
          </div>

          <div>

            <h2>
              {t("privacyAcknowledgement") ||
                "Privacy Acknowledgement"}
            </h2>

            <p>
              {t("privacyAcknowledgementText") ||
                "By using the MaxiGo Partner Platform, you acknowledge that you have read this Privacy Policy and understand the information provided above regarding the collection, use and processing of information."}
            </p>

          </div>

        </section>


        {/* ================= BOTTOM BUTTON ================= */}

        <div className="privacy-bottom-action">

          <button
            className="privacy-back-bottom"
            onClick={onBack}
          >
            ←{" "}
            {t("backToPartnerPanel") ||
              "Back to Partner Panel"}
          </button>

        </div>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="privacy-footer">

        <div className="privacy-footer-inner">

          <div className="privacy-footer-brand">

            MaxiGo

            <span>
              {" "}Partner Platform
            </span>

          </div>


          <p>
            © 2026 MaxiGo.{" "}
            {t("allRightsReserved") ||
              "All rights reserved."}
          </p>


          <div className="privacy-footer-links">

            <button onClick={onBack}>
              {t("termsConditions") ||
                "Terms & Conditions"}
            </button>

            <span className="privacy-active">
              {t("privacyPolicy") ||
                "Privacy Policy"}
            </span>

            <button>
              {t("refundCancellation") ||
                "Refund & Cancellation"}
            </button>

            <button>
              {t("partnerAgreement") ||
                "Partner Agreement"}
            </button>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default PrivacyPolicy;