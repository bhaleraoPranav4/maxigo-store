import React from "react";
import "./TermsConditions.css";
import { useLanguage } from "./LanguageContext";

function TermsConditions({ onBack }) {
  const { language } = useLanguage();

  const translations = {
    en: {
      backToMaxiGoPartner: "← Back to MaxiGo Partner",
      partner: "Partner",
      termsConditions: "Terms & Conditions",
      heroSubtitle: "Terms and rules for using the MaxiGo Partner Platform",
      lastUpdated: "Last Updated: September 09, 2026",
      pleaseRead: "Please read these Terms carefully",
      noticeText:
        "Before using the MaxiGo Partner Panel, please read these Terms & Conditions carefully. By registering as a Partner or using the platform, you agree to these terms.",

      acceptance: "Acceptance of Terms",
      acceptanceP1:
        "Using the MaxiGo Partner Platform, creating an account, or listing products/services on MaxiGo means that the Partner accepts these Terms & Conditions.",
      acceptanceP2:
        "If the Partner does not agree to these terms, the Partner should not use the MaxiGo Partner Platform.",

      partnerAccount: "Partner Account",
      partnerAccountP:
        "The Partner must provide correct and accurate business information during account registration.",
      businessNameCorrect: "Business name must be accurate.",
      validMobileEmail: "A valid mobile number and email must be provided.",
      addressAccurate: "Business address must be accurate.",
      bankInfoCorrect: "Bank information must be correct.",
      credentialsSecure:
        "The Partner is responsible for keeping login credentials secure.",

      businessInformation: "Business Information",
      businessInfoP:
        "The Partner must provide correct information about the business. Providing false, misleading, or unauthorized information is prohibited.",
      verifyBusiness:
        "MaxiGo may verify business information when necessary.",

      productsMenu: "Products & Menu",
      productsMenuP:
        "The Partner may add food, grocery, or other permitted products according to the business type.",
      productNameCorrect: "Product name must be accurate.",
      productPriceCorrect: "Product price must be accurate.",
      imageNotMisleading: "Product image must not be misleading.",
      availabilityUpdated: "Availability status must be kept updated.",
      outOfStock: "Out-of-stock products should be marked unavailable on time.",
      prohibitedProducts: "Products prohibited by law must not be listed.",

      storeOnlineOffline: "Store Online / Offline",
      storeOnlineOfflineP:
        "The Partner can set the Store to Online or Offline.",
      online: "Online:",
      onlineText: "New orders can be received.",
      offline: "Offline:",
      offlineText: "New orders will not be received.",
      completeActiveOrders:
        "Before going Offline, the Partner is responsible for properly completing active orders.",

      orders: "Orders",
      ordersP:
        "The Partner is expected to process received orders on time.",
      new: "New",
      accepted: "Accepted",
      preparing: "Preparing",
      ready: "Ready",
      pickedUp: "Picked Up",
      orderDelay:
        "The Partner should not unnecessarily delay or repeatedly reject orders.",

      cancellationRejection: "Order Cancellation & Rejection",
      cancellationP:
        "If an order is rejected or cancelled by the Partner, the reason should be appropriate.",
      repeatedCancellation:
        "In case of repeated cancellations, rejections, or unreasonable delays, MaxiGo may review account performance.",

      pricingCommission: "Pricing & Commission",
      pricingP:
        "The Partner must properly maintain product/service prices in the MaxiGo Partner Panel.",
      commissionP:
        "Applicable commission or platform charges from MaxiGo may apply according to the Partner agreement and applicable commercial terms.",
      orderValue: "Order Value",
      maxigoCommission: "MaxiGo Commission",
      partnerEarning: "Partner Earning",
      exampleNote:
        "* This is only an example. Actual commission may vary according to the Partner agreement and applicable commercial terms.",

      paymentsPayouts: "Payments & Payouts",
      paymentsP:
        "Customer payment processing may take place through MaxiGo's supported payment system/payment gateway.",
      payoutP:
        "For Partner payouts, a valid bank account or applicable payout method may need to be provided.",
      bankDetailsAccurate: "Bank account details must be accurate.",
      accountHolderCorrect: "Account holder details must be correct.",
      ifscCorrect: "IFSC and other payment details must be correct.",
      kycRequired: "KYC verification must be completed if required.",

      quality: "Food & Product Quality",
      qualityP:
        "The Partner is responsible for the quality, safety, packaging, hygiene, and applicable legal requirements of food or other products.",
      complaintsP:
        "If there are customer complaints or quality-related issues, the Partner is expected to cooperate with MaxiGo as required.",

      prohibitedActivities: "Prohibited Products & Activities",
      prohibitedP:
        "Products/services prohibited by law or by MaxiGo cannot be listed or sold on the platform.",
      illegalProducts: "Illegal products",
      fraudulentProducts: "Fraudulent products",
      counterfeitProducts: "Counterfeit products",
      unauthorizedMedicines: "Unauthorized medicines",
      restrictedProducts: "Other legally restricted products",
      lawsResponsibility:
        "The Partner is responsible for complying with applicable laws and regulations.",

      customerInformation: "Customer Information",
      customerInfoP:
        "The Partner may receive customer information required for order fulfilment. This information must only be used for order fulfilment and authorized business purposes.",
      customerNoShare:
        "Customer information must not be shared, sold, or misused with/by unauthorized persons.",

      suspensionTermination: "Account Suspension & Termination",
      suspensionP:
        "If there is a Terms violation, fraudulent activity, repeated order issues, misleading information, or applicable law violation, MaxiGo may suspend or terminate the Partner account, subject to the applicable agreement and law.",

      responsibilities: "Partner Responsibilities",
      keepBusinessUpdated: "Keep business information updated.",
      keepProductsUpdated: "Keep products and prices updated.",
      processOrdersTime: "Process orders on time.",
      prepareOrders: "Prepare customer orders properly.",
      followLaws: "Comply with applicable laws.",
      secureCredentials: "Keep account credentials secure.",
      cooperateSupport: "Cooperate with the MaxiGo support team when required.",

      changesTerms: "Changes to Terms",
      changesP:
        "MaxiGo may change these Terms & Conditions when business requirements, technology, or applicable laws change.",
      updatedTerms:
        "Updated terms may become applicable after being published on the platform.",

      supportContact: "Support & Contact",
      supportP:
        "For account, orders, payments, or platform-related issues, the Partner can contact MaxiGo Support.",
      emailSupport: "Email Support",
      supportEmail: "support@maxigo.in",
      partnerSupport: "Partner Support",
      availablePanel: "Available through Partner Panel",

      partnerAgreement: "Partner Agreement",
      agreementP:
        "By using the MaxiGo Partner Platform, you confirm that you have read and accepted the above Terms & Conditions.",
      backToPanel: "← Back to Partner Panel",
      partnerPlatform: "Partner Platform",
      copyright: "© 2026 MaxiGo. All rights reserved.",
      privacyPolicy: "Privacy Policy",
      refundCancellation: "Refund & Cancellation",
    },

    hi: {
      backToMaxiGoPartner: "← MaxiGo Partner पर वापस जाएँ",
      partner: "पार्टनर",
      termsConditions: "टर्म्स और कंडीशन्स",
      heroSubtitle: "MaxiGo Partner Platform के उपयोग की शर्तें और नियम",
      lastUpdated: "अंतिम अपडेट: 09 सितंबर, 2026",
      pleaseRead: "कृपया इन शर्तों को ध्यान से पढ़ें",
      noticeText:
        "MaxiGo Partner Panel का उपयोग करने से पहले इन Terms & Conditions को ध्यान से पढ़ें। Partner के रूप में रजिस्टर करने या प्लेटफॉर्म का उपयोग करने पर आप इन शर्तों से सहमत होते हैं।",

      acceptance: "शर्तों की स्वीकृति",
      acceptanceP1:
        "MaxiGo Partner Platform का उपयोग करना, अकाउंट बनाना या MaxiGo पर प्रोडक्ट्स/सर्विसेज लिस्ट करना इन Terms & Conditions की स्वीकृति माना जाएगा।",
      acceptanceP2:
        "यदि Partner इन शर्तों से सहमत नहीं है, तो उसे MaxiGo Partner Platform का उपयोग नहीं करना चाहिए।",

      partnerAccount: "पार्टनर अकाउंट",
      partnerAccountP:
        "अकाउंट रजिस्ट्रेशन के समय Partner को सही और सटीक बिज़नेस जानकारी देनी होगी।",
      businessNameCorrect: "बिज़नेस का नाम सही होना चाहिए।",
      validMobileEmail: "मान्य मोबाइल नंबर और ईमेल देना आवश्यक है।",
      addressAccurate: "बिज़नेस का पता सही होना चाहिए।",
      bankInfoCorrect: "बैंक की जानकारी सही होनी चाहिए।",
      credentialsSecure:
        "लॉगिन क्रेडेंशियल्स को सुरक्षित रखना Partner की जिम्मेदारी है।",

      businessInformation: "बिज़नेस की जानकारी",
      businessInfoP:
        "Partner को अपने बिज़नेस की सही जानकारी देनी होगी। गलत, भ्रामक या अनधिकृत जानकारी देना प्रतिबंधित है।",
      verifyBusiness:
        "आवश्यक होने पर MaxiGo बिज़नेस जानकारी को सत्यापित कर सकता है।",

      productsMenu: "प्रोडक्ट्स और मेन्यू",
      productsMenuP:
        "Partner अपने बिज़नेस प्रकार के अनुसार फूड, किराना या अन्य अनुमत प्रोडक्ट्स जोड़ सकता है।",
      productNameCorrect: "प्रोडक्ट का नाम सही होना चाहिए।",
      productPriceCorrect: "प्रोडक्ट की कीमत सही होनी चाहिए।",
      imageNotMisleading: "प्रोडक्ट इमेज भ्रामक नहीं होनी चाहिए।",
      availabilityUpdated: "Availability status अपडेट रखना चाहिए।",
      outOfStock: "स्टॉक खत्म होने पर प्रोडक्ट को समय पर unavailable करें।",
      prohibitedProducts: "कानून द्वारा प्रतिबंधित प्रोडक्ट्स लिस्ट न करें।",

      storeOnlineOffline: "स्टोर ऑनलाइन / ऑफलाइन",
      storeOnlineOfflineP:
        "Partner अपने Store को Online या Offline कर सकता है।",
      online: "ऑनलाइन:",
      onlineText: "नए ऑर्डर्स प्राप्त किए जा सकते हैं।",
      offline: "ऑफलाइन:",
      offlineText: "नए ऑर्डर्स प्राप्त नहीं होंगे।",
      completeActiveOrders:
        "ऑफलाइन होने से पहले चल रहे ऑर्डर्स को सही तरीके से पूरा करना Partner की जिम्मेदारी है।",

      orders: "ऑर्डर्स",
      ordersP:
        "Partner से अपेक्षा की जाती है कि प्राप्त ऑर्डर्स को समय पर प्रोसेस करे।",
      new: "नया",
      accepted: "स्वीकार किया गया",
      preparing: "तैयार किया जा रहा है",
      ready: "तैयार",
      pickedUp: "पिकअप हो गया",
      orderDelay:
        "Partner को ऑर्डर्स को अनावश्यक रूप से देर या बार-बार रिजेक्ट नहीं करना चाहिए।",

      cancellationRejection: "ऑर्डर कैंसिलेशन और रिजेक्शन",
      cancellationP:
        "यदि Partner किसी ऑर्डर को रिजेक्ट या कैंसिल करता है, तो उसका कारण उचित होना चाहिए।",
      repeatedCancellation:
        "बार-बार कैंसिलेशन, रिजेक्शन या अनुचित देरी होने पर MaxiGo अकाउंट परफॉर्मेंस की समीक्षा कर सकता है।",

      pricingCommission: "प्राइसिंग और कमीशन",
      pricingP:
        "Partner को MaxiGo Partner Panel में प्रोडक्ट/सर्विस की कीमत सही तरीके से अपडेट रखनी होगी।",
      commissionP:
        "MaxiGo की लागू कमीशन या प्लेटफॉर्म फीस Partner Agreement और लागू commercial terms के अनुसार हो सकती है।",
      orderValue: "ऑर्डर वैल्यू",
      maxigoCommission: "MaxiGo कमीशन",
      partnerEarning: "पार्टनर कमाई",
      exampleNote:
        "* यह केवल एक उदाहरण है। वास्तविक कमीशन Partner Agreement और लागू commercial terms के अनुसार बदल सकता है।",

      paymentsPayouts: "पेमेंट और पेआउट",
      paymentsP:
        "ग्राहक का पेमेंट MaxiGo के supported payment system/payment gateway के माध्यम से प्रोसेस किया जा सकता है।",
      payoutP:
        "Partner payout के लिए valid bank account या लागू payout method देना आवश्यक हो सकता है।",
      bankDetailsAccurate: "बैंक अकाउंट की जानकारी सही होनी चाहिए।",
      accountHolderCorrect: "अकाउंट होल्डर की जानकारी सही होनी चाहिए।",
      ifscCorrect: "IFSC और अन्य payment details सही होनी चाहिए।",
      kycRequired: "यदि आवश्यक हो तो KYC verification पूरा करना होगा।",

      quality: "फूड और प्रोडक्ट क्वालिटी",
      qualityP:
        "फूड या अन्य प्रोडक्ट्स की क्वालिटी, सुरक्षा, पैकेजिंग, हाइजीन और लागू कानूनी आवश्यकताओं की जिम्मेदारी संबंधित Partner की होगी।",
      complaintsP:
        "Customer complaints या quality-related issues होने पर Partner को आवश्यकतानुसार MaxiGo के साथ सहयोग करना होगा।",

      prohibitedActivities: "प्रतिबंधित प्रोडक्ट्स और गतिविधियाँ",
      prohibitedP:
        "कानून या MaxiGo द्वारा प्रतिबंधित products/services को प्लेटफॉर्म पर लिस्ट या बेच नहीं सकते।",
      illegalProducts: "अवैध प्रोडक्ट्स",
      fraudulentProducts: "धोखाधड़ी वाले प्रोडक्ट्स",
      counterfeitProducts: "नकली प्रोडक्ट्स",
      unauthorizedMedicines: "अनधिकृत दवाइयाँ",
      restrictedProducts: "अन्य कानूनी रूप से प्रतिबंधित प्रोडक्ट्स",
      lawsResponsibility:
        "लागू कानून और नियमों का पालन करना Partner की जिम्मेदारी है।",

      customerInformation: "ग्राहक जानकारी",
      customerInfoP:
        "Partner को ऑर्डर पूरा करने के लिए आवश्यक ग्राहक जानकारी मिल सकती है। इस जानकारी का उपयोग केवल ऑर्डर पूरा करने और अधिकृत बिज़नेस उद्देश्य के लिए किया जाना चाहिए।",
      customerNoShare:
        "ग्राहक जानकारी अनधिकृत व्यक्तियों के साथ साझा, बेची या गलत तरीके से उपयोग नहीं की जानी चाहिए।",

      suspensionTermination: "अकाउंट सस्पेंशन और समाप्ति",
      suspensionP:
        "Terms का उल्लंघन, धोखाधड़ी, बार-बार ऑर्डर समस्याएँ, भ्रामक जानकारी या लागू कानून के उल्लंघन की स्थिति में MaxiGo लागू agreement और कानून के अधीन Partner account को suspend या terminate कर सकता है।",

      responsibilities: "पार्टनर की जिम्मेदारियाँ",
      keepBusinessUpdated: "बिज़नेस की जानकारी अपडेट रखें।",
      keepProductsUpdated: "प्रोडक्ट्स और कीमतें अपडेट रखें।",
      processOrdersTime: "ऑर्डर्स को समय पर प्रोसेस करें।",
      prepareOrders: "ग्राहक ऑर्डर्स सही तरीके से तैयार करें।",
      followLaws: "लागू कानूनों का पालन करें।",
      secureCredentials: "अकाउंट क्रेडेंशियल्स सुरक्षित रखें।",
      cooperateSupport: "आवश्यक होने पर MaxiGo support team के साथ सहयोग करें।",

      changesTerms: "शर्तों में बदलाव",
      changesP:
        "बिज़नेस आवश्यकताओं, तकनीक या लागू कानूनों में बदलाव होने पर MaxiGo इन Terms & Conditions में बदलाव कर सकता है।",
      updatedTerms:
        "प्लेटफॉर्म पर प्रकाशित होने के बाद अपडेटेड शर्तें लागू हो सकती हैं।",

      supportContact: "सपोर्ट और संपर्क",
      supportP:
        "अकाउंट, ऑर्डर्स, पेमेंट्स या प्लेटफॉर्म से जुड़ी समस्या के लिए Partner MaxiGo Support से संपर्क कर सकता है।",
      emailSupport: "ईमेल सपोर्ट",
      supportEmail: "support@maxigo.in",
      partnerSupport: "पार्टनर सपोर्ट",
      availablePanel: "Partner Panel के माध्यम से उपलब्ध",

      partnerAgreement: "पार्टनर एग्रीमेंट",
      agreementP:
        "MaxiGo Partner Platform का उपयोग करके आप पुष्टि करते हैं कि आपने ऊपर दिए गए Terms & Conditions को पढ़ और स्वीकार कर लिया है।",
      backToPanel: "← Partner Panel पर वापस जाएँ",
      partnerPlatform: "पार्टनर प्लेटफॉर्म",
      copyright: "© 2026 MaxiGo. सर्वाधिकार सुरक्षित।",
      privacyPolicy: "प्राइवेसी पॉलिसी",
      refundCancellation: "रिफंड और कैंसिलेशन",
    },

    mr: {
      backToMaxiGoPartner: "← MaxiGo Partner वर परत जा",
      partner: "पार्टनर",
      termsConditions: "अटी आणि शर्ती",
      heroSubtitle: "MaxiGo Partner Platform वापरण्याच्या अटी व नियम",
      lastUpdated: "शेवटचे अपडेट: 09 सप्टेंबर, 2026",
      pleaseRead: "कृपया या अटी काळजीपूर्वक वाचा",
      noticeText:
        "MaxiGo Partner Panel वापरण्यापूर्वी या Terms & Conditions काळजीपूर्वक वाचा. Partner म्हणून रजिस्टर केल्यास किंवा प्लॅटफॉर्म वापरल्यास तुम्ही या अटींशी सहमत होता.",

      acceptance: "अटींची स्वीकृती",
      acceptanceP1:
        "MaxiGo Partner Platform वापरणे, अकाउंट तयार करणे किंवा MaxiGo वर products/services list करणे म्हणजे Partner ने या Terms & Conditions स्वीकारल्या आहेत असे मानले जाईल.",
      acceptanceP2:
        "जर Partner या अटींशी सहमत नसेल तर त्याने MaxiGo Partner Platform वापरू नये.",

      partnerAccount: "पार्टनर अकाउंट",
      partnerAccountP:
        "अकाउंट रजिस्ट्रेशन करताना Partner ने योग्य आणि अचूक बिझनेस माहिती देणे आवश्यक आहे.",
      businessNameCorrect: "बिझनेसचे नाव योग्य असणे आवश्यक आहे.",
      validMobileEmail: "वैध मोबाईल नंबर आणि ईमेल देणे आवश्यक आहे.",
      addressAccurate: "बिझनेसचा पत्ता अचूक असावा.",
      bankInfoCorrect: "बँकेची माहिती योग्य असणे आवश्यक आहे.",
      credentialsSecure:
        "लॉगिन क्रेडेन्शियल्स सुरक्षित ठेवण्याची जबाबदारी Partner ची आहे.",

      businessInformation: "बिझनेसची माहिती",
      businessInfoP:
        "Partner ने आपल्या बिझनेसबद्दल योग्य माहिती देणे आवश्यक आहे. चुकीची, दिशाभूल करणारी किंवा अनधिकृत माहिती देणे प्रतिबंधित आहे.",
      verifyBusiness:
        "आवश्यक असल्यास MaxiGo ला बिझनेस माहिती verify करण्याचा अधिकार राहील.",

      productsMenu: "प्रोडक्ट्स आणि मेन्यू",
      productsMenuP:
        "Partner आपल्या बिझनेस प्रकारानुसार food, grocery किंवा इतर permitted products जोडू शकतो.",
      productNameCorrect: "प्रोडक्टचे नाव योग्य असावे.",
      productPriceCorrect: "प्रोडक्टची किंमत योग्य असावी.",
      imageNotMisleading: "प्रोडक्टची इमेज दिशाभूल करणारी नसावी.",
      availabilityUpdated: "Availability status अपडेट ठेवावा.",
      outOfStock: "स्टॉक संपलेले प्रोडक्ट वेळेवर unavailable करावे.",
      prohibitedProducts: "कायद्याने प्रतिबंधित प्रोडक्ट्स लिस्ट करू नयेत.",

      storeOnlineOffline: "स्टोअर ऑनलाइन / ऑफलाइन",
      storeOnlineOfflineP:
        "Partner आपले Store Online किंवा Offline करू शकतो.",
      online: "ऑनलाइन:",
      onlineText: "नवीन ऑर्डर्स मिळू शकतात.",
      offline: "ऑफलाइन:",
      offlineText: "नवीन ऑर्डर्स मिळणार नाहीत.",
      completeActiveOrders:
        "Offline करण्यापूर्वी सुरू असलेल्या ऑर्डर्स योग्यरित्या पूर्ण करण्याची जबाबदारी Partner ची असेल.",

      orders: "ऑर्डर्स",
      ordersP:
        "Partner ने मिळालेल्या ऑर्डर्स वेळेवर process करणे अपेक्षित आहे.",
      new: "नवीन",
      accepted: "स्वीकारले",
      preparing: "तयार करत आहे",
      ready: "तयार",
      pickedUp: "पिकअप झाले",
      orderDelay:
        "Partner ने ऑर्डर्सला अनावश्यक उशीर किंवा वारंवार reject करू नये.",

      cancellationRejection: "ऑर्डर कॅन्सलेशन आणि रिजेक्शन",
      cancellationP:
        "Partner कडून ऑर्डर reject किंवा cancel झाल्यास त्याचे कारण योग्य असणे अपेक्षित आहे.",
      repeatedCancellation:
        "वारंवार cancellations, rejections किंवा unreasonable delays झाल्यास MaxiGo account performance चे review करू शकते.",

      pricingCommission: "प्राइसिंग आणि कमिशन",
      pricingP:
        "Partner ने MaxiGo Partner Panel मध्ये products/services च्या किमती योग्यरित्या maintain करणे आवश्यक आहे.",
      commissionP:
        "MaxiGo कडून लागू असलेले commission किंवा platform charges Partner agreement आणि applicable commercial terms नुसार लागू होऊ शकतात.",
      orderValue: "ऑर्डर व्हॅल्यू",
      maxigoCommission: "MaxiGo कमिशन",
      partnerEarning: "पार्टनर कमाई",
      exampleNote:
        "* हा फक्त example आहे. Actual commission Partner agreement आणि applicable commercial terms नुसार बदलू शकतो.",

      paymentsPayouts: "पेमेंट आणि पेआउट",
      paymentsP:
        "Customer payment MaxiGo च्या supported payment system/payment gateway द्वारे process होऊ शकते.",
      payoutP:
        "Partner payout साठी valid bank account किंवा applicable payout method देणे आवश्यक असू शकते.",
      bankDetailsAccurate: "बँक अकाउंटची माहिती अचूक असावी.",
      accountHolderCorrect: "अकाउंट होल्डरची माहिती योग्य असावी.",
      ifscCorrect: "IFSC आणि इतर payment details योग्य असावेत.",
      kycRequired: "आवश्यक असल्यास KYC verification पूर्ण करणे आवश्यक आहे.",

      quality: "फूड आणि प्रोडक्ट क्वालिटी",
      qualityP:
        "Food किंवा इतर products ची quality, safety, packaging, hygiene आणि लागू कायदेशीर requirements पाळण्याची जबाबदारी संबंधित Partner ची असेल.",
      complaintsP:
        "Customer complaints किंवा quality-related issues असल्यास Partner ने आवश्यक ते MaxiGo सोबत cooperation करणे अपेक्षित आहे.",

      prohibitedActivities: "प्रतिबंधित प्रोडक्ट्स आणि अॅक्टिव्हिटीज",
      prohibitedP:
        "कायद्याने किंवा MaxiGo ने prohibited केलेले products/services प्लॅटफॉर्मवर list किंवा sell करता येणार नाहीत.",
      illegalProducts: "बेकायदेशीर प्रोडक्ट्स",
      fraudulentProducts: "फसवणूक करणारे प्रोडक्ट्स",
      counterfeitProducts: "बनावट प्रोडक्ट्स",
      unauthorizedMedicines: "अनधिकृत औषधे",
      restrictedProducts: "इतर कायदेशीररीत्या प्रतिबंधित प्रोडक्ट्स",
      lawsResponsibility:
        "लागू कायदे आणि नियमांचे पालन करणे Partner ची जबाबदारी आहे.",

      customerInformation: "ग्राहक माहिती",
      customerInfoP:
        "Order fulfilment साठी आवश्यक ग्राहक माहिती Partner ला मिळू शकते. ही माहिती फक्त order fulfilment आणि authorized business purpose साठी वापरावी.",
      customerNoShare:
        "ग्राहक माहिती अनधिकृत व्यक्तींसोबत share, sell किंवा misuse करू नये.",

      suspensionTermination: "अकाउंट सस्पेंशन आणि टर्मिनेशन",
      suspensionP:
        "Terms चे violation, fraudulent activity, repeated order issues, misleading information किंवा applicable law violation आढळल्यास MaxiGo applicable agreement आणि कायद्यानुसार Partner account suspend किंवा terminate करू शकते.",

      responsibilities: "पार्टनरच्या जबाबदाऱ्या",
      keepBusinessUpdated: "बिझनेस माहिती अपडेट ठेवणे.",
      keepProductsUpdated: "Products आणि prices अपडेट ठेवणे.",
      processOrdersTime: "ऑर्डर्स वेळेवर process करणे.",
      prepareOrders: "Customer orders योग्यरित्या तयार करणे.",
      followLaws: "लागू कायद्यांचे पालन करणे.",
      secureCredentials: "Account credentials सुरक्षित ठेवणे.",
      cooperateSupport: "आवश्यक असल्यास MaxiGo support team सोबत cooperation करणे.",

      changesTerms: "अटींमध्ये बदल",
      changesP:
        "Business requirements, technology किंवा applicable laws मध्ये बदल झाल्यास MaxiGo या Terms & Conditions मध्ये बदल करू शकते.",
      updatedTerms:
        "Platform वर publish केल्यानंतर updated terms लागू होऊ शकतात.",

      supportContact: "सपोर्ट आणि संपर्क",
      supportP:
        "Account, orders, payments किंवा platform संबंधित समस्या असल्यास Partner MaxiGo Support शी संपर्क करू शकतो.",
      emailSupport: "ईमेल सपोर्ट",
      supportEmail: "support@maxigo.in",
      partnerSupport: "पार्टनर सपोर्ट",
      availablePanel: "Partner Panel द्वारे उपलब्ध",

      partnerAgreement: "पार्टनर करार",
      agreementP:
        "MaxiGo Partner Platform वापरून तुम्ही वरील Terms & Conditions वाचल्या असून त्या मान्य करता.",
      backToPanel: "← Partner Panel वर परत जा",
      partnerPlatform: "पार्टनर प्लॅटफॉर्म",
      copyright: "© 2026 MaxiGo. सर्व हक्क राखीव.",
      privacyPolicy: "प्रायव्हसी पॉलिसी",
      refundCancellation: "रिफंड आणि कॅन्सलेशन",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className="terms-page">
      {/* Header */}
      <header className="terms-header">
        <div className="terms-header-inner">
          <button className="terms-back-btn" onClick={onBack}>
            {t.backToMaxiGoPartner}
          </button>

          <div className="terms-brand">
            <div className="terms-brand-icon">M</div>

            <div>
              <strong>MaxiGo</strong>
              <span>{t.partner}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="terms-container">
        {/* Hero */}
        <section className="terms-hero">
          <div className="terms-hero-icon">📄</div>

          <h1>{t.termsConditions}</h1>

          <p>{t.heroSubtitle}</p>

          <span className="terms-updated">
            {t.lastUpdated}
          </span>
        </section>

        {/* Important Notice */}
        <div className="terms-notice">
          <div className="notice-icon">ℹ️</div>

          <div>
            <strong>{t.pleaseRead}</strong>

            <p>{t.noticeText}</p>
          </div>
        </div>

        {/* 1 */}
        <section className="terms-section">
          <span className="terms-number">01</span>

          <div>
            <h2>{t.acceptance}</h2>

            <p>{t.acceptanceP1}</p>
            <p>{t.acceptanceP2}</p>
          </div>
        </section>

        {/* 2 */}
        <section className="terms-section">
          <span className="terms-number">02</span>

          <div>
            <h2>{t.partnerAccount}</h2>

            <p>{t.partnerAccountP}</p>

            <ul>
              <li>{t.businessNameCorrect}</li>
              <li>{t.validMobileEmail}</li>
              <li>{t.addressAccurate}</li>
              <li>{t.bankInfoCorrect}</li>
              <li>{t.credentialsSecure}</li>
            </ul>
          </div>
        </section>

        {/* 3 */}
        <section className="terms-section">
          <span className="terms-number">03</span>

          <div>
            <h2>{t.businessInformation}</h2>

            <p>{t.businessInfoP}</p>
            <p>{t.verifyBusiness}</p>
          </div>
        </section>

        {/* 4 */}
        <section className="terms-section">
          <span className="terms-number">04</span>

          <div>
            <h2>{t.productsMenu}</h2>

            <p>{t.productsMenuP}</p>

            <ul>
              <li>{t.productNameCorrect}</li>
              <li>{t.productPriceCorrect}</li>
              <li>{t.imageNotMisleading}</li>
              <li>{t.availabilityUpdated}</li>
              <li>{t.outOfStock}</li>
              <li>{t.prohibitedProducts}</li>
            </ul>
          </div>
        </section>

        {/* 5 */}
        <section className="terms-section">
          <span className="terms-number">05</span>

          <div>
            <h2>{t.storeOnlineOffline}</h2>

            <p>{t.storeOnlineOfflineP}</p>

            <ul>
              <li>
                <strong>{t.online}</strong>{" "}
                {t.onlineText}
              </li>

              <li>
                <strong>{t.offline}</strong>{" "}
                {t.offlineText}
              </li>

              <li>{t.completeActiveOrders}</li>
            </ul>
          </div>
        </section>

        {/* 6 */}
        <section className="terms-section">
          <span className="terms-number">06</span>

          <div>
            <h2>{t.orders}</h2>

            <p>{t.ordersP}</p>

            <div className="status-flow">
              <div>
                <span>1</span>
                <strong>{t.new}</strong>
              </div>

              <div className="flow-arrow">→</div>

              <div>
                <span>2</span>
                <strong>{t.accepted}</strong>
              </div>

              <div className="flow-arrow">→</div>

              <div>
                <span>3</span>
                <strong>{t.preparing}</strong>
              </div>

              <div className="flow-arrow">→</div>

              <div>
                <span>4</span>
                <strong>{t.ready}</strong>
              </div>

              <div className="flow-arrow">→</div>

              <div>
                <span>5</span>
                <strong>{t.pickedUp}</strong>
              </div>
            </div>

            <p>{t.orderDelay}</p>
          </div>
        </section>

        {/* 7 */}
        <section className="terms-section">
          <span className="terms-number">07</span>

          <div>
            <h2>{t.cancellationRejection}</h2>

            <p>{t.cancellationP}</p>
            <p>{t.repeatedCancellation}</p>
          </div>
        </section>

        {/* 8 */}
        <section className="terms-section">
          <span className="terms-number">08</span>

          <div>
            <h2>{t.pricingCommission}</h2>

            <p>{t.pricingP}</p>
            <p>{t.commissionP}</p>

            <div className="calculation-box">
              <div>
                <span>{t.orderValue}</span>
                <strong>₹500</strong>
              </div>

              <div>
                <span>{t.maxigoCommission}</span>
                <strong>₹50</strong>
              </div>

              <div className="calculation-total">
                <span>{t.partnerEarning}</span>
                <strong>₹450</strong>
              </div>
            </div>

            <small>{t.exampleNote}</small>
          </div>
        </section>

        {/* 9 */}
        <section className="terms-section">
          <span className="terms-number">09</span>

          <div>
            <h2>{t.paymentsPayouts}</h2>

            <p>{t.paymentsP}</p>
            <p>{t.payoutP}</p>

            <ul>
              <li>{t.bankDetailsAccurate}</li>
              <li>{t.accountHolderCorrect}</li>
              <li>{t.ifscCorrect}</li>
              <li>{t.kycRequired}</li>
            </ul>
          </div>
        </section>

        {/* 10 */}
        <section className="terms-section">
          <span className="terms-number">10</span>

          <div>
            <h2>{t.quality}</h2>

            <p>{t.qualityP}</p>
            <p>{t.complaintsP}</p>
          </div>
        </section>

        {/* 11 */}
        <section className="terms-section">
          <span className="terms-number">11</span>

          <div>
            <h2>{t.prohibitedActivities}</h2>

            <p>{t.prohibitedP}</p>

            <ul>
              <li>{t.illegalProducts}</li>
              <li>{t.fraudulentProducts}</li>
              <li>{t.counterfeitProducts}</li>
              <li>{t.unauthorizedMedicines}</li>
              <li>{t.restrictedProducts}</li>
            </ul>

            <p>{t.lawsResponsibility}</p>
          </div>
        </section>

        {/* 12 */}
        <section className="terms-section">
          <span className="terms-number">12</span>

          <div>
            <h2>{t.customerInformation}</h2>

            <p>{t.customerInfoP}</p>
            <p>{t.customerNoShare}</p>
          </div>
        </section>

        {/* 13 */}
        <section className="terms-section">
          <span className="terms-number">13</span>

          <div>
            <h2>{t.suspensionTermination}</h2>

            <p>{t.suspensionP}</p>
          </div>
        </section>

        {/* 14 */}
        <section className="terms-section">
          <span className="terms-number">14</span>

          <div>
            <h2>{t.responsibilities}</h2>

            <ul>
              <li>{t.keepBusinessUpdated}</li>
              <li>{t.keepProductsUpdated}</li>
              <li>{t.processOrdersTime}</li>
              <li>{t.prepareOrders}</li>
              <li>{t.followLaws}</li>
              <li>{t.secureCredentials}</li>
              <li>{t.cooperateSupport}</li>
            </ul>
          </div>
        </section>

        {/* 15 */}
        <section className="terms-section">
          <span className="terms-number">15</span>

          <div>
            <h2>{t.changesTerms}</h2>

            <p>{t.changesP}</p>
            <p>{t.updatedTerms}</p>
          </div>
        </section>

        {/* 16 */}
        <section className="terms-section">
          <span className="terms-number">16</span>

          <div>
            <h2>{t.supportContact}</h2>

            <p>{t.supportP}</p>

            <div className="contact-box">
              <div>
                <span>📧</span>

                <div>
                  <small>{t.emailSupport}</small>
                  <strong>{t.supportEmail}</strong>
                </div>
              </div>

              <div>
                <span>📞</span>

                <div>
                  <small>{t.partnerSupport}</small>
                  <strong>{t.availablePanel}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agreement */}
        <section className="terms-agreement">
          <div className="agreement-icon">✓</div>

          <div>
            <h2>{t.partnerAgreement}</h2>

            <p>{t.agreementP}</p>
          </div>
        </section>

        {/* Bottom Buttons */}
        <div className="terms-bottom-actions">
          <button
            className="terms-back-main"
            onClick={onBack}
          >
            {t.backToPanel}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="terms-footer">
        <div className="terms-footer-inner">
          <div>
            <strong>MaxiGo</strong>
            <span>{t.partnerPlatform}</span>
          </div>

          <p>{t.copyright}</p>

          <div className="terms-footer-links">
            <span className="active">
              {t.termsConditions}
            </span>

            <span>{t.privacyPolicy}</span>
            <span>{t.refundCancellation}</span>
            <span>{t.partnerAgreement}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TermsConditions;
