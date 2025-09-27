import { validationMessages } from "@/constants/form";
import { i18n } from "@/constants/i18n";
import classNames from "classnames";
import { Divider, Label, TextField } from "davis-components";
import { BiError } from "react-icons/bi";

export default function CommentAndGrade({
  question,
  errors,
  watch,
  register,
  containerClassName,
}) {
  const isError = question.required
    ? !!errors[question.questions[0].qKey]
    : false;
  return question.questions?.length > 1 ? (
    <div
      key={question.qKey}
      className={classNames(
        containerClassName,
        "w-full flex flex-col p-2 bg-formItem1 rounded relative shadow-formItem",
        isError
          ? "mb-2.5 lg:!mb-1 !border-[1px] border-solid !border-[#960018]"
          : ""
      )}
      style={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Label label={question.label} required={question.required} />
      <Divider position="right" />
      <div className="flex gap-2 lg:gap-3">
        {question.questions.map((q, index) => {
          const isScore = q.placeholder === "امتیاز";
          const inputType = isScore ? "number" : "text";

          return (
            <TextField
              key={q.qKey}
              questionKey={q.qKey}
              validation={
                question.required
                  ? index == 0
                    ? {
                        required: validationMessages.required,
                      }
                    : false
                  : false
              }
              placeholder={
                index == 1 ? q.placeholder : i18n("Write in this section")
              }
              containerClassName={classNames(
                "!shadow-none !p-0",
                q.className,
                isScore
                  ? "flex-none !w-24 md:!w-28 lg:!w-32 xl:!w-36"
                  : "flex-1"
              )}
              rows={2}
              watch={watch}
              register={register}
              type={inputType}
            />
          );
        })}
      </div>
      {isError && (
        <span className="error">
          {<BiError className="text-xs lg:text-base" />}
          {"پر کردن این قسمت الزامیست."}
        </span>
      )}
    </div>
  ) : (
    <div
      key={question.qKey}
      className={classNames(
        containerClassName,
        "w-full flex flex-col p-2 bg-formItem1 rounded relative shadow-formItem",
        isError
          ? "mb-2.5 lg:!mb-1 !border-[1px] border-solid !border-[#960018]"
          : ""
      )}
      style={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Label label={question.label} required={question.required} />
      <Divider position="right" />
      <TextField
        questionKey={question.questions[0]?.qKey}
        placeholder={i18n("Write in this section")}
        validation={{
          required: question.required ? validationMessages.required : null,
        }}
        rows={2}
        errors={errors}
        watch={watch}
        register={register}
        containerClassName={"!shadow-none !p-0"}
        type={"text"}
      />
      {isError && (
        <span className="error">
          {<BiError className="text-xs lg:text-base" />}
          {"پر کردن این قسمت الزامیست."}
        </span>
      )}
    </div>
  );
}
