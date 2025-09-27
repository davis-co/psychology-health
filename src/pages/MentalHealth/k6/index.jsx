import { useEffect, useState } from "react";
import { FieldSet, RadioOptions, ProgressChart } from "davis-components";
import { debounce } from "@/utils/helpers";
import { questionsK6 } from "./data";
import { radioFiveMentalHealth, text } from "./text";
import { useFormContext } from "react-hook-form";
import { Required_Error } from "@/constants/form";
import { ResultBox } from "@/components/elements";
import { request } from "@/services";

export default function K6Test() {
  const { watch, formState, register, setValue } = useFormContext();
  const [pointK6, setPointK6] = useState(0);

  const scoreMap = {
    10428: 4,
    10429: 3,
    10430: 2,
    10432: 1,
    10431: 0,
  };

  const watchedValues = watch([
    "10422",
    "10423",
    "10424",
    "10425",
    "10426",
    "10427",
  ]);

  const calculateTotalScore = debounce(() => {
    const totalScore = questionsK6.reduce((total, question, index) => {
      const value = watchedValues[index];
      return total + (scoreMap[value] || 0);
    }, 0);

    setPointK6(totalScore);
    setValue("10435", totalScore);
  }, 300);

  useEffect(() => {
    calculateTotalScore();
  }, []);

  useEffect(() => {
    calculateTotalScore();
  }, [watchedValues]);

  const generalData = [
    { name: "level1", value: { min: 0, max: 6 }, color: "#86efac" },
    { name: "level2", value: { min: 6.1, max: 12 }, color: "#008000" },
    { name: "level3", value: { min: 12.1, max: 18 }, color: "#FFB200" },
    { name: "level4", value: { min: 18.1, max: 24 }, color: "#FF0000" },
  ];

  return (
    <FieldSet title={text.k6Test}>
      <div className={"grid-3"}>
        <p className={"guide-description col-span-full"}>
          {text.k6Description}
        </p>
        <div className="grid-3 col-span-full">
          {questionsK6.map((q) => (
            <RadioOptions
              containerClassName="col-span-full"
              key={q.key}
              label={q.label}
              questionKey={q.key}
              archive={{
                userID: watch("6483"),
                BC,
                jobID: 164,
                request,
                renderCell: (val) =>
                  radioFiveMentalHealth.find((o) => o.value == val)?.label,
              }}
              validation={{ required: Required_Error }}
              errors={formState.errors}
              options={radioFiveMentalHealth}
              register={register}
              active={watch(q.key)}
              divider={"right"}
              radioClassName=" !min-w-[48%] md:!min-w-[19%] !gap-0"
            />
          ))}
          <ProgressChart
            value={watch("10435")}
            ranges={generalData}
            label={text.mentalAssessment}
            required={true}
            containerClassName={"md:!mb-5 !con-span-1"}
          />
          <div className="flex flex-col col-span-full gap-5">
            {watch("11892") == "10361" ? (
              <ResultBox
                title={"هشدار"}
                content={text.result5MentalHealth}
                alert={true}
              />
            ) : null}

            {watch("11892") == "10362" &&
            (watch("10441") == "10361" || watch("10440") == "10361") ? (
              <ResultBox
                title={"هشدار"}
                content={text.result4MentalHealth}
                alert={true}
              />
            ) : null}

            {watch("11888") ? (
              <ResultBox
                title={"هشدار"}
                content={text.result3MentalHealth}
                alert={true}
              />
            ) : null}

            {watch("11887") ? (
              <ResultBox
                title={"هشدار"}
                content={text.result2MentalHealth}
                alert={true}
              />
            ) : null}

            {watch("11846") ? (
              <ResultBox title={"تبریک"} content={text.result1MentalHealth} />
            ) : null}
            {pointK6 >= 10 ? (
              <ResultBox
                title={"هشدار"}
                content={text.alertMentalAssessment}
                alert={true}
              />
            ) : null}
          </div>
        </div>
      </div>
    </FieldSet>
  );
}
