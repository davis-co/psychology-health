import React, { useEffect, useState } from "react";

import { BsFiletypePdf } from "react-icons/bs";

import { Label, Modal, FieldSet, RadioOptions } from "react-elements-davis";
import { ProgressChart } from "@/components/elements";
import useDevice from "@/hooks/useDevice";
import { debounce } from "@/utils/helpers";

import { yesNoQuestion } from "../i18n";
import { questionsDomesticViolence } from "./data";
import styles from "./styles.module.css";
import { radioFiveMentalHealth, text } from "./text";

export default function DomesticViolence({
  errors,
  watch,
  register,
  setValue,
  // setPointDomestic,
  // pointDomestic,
}) {
  const watchedValues = watch(["10443", "10444", "10445", "10446"]);

  const [iconCalc, setIconCalc] = useState(false);
  const [pdfContent, setPdfContent] = useState(false);
  const [pointDomestic, setPointDomestic] = useState(0);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [device] = useDevice();

  const scoreMap = {
    10428: 4,
    10429: 3,
    10430: 2,
    10432: 1,
    10431: 0,
  };

  const calcTotalScore = debounce(() => {
    const totalScore = questionsDomesticViolence.reduce(
      (total, question, index) => {
        const value = watchedValues[index];
        return total + (scoreMap[value] || 0);
      },
      0
    );

    setPointDomestic(totalScore);
    setValue("10552", totalScore);
    setIconCalc(true);
  }, 300);

  useEffect(() => {
    calcTotalScore();
  }, [watchedValues]);

  const downloadBtnHandle = () => {
    const pdfUrl =
      "https://nse2.salamatehr.ir/LFFO/?fid=11930&0.053407106673689864";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "document.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handelContentPdf = () => {
    if (device !== "desktop") {
      downloadBtnHandle();
    } else {
      setPdfContent(true);
    }
  };
  const generalData = [
    { name: "level1", value: { min: 0, max: 5 }, color: "#86efac" },
    { name: "level2", value: { min: 5.1, max: 10 }, color: "#16a34a" },
    { name: "level3", value: { min: 10.1, max: 15 }, color: "#FFFF00" },
    { name: "level4", value: { min: 15.1, max: 20 }, color: "#FF0000" },
  ];
  const userData = {
    name: "userMentalPoint",
    value: pointDomestic,
  };
  return (
    <FieldSet title={text.domesticViolenceTest}>
      <div className={styles.listOfQuestions}>
        <p className={styles.description}>{text.domesticViolenceDescription}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-[5vw] gap-y-4 lg:gap-y-6">
          {questionsDomesticViolence.map((q) => (
            <RadioOptions
              label={q.label}
              questionKey={q.key}
              required={true}
              options={radioFiveMentalHealth}
              register={register}
              active={watch(q.key)}
              isError={!!errors[q.key]}
              errors={errors}
              divider={"center"}
              radioClassName=" !min-w-[48%] md:!min-w-[30%] lg:!min-w-[48%] xl:!min-w-[30%] !gap-0"
            />
          ))}
        </div>

        <section className={styles.gridcontainer}>
          <div className="flex items-center justify-between rounded bg-zinc-50 p-2 shadow-md xs:w-full">
            <Label
              className="lg:w-[40%]"
              label={text.domesticAssesment}
              required={true}
            />
            <div className="flex flex-1 items-center justify-center gap-2">
              <div className="flex-1">
                <ProgressChart
                  generalData={generalData}
                  userData={userData.value}
                />
              </div>
            </div>
          </div>
          <RadioOptions
            label={text.willingnessReceiveSpecializedServices}
            options={yesNoQuestion}
            questionKey={"10667"}
            active={watch("10667")}
            register={register}
            divider={"center"}
            optionsContainer={"radioOptions-boolean-optionsContainer"}
            radioClassName="radioOptions-boolean-radio"
            labelClassName="lg:!text-[11px] xl:!text-sm"
            containerClassName="gap-1"
          />
          <div className="col-span-full">
            {pointDomestic > 4 && pointDomestic <= 10 ? (
              <div className={styles.message}>
                <p>{text.result6MentalHealt}</p>
              </div>
            ) : null}

            {pointDomestic <= 4 ? (
              <div className={styles.message}>
                <p>{text.result7MentalHealt}</p>
              </div>
            ) : null}
          </div>
        </section>
        <section className="col-span-full flex items-center justify-center">
          <div className="m-auto flex w-full items-center justify-between rounded bg-zinc-50 p-2 shadow-md md:w-2/5">
            <Label
              containerClassName="text-[11px]"
              label={text.violenceContent}
              isError={!!errors[10435]}
              labelClassName={"lg:w-[200px]"}
            />
            <div className="flex cursor-pointer items-center justify-center gap-3 rounded border border-zinc-500 p-1">
              <span className="text-3xs md:text-sm" onClick={handelContentPdf}>
                محتوای متنی
              </span>
              <span>
                <BsFiletypePdf className="text-base md:text-lg" />
              </span>
            </div>
          </div>
        </section>

        <Modal
          isOpen={pdfContent}
          containerClassName="h-full w-full"
          onClose={() => setPdfContent(false)}
        >
          <section className="mb-6 mt-4 h-full bg-slate-700 text-white">
            <iframe
              src={
                "https://nse2.salamatehr.ir/LFFO/?fid=11930&0.646200249523935"
              }
              type="application/pdf"
              width="100%"
              height="100%"
            ></iframe>
          </section>
        </Modal>
      </div>
    </FieldSet>
  );
}
