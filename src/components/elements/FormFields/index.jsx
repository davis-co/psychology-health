/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { DateInput, ProgressChart, Select } from "davis-components";
import { TextEditor } from "../TextEditor";
import { TextField } from "../TextField";
import { FileField } from "../FileField";
import { RadioOptions } from "../RadioOptions";
import { CheckBoxGroup } from "../CheckBoxGroup";

export const FormFields = ({
  BC,
  useFormContext,
  unmount,
  request,
  ...props
}) => {
  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    return () => {
      if (unmount) setValue(props.questionKey, null);
    };
  }, []);

  const commonProps = {
    containerClassName: `${props.containerClassName} max-h-fit`,
    label: props.label,
    questionKey: props.questionKey,
    userGuide: props.userGuide,
    disabled: props.disabled,
    archive: props.archive
      ? {
          userID: watch("6483"),
          BC,
          jobID: 164,
          request,
          renderCell: props.renderCell,
        }
      : null,
    en: props.en,
  };

  const componentMap = {
    RadioOptions: (
      <RadioOptions
        {...commonProps}
        register={register}
        divider={props.divider || "center"}
        setValue={setValue}
        optionsContainer={props.optionsContainer}
        radioClassName={props.radioClassName}
        labelClassName="!text-center"
        active={watch(props.questionKey)}
        errors={errors}
        options={props.options}
        labelMore={props.labelMore}
        validation={props.validation}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
                renderCell: (val) =>
                  props.options.find((o) => o.value == val)?.label,
              }
            : null
        }
      />
    ),
    TextEditor: (
      <TextEditor
        {...commonProps}
        useFormContext={useFormContext}
        validation={props.validation}
        divider={props.divider}
        labelMore={props.labelMore}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
                renderCell: (val) => {
                  try {
                    if (!val) return "";
                    const cleanedHtml = val
                      .replace(/^"|"$/g, "")
                      .replace(/\\"/g, '"');
                    const div = document.createElement("div");
                    div.innerHTML = cleanedHtml;
                    return div.textContent || div.innerText || "";
                  } catch (e) {
                    console.error("Error parsing score content:", e);
                    return "";
                  }
                },
              }
            : false
        }
      />
    ),
    TextField: (
      <TextField
        {...commonProps}
        labelClassName={props.labelClassName}
        divider={props.rows ? "" : "center"}
        errors={errors}
        watch={watch}
        register={register}
        rows={props.rows}
        placeholder={props.placeholder}
        educationalContent={props.educationalContent}
        labelMore={props.labelMore}
        onlyNumber={props.onlyNumber}
        validation={props.validation}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
                renderCell: (val) => {
                  try {
                    if (!val) return "اطلاعاتی موجود نیست";

                    // اگر مقدار عددی است
                    if (!isNaN(Number(val))) {
                      return Number(val).toFixed(2);
                    }

                    // اگر رشته باشد و شامل خط تیره باشد
                    if (typeof val === "string") {
                      const lines = val.split(" - ").map((line) => line.trim());
                      return (
                        <>
                          {lines.map((line, index) => (
                            <span key={index}>
                              {line}
                              {index < lines.length - 1 && <br />}
                            </span>
                          ))}
                        </>
                      );
                    }

                    // برای سایر موارد (مثلاً آبجکت یا آرایه)
                    const strVal = String(val);
                    return strVal.length > 30
                      ? strVal.substring(0, 200) + "..."
                      : strVal;
                  } catch (e) {
                    console.error("Error parsing score content:", e);
                    return "خطا در نمایش";
                  }
                },
              }
            : false
        }
      />
    ),
    "progress-chart": (
      <ProgressChart
        {...commonProps}
        divider={props.rows ? "" : "center"}
        value={watch(props.questionKey)}
        ranges={props.ranges}
        educationalContent={props.educationalContent}
        required={props.validation}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
              }
            : null
        }
      />
    ),
    Select: (
      <Select
        {...commonProps}
        options={props.options}
        control={control}
        errors={errors}
        search={props.search}
        divider={props.divider || "center"}
        educationalContent={props.educationalContent}
        labelMore={props.labelMore}
        value={props.value}
        onChange={props.onChange}
        validation={props.validation}
        register={register}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
                renderCell: (val) =>
                  props.options.find((o) => o.value == val)?.label,
              }
            : null
        }
      />
    ),
    CheckBoxGroup: (
      <CheckBoxGroup
        {...commonProps}
        watch={watch}
        options={props.options}
        setValue={setValue}
        register={register}
        errors={errors}
        divider={props.divider || "center"}
        educationalContent={props.educationalContent}
        labelMore={props.labelMore}
        checkBoxClassName={props.checkBoxClassName}
        optionsContainer={props.optionsContainer}
        validation={props.validation}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
                renderCell: (values) =>
                  values
                    .map(
                      (value) =>
                        props.options.find((o) => o.value == value)?.label
                    )
                    .join(" , "),
              }
            : null
        }
      />
    ),
    DateInput: (
      <DateInput
        {...commonProps}
        control={control}
        watch={watch}
        errors={errors}
        validation={props.validation}
        id={props.id}
        divider={props.divider || "center"}
        educationalContent={props.educationalContent}
        labelMore={props.labelMore}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
                renderCell: (val) => val,
              }
            : null
        }
      />
    ),
    FileField: (
      <FileField
        {...commonProps}
        value={props.value}
        watch={watch}
        setValue={setValue}
        errors={errors}
        labelClassName={props.labelClassName}
        accept={props.accept}
        baseURL={props.baseURL}
        divider={props.divider || "center"}
        educationalContent={props.educationalContent}
        labelMore={props.labelMore}
        validation={props.validation}
        register={register}
        archive={
          props.archive
            ? {
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
              }
            : null
        }
      />
    ),
  };
  // console.log("userID(6483):", watch("6483"));
  return componentMap[props.component] || null;
};
