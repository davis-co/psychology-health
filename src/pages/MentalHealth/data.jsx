import { text, yesNoQuestion } from "./i18n";
import { mentalHealthDisOrder } from "@/constants/i18n";
import { Required_Error } from "@/constants/form";
import TextGuide from "./TextGuide";

export const questionsK6 = [
  { label: text.k6Q1, key: "10422" },
  { label: text.k6Q2, key: "10423" },
  { label: text.k6Q3, key: "10424" },
  { label: text.k6Q4, key: "10425" },
  { label: text.k6Q5, key: "10427" },
  { label: text.k6Q6, key: "10426" },
];

export const questions = {
  "ابتلا به اختلالات روان (با تشخیص پزشک)": {
    component: "CheckBoxGroup",
    questionKey: "10437",
    archive: true,
    divider: "center",
    options: mentalHealthDisOrder,
    validation: { required: Required_Error },
    containerClassName: "col-span-full ",
    checkBoxClassName: "md:!min-w-[20%] !min-w-[48%]",
  },
  "تعیین نوع بیماری روان": {
    component: "TextField",
    questionKey: "10438",
    validation: { required: Required_Error },
    containerClassName: "animate-flipRight",
  },
  "سابقه اقدام به خودکشی": {
    component: "RadioOptions",
    questionKey: "10441",
    options: yesNoQuestion,
    validation: { required: Required_Error },
    optionsContainer: "radioOptions-boolean-optionsContainer",
    radioClassName: "radioOptions-boolean-radio",
    containerClassName: "animate-flipRight",
  },
  "دارای افکار خودکشی در حال حاضر": {
    component: "RadioOptions",
    questionKey: "11892",
    archive: true,
    userGuide: (
      <TextGuide
        text={`می توان درباره " احساس سیر شدن از زندگی" ، " آرزوی پایان زندگی " ، " فکر از بین بردن خود " و ... سوال پرسید و اگر پاسخ مثبت بود درباره چگونگی آن پرسید. `}
      />
    ),
    options: yesNoQuestion,
    validation: { required: Required_Error },
    optionsContainer: "radioOptions-boolean-optionsContainer",
    radioClassName: "radioOptions-boolean-radio",
  },
  "تمایل به صحبت با مشاور سلامت": {
    component: "RadioOptions",
    questionKey: "12504",
    options: yesNoQuestion,
    validation: { required: Required_Error },
    optionsContainer: "radioOptions-boolean-optionsContainer",
    radioClassName: "radioOptions-boolean-radio",
    containerClassName: "animate-flipRight",
  },
  "دارای سابقه افکار خودکشی": {
    component: "RadioOptions",
    questionKey: "10440",
    options: yesNoQuestion,
    validation: { required: Required_Error },
    optionsContainer: "radioOptions-boolean-optionsContainer",
    radioClassName: "radioOptions-boolean-radio",
    containerClassName: "animate-flipRight",
  },
};
