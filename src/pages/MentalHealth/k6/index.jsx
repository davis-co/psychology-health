import { useEffect, useState } from "react";
import { FieldSet, RadioOptions, ProgressChart } from "react-elements-davis";
import { debounce } from "@/utils/helpers";
import { questionsK6 } from "./data";
import styles from "./styles.module.css";
import { radioFiveMentalHealth, text } from "./text";
import { useFormContext } from "react-hook-form";
import { Required_Error } from "@/constants/form";
import { ResultBox } from "@/components/elements";

export default function K6Test() {
  const { watch, formState, register, setValue } = useFormContext();

  const [pointK6, setPointK6] = useState(0);
  const [iconCalc, setIconCalc] = useState(false);

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
    setIconCalc(true);
  }, 300);

  useEffect(() => {
    calculateTotalScore();
  }, [watchedValues]);

  const generalData = [
    { name: "level1", value: { min: 0, max: 6 }, color: "#86efac" },
    { name: "level2", value: { min: 6.1, max: 12 }, color: "#008000" },
    { name: "level3", value: { min: 12.1, max: 18 }, color: "#FFB200" },
    { name: "level4", value: { min: 18.1, max: 24 }, color: "#FF0000" },
  ];
  const userData = {
    name: "userMentalPoint",
    value: pointK6,
  };

  return (
    <FieldSet title={text.k6Test}>
      <div className={styles.listOfQuestions}>
        <p className={styles.description}>{text.k6Description}</p>
        <div className="grid-3">
          {questionsK6.map((q) => (
            <RadioOptions
              key={q.key}
              label={q.label}
              questionKey={q.key}
              validation={{ required: Required_Error }}
              errors={formState.errors}
              options={radioFiveMentalHealth}
              register={register}
              active={watch(q.key)}
              divider={"center"}
              radioClassName=" !min-w-[48%] md:!min-w-[30%] lg:!min-w-[48%] xl:!min-w-[30%] !gap-0"
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
            {watch("11892") === "10361" ? (
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
