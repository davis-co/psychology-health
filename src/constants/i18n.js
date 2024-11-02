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

export const i18n = (text) => {
    const lang = "fa"
    if (lang == "fa") {
        return Dict[text]
    } else {
        return text
    }
}
