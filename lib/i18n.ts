export const languages = {
  en: "English",
  ta: "தமிழ்",
  hi: "हिंदी",
}

export const translations = {
  en: {
    // Common
    welcome: "Welcome",
    login: "Login",
    signup: "Sign Up",
    profile: "Profile",
    logout: "Logout",
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    loading: "Loading...",

    // Navigation
    dashboard: "Dashboard",
    bookings: "Bookings",
    vehicles: "Vehicles",
    payments: "Payments",
    history: "History",

    // Booking
    bookTransport: "Book Transport",
    pickupLocation: "Pickup Location",
    dropLocation: "Drop Location",
    goodsType: "Goods Type",
    weight: "Weight",
    dimensions: "Dimensions",
    dateTime: "Date & Time",
    estimatedCost: "Estimated Cost",

    // Driver
    vehicleDetails: "Vehicle Details",
    availableSpace: "Available Space",
    acceptRequest: "Accept Request",
    rejectRequest: "Reject Request",

    // Chat
    chatWithDriver: "Chat with Driver",
    typeMessage: "Type your message...",

    // Status
    pending: "Pending",
    confirmed: "Confirmed",
    inTransit: "In Transit",
    delivered: "Delivered",
    cancelled: "Cancelled",
  },
  ta: {
    // Common
    welcome: "வரவேற்கிறோம்",
    login: "உள்நுழைய",
    signup: "பதிவு செய்க",
    profile: "சுயவிவரம்",
    logout: "வெளியேறு",
    save: "சேமி",
    cancel: "ரத்து செய்",
    submit: "சமர்ப்பிக்க",
    loading: "ஏற்றுகிறது...",

    // Navigation
    dashboard: "டாஷ்போர்டு",
    bookings: "முன்பதிவுகள்",
    vehicles: "வாகனங்கள்",
    payments: "பணம் செலுத்துதல்",
    history: "வரலாறு",

    // Booking
    bookTransport: "போக்குவரத்து முன்பதிவு",
    pickupLocation: "எடுக்கும் இடம்",
    dropLocation: "விடும் இடம்",
    goodsType: "பொருள் வகை",
    weight: "எடை",
    dimensions: "அளவுகள்",
    dateTime: "தேதி மற்றும் நேரம்",
    estimatedCost: "மதிப்பிடப்பட்ட செலவு",

    // Driver
    vehicleDetails: "வாகன விவரங்கள்",
    availableSpace: "கிடைக்கும் இடம்",
    acceptRequest: "கோரிக்கையை ஏற்க",
    rejectRequest: "கோரிக்கையை நிராகரிக்க",

    // Chat
    chatWithDriver: "ஓட்டுநருடன் அரட்டை",
    typeMessage: "உங்கள் செய்தியை தட்டச்சு செய்யுங்கள்...",

    // Status
    pending: "நிலுவையில்",
    confirmed: "உறுதிப்படுத்தப்பட்டது",
    inTransit: "பயணத்தில்",
    delivered: "வழங்கப்பட்டது",
    cancelled: "ரத்து செய்யப்பட்டது",
  },
  hi: {
    // Common
    welcome: "स्वागत है",
    login: "लॉगिन",
    signup: "साइन अप",
    profile: "प्रोफ़ाइल",
    logout: "लॉगआउट",
    save: "सेव करें",
    cancel: "रद्द करें",
    submit: "जमा करें",
    loading: "लोड हो रहा है...",

    // Navigation
    dashboard: "डैशबोर्ड",
    bookings: "बुकिंग",
    vehicles: "वाहन",
    payments: "भुगतान",
    history: "इतिहास",

    // Booking
    bookTransport: "परिवहन बुक करें",
    pickupLocation: "पिकअप स्थान",
    dropLocation: "ड्रॉप स्थान",
    goodsType: "माल का प्रकार",
    weight: "वजन",
    dimensions: "आयाम",
    dateTime: "दिनांक और समय",
    estimatedCost: "अनुमानित लागत",

    // Driver
    vehicleDetails: "वाहन विवरण",
    availableSpace: "उपलब्ध स्थान",
    acceptRequest: "अनुरोध स्वीकार करें",
    rejectRequest: "अनुरोध अस्वीकार करें",

    // Chat
    chatWithDriver: "ड्राइवर से चैट करें",
    typeMessage: "अपना संदेश टाइप करें...",

    // Status
    pending: "लंबित",
    confirmed: "पुष्ट",
    inTransit: "ट्रांजिट में",
    delivered: "डिलीवर किया गया",
    cancelled: "रद्द",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en
