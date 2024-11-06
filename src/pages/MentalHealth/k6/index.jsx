import React, {
  useEffect,
  useState,
} from 'react';

import classNames from 'classnames';

import {
  Label,
  ProgressChart,
} from '@/components/elements';
import FieldSet from '@/components/elements/FieldSet';
import RadioOptions from '@/components/elements/RadioOptions';
import { debounce } from '@/utils/helpers';

import { questionsK6 } from './data';
import styles from './styles.module.css';
import {
  radioFiveMentalHealth,
  text,
} from './text';

export default function K6Test({
    errors,
    watch,
    register,
    setValue,
}) {
    const [pointK6, setPointK6] = useState(0)
    const [iconCalc, setIconCalc] = useState(false)
    const elements = []


    const scoreMap = {
        10428: 4,
        10429: 3,
        10430: 2,
        10432: 1,
        10431: 0,
    }

    const watchedValues = watch([
        "10422",
        "10423",
        "10424",
        "10425",
        "10426",
        "10427",
    ])

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
    ]
    const userData = {
        name: "userMentalPoint",
        value: pointK6,
    }

    return (

        <FieldSet title={text.k6Test} >
            <div className={styles.listOfQuestions}>
                <p className={"text-description"}>{text.k6Description}</p>
                {questionsK6.map((q) => (
                    <RadioOptions
                        key={q.key}
                        containerClassName="input-card w-full"
                        className="item-center flex-auto p-1 font-700 text-3xs leading-4 text-black  justify-between md:text-2xs"
                        label={q.label}
                        labelClassName={"lg:!w-[300px]"}
                        questionKey={q.key}
                        required={true}
                        options={radioFiveMentalHealth}
                        register={register}
                        active={watch(q.key)}
                        isError={!!errors[q.key]}
                    />
                ))}

                <section className={styles.resultBox}>
                    <div className="flex w-full items-center justify-start gap-5 rounded bg-white-light pr-2 shadow-md md:mb-6 md:w-1/2 md:pt-[2px]">
                        <Label
                            label={text.mentalAssessment}
                            required={true}
                            isError={!!errors[10435]}
                        />
                        <div className="relative flex flex-1 items-center justify-center gap-2 p-2">
                            <div className="flex-1">
                                <ProgressChart
                                    generalData={generalData}
                                    userData={userData.value}
                                />
                            </div>
                        </div>
                    </div>

                    {watch("11892") === "10361" ? (
                        <div className={styles.message}>
                            <legend
                                className={
                                    styles.messageWarning + " " + "text-red"
                                }
                            >
                                {"هشدار"}
                            </legend>
                            <p>{text.result5MentalHealth}</p>
                        </div>
                    ) : null}

                    {watch("11892") === "10362" &&
                        (watch("10441") === "10361" ||
                            watch("10440") === "10361") ? (
                        <div className={styles.message}>
                            <p>{text.result4MentalHealt}</p>
                        </div>
                    ) : null}

                    {watch("11892") === "10362" &&
                        watch("10441") === "10362" ? (
                        <div className={styles.message}>
                            <p>{text.result3MentalHealt}</p>
                        </div>
                    ) : null}

                    {(watch("10437")?.includes("10652") ||
                        watch("10437")?.includes("10653") ||
                        watch("10437")?.includes("1513768760443")) &&
                        pointK6 <= 10 ? (
                        <div className={styles.message}>
                            <p>{text.result2MentalHealt}</p>
                        </div>
                    ) : null}

                    {((watch("10437")?.includes("1514109071882") ||
                        watch("10437")?.includes("1514109106067")) &&
                        pointK6 < 10) ||
                        pointK6 == 5 ? (
                        <div className={styles.message}>
                            <p>{text.result1MentalHealt}</p>
                        </div>
                    ) : null}
                    {pointK6 >= 10 ? (
                        <div className={classNames(styles.message)}>
                            <legend className={styles.messageWarning}>
                                {"هشدار"}
                            </legend>
                            <p>{text.alertMentalAssessment}</p>
                        </div>
                    ) : null}
                </section>
            </div>
        </FieldSet>

    )
}
