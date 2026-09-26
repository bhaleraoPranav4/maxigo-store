import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

  /* =========================================================
     ENGLISH
  ========================================================= */

  en: {

    /* Common */

    language: "Language",
    english: "English",
    hindi: "Hindi",
    marathi: "Marathi",

    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    close: "Close",
    back: "Back",
    search: "Search",
    viewAll: "View All",

    yes: "Yes",
    no: "No",
    confirm: "Confirm",
    loading: "Loading...",
    success: "Success",
    error: "Error",

    continue: "Continue",
    submit: "Submit",
    next: "Next",
    previous: "Previous",
    refresh: "Refresh",
    retry: "Retry",


    /* =====================================================
       SIDEBAR
    ===================================================== */

    dashboard: "Dashboard",
    orders: "Orders",
    products: "Food / Menu",
    foodMenu: "Food / Menu",
    earnings: "Earnings",
    orderHistory: "Order History",
    businessProfile: "Business Profile",
    settings: "Settings",
    logout: "Logout",


    /* =====================================================
       BUSINESS
    ===================================================== */

    business: "Business",

    restaurantHotel: "Restaurant / Hotel",
    kiranaStore: "Kirana Store",
    vegetablesFruits: "Vegetables & Fruits",
    chickenShop: "Chicken Shop",
    dairy: "Dairy",
    bakery: "Bakery",
    teaTapri: "Tea / Tapri",
    generalStore: "General Store",
    juiceCenter: "Juice Center",
    sweetShop: "Sweet Shop",


    /* =====================================================
       DASHBOARD
    ===================================================== */

    welcomeBack: "Welcome back",

    manageBusiness:
      "Manage your business from one place.",

    dashboardDescription:
      "Manage your business, products and orders from here.",

    businessCategoryDescription:
      "Your MaxiGo partner business category.",

    online: "Online",
    offline: "Offline",

    storeOnline: "Store Online",
    storeOffline: "Store Offline",

    goOnline: "Go Online",
    goOffline: "Go Offline",

    newOrders: "New Orders",

    preparing: "Preparing",

    ready: "Ready",

    completed: "Completed",

    todayEarnings: "Today's Earnings",

    totalOrders: "Total Orders",

    pendingOrders: "Pending Orders",

    recentOrders: "Recent Orders",

    noNewOrders:
      "No new orders.",

    storeIsOffline:
      "Your store is currently offline.",

    goOnlineToReceive:
      "Go online to receive new orders.",

    goOnlineToReceiveOrders:
      "Go Online to receive new customer orders.",

    waitingForAction:
      "Waiting for action",

    currentlyPreparing:
      "Currently preparing",

    todaysCompletedOrders:
      "Today's completed orders",

    ordersWaitingAction:
      "Orders waiting for your action",

    newOrdersWillAppear:
      "New customer orders will appear here.",

    storeOffline:
      "Store is offline",

    offlineAcceptMessage:
      "Store is Offline. Go Online to accept new orders.",

    offlineMessage:
      "Store is Offline.",

    new:
      "NEW",

    quickActions:
      "Quick Actions",

    manageBusinessQuickly:
      "Manage your business quickly.",

    addFoodMenu:
      "Add Food / Menu",

    addProduct:
      "Add Product",

    addNewItem:
      "Add a new item",

    manageOrders:
      "Manage Orders",

    viewCustomerOrders:
      "View customer orders",

    updateBusinessDetails:
      "Update business details",

    productSummary:
      "Product Summary",

    currentInventory:
      "Your current inventory",

    manage:
      "Manage",

    totalItems:
      "Total Items",

    available:
      "Available",

    outOfStock:
      "Out of Stock",

    activeOrders:
      "Active Orders",

    ordersBeingProcessed:
      "Orders currently being processed",

    noActiveOrders:
      "No active orders right now.",

    markReady:
      "Mark Ready",

    riderWillPickup:
      "Rider will pick up",

    waitingForRider:
      "Waiting for Rider",


    /* =====================================================
       ORDERS
    ===================================================== */

    order: "Order",

    orderId: "Order ID",

    customer: "Customer",

    items: "Items",

    amount: "Amount",

    status: "Status",

    time: "Time",

    accept: "Accept",

    reject: "Reject",

    preparingOrder:
      "Preparing",

    foodReady:
      "Food / Product Ready",

    pickedUp:
      "Picked Up",

    delivered:
      "Delivered",

    rejected:
      "Rejected",

    cancelled:
      "Cancelled",

    acceptOrder:
      "Accept Order",

    rejectOrder:
      "Reject Order",

    markPreparing:
      "Mark as Preparing",

    orderDetails:
      "Order Details",

    customerDetails:
      "Customer Details",

    deliveryAddress:
      "Delivery Address",

    phoneNumber:
      "Phone Number",

    noOrders:
      "No orders found",


    /* =====================================================
       PRODUCTS
    ===================================================== */

    product:
      "Product",

    productsList:
      "Products",

    editProduct:
      "Edit Product",

    deleteProduct:
      "Delete Product",

    productName:
      "Product Name",

    productDescription:
      "Product Description",

    price:
      "Price",

    availability:
      "Availability",

    productImage:
      "Product Image",

    uploadImage:
      "Upload Image",

    saveProduct:
      "Save Product",

    updateProduct:
      "Update Product",

    noProducts:
      "No products found",


    /* =====================================================
       EARNINGS
    ===================================================== */

    totalEarnings:
      "Total Earnings",

    partnerEarnings:
      "Partner Earnings",

    commission:
      "MaxiGo Commission",

    grossAmount:
      "Gross Amount",

    availableForPayout:
      "Available for Payout",

    requestPayout:
      "Request Payout",

    bankAccount:
      "Bank Account",

    settlement:
      "Settlement",

    settlementHistory:
      "Settlement History",

    downloadStatement:
      "Download Statement",

    monthlyEarnings:
      "Monthly Earnings",

    weeklyEarnings:
      "Weekly Earnings",


    /* Extra Earnings / Payout */

    earningsDescription:
      "Track your earnings, commission and settlements.",

    afterMaxigoCommission:
      "After MaxiGo commission",

    todayEarningsLabel:
      "Today's Earnings",

    fromCompletedOrders:
      "From completed orders",

    thisMonth:
      "This Month",

    currentMonthEarnings:
      "Current month earnings",

    pendingPayout:
      "Pending Payout",

    awaitingSettlement:
      "Awaiting settlement",

    availableForPayoutText:
      "Available for Payout",

    availableTransferText:
      "Amount available to transfer to your bank account.",

    payoutBankDescription:
      "Your payout will be transferred to this account.",

    added:
      "Added",

    notAdded:
      "Not Added",

    accountHolder:
      "Account Holder",

    bankName:
      "Bank Name",

    accountNumber:
      "Account Number",

    ifscCode:
      "IFSC Code",

    branch:
      "Branch",

    kycStatus:
      "KYC Status",

    notAvailable:
      "Not Available",

    bankAccountNotAdded:
      "Bank Account Not Added",

    addBankToReceive:
      "Add your bank account to receive MaxiGo payouts.",

    earningsOverview:
      "Earnings Overview",

    selectedPeriodEarnings:
      "Your earnings for the selected period.",

    week:
      "Week",

    month:
      "Month",

    earningsBreakdown:
      "Earnings Breakdown",

    orderPaymentSummary:
      "Order payment summary.",

    grossOrderValue:
      "Gross Order Value",

    maxigoCommission:
      "MaxiGo Commission",

    completedOrders:
      "Completed Orders",

    totalPaidOut:
      "Total Paid Out",

    yourEarnings:
      "Your Earnings",

    payoutSettlementHistory:
      "Payout & Settlement History",

    recentPayoutsDescription:
      "Your recent payouts and completed order earnings.",

    noEarningsYet:
      "No Earnings Yet",

    completedOrdersAppear:
      "Your completed orders will appear here.",

    settled:
      "Settled",

    availableAmount:
      "Available Amount",

    payoutAccount:
      "Payout Account",

    confirmPayout:
      "Confirm Payout",

    confirmPayoutDescription:
      "Confirm the amount you want to receive in your registered bank account.",

    addBankFirst:
      "Please add your bank account details first.",

    noPayoutAvailable:
      "No amount is currently available for payout.",

    payoutRequestOf:
      "Payout request of",

    payoutSubmitted:
      "submitted successfully.",

    statementBackendMessage:
      "Statement download will be connected with backend.",

    payoutHistoryBackendMessage:
      "Complete payout history will be connected with backend.",

    dayMon:
      "Mon",

    dayTue:
      "Tue",

    dayWed:
      "Wed",

    dayThu:
      "Thu",

    dayFri:
      "Fri",

    daySat:
      "Sat",

    daySun:
      "Sun",


    /* =====================================================
       BUSINESS PROFILE
    ===================================================== */

    profile:
      "Profile",

    businessName:
      "Business Name",

    ownerName:
      "Owner Name",

    email:
      "Email",

    address:
      "Address",

    city:
      "City",

    state:
      "State",

    pincode:
      "Pincode",

    openingTime:
      "Opening Time",

    closingTime:
      "Closing Time",

    businessType:
      "Business Type",

    businessAddress:
      "Business Address",

    businessHours:
      "Business Hours",

    location:
      "Location",

    latitude:
      "Latitude",

    longitude:
      "Longitude",

    searchLocation:
      "Search Location",

    currentLocation:
      "Current Location",

    selectLocation:
      "Select Location",

    saveChanges:
      "Save Changes",

    changesSaved:
      "Changes saved successfully.",

    partnerVerified:
      "Partner Verified",


    /* =====================================================
       SETTINGS
    ===================================================== */

    managePreferences:
      "Manage your partner account and preferences.",

    orderSettings:
      "Order Settings",

    controlOrders:
      "Control how you receive and manage orders.",

    acceptOrders:
      "Accept Orders",

    allowCustomers:
      "Allow customers to place new orders.",

    autoAcceptOrders:
      "Auto Accept Orders",

    automaticallyAccept:
      "Automatically accept incoming orders.",

    notifications:
      "Notifications",

    manageNotifications:
      "Manage your order notification preferences.",

    newOrderAlerts:
      "New Order Alerts",

    getNotified:
      "Get notified when a new order arrives.",

    orderSound:
      "Order Sound",

    playSound:
      "Play sound for new order alerts.",

    chooseLanguage:
      "Choose your preferred language.",

    changePassword:
      "Change Password",

    updatePassword:
      "Update your partner account password.",

    currentPassword:
      "Current Password",

    newPassword:
      "New Password",

    confirmPassword:
      "Confirm Password",

    changePasswordBtn:
      "Change Password",


    /* =====================================================
       ACCOUNT
    ===================================================== */

    account:
      "Account",

    partner:
      "Partner",

    loginSessions:
      "Login Sessions",

    devicesLoggedIn:
      "Devices currently logged into your account.",

    currentDevice:
      "Current device",

    activeNow:
      "Active now",

    logoutOtherDevices:
      "Log out other devices",

    needHelp:
      "Need Help?",

    contactSupportText:
      "Contact MaxiGo Partner Support.",

    contactSupport:
      "Contact Support",


    /* =====================================================
       DELETE ACCOUNT
    ===================================================== */

    dangerZone:
      "Danger Zone",

    deleteAccount:
      "Delete Account",

    deleteAccountDescription:
      "Permanently remove your MaxiGo Partner account.",

    deleteAccountWarning:
      "This action cannot be undone.",

    deleteAccountInfo:
      "Deleting your account will sign you out and remove your saved partner account information from this demo application.",

    deleteMyAccount:
      "Delete My Account",

    deleteAccountQuestion:
      "Delete Account?",

    deleteAccountConfirmation:
      "Are you sure you want to permanently delete your MaxiGo Partner account?",

    pleaseNote:
      "Please Note",

    deleteModalWarning:
      "This action cannot be undone. Your account session and locally saved partner data will be removed.",

    typeDeleteToConfirm:
      "Type DELETE to confirm",

    typeDelete:
      "Type DELETE",

    accountDeleteError:
      'Please type "DELETE" to confirm account deletion.',

    accountDeleteFailed:
      "Unable to delete account. Please try again.",


    /* =====================================================
       PASSWORD
    ===================================================== */

    fillPasswordFields:
      "Please fill all password fields.",

    passwordMismatch:
      "New password and confirm password do not match.",

    passwordLength:
      "New password must be at least 6 characters.",

    passwordChanged:
      "Password changed successfully.",


    /* =====================================================
       LOGIN / REGISTER
    ===================================================== */

    login:
      "Login",

    register:
      "Register",

    welcome:
      "Welcome to MaxiGo",

    phone:
      "Phone",

    password:
      "Password",

    confirmAccountPassword:
      "Confirm Password",

    forgotPassword:
      "Forgot Password?",

    createAccount:
      "Create Account",

    alreadyHaveAccount:
      "Already have an account?",

    dontHaveAccount:
      "Don't have an account?",


    /* =====================================================
       PRIVACY POLICY
    ===================================================== */

    backToMaxiGoPartner: "Back to MaxiGo Partner",
    privacyPolicy: "Privacy Policy",
    privacyHeroSubtitle: "How MaxiGo collects, uses and protects partner information.",
    lastUpdated: "Last Updated",
    privacyReadCarefully: "Please Read Carefully",
    privacyNoticeText: "This Privacy Policy explains how MaxiGo collects, uses, stores and protects information provided by partners while using the MaxiGo Partner Panel.",
    privacyInformationWeCollect: "Information We Collect",
    privacyInformationCollectText: "We collect information required to create and manage your partner account and provide MaxiGo services.",
    privacyPartnerBusinessName: "Partner Business Name",
    privacyMobileNumber: "Mobile Number",
    privacyEmailAddress: "Email Address",
    privacyBusinessAddress: "Business Address",
    privacyBusinessInformation: "Business Information",
    privacyBankPayout: "Bank and Payout Information",
    privacyProductsMenu: "Products and Menu Information",
    privacyOrderInformation: "Order Information",
    privacyAccountInformation: "Account Information",
    privacyAccountInformationText: "We collect account and login information needed to securely manage your MaxiGo Partner account.",
    privacyRegistrationInfo: "Registration Information",
    privacyLoginInformation: "Login Information",
    privacyBusinessDetails: "Business Details",
    privacyContactInformation: "Contact Information",
    privacyAccountSecurity: "Account Security",
    privacyAccountSecurityText: "We use appropriate security measures to protect your account information and prevent unauthorized access.",
    privacyLocationInformation: "Location Information",
    privacyLocationText: "Location information may be used when you provide a business location or use location-related features.",
    privacyBusinessLocation: "Business Location",
    privacyDeliveryLocation: "Delivery Location",
    privacyMapDirection: "Map and Direction Features",
    privacyLocationPermission: "Location Permission",
    privacyOrderInformationTitle: "Order Information",
    privacyOrderInfoText: "We process information related to customer orders placed with your business.",
    privacyOrderDetails: "Order Details",
    privacyProductsItems: "Products / Items",
    privacyOrderAmount: "Order Amount",
    privacyOrderStatus: "Order Status",
    privacyCustomerDelivery: "Customer and Delivery Information",
    privacyOrderTimestamps: "Order Timestamps",
    privacyOrderUsage: "Order Usage",
    privacyPaymentPayout: "Payment and Payout Information",
    privacyPaymentPayoutText: "Payment and payout information is used to process settlements and maintain accurate financial records.",
    privacyAccountHolderName: "Account Holder Name",
    privacyBankName: "Bank Name",
    privacyBankAccountInfo: "Bank Account Information",
    privacyIFSC: "IFSC Code",
    privacyUPI: "UPI ID",
    privacySettlementInfo: "Settlement Information",
    privacyPaymentSecurity: "Payment Security",
    privacyPaymentSecurityText: "Payment-related information is handled using appropriate security controls and authorized payment providers.",
    privacyHowWeUse: "How We Use Your Information",
    privacyHowWeUseText: "We use partner information to operate, maintain and improve MaxiGo services.",
    privacyManagePartnerAccount: "Manage your Partner Account",
    privacyProcessOrders: "Process and manage orders",
    privacyCoordinateDelivery: "Coordinate delivery operations",
    privacyProcessPayments: "Process payments and settlements",
    privacyCustomerPartnerSupport: "Provide customer and partner support",
    privacyMaintainSecurity: "Maintain platform security",
    privacyDetectFraud: "Detect and prevent fraud or misuse",
    privacyImproveService: "Improve MaxiGo services",
    privacyInformationSharing: "Information Sharing",
    privacyInformationSharingText1: "We may share information with service providers and partners when necessary to provide MaxiGo services.",
    privacyInformationSharingText2: "We may share information with payment, hosting, mapping, communication or other technology providers where required for service operation.",
    privacyInformationSharingText3: "We do not sell partner personal information.",
    privacyCustomerInformation: "Customer Information",
    privacyCustomerInformationText: "Customer information shown to partners is provided only for fulfilling and managing legitimate orders.",
    privacyCustomerAuthorized: "Use customer information only for authorized order and delivery activities.",
    privacyCustomerNoShare: "Do not share customer information with unauthorized persons.",
    privacyCustomerNoMisuse: "Do not misuse customer information for marketing, personal contact or other unauthorized purposes.",
    privacyCustomerAfterOrder: "Customer information must continue to be handled responsibly after an order is completed.",
    privacyDataSecurity: "Data Security",
    privacyDataSecurityText: "We take reasonable technical and organizational measures to protect information against unauthorized access, loss, misuse or disclosure.",
    privacySecureAuthentication: "Secure Authentication",
    privacyAccessControl: "Access Control",
    privacySecureCommunication: "Secure Communication",
    privacyDataProtection: "Data Protection",
    privacyNoRiskFreeSystem: "No online system can be guaranteed to be completely risk-free.",
    privacyCookies: "Cookies and Similar Technologies",
    privacyCookiesText: "MaxiGo may use cookies or similar technologies to maintain sessions, remember preferences and improve the user experience.",
    privacyCookiesSettings: "You can control cookies through supported browser settings where available.",
    privacyDataRetention: "Data Retention",
    privacyDataRetentionText: "We retain information for as long as reasonably necessary for business operations, legal requirements, dispute resolution and security.",
    privacyRetentionPeriod: "Retention Period",
    privacyDataDeletion: "Data Deletion",
    privacyDataDeletionText: "You may request deletion of your account and eligible personal information, subject to applicable legal, financial and operational requirements.",
    important: "Important",
    privacyDataDeletionImportant: "Some information may need to be retained where required by law, accounting, fraud prevention, dispute resolution or other legitimate obligations.",
    privacyThirdParty: "Third-Party Services",
    privacyThirdPartyText: "MaxiGo may use third-party services such as payment, hosting, mapping, analytics, messaging and authentication providers.",
    privacyThirdPartyPolicies: "Third-party services may have their own privacy policies and terms.",
    privacyChildren: "Children's Privacy",
    privacyChildrenText: "The MaxiGo Partner Panel is intended for business partners and is not directed toward children.",
    privacyChanges: "Changes to This Privacy Policy",
    privacyChangesText: "We may update this Privacy Policy when our services, technology or legal requirements change.",
    privacyUpdatedPolicy: "The latest version will be made available through the MaxiGo Partner Panel or website.",
    privacyContactQuestions: "Contact Us",
    privacyContactText: "If you have questions about this Privacy Policy or how your information is handled, please contact MaxiGo Partner Support.",
    emailSupport: "Email Support",
    partnerSupport: "Partner Support",
    availablePartnerPanel: "Available through Partner Panel",
    privacyAcknowledgement: "Acknowledgement",
    privacyAcknowledgementText: "By using the MaxiGo Partner Panel, you acknowledge that you have read and understood this Privacy Policy.",
    backToPartnerPanel: "Back to Partner Panel",
    termsConditions: "Terms & Conditions",
    refundCancellation: "Refund & Cancellation",
    partnerAgreement: "Partner Agreement",
    allRightsReserved: "All rights reserved.",

  },


  /* =========================================================
     HINDI
  ========================================================= */

  hi: {

    language: "भाषा",

    english: "अंग्रेज़ी",
    hindi: "हिंदी",
    marathi: "मराठी",

    save: "सेव करें",
    cancel: "रद्द करें",
    delete: "डिलीट करें",
    edit: "एडिट करें",
    add: "जोड़ें",
    close: "बंद करें",
    back: "वापस",
    search: "खोजें",
    viewAll: "सभी देखें",

    yes: "हाँ",
    no: "नहीं",
    confirm: "पुष्टि करें",
    loading: "लोड हो रहा है...",
    success: "सफल",
    error: "त्रुटि",

    continue: "जारी रखें",
    submit: "सबमिट करें",
    next: "आगे",
    previous: "पिछला",
    refresh: "रिफ्रेश",
    retry: "फिर से प्रयास करें",


    /* Sidebar */

    dashboard: "डैशबोर्ड",
    orders: "ऑर्डर्स",
    products: "फूड / मेन्यू",
    foodMenu: "फूड / मेन्यू",
    earnings: "कमाई",
    orderHistory: "ऑर्डर इतिहास",
    businessProfile: "बिज़नेस प्रोफाइल",
    settings: "सेटिंग्स",
    logout: "लॉगआउट",


    /* Business */

    business: "बिज़नेस",

    restaurantHotel:
      "रेस्टोरेंट / होटल",

    kiranaStore:
      "किराना स्टोर",

    vegetablesFruits:
      "सब्ज़ियाँ और फल",

    chickenShop:
      "चिकन शॉप",

    dairy:
      "डेयरी",

    bakery:
      "बेकरी",

    teaTapri:
      "चाय / टपरी",

    generalStore:
      "जनरल स्टोर",

    juiceCenter:
      "जूस सेंटर",

    sweetShop:
      "मिठाई की दुकान",


    /* Dashboard */

    welcomeBack:
      "वापसी पर स्वागत है",

    manageBusiness:
      "अपने बिज़नेस को एक ही जगह से मैनेज करें।",

    dashboardDescription:
      "यहाँ से अपने बिज़नेस, प्रोडक्ट्स और ऑर्डर्स को मैनेज करें।",

    businessCategoryDescription:
      "आपकी MaxiGo पार्टनर बिज़नेस कैटेगरी।",

    online:
      "ऑनलाइन",

    offline:
      "ऑफलाइन",

    storeOnline:
      "स्टोर ऑनलाइन",

    storeOffline:
      "स्टोर ऑफलाइन",

    goOnline:
      "ऑनलाइन जाएँ",

    goOffline:
      "ऑफलाइन जाएँ",

    newOrders:
      "नए ऑर्डर्स",

    preparing:
      "तैयार किया जा रहा है",

    ready:
      "तैयार",

    completed:
      "पूरा हुआ",

    todayEarnings:
      "आज की कमाई",

    totalOrders:
      "कुल ऑर्डर्स",

    pendingOrders:
      "पेंडिंग ऑर्डर्स",

    recentOrders:
      "हाल के ऑर्डर्स",

    noNewOrders:
      "कोई नया ऑर्डर नहीं है।",

    storeIsOffline:
      "आपका स्टोर अभी ऑफलाइन है।",

    goOnlineToReceive:
      "नए ऑर्डर्स प्राप्त करने के लिए ऑनलाइन जाएँ।",

    goOnlineToReceiveOrders:
      "नए ग्राहक ऑर्डर्स प्राप्त करने के लिए ऑनलाइन जाएँ।",

    waitingForAction:
      "कार्रवाई की प्रतीक्षा",

    currentlyPreparing:
      "अभी तैयार किया जा रहा है",

    todaysCompletedOrders:
      "आज के पूरे हुए ऑर्डर्स",

    ordersWaitingAction:
      "आपकी कार्रवाई की प्रतीक्षा कर रहे ऑर्डर्स",

    newOrdersWillAppear:
      "नए ग्राहक ऑर्डर्स यहाँ दिखाई देंगे।",

    storeOffline:
      "स्टोर ऑफलाइन है",

    offlineAcceptMessage:
      "स्टोर ऑफलाइन है। नए ऑर्डर्स स्वीकार करने के लिए ऑनलाइन जाएँ।",

    offlineMessage:
      "स्टोर ऑफलाइन है।",

    new:
      "नया",

    quickActions:
      "त्वरित कार्य",

    manageBusinessQuickly:
      "अपने बिज़नेस को जल्दी मैनेज करें।",

    addFoodMenu:
      "फूड / मेन्यू जोड़ें",

    addProduct:
      "प्रोडक्ट जोड़ें",

    addNewItem:
      "नया आइटम जोड़ें",

    manageOrders:
      "ऑर्डर्स मैनेज करें",

    viewCustomerOrders:
      "ग्राहक ऑर्डर्स देखें",

    updateBusinessDetails:
      "बिज़नेस की जानकारी अपडेट करें",

    productSummary:
      "प्रोडक्ट सारांश",

    currentInventory:
      "आपका वर्तमान स्टॉक",

    manage:
      "मैनेज करें",

    totalItems:
      "कुल आइटम्स",

    available:
      "उपलब्ध",

    outOfStock:
      "स्टॉक खत्म",

    activeOrders:
      "सक्रिय ऑर्डर्स",

    ordersBeingProcessed:
      "वर्तमान में प्रोसेस हो रहे ऑर्डर्स",

    noActiveOrders:
      "अभी कोई सक्रिय ऑर्डर नहीं है।",

    markReady:
      "तैयार मार्क करें",

    riderWillPickup:
      "राइडर पिकअप करेगा",

    waitingForRider:
      "राइडर का इंतज़ार",


    /* Orders */

    order:
      "ऑर्डर",

    orderId:
      "ऑर्डर ID",

    customer:
      "ग्राहक",

    items:
      "आइटम्स",

    amount:
      "राशि",

    status:
      "स्थिति",

    time:
      "समय",

    accept:
      "स्वीकार करें",

    reject:
      "अस्वीकार करें",

    preparingOrder:
      "तैयार किया जा रहा है",

    foodReady:
      "फूड / प्रोडक्ट तैयार",

    pickedUp:
      "पिकअप हो गया",

    delivered:
      "डिलीवर हो गया",

    rejected:
      "अस्वीकार किया गया",

    cancelled:
      "रद्द किया गया",

    acceptOrder:
      "ऑर्डर स्वीकार करें",

    rejectOrder:
      "ऑर्डर अस्वीकार करें",

    markPreparing:
      "तैयारी शुरू करें",

    orderDetails:
      "ऑर्डर विवरण",

    customerDetails:
      "ग्राहक विवरण",

    deliveryAddress:
      "डिलीवरी पता",

    phoneNumber:
      "मोबाइल नंबर",

    noOrders:
      "कोई ऑर्डर नहीं मिला",


    /* Products */

    product:
      "प्रोडक्ट",

    productsList:
      "प्रोडक्ट्स",

    editProduct:
      "प्रोडक्ट एडिट करें",

    deleteProduct:
      "प्रोडक्ट डिलीट करें",

    productName:
      "प्रोडक्ट का नाम",

    productDescription:
      "प्रोडक्ट विवरण",

    price:
      "कीमत",

    availability:
      "उपलब्धता",

    productImage:
      "प्रोडक्ट इमेज",

    uploadImage:
      "इमेज अपलोड करें",

    saveProduct:
      "प्रोडक्ट सेव करें",

    updateProduct:
      "प्रोडक्ट अपडेट करें",

    noProducts:
      "कोई प्रोडक्ट नहीं मिला",


    /* Earnings */

    totalEarnings:
      "कुल कमाई",

    partnerEarnings:
      "पार्टनर कमाई",

    commission:
      "MaxiGo कमीशन",

    grossAmount:
      "कुल राशि",

    availableForPayout:
      "पेआउट के लिए उपलब्ध",

    requestPayout:
      "पेआउट रिक्वेस्ट",

    bankAccount:
      "बैंक अकाउंट",

    settlement:
      "सेटलमेंट",

    settlementHistory:
      "सेटलमेंट इतिहास",

    downloadStatement:
      "स्टेटमेंट डाउनलोड करें",

    monthlyEarnings:
      "मासिक कमाई",

    weeklyEarnings:
      "साप्ताहिक कमाई",


    /* Extra Earnings / Payout */

    earningsDescription:
      "अपनी कमाई, कमीशन और सेटलमेंट को ट्रैक करें।",

    afterMaxigoCommission:
      "MaxiGo कमीशन के बाद",

    todayEarningsLabel:
      "आज की कमाई",

    fromCompletedOrders:
      "पूरे हुए ऑर्डर्स से",

    thisMonth:
      "इस महीने",

    currentMonthEarnings:
      "इस महीने की कमाई",

    pendingPayout:
      "पेंडिंग पेआउट",

    awaitingSettlement:
      "सेटलमेंट की प्रतीक्षा",

    availableForPayoutText:
      "पेआउट के लिए उपलब्ध",

    availableTransferText:
      "आपके बैंक अकाउंट में ट्रांसफर करने के लिए उपलब्ध राशि।",

    payoutBankDescription:
      "आपका पेआउट इस अकाउंट में ट्रांसफर किया जाएगा।",

    added:
      "जोड़ा गया",

    notAdded:
      "जोड़ा नहीं गया",

    accountHolder:
      "अकाउंट होल्डर",

    bankName:
      "बैंक का नाम",

    accountNumber:
      "अकाउंट नंबर",

    ifscCode:
      "IFSC कोड",

    branch:
      "ब्रांच",

    kycStatus:
      "KYC स्थिति",

    notAvailable:
      "उपलब्ध नहीं",

    bankAccountNotAdded:
      "बैंक अकाउंट नहीं जोड़ा गया",

    addBankToReceive:
      "MaxiGo पेआउट प्राप्त करने के लिए अपना बैंक अकाउंट जोड़ें।",

    earningsOverview:
      "कमाई का विवरण",

    selectedPeriodEarnings:
      "चुनी गई अवधि की आपकी कमाई।",

    week:
      "सप्ताह",

    month:
      "महीना",

    earningsBreakdown:
      "कमाई का विवरण",

    orderPaymentSummary:
      "ऑर्डर पेमेंट का सारांश।",

    grossOrderValue:
      "कुल ऑर्डर राशि",

    maxigoCommission:
      "MaxiGo कमीशन",

    completedOrders:
      "पूरे हुए ऑर्डर्स",

    totalPaidOut:
      "कुल भुगतान",

    yourEarnings:
      "आपकी कमाई",

    payoutSettlementHistory:
      "पेआउट और सेटलमेंट इतिहास",

    recentPayoutsDescription:
      "आपके हाल के पेआउट और पूरे हुए ऑर्डर्स की कमाई।",

    noEarningsYet:
      "अभी कोई कमाई नहीं",

    completedOrdersAppear:
      "आपके पूरे हुए ऑर्डर्स यहाँ दिखाई देंगे।",

    settled:
      "सेटल्ड",

    availableAmount:
      "उपलब्ध राशि",

    payoutAccount:
      "पेआउट अकाउंट",

    confirmPayout:
      "पेआउट की पुष्टि करें",

    confirmPayoutDescription:
      "अपने रजिस्टर्ड बैंक अकाउंट में प्राप्त होने वाली राशि की पुष्टि करें।",

    addBankFirst:
      "कृपया पहले अपना बैंक अकाउंट विवरण जोड़ें।",

    noPayoutAvailable:
      "अभी पेआउट के लिए कोई राशि उपलब्ध नहीं है।",

    payoutRequestOf:
      "पेआउट रिक्वेस्ट की राशि",

    payoutSubmitted:
      "सफलतापूर्वक भेज दी गई।",

    statementBackendMessage:
      "स्टेटमेंट डाउनलोड बैकएंड से कनेक्ट किया जाएगा।",

    payoutHistoryBackendMessage:
      "पूरा पेआउट इतिहास बैकएंड से कनेक्ट किया जाएगा।",

    dayMon:
      "सोम",

    dayTue:
      "मंगल",

    dayWed:
      "बुध",

    dayThu:
      "गुरु",

    dayFri:
      "शुक्र",

    daySat:
      "शनि",

    daySun:
      "रवि",


    /* Business Profile */

    profile:
      "प्रोफाइल",

    businessName:
      "बिज़नेस का नाम",

    ownerName:
      "मालिक का नाम",

    email:
      "ईमेल",

    address:
      "पता",

    city:
      "शहर",

    state:
      "राज्य",

    pincode:
      "पिनकोड",

    openingTime:
      "खुलने का समय",

    closingTime:
      "बंद होने का समय",

    businessType:
      "बिज़नेस प्रकार",

    businessAddress:
      "बिज़नेस का पता",

    businessHours:
      "बिज़नेस का समय",

    location:
      "लोकेशन",

    latitude:
      "अक्षांश",

    longitude:
      "देशांतर",

    searchLocation:
      "लोकेशन खोजें",

    currentLocation:
      "वर्तमान लोकेशन",

    selectLocation:
      "लोकेशन चुनें",

    saveChanges:
      "बदलाव सेव करें",

    changesSaved:
      "बदलाव सफलतापूर्वक सेव हो गए।",

    partnerVerified:
      "पार्टनर सत्यापित",


    /* Settings */

    managePreferences:
      "अपने पार्टनर अकाउंट और प्राथमिकताओं को मैनेज करें।",

    orderSettings:
      "ऑर्डर सेटिंग्स",

    controlOrders:
      "आप ऑर्डर कैसे प्राप्त और मैनेज करते हैं इसे नियंत्रित करें।",

    acceptOrders:
      "ऑर्डर स्वीकार करें",

    allowCustomers:
      "ग्राहकों को नए ऑर्डर देने की अनुमति दें।",

    autoAcceptOrders:
      "ऑटो ऑर्डर स्वीकार करें",

    automaticallyAccept:
      "आने वाले ऑर्डर्स को अपने आप स्वीकार करें।",

    notifications:
      "नोटिफिकेशन",

    manageNotifications:
      "अपने ऑर्डर नोटिफिकेशन की प्राथमिकताएँ मैनेज करें।",

    newOrderAlerts:
      "नए ऑर्डर अलर्ट",

    getNotified:
      "नया ऑर्डर आने पर सूचना प्राप्त करें।",

    orderSound:
      "ऑर्डर साउंड",

    playSound:
      "नए ऑर्डर अलर्ट के लिए साउंड चलाएँ।",

    chooseLanguage:
      "अपनी पसंदीदा भाषा चुनें।",

    changePassword:
      "पासवर्ड बदलें",

    updatePassword:
      "अपने पार्टनर अकाउंट का पासवर्ड अपडेट करें।",

    currentPassword:
      "वर्तमान पासवर्ड",

    newPassword:
      "नया पासवर्ड",

    confirmPassword:
      "पासवर्ड की पुष्टि करें",

    changePasswordBtn:
      "पासवर्ड बदलें",


    /* Account */

    account:
      "अकाउंट",

    partner:
      "पार्टनर",

    loginSessions:
      "लॉगिन सेशन",

    devicesLoggedIn:
      "आपके अकाउंट में वर्तमान में लॉगिन डिवाइस।",

    currentDevice:
      "वर्तमान डिवाइस",

    activeNow:
      "अभी सक्रिय",

    logoutOtherDevices:
      "अन्य डिवाइस से लॉगआउट करें",

    needHelp:
      "मदद चाहिए?",

    contactSupportText:
      "MaxiGo Partner Support से संपर्क करें।",

    contactSupport:
      "सपोर्ट से संपर्क करें",


    /* Delete */

    dangerZone:
      "डेंजर ज़ोन",

    deleteAccount:
      "अकाउंट डिलीट करें",

    deleteAccountDescription:
      "अपने MaxiGo Partner अकाउंट को स्थायी रूप से हटाएँ।",

    deleteAccountWarning:
      "यह कार्रवाई वापस नहीं की जा सकती।",

    deleteAccountInfo:
      "अकाउंट डिलीट करने पर आप साइन आउट हो जाएंगे और सेव की गई पार्टनर जानकारी हटा दी जाएगी।",

    deleteMyAccount:
      "मेरा अकाउंट डिलीट करें",

    deleteAccountQuestion:
      "अकाउंट डिलीट करें?",

    deleteAccountConfirmation:
      "क्या आप अपना MaxiGo Partner अकाउंट स्थायी रूप से डिलीट करना चाहते हैं?",

    pleaseNote:
      "कृपया ध्यान दें",

    deleteModalWarning:
      "यह कार्रवाई वापस नहीं की जा सकती। आपका अकाउंट सेशन और लोकली सेव किया गया पार्टनर डेटा हटा दिया जाएगा।",

    typeDeleteToConfirm:
      "पुष्टि करने के लिए DELETE लिखें",

    typeDelete:
      "DELETE लिखें",

    accountDeleteError:
      'अकाउंट डिलीट करने के लिए "DELETE" लिखें।',

    accountDeleteFailed:
      "अकाउंट डिलीट नहीं हो पाया। कृपया फिर से प्रयास करें।",


    /* Password */

    fillPasswordFields:
      "कृपया पासवर्ड की सभी फ़ील्ड भरें।",

    passwordMismatch:
      "नया पासवर्ड और कन्फर्म पासवर्ड समान नहीं हैं।",

    passwordLength:
      "नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",

    passwordChanged:
      "पासवर्ड सफलतापूर्वक बदल दिया गया।",


    /* Login */

    login:
      "लॉगिन",

    register:
      "रजिस्टर",

    welcome:
      "MaxiGo में आपका स्वागत है",

    phone:
      "मोबाइल",

    password:
      "पासवर्ड",

    confirmAccountPassword:
      "पासवर्ड की पुष्टि करें",

    forgotPassword:
      "पासवर्ड भूल गए?",

    createAccount:
      "अकाउंट बनाएँ",

    alreadyHaveAccount:
      "क्या आपके पास पहले से अकाउंट है?",

    dontHaveAccount:
      "अकाउंट नहीं है?",


    /* =====================================================
       PRIVACY POLICY
    ===================================================== */

    backToMaxiGoPartner: "MaxiGo Partner पर वापस जाएँ",
    privacyPolicy: "प्राइवेसी पॉलिसी",
    privacyHeroSubtitle: "MaxiGo पार्टनर की जानकारी को कैसे एकत्र, उपयोग और सुरक्षित करता है।",
    lastUpdated: "अंतिम अपडेट",
    privacyReadCarefully: "कृपया ध्यान से पढ़ें",
    privacyNoticeText: "यह प्राइवेसी पॉलिसी बताती है कि MaxiGo Partner Panel का उपयोग करते समय MaxiGo पार्टनर की जानकारी कैसे एकत्र, उपयोग, स्टोर और सुरक्षित करता है।",
    privacyInformationWeCollect: "हम कौन-सी जानकारी एकत्र करते हैं",
    privacyInformationCollectText: "हम आपके पार्टनर अकाउंट को बनाने और मैनेज करने तथा MaxiGo सेवाएँ प्रदान करने के लिए आवश्यक जानकारी एकत्र करते हैं।",
    privacyPartnerBusinessName: "पार्टनर बिज़नेस का नाम",
    privacyMobileNumber: "मोबाइल नंबर",
    privacyEmailAddress: "ईमेल पता",
    privacyBusinessAddress: "बिज़नेस का पता",
    privacyBusinessInformation: "बिज़नेस की जानकारी",
    privacyBankPayout: "बैंक और पेआउट जानकारी",
    privacyProductsMenu: "प्रोडक्ट / मेन्यू जानकारी",
    privacyOrderInformation: "ऑर्डर जानकारी",
    privacyAccountInformation: "अकाउंट की जानकारी",
    privacyAccountInformationText: "हम आपके MaxiGo Partner अकाउंट को सुरक्षित रूप से मैनेज करने के लिए अकाउंट और लॉगिन जानकारी एकत्र करते हैं।",
    privacyRegistrationInfo: "रजिस्ट्रेशन जानकारी",
    privacyLoginInformation: "लॉगिन जानकारी",
    privacyBusinessDetails: "बिज़नेस विवरण",
    privacyContactInformation: "संपर्क जानकारी",
    privacyAccountSecurity: "अकाउंट सुरक्षा",
    privacyAccountSecurityText: "हम आपकी अकाउंट जानकारी को सुरक्षित रखने और अनधिकृत पहुँच रोकने के लिए उचित सुरक्षा उपायों का उपयोग करते हैं।",
    privacyLocationInformation: "लोकेशन जानकारी",
    privacyLocationText: "जब आप बिज़नेस लोकेशन देते हैं या लोकेशन से जुड़े फीचर्स का उपयोग करते हैं, तब लोकेशन जानकारी का उपयोग किया जा सकता है।",
    privacyBusinessLocation: "बिज़नेस लोकेशन",
    privacyDeliveryLocation: "डिलीवरी लोकेशन",
    privacyMapDirection: "मैप और दिशा फीचर्स",
    privacyLocationPermission: "लोकेशन अनुमति",
    privacyOrderInformationTitle: "ऑर्डर जानकारी",
    privacyOrderInfoText: "हम आपके बिज़नेस के साथ किए गए ग्राहक ऑर्डर्स से संबंधित जानकारी प्रोसेस करते हैं।",
    privacyOrderDetails: "ऑर्डर विवरण",
    privacyProductsItems: "प्रोडक्ट / आइटम्स",
    privacyOrderAmount: "ऑर्डर राशि",
    privacyOrderStatus: "ऑर्डर स्थिति",
    privacyCustomerDelivery: "ग्राहक और डिलीवरी जानकारी",
    privacyOrderTimestamps: "ऑर्डर समय",
    privacyOrderUsage: "ऑर्डर उपयोग",
    privacyPaymentPayout: "पेमेंट और पेआउट जानकारी",
    privacyPaymentPayoutText: "पेमेंट और पेआउट जानकारी का उपयोग सेटलमेंट प्रोसेस करने और सही वित्तीय रिकॉर्ड रखने के लिए किया जाता है।",
    privacyAccountHolderName: "अकाउंट होल्डर का नाम",
    privacyBankName: "बैंक का नाम",
    privacyBankAccountInfo: "बैंक अकाउंट जानकारी",
    privacyIFSC: "IFSC कोड",
    privacyUPI: "UPI ID",
    privacySettlementInfo: "सेटलमेंट जानकारी",
    privacyPaymentSecurity: "पेमेंट सुरक्षा",
    privacyPaymentSecurityText: "पेमेंट से संबंधित जानकारी उचित सुरक्षा नियंत्रण और अधिकृत पेमेंट प्रदाताओं के माध्यम से संभाली जाती है।",
    privacyHowWeUse: "हम आपकी जानकारी का उपयोग कैसे करते हैं",
    privacyHowWeUseText: "हम MaxiGo सेवाओं को चलाने, बनाए रखने और बेहतर बनाने के लिए पार्टनर जानकारी का उपयोग करते हैं।",
    privacyManagePartnerAccount: "आपका पार्टनर अकाउंट मैनेज करना",
    privacyProcessOrders: "ऑर्डर्स को प्रोसेस और मैनेज करना",
    privacyCoordinateDelivery: "डिलीवरी ऑपरेशन को समन्वित करना",
    privacyProcessPayments: "पेमेंट और सेटलमेंट प्रोसेस करना",
    privacyCustomerPartnerSupport: "ग्राहक और पार्टनर सपोर्ट देना",
    privacyMaintainSecurity: "प्लेटफॉर्म सुरक्षा बनाए रखना",
    privacyDetectFraud: "फ्रॉड या गलत उपयोग का पता लगाना और रोकना",
    privacyImproveService: "MaxiGo सेवाओं में सुधार करना",
    privacyInformationSharing: "जानकारी साझा करना",
    privacyInformationSharingText1: "MaxiGo सेवाएँ प्रदान करने के लिए आवश्यक होने पर हम जानकारी सर्विस प्रोवाइडर्स और पार्टनर्स के साथ साझा कर सकते हैं।",
    privacyInformationSharingText2: "सेवा संचालन के लिए आवश्यक होने पर हम पेमेंट, होस्टिंग, मैपिंग, कम्युनिकेशन या अन्य टेक्नोलॉजी प्रदाताओं के साथ जानकारी साझा कर सकते हैं।",
    privacyInformationSharingText3: "हम पार्टनर की व्यक्तिगत जानकारी नहीं बेचते हैं।",
    privacyCustomerInformation: "ग्राहक जानकारी",
    privacyCustomerInformationText: "पार्टनर्स को दिखाई जाने वाली ग्राहक जानकारी केवल वैध ऑर्डर्स को पूरा करने और मैनेज करने के लिए दी जाती है।",
    privacyCustomerAuthorized: "ग्राहक जानकारी का उपयोग केवल अधिकृत ऑर्डर और डिलीवरी गतिविधियों के लिए करें।",
    privacyCustomerNoShare: "ग्राहक जानकारी अनधिकृत व्यक्तियों के साथ साझा न करें।",
    privacyCustomerNoMisuse: "ग्राहक जानकारी का मार्केटिंग, व्यक्तिगत संपर्क या अन्य अनधिकृत उद्देश्यों के लिए गलत उपयोग न करें।",
    privacyCustomerAfterOrder: "ऑर्डर पूरा होने के बाद भी ग्राहक जानकारी को जिम्मेदारी से संभालना आवश्यक है।",
    privacyDataSecurity: "डेटा सुरक्षा",
    privacyDataSecurityText: "हम जानकारी को अनधिकृत पहुँच, नुकसान, गलत उपयोग या खुलासा होने से बचाने के लिए उचित तकनीकी और संगठनात्मक उपाय करते हैं।",
    privacySecureAuthentication: "सुरक्षित ऑथेंटिकेशन",
    privacyAccessControl: "एक्सेस कंट्रोल",
    privacySecureCommunication: "सुरक्षित कम्युनिकेशन",
    privacyDataProtection: "डेटा सुरक्षा",
    privacyNoRiskFreeSystem: "किसी भी ऑनलाइन सिस्टम को पूरी तरह जोखिम-मुक्त होने की गारंटी नहीं दी जा सकती।",
    privacyCookies: "कुकीज़ और समान तकनीकें",
    privacyCookiesText: "MaxiGo सेशन बनाए रखने, प्राथमिकताएँ याद रखने और यूज़र अनुभव बेहतर करने के लिए कुकीज़ या समान तकनीकों का उपयोग कर सकता है।",
    privacyCookiesSettings: "जहाँ उपलब्ध हो, आप ब्राउज़र सेटिंग्स के माध्यम से कुकीज़ को नियंत्रित कर सकते हैं।",
    privacyDataRetention: "डेटा रिटेंशन",
    privacyDataRetentionText: "हम बिज़नेस ऑपरेशन, कानूनी आवश्यकताओं, विवाद समाधान और सुरक्षा के लिए आवश्यक उचित अवधि तक जानकारी रखते हैं।",
    privacyRetentionPeriod: "रिटेंशन अवधि",
    privacyDataDeletion: "डेटा डिलीशन",
    privacyDataDeletionText: "लागू कानूनी, वित्तीय और ऑपरेशनल आवश्यकताओं के अधीन आप अपने अकाउंट और योग्य व्यक्तिगत जानकारी को हटाने का अनुरोध कर सकते हैं।",
    important: "महत्वपूर्ण",
    privacyDataDeletionImportant: "कानून, अकाउंटिंग, फ्रॉड रोकथाम, विवाद समाधान या अन्य वैध दायित्वों के कारण कुछ जानकारी रखी जा सकती है।",
    privacyThirdParty: "थर्ड-पार्टी सेवाएँ",
    privacyThirdPartyText: "MaxiGo पेमेंट, होस्टिंग, मैपिंग, एनालिटिक्स, मैसेजिंग और ऑथेंटिकेशन जैसे थर्ड-पार्टी सर्विसेज का उपयोग कर सकता है।",
    privacyThirdPartyPolicies: "थर्ड-पार्टी सेवाओं की अपनी प्राइवेसी पॉलिसी और शर्तें हो सकती हैं।",
    privacyChildren: "बच्चों की प्राइवेसी",
    privacyChildrenText: "MaxiGo Partner Panel बिज़नेस पार्टनर्स के लिए है और बच्चों के लिए नहीं है।",
    privacyChanges: "इस प्राइवेसी पॉलिसी में बदलाव",
    privacyChangesText: "हम अपनी सेवाओं, तकनीक या कानूनी आवश्यकताओं में बदलाव होने पर इस प्राइवेसी पॉलिसी को अपडेट कर सकते हैं।",
    privacyUpdatedPolicy: "नवीनतम संस्करण MaxiGo Partner Panel या वेबसाइट पर उपलब्ध कराया जाएगा।",
    privacyContactQuestions: "हमसे संपर्क करें",
    privacyContactText: "इस प्राइवेसी पॉलिसी या आपकी जानकारी के उपयोग से जुड़े प्रश्नों के लिए MaxiGo Partner Support से संपर्क करें।",
    emailSupport: "ईमेल सपोर्ट",
    partnerSupport: "पार्टनर सपोर्ट",
    availablePartnerPanel: "Partner Panel के माध्यम से उपलब्ध",
    privacyAcknowledgement: "स्वीकृति",
    privacyAcknowledgementText: "MaxiGo Partner Panel का उपयोग करके आप स्वीकार करते हैं कि आपने इस प्राइवेसी पॉलिसी को पढ़ और समझ लिया है।",
    backToPartnerPanel: "Partner Panel पर वापस जाएँ",
    termsConditions: "टर्म्स एंड कंडीशन्स",
    refundCancellation: "रिफंड और कैंसिलेशन",
    partnerAgreement: "पार्टनर एग्रीमेंट",
    allRightsReserved: "सर्वाधिकार सुरक्षित।",

  },


  /* =========================================================
     MARATHI
  ========================================================= */

  mr: {

    language:
      "भाषा",

    english:
      "इंग्रजी",

    hindi:
      "हिंदी",

    marathi:
      "मराठी",

    save:
      "सेव्ह करा",

    cancel:
      "रद्द करा",

    delete:
      "डिलीट करा",

    edit:
      "एडिट करा",

    add:
      "जोडा",

    close:
      "बंद करा",

    back:
      "मागे",

    search:
      "शोधा",

    viewAll:
      "सर्व पहा",

    yes:
      "होय",

    no:
      "नाही",

    confirm:
      "पुष्टी करा",

    loading:
      "लोड होत आहे...",

    success:
      "यशस्वी",

    error:
      "त्रुटी",

    continue:
      "पुढे जा",

    submit:
      "सबमिट करा",

    next:
      "पुढे",

    previous:
      "मागे",

    refresh:
      "रिफ्रेश",

    retry:
      "पुन्हा प्रयत्न करा",


    /* Sidebar */

    dashboard:
      "डॅशबोर्ड",

    orders:
      "ऑर्डर्स",

    products:
      "फूड / मेन्यू",

    foodMenu:
      "फूड / मेन्यू",

    earnings:
      "कमाई",

    orderHistory:
      "ऑर्डर इतिहास",

    businessProfile:
      "बिझनेस प्रोफाइल",

    settings:
      "सेटिंग्स",

    logout:
      "लॉगआउट",


    /* Business */

    business:
      "बिझनेस",

    restaurantHotel:
      "रेस्टॉरंट / हॉटेल",

    kiranaStore:
      "किराणा स्टोअर",

    vegetablesFruits:
      "भाज्या आणि फळे",

    chickenShop:
      "चिकन शॉप",

    dairy:
      "डेअरी",

    bakery:
      "बेकरी",

    teaTapri:
      "चहा / टपरी",

    generalStore:
      "जनरल स्टोअर",

    juiceCenter:
      "ज्यूस सेंटर",

    sweetShop:
      "मिठाईचे दुकान",


    /* Dashboard */

    welcomeBack:
      "पुन्हा स्वागत आहे",

    manageBusiness:
      "तुमचा बिझनेस एका ठिकाणाहून व्यवस्थापित करा.",

    dashboardDescription:
      "येथून तुमचा बिझनेस, प्रोडक्ट्स आणि ऑर्डर्स व्यवस्थापित करा.",

    businessCategoryDescription:
      "तुमची MaxiGo पार्टनर बिझनेस कॅटेगरी.",

    online:
      "ऑनलाइन",

    offline:
      "ऑफलाइन",

    storeOnline:
      "स्टोअर ऑनलाइन",

    storeOffline:
      "स्टोअर ऑफलाइन",

    goOnline:
      "ऑनलाइन करा",

    goOffline:
      "ऑफलाइन करा",

    newOrders:
      "नवीन ऑर्डर्स",

    preparing:
      "तयार करत आहे",

    ready:
      "तयार",

    completed:
      "पूर्ण",

    todayEarnings:
      "आजची कमाई",

    totalOrders:
      "एकूण ऑर्डर्स",

    pendingOrders:
      "प्रलंबित ऑर्डर्स",

    recentOrders:
      "अलीकडील ऑर्डर्स",

    noNewOrders:
      "नवीन ऑर्डर नाही.",

    storeIsOffline:
      "तुमचे स्टोअर सध्या ऑफलाइन आहे.",

    goOnlineToReceive:
      "नवीन ऑर्डर्स मिळवण्यासाठी ऑनलाइन करा.",

    goOnlineToReceiveOrders:
      "नवीन ग्राहक ऑर्डर्स मिळवण्यासाठी ऑनलाइन करा.",

    waitingForAction:
      "कारवाईची प्रतीक्षा",

    currentlyPreparing:
      "सध्या तयार करत आहे",

    todaysCompletedOrders:
      "आजच्या पूर्ण झालेल्या ऑर्डर्स",

    ordersWaitingAction:
      "तुमच्या कारवाईची प्रतीक्षा करणाऱ्या ऑर्डर्स",

    newOrdersWillAppear:
      "नवीन ग्राहक ऑर्डर्स येथे दिसतील.",

    storeOffline:
      "स्टोअर ऑफलाइन आहे",

    offlineAcceptMessage:
      "स्टोअर ऑफलाइन आहे. नवीन ऑर्डर्स स्वीकारण्यासाठी ऑनलाइन करा.",

    offlineMessage:
      "स्टोअर ऑफलाइन आहे.",

    new:
      "नवीन",

    quickActions:
      "जलद कृती",

    manageBusinessQuickly:
      "तुमचा बिझनेस जलद व्यवस्थापित करा.",

    addFoodMenu:
      "फूड / मेन्यू जोडा",

    addProduct:
      "प्रोडक्ट जोडा",

    addNewItem:
      "नवीन आयटम जोडा",

    manageOrders:
      "ऑर्डर्स व्यवस्थापित करा",

    viewCustomerOrders:
      "ग्राहकांच्या ऑर्डर्स पहा",

    updateBusinessDetails:
      "बिझनेसची माहिती अपडेट करा",

    productSummary:
      "प्रोडक्ट सारांश",

    currentInventory:
      "तुमचा सध्याचा स्टॉक",

    manage:
      "व्यवस्थापित करा",

    totalItems:
      "एकूण आयटम्स",

    available:
      "उपलब्ध",

    outOfStock:
      "स्टॉक संपला",

    activeOrders:
      "सक्रिय ऑर्डर्स",

    ordersBeingProcessed:
      "सध्या प्रक्रिया सुरू असलेल्या ऑर्डर्स",

    noActiveOrders:
      "सध्या कोणतीही सक्रिय ऑर्डर नाही.",

    markReady:
      "तयार म्हणून मार्क करा",

    riderWillPickup:
      "रायडर पिकअप करेल",

    waitingForRider:
      "रायडरची वाट पाहत आहे",


    /* Orders */

    order:
      "ऑर्डर",

    orderId:
      "ऑर्डर ID",

    customer:
      "ग्राहक",

    items:
      "आयटम्स",

    amount:
      "रक्कम",

    status:
      "स्थिती",

    time:
      "वेळ",

    accept:
      "स्वीकारा",

    reject:
      "नकार द्या",

    preparingOrder:
      "तयार करत आहे",

    foodReady:
      "फूड / प्रोडक्ट तयार",

    pickedUp:
      "पिकअप झाला",

    delivered:
      "डिलिव्हर झाला",

    rejected:
      "नाकारले",

    cancelled:
      "रद्द केले",

    acceptOrder:
      "ऑर्डर स्वीकारा",

    rejectOrder:
      "ऑर्डर नाकारा",

    markPreparing:
      "तयारी सुरू करा",

    orderDetails:
      "ऑर्डर तपशील",

    customerDetails:
      "ग्राहक तपशील",

    deliveryAddress:
      "डिलिव्हरी पत्ता",

    phoneNumber:
      "मोबाईल नंबर",

    noOrders:
      "कोणतीही ऑर्डर सापडली नाही",


    /* Products */

    product:
      "प्रोडक्ट",

    productsList:
      "प्रोडक्ट्स",

    editProduct:
      "प्रोडक्ट एडिट करा",

    deleteProduct:
      "प्रोडक्ट डिलीट करा",

    productName:
      "प्रोडक्टचे नाव",

    productDescription:
      "प्रोडक्टचे वर्णन",

    price:
      "किंमत",

    availability:
      "उपलब्धता",

    productImage:
      "प्रोडक्ट इमेज",

    uploadImage:
      "इमेज अपलोड करा",

    saveProduct:
      "प्रोडक्ट सेव्ह करा",

    updateProduct:
      "प्रोडक्ट अपडेट करा",

    noProducts:
      "कोणताही प्रोडक्ट सापडला नाही",


    /* Earnings */

    totalEarnings:
      "एकूण कमाई",

    partnerEarnings:
      "पार्टनर कमाई",

    commission:
      "MaxiGo कमिशन",

    grossAmount:
      "एकूण रक्कम",

    availableForPayout:
      "पेआउटसाठी उपलब्ध",

    requestPayout:
      "पेआउट मागणी",

    bankAccount:
      "बँक अकाउंट",

    settlement:
      "सेटलमेंट",

    settlementHistory:
      "सेटलमेंट इतिहास",

    downloadStatement:
      "स्टेटमेंट डाउनलोड करा",

    monthlyEarnings:
      "मासिक कमाई",

    weeklyEarnings:
      "साप्ताहिक कमाई",


    /* Extra Earnings / Payout */

    earningsDescription:
      "तुमची कमाई, कमिशन आणि सेटलमेंटचा मागोवा घ्या.",

    afterMaxigoCommission:
      "MaxiGo कमिशननंतर",

    todayEarningsLabel:
      "आजची कमाई",

    fromCompletedOrders:
      "पूर्ण झालेल्या ऑर्डर्समधून",

    thisMonth:
      "या महिन्यात",

    currentMonthEarnings:
      "या महिन्याची कमाई",

    pendingPayout:
      "प्रलंबित पेआउट",

    awaitingSettlement:
      "सेटलमेंटची प्रतीक्षा",

    availableForPayoutText:
      "पेआउटसाठी उपलब्ध",

    availableTransferText:
      "तुमच्या बँक अकाउंटमध्ये ट्रान्सफर करण्यासाठी उपलब्ध रक्कम.",

    payoutBankDescription:
      "तुमचा पेआउट या अकाउंटमध्ये ट्रान्सफर केला जाईल.",

    added:
      "जोडले आहे",

    notAdded:
      "जोडलेले नाही",

    accountHolder:
      "अकाउंट होल्डर",

    bankName:
      "बँकेचे नाव",

    accountNumber:
      "अकाउंट नंबर",

    ifscCode:
      "IFSC कोड",

    branch:
      "शाखा",

    kycStatus:
      "KYC स्थिती",

    notAvailable:
      "उपलब्ध नाही",

    bankAccountNotAdded:
      "बँक अकाउंट जोडलेले नाही",

    addBankToReceive:
      "MaxiGo पेआउट मिळवण्यासाठी तुमचे बँक अकाउंट जोडा.",

    earningsOverview:
      "कमाईचा आढावा",

    selectedPeriodEarnings:
      "निवडलेल्या कालावधीतील तुमची कमाई.",

    week:
      "आठवडा",

    month:
      "महिना",

    earningsBreakdown:
      "कमाईचा तपशील",

    orderPaymentSummary:
      "ऑर्डर पेमेंटचा सारांश.",

    grossOrderValue:
      "एकूण ऑर्डर रक्कम",

    maxigoCommission:
      "MaxiGo कमिशन",

    completedOrders:
      "पूर्ण झालेल्या ऑर्डर्स",

    totalPaidOut:
      "एकूण पेआउट",

    yourEarnings:
      "तुमची कमाई",

    payoutSettlementHistory:
      "पेआउट आणि सेटलमेंट इतिहास",

    recentPayoutsDescription:
      "तुमचे अलीकडील पेआउट आणि पूर्ण झालेल्या ऑर्डर्सची कमाई.",

    noEarningsYet:
      "अजून कमाई नाही",

    completedOrdersAppear:
      "तुमच्या पूर्ण झालेल्या ऑर्डर्स येथे दिसतील.",

    settled:
      "सेटल झाले",

    availableAmount:
      "उपलब्ध रक्कम",

    payoutAccount:
      "पेआउट अकाउंट",

    confirmPayout:
      "पेआउटची पुष्टी करा",

    confirmPayoutDescription:
      "तुमच्या रजिस्टर्ड बँक अकाउंटमध्ये मिळणाऱ्या रकमेची पुष्टी करा.",

    addBankFirst:
      "कृपया आधी तुमचे बँक अकाउंट तपशील जोडा.",

    noPayoutAvailable:
      "सध्या पेआटसाठी कोणतीही रक्कम उपलब्ध नाही.",

    payoutRequestOf:
      "पेआउटची रक्कम",

    payoutSubmitted:
      "यशस्वीरित्या सबमिट केली.",

    statementBackendMessage:
      "स्टेटमेंट डाउनलोड बॅकएंडशी कनेक्ट केले जाईल.",

    payoutHistoryBackendMessage:
      "पूर्ण पेआउट इतिहास बॅकएंडशी कनेक्ट केला जाईल.",

    dayMon:
      "सोम",

    dayTue:
      "मंगळ",

    dayWed:
      "बुध",

    dayThu:
      "गुरु",

    dayFri:
      "शुक्र",

    daySat:
      "शनि",

    daySun:
      "रवि",


    /* Business Profile */

    profile:
      "प्रोफाइल",

    businessName:
      "बिझनेसचे नाव",

    ownerName:
      "मालकाचे नाव",

    email:
      "ईमेल",

    address:
      "पत्ता",

    city:
      "शहर",

    state:
      "राज्य",

    pincode:
      "पिनकोड",

    openingTime:
      "उघडण्याची वेळ",

    closingTime:
      "बंद करण्याची वेळ",

    businessType:
      "बिझनेस प्रकार",

    businessAddress:
      "बिझनेसचा पत्ता",

    businessHours:
      "बिझनेसची वेळ",

    location:
      "लोकेशन",

    latitude:
      "अक्षांश",

    longitude:
      "रेखांश",

    searchLocation:
      "लोकेशन शोधा",

    currentLocation:
      "सध्याचे लोकेशन",

    selectLocation:
      "लोकेशन निवडा",

    saveChanges:
      "बदल सेव्ह करा",

    changesSaved:
      "बदल यशस्वीरित्या सेव्ह झाले.",

    partnerVerified:
      "पार्टनर सत्यापित",


    /* Settings */

    managePreferences:
      "तुमचे पार्टनर अकाउंट आणि प्राधान्ये व्यवस्थापित करा.",

    orderSettings:
      "ऑर्डर सेटिंग्स",

    controlOrders:
      "तुम्ही ऑर्डर्स कशा प्रकारे प्राप्त आणि व्यवस्थापित करता ते नियंत्रित करा.",

    acceptOrders:
      "ऑर्डर्स स्वीकारा",

    allowCustomers:
      "ग्राहकांना नवीन ऑर्डर्स देण्याची परवानगी द्या.",

    autoAcceptOrders:
      "ऑटो ऑर्डर्स स्वीकारा",

    automaticallyAccept:
      "येणाऱ्या ऑर्डर्स आपोआप स्वीकारा.",

    notifications:
      "सूचना",

    manageNotifications:
      "तुमच्या ऑर्डर नोटिफिकेशनची प्राधान्ये व्यवस्थापित करा.",

    newOrderAlerts:
      "नवीन ऑर्डर सूचना",

    getNotified:
      "नवीन ऑर्डर आल्यावर सूचना मिळवा.",

    orderSound:
      "ऑर्डर साउंड",

    playSound:
      "नवीन ऑर्डर अलर्टसाठी साउंड वाजवा.",

    chooseLanguage:
      "तुमची आवडती भाषा निवडा.",

    changePassword:
      "पासवर्ड बदला",

    updatePassword:
      "तुमच्या पार्टनर अकाउंटचा पासवर्ड अपडेट करा.",

    currentPassword:
      "सध्याचा पासवर्ड",

    newPassword:
      "नवीन पासवर्ड",

    confirmPassword:
      "पासवर्डची पुष्टी करा",

    changePasswordBtn:
      "पासवर्ड बदला",


    /* Account */

    account:
      "अकाउंट",

    partner:
      "पार्टनर",

    loginSessions:
      "लॉगिन सेशन",

    devicesLoggedIn:
      "तुमच्या अकाउंटमध्ये सध्या लॉगिन असलेली डिव्हाइसेस.",

    currentDevice:
      "सध्याचे डिव्हाइस",

    activeNow:
      "सध्या सक्रिय",

    logoutOtherDevices:
      "इतर डिव्हाइसेसमधून लॉगआउट करा",

    needHelp:
      "मदत हवी आहे?",

    contactSupportText:
      "MaxiGo Partner Support शी संपर्क करा.",

    contactSupport:
      "सपोर्टशी संपर्क करा",


    /* Delete */

    dangerZone:
      "डेंजर झोन",

    deleteAccount:
      "अकाउंट डिलीट करा",

    deleteAccountDescription:
      "तुमचे MaxiGo Partner अकाउंट कायमचे काढून टाका.",

    deleteAccountWarning:
      "ही प्रक्रिया पूर्ववत करता येणार नाही.",

    deleteAccountInfo:
      "अकाउंट डिलीट केल्यावर तुम्ही साइन आउट व्हाल आणि सेव्ह केलेली पार्टनर माहिती काढली जाईल.",

    deleteMyAccount:
      "माझे अकाउंट डिलीट करा",

    deleteAccountQuestion:
      "अकाउंट डिलीट करायचे?",

    deleteAccountConfirmation:
      "तुम्हाला तुमचे MaxiGo Partner अकाउंट कायमचे डिलीट करायचे आहे का?",

    pleaseNote:
      "कृपया लक्षात घ्या",

    deleteModalWarning:
      "ही प्रक्रिया पूर्ववत करता येणार नाही. तुमचे अकाउंट सेशन आणि लोकली सेव्ह केलेला पार्टनर डेटा काढला जाईल.",

    typeDeleteToConfirm:
      "पुष्टी करण्यासाठी DELETE टाइप करा",

    typeDelete:
      "DELETE टाइप करा",

    accountDeleteError:
      'अकाउंट डिलीट करण्यासाठी "DELETE" टाइप करा.',

    accountDeleteFailed:
      "अकाउंट डिलीट करता आले नाही. कृपया पुन्हा प्रयत्न करा.",


    /* Password */

    fillPasswordFields:
      "कृपया पासवर्डची सर्व फील्ड भरा.",

    passwordMismatch:
      "नवीन पासवर्ड आणि कन्फर्म पासवर्ड समान नाहीत.",

    passwordLength:
      "नवीन पासवर्ड किमान 6 अक्षरांचा असावा.",

    passwordChanged:
      "पासवर्ड यशस्वीरित्या बदलला.",


    /* Login */

    login:
      "लॉगिन",

    register:
      "नोंदणी",

    welcome:
      "MaxiGo मध्ये आपले स्वागत आहे",

    phone:
      "मोबाईल",

    password:
      "पासवर्ड",

    confirmAccountPassword:
      "पासवर्डची पुष्टी करा",

    forgotPassword:
      "पासवर्ड विसरलात?",

    createAccount:
      "अकाउंट तयार करा",

    alreadyHaveAccount:
      "तुमचे आधीपासून अकाउंट आहे?",

    dontHaveAccount:
      "अकाउंट नाही?",


    /* =====================================================
       PRIVACY POLICY
    ===================================================== */

    backToMaxiGoPartner: "MaxiGo Partner वर परत जा",
    privacyPolicy: "प्रायव्हसी पॉलिसी",
    privacyHeroSubtitle: "MaxiGo पार्टनरची माहिती कशी गोळा, वापर आणि सुरक्षित करते.",
    lastUpdated: "शेवटचे अपडेट",
    privacyReadCarefully: "कृपया काळजीपूर्वक वाचा",
    privacyNoticeText: "ही प्रायव्हसी पॉलिसी MaxiGo Partner Panel वापरताना MaxiGo पार्टनरची माहिती कशी गोळा, वापर, साठवण आणि सुरक्षित करते हे स्पष्ट करते.",
    privacyInformationWeCollect: "आम्ही कोणती माहिती गोळा करतो",
    privacyInformationCollectText: "तुमचे पार्टनर अकाउंट तयार व व्यवस्थापित करण्यासाठी आणि MaxiGo सेवा देण्यासाठी आवश्यक माहिती आम्ही गोळा करतो.",
    privacyPartnerBusinessName: "पार्टनर बिझनेसचे नाव",
    privacyMobileNumber: "मोबाईल नंबर",
    privacyEmailAddress: "ईमेल पत्ता",
    privacyBusinessAddress: "बिझनेसचा पत्ता",
    privacyBusinessInformation: "बिझनेसची माहिती",
    privacyBankPayout: "बँक आणि पेआउट माहिती",
    privacyProductsMenu: "प्रोडक्ट / मेन्यू माहिती",
    privacyOrderInformation: "ऑर्डर माहिती",
    privacyAccountInformation: "अकाउंटची माहिती",
    privacyAccountInformationText: "तुमचे MaxiGo Partner अकाउंट सुरक्षितपणे व्यवस्थापित करण्यासाठी आम्ही अकाउंट आणि लॉगिन माहिती वापरतो.",
    privacyRegistrationInfo: "नोंदणी माहिती",
    privacyLoginInformation: "लॉगिन माहिती",
    privacyBusinessDetails: "बिझनेस तपशील",
    privacyContactInformation: "संपर्क माहिती",
    privacyAccountSecurity: "अकाउंट सुरक्षा",
    privacyAccountSecurityText: "तुमची अकाउंट माहिती सुरक्षित ठेवण्यासाठी आणि अनधिकृत प्रवेश रोखण्यासाठी आम्ही योग्य सुरक्षा उपाय वापरतो.",
    privacyLocationInformation: "लोकेशन माहिती",
    privacyLocationText: "तुम्ही बिझनेस लोकेशन देता किंवा लोकेशनशी संबंधित फीचर्स वापरता तेव्हा लोकेशन माहिती वापरली जाऊ शकते.",
    privacyBusinessLocation: "बिझनेस लोकेशन",
    privacyDeliveryLocation: "डिलिव्हरी लोकेशन",
    privacyMapDirection: "मॅप आणि दिशा फीचर्स",
    privacyLocationPermission: "लोकेशन परवानगी",
    privacyOrderInformationTitle: "ऑर्डर माहिती",
    privacyOrderInfoText: "तुमच्या बिझनेसमधून दिलेल्या ग्राहकांच्या ऑर्डर्सशी संबंधित माहिती आम्ही प्रोसेस करतो.",
    privacyOrderDetails: "ऑर्डर तपशील",
    privacyProductsItems: "प्रोडक्ट / आयटम्स",
    privacyOrderAmount: "ऑर्डर रक्कम",
    privacyOrderStatus: "ऑर्डर स्थिती",
    privacyCustomerDelivery: "ग्राहक आणि डिलिव्हरी माहिती",
    privacyOrderTimestamps: "ऑर्डर वेळ",
    privacyOrderUsage: "ऑर्डर वापर",
    privacyPaymentPayout: "पेमेंट आणि पेआउट माहिती",
    privacyPaymentPayoutText: "सेटलमेंट प्रक्रिया आणि अचूक आर्थिक रेकॉर्ड ठेवण्यासाठी पेमेंट व पेआउट माहिती वापरली जाते.",
    privacyAccountHolderName: "अकाउंट होल्डरचे नाव",
    privacyBankName: "बँकेचे नाव",
    privacyBankAccountInfo: "बँक अकाउंट माहिती",
    privacyIFSC: "IFSC कोड",
    privacyUPI: "UPI ID",
    privacySettlementInfo: "सेटलमेंट माहिती",
    privacyPaymentSecurity: "पेमेंट सुरक्षा",
    privacyPaymentSecurityText: "पेमेंटशी संबंधित माहिती योग्य सुरक्षा नियंत्रण आणि अधिकृत पेमेंट प्रदात्यांद्वारे हाताळली जाते.",
    privacyHowWeUse: "आम्ही तुमची माहिती कशी वापरतो",
    privacyHowWeUseText: "MaxiGo सेवा चालवणे, देखभाल करणे आणि सुधारण्यासाठी आम्ही पार्टनरची माहिती वापरतो.",
    privacyManagePartnerAccount: "तुमचे पार्टनर अकाउंट व्यवस्थापित करणे",
    privacyProcessOrders: "ऑर्डर्स प्रोसेस आणि व्यवस्थापित करणे",
    privacyCoordinateDelivery: "डिलिव्हरी ऑपरेशन्सचे समन्वय करणे",
    privacyProcessPayments: "पेमेंट आणि सेटलमेंट प्रक्रिया करणे",
    privacyCustomerPartnerSupport: "ग्राहक आणि पार्टनर सपोर्ट देणे",
    privacyMaintainSecurity: "प्लॅटफॉर्म सुरक्षा राखणे",
    privacyDetectFraud: "फ्रॉड किंवा गैरवापर शोधणे व रोखणे",
    privacyImproveService: "MaxiGo सेवा सुधारणे",
    privacyInformationSharing: "माहिती शेअर करणे",
    privacyInformationSharingText1: "MaxiGo सेवा देण्यासाठी आवश्यक असल्यास आम्ही सर्व्हिस प्रोव्हायडर्स आणि पार्टनर्ससोबत माहिती शेअर करू शकतो.",
    privacyInformationSharingText2: "सेवा चालवण्यासाठी आवश्यक असल्यास पेमेंट, होस्टिंग, मॅपिंग, कम्युनिकेशन किंवा इतर टेक्नॉलॉजी प्रोव्हायडर्ससोबत माहिती शेअर केली जाऊ शकते.",
    privacyInformationSharingText3: "आम्ही पार्टनरची वैयक्तिक माहिती विकत नाही.",
    privacyCustomerInformation: "ग्राहक माहिती",
    privacyCustomerInformationText: "पार्टनर्सना दिसणारी ग्राहक माहिती फक्त वैध ऑर्डर्स पूर्ण आणि व्यवस्थापित करण्यासाठी दिली जाते.",
    privacyCustomerAuthorized: "ग्राहक माहितीचा वापर फक्त अधिकृत ऑर्डर आणि डिलिव्हरीसाठी करा.",
    privacyCustomerNoShare: "ग्राहक माहिती अनधिकृत व्यक्तींशी शेअर करू नका.",
    privacyCustomerNoMisuse: "ग्राहक माहितीचा मार्केटिंग, वैयक्तिक संपर्क किंवा इतर अनधिकृत कारणांसाठी गैरवापर करू नका.",
    privacyCustomerAfterOrder: "ऑर्डर पूर्ण झाल्यानंतरही ग्राहक माहिती जबाबदारीने हाताळणे आवश्यक आहे.",
    privacyDataSecurity: "डेटा सुरक्षा",
    privacyDataSecurityText: "अनधिकृत प्रवेश, नुकसान, गैरवापर किंवा माहिती उघड होण्यापासून संरक्षण करण्यासाठी आम्ही योग्य तांत्रिक आणि संघटनात्मक उपाय करतो.",
    privacySecureAuthentication: "सुरक्षित ऑथेंटिकेशन",
    privacyAccessControl: "अॅक्सेस कंट्रोल",
    privacySecureCommunication: "सुरक्षित कम्युनिकेशन",
    privacyDataProtection: "डेटा संरक्षण",
    privacyNoRiskFreeSystem: "कोणतीही ऑनलाइन प्रणाली पूर्णपणे जोखीममुक्त असल्याची हमी देता येत नाही.",
    privacyCookies: "कुकीज आणि समान तंत्रज्ञान",
    privacyCookiesText: "सेशन राखणे, प्राधान्ये लक्षात ठेवणे आणि यूजर अनुभव सुधारण्यासाठी MaxiGo कुकीज किंवा समान तंत्रज्ञान वापरू शकते.",
    privacyCookiesSettings: "उपलब्ध असल्यास ब्राउझर सेटिंग्जमधून तुम्ही कुकीज नियंत्रित करू शकता.",
    privacyDataRetention: "डेटा साठवण कालावधी",
    privacyDataRetentionText: "बिझनेस ऑपरेशन्स, कायदेशीर आवश्यकता, विवाद निराकरण आणि सुरक्षेसाठी आवश्यक असलेल्या योग्य कालावधीपर्यंत आम्ही माहिती ठेवतो.",
    privacyRetentionPeriod: "साठवण कालावधी",
    privacyDataDeletion: "डेटा डिलीशन",
    privacyDataDeletionText: "लागू कायदेशीर, आर्थिक आणि ऑपरेशनल आवश्यकतांच्या अधीन राहून तुम्ही तुमचे अकाउंट आणि पात्र वैयक्तिक माहिती हटवण्याची विनंती करू शकता.",
    important: "महत्त्वाचे",
    privacyDataDeletionImportant: "कायदा, अकाउंटिंग, फ्रॉड प्रतिबंध, विवाद निराकरण किंवा इतर वैध जबाबदाऱ्यांमुळे काही माहिती ठेवावी लागू शकते.",
    privacyThirdParty: "थर्ड-पार्टी सेवा",
    privacyThirdPartyText: "MaxiGo पेमेंट, होस्टिंग, मॅपिंग, अॅनालिटिक्स, मेसेजिंग आणि ऑथेंटिकेशनसारख्या थर्ड-पार्टी सेवांचा वापर करू शकते.",
    privacyThirdPartyPolicies: "थर्ड-पार्टी सेवांच्या स्वतःच्या प्रायव्हसी पॉलिसी आणि अटी असू शकतात.",
    privacyChildren: "मुलांची प्रायव्हसी",
    privacyChildrenText: "MaxiGo Partner Panel बिझनेस पार्टनर्ससाठी आहे आणि मुलांसाठी नाही.",
    privacyChanges: "या प्रायव्हसी पॉलिसीमधील बदल",
    privacyChangesText: "आमच्या सेवा, तंत्रज्ञान किंवा कायदेशीर आवश्यकतांमध्ये बदल झाल्यास आम्ही ही प्रायव्हसी पॉलिसी अपडेट करू शकतो.",
    privacyUpdatedPolicy: "नवीनतम आवृत्ती MaxiGo Partner Panel किंवा वेबसाइटवर उपलब्ध केली जाईल.",
    privacyContactQuestions: "आमच्याशी संपर्क करा",
    privacyContactText: "या प्रायव्हसी पॉलिसीबद्दल किंवा तुमची माहिती कशी हाताळली जाते याबद्दल प्रश्न असल्यास MaxiGo Partner Support शी संपर्क करा.",
    emailSupport: "ईमेल सपोर्ट",
    partnerSupport: "पार्टनर सपोर्ट",
    availablePartnerPanel: "Partner Panel द्वारे उपलब्ध",
    privacyAcknowledgement: "स्वीकृती",
    privacyAcknowledgementText: "MaxiGo Partner Panel वापरून तुम्ही मान्य करता की तुम्ही ही प्रायव्हसी पॉलिसी वाचली आणि समजून घेतली आहे.",
    backToPartnerPanel: "Partner Panel वर परत जा",
    termsConditions: "अटी आणि शर्ती",
    refundCancellation: "रिफंड आणि कॅन्सलेशन",
    partnerAgreement: "पार्टनर करार",
    allRightsReserved: "सर्व हक्क राखीव.",

  },
};


/* =========================================================
   LANGUAGE CONTEXT
========================================================= */

const LanguageContext =
  createContext(null);


/* =========================================================
   LANGUAGE PROVIDER
========================================================= */

export function LanguageProvider({
  children,
}) {

  const [language, setLanguage] =
    useState(() => {

      try {

        const savedLanguage =
          localStorage.getItem(
            "maxigoLanguage"
          );


        if (
          savedLanguage === "en" ||
          savedLanguage === "hi" ||
          savedLanguage === "mr"
        ) {

          return savedLanguage;

        }

        return "en";

      } catch (error) {

        return "en";

      }

    });


  /* =====================================================
     SAVE LANGUAGE
  ===================================================== */

  useEffect(() => {

    try {

      localStorage.setItem(
        "maxigoLanguage",
        language
      );

    } catch (error) {

      console.error(
        "Unable to save language:",
        error
      );

    }

  }, [language]);


  /* =====================================================
     CHANGE LANGUAGE
  ===================================================== */

  const changeLanguage =
    (newLanguage) => {

      if (
        newLanguage !== "en" &&
        newLanguage !== "hi" &&
        newLanguage !== "mr"
      ) {

        return;

      }


      setLanguage(
        newLanguage
      );

    };


  /* =====================================================
     TRANSLATION FUNCTION
  ===================================================== */

  const t = (key) => {

    if (!key) {

      return "";

    }


    const currentTranslation =
      translations[
        language
      ]?.[key];


    if (
      currentTranslation !==
      undefined
    ) {

      return currentTranslation;

    }


    const englishTranslation =
      translations.en?.[key];


    if (
      englishTranslation !==
      undefined
    ) {

      return englishTranslation;

    }


    return key;

  };


  /* =====================================================
     PROVIDER
  ===================================================== */

  return (

    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
        translations,
      }}
    >

      {children}

    </LanguageContext.Provider>

  );

}


/* =========================================================
   CUSTOM HOOK
========================================================= */

export function useLanguage() {

  const context =
    useContext(
      LanguageContext
    );


  if (!context) {

    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );

  }


  return context;

}


/* =========================================================
   EXPORT
========================================================= */

export {
  translations,
};