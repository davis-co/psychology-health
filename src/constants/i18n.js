export const Dict = {

    "Waist Circumference": "دور کمر",
    "Current Weight": "وزن",
    Height: "قد",
    Calculate: "محاسبه",
    Save: "ذخیره اطلاعات",
    "Educational message:": "پیام آموزشی :",
    Close: "بستن",
    "Download the help file": "دانلود فایل راهنما",
    "Successful Operation!": "عملیات با موفقیت انجام شد.",
    "This is required.": "پاسخ به این سوال اجباری است.",
    "Invalid format!": "فرمت نامعتبر است",
    'back' :" بازگشت"
}
export const mentalHealthDisOrder = [
    { label: "افسردگی", value: "1514109071882" },
    { label: "اضطراب", value: "1514108884563" },
    { label: "اختلال دوقطبی", value: "1514109106067" },
    { label: "جنون", value: "1514109185115" },
    { label: "صرع یا تشنج", value: "1513768760443" },
    { label: "اختلالات خواب", value: "1514190240786" },
    { label: "سایر بیماری های روان", value: "10652" },
    { label: "هیچکدام", value: "10653" },
  ]
export const i18n = (text) => {
    const lang = "fa"
    if (lang == "fa") {
        return Dict[text]
    } else {
        return text
    }
}
