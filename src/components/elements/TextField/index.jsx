/* eslint-disable react/prop-types */
import classNames from "classnames";
import { BiError } from "react-icons/bi";
import { useEffect } from "react";
import NoteIcon from "./note.svg";
import { BsPencilSquare } from "react-icons/bs";
import { Divider } from "davis-components";
import { Label } from "../Label";

export const TextField = ({
  containerClassName,
  className,
  label,
  icon,
  userGuide,
  educationalContent,
  archive,
  labelClassName,
  questionKey,
  onlyNumber = false,
  validation,
  register,
  watch,
  onChange: customOnChange,
  value: customValue,
  errors,
  disabled = false,
  divider,
  dividerClassName,
  inputClassName,
  errorClassName,
  en,
  labelMore,
  placeholder = "در اینجا وارد کنید ...",
  showLockIcon = true,
  ...props
}) => {
  const error = errors?.[questionKey] ? errors?.[questionKey]?.message : null;
  const stripHtml = (html) => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // درون کامپوننت TextField اضافه کن:
  useEffect(() => {
    if (
      register &&
      questionKey &&
      typeof inputValue === "string" &&
      /<\/?[a-z][\s\S]*>/i.test(inputValue)
    ) {
      const cleanText = stripHtml(inputValue);
      if (props.rows) {
        register(questionKey).onChange({
          target: { value: cleanText.replace(/<br\s*\/?>/gi, "\n") },
        });
      } else {
        register(questionKey).onChange({
          target: { value: cleanText },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fallback to React Hook Form's `watch` and `register` if no `customValue` or `customOnChange` is provided
  const inputValue = customValue ?? watch?.(questionKey) ?? "";
  const sanitizeNumeric = (val) => {
    if (val === null || val === undefined) return "";
    return String(val).replace(/[^\d.]/g, ""); // فقط عدد و نقطه رو نگه داره
  };
  const inputOnChange = (e) => {
    const rawValue = e?.target?.value;
    const nextValue = onlyNumber ? sanitizeNumeric(rawValue) : rawValue;
    if (customOnChange) {
      customOnChange({ ...e, target: { ...e.target, value: nextValue } });
    } else if (register) {
      register(questionKey)?.onChange({ target: { value: nextValue } });
    }
  };

  const inputProps = {
    className: classNames(
      inputClassName,
      "w-full font-400 text-2xs lg:text-xs xl:text-sm text-black border-[0.5px]  rounded border-black text-2xs lg:placeholder:text-xs bg-background py-1 px-1.5 hover:outline-none hover:bg-white hover:ring-0 hover:border-success focus:outline-none focus:bg-white focus:ring-0 focus:border-success",
      props.rows ? "!py-2 !px-2" : "",
      disabled && "cursor-not-allowed",
      inputValue ? "!bg-white !font-600" : ""
    ),
    dir: en ? "ltr" : "rtl",
    disabled,
    value: (() => {
      const base = props.rows
        ? stripHtml(inputValue).replace(/<br\s*\/?>/gi, "\n")
        : stripHtml(inputValue);
      return onlyNumber ? sanitizeNumeric(base) : base;
    })(),
    onChange: inputOnChange,
    placeholder,
    ...(onlyNumber ? { inputMode: "numeric", pattern: "[0-9]*" } : {}),
    ...props,
  };

  const labelDirectionStyle = {
    center: "label-center",
    right: "label-right",
    left: "label-left",
  };

  return (
    <div
      className={classNames(
        error ? "field-error" : "",
        "bg-formItem w-full flex flex-col relative p-2 rounded",
        props.rows ? "gap-1" : "",
        containerClassName
      )}
      style={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
      }}
    >
      {label && (
        <Label
          className={classNames(labelClassName, labelDirectionStyle[divider])}
          userGuide={userGuide}
          educationalContent={educationalContent}
          archive={archive ? { ...archive, questionKey } : false}
          label={label}
          required={validation ? validation.required : null}
          en={en}
          more={labelMore}
          disabled={disabled && showLockIcon}
        />
      )}
      {divider && (
        <Divider className={classNames(dividerClassName)} position={divider} />
      )}
      <div
        className={classNames(
          className,
          "group flex justify-center items-center relative overflow-hidden"
        )}
      >
        {props.rows > 1 ? (
          <textarea
            {...inputProps}
            {...(register ? register(questionKey, validation) : {})}
          />
        ) : (
          <input
            {...inputProps}
            {...(register ? register(questionKey, validation) : {})}
          />
        )}
        {!props.rows ? (
          <div
            className={classNames(
              "absolute top-1/2 left-1 lg:left-1.5 -translate-y-1/2",
              en ? "!left-auto !right-1" : "!left-1"
            )}
          >
            {icon ? (
              icon
            ) : (
              <img
                src={NoteIcon}
                className="h-[13px] w-[13px] lg:h-[19px] lg:w-[19px]"
                alt=""
              />
            )}
          </div>
        ) : (
          <div
            className={classNames(
              "absolute top-1/2 left-1 lg:left-1.5 -translate-y-1/2",
              en ? "left-auto right-2" : "left-2"
            )}
            style={{
              height: props.rows * 20,
              width: props.rows * 20,
              maxHeight: 60,
              maxWidth: 60,
            }}
          >
            <BsPencilSquare className="opacity-5 w-full h-full" />
          </div>
        )}
      </div>
      {error && (
        <span className={"error" + " " + errorClassName}>
          {<BiError className="text-xs lg:text-base" />}
          {error}
        </span>
      )}
    </div>
  );
};
