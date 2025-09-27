import { useEffect, useState } from "react";
import { BsFiletypePdf } from "react-icons/bs";
import { Modal, FieldSet, ProgressChart, Divider } from "davis-components";
import useDevice from "@/hooks/useDevice";
import { debounce } from "@/utils/helpers";
import { yesNoQuestion } from "../i18n";
import { questionsDomesticViolence } from "./data";
import styles from "./styles.module.css";
import { radioFiveMentalHealth, text } from "./text";
import { useFormContext } from "react-hook-form";
import { Required_Error } from "@/constants/form";
import { ResultBox } from "@/components/elements";
import { fileURL } from "@/config/config";
import { RadioOptions } from "@/components/elements/RadioOptions";
import { Label } from "@/components/elements/Label";

export default function DomesticViolence() {
  const { watch, formState, register, setValue } = useFormContext();

  const watchedValues = watch(["10443", "10444", "10445", "10446"]);

  const [pdfContent, setPdfContent] = useState(false);
  const [pointDomestic, setPointDomestic] = useState(0);
  const [device] = useDevice();

  const scoreMap = {
    10428: 5,
    10429: 4,
    10430: 3,
    10432: 2,
    10431: 1,
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
  }, 300);

  useEffect(() => {
    calcTotalScore();
  }, [watchedValues]);

  const downloadBtnHandle = () => {
    const pdfUrl = fileURL + "/LFFO/?fid=11930&0.053407106673689864";
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

  return (
    <FieldSet title={text.domesticViolenceTest} className={"grid-3"}>
      <p className={"guide-description col-span-full"}>
        {text.domesticViolenceDescription}
      </p>
      {questionsDomesticViolence.map((q) => (
        <RadioOptions
          key={q.key}
          label={q.label}
          questionKey={q.key}
          options={radioFiveMentalHealth}
          register={register}
          active={watch(q.key)}
          divider={"right"}
          errors={formState.errors}
          validation={{ required: Required_Error }}
          containerClassName="col-span-full"
          radioClassName=" !min-w-[48%] md:!min-w-[19%] !gap-0"
        />
      ))}
      <ProgressChart
        value={watch("10552")}
        ranges={generalData}
        label={text.domesticAssesment}
        required={true}
        containerClassName="max-h-fit"
      />
      <RadioOptions
        label={text.willingnessReceiveSpecializedServices}
        options={yesNoQuestion}
        questionKey={"10667"}
        active={watch("10667")}
        register={register}
        divider={"center"}
        optionsContainer={"radioOptions-boolean-optionsContainer"}
        radioClassName="radioOptions-boolean-radio"
        containerClassName="max-h-fit"
        validation={{ required: Required_Error }}
        errors={formState.errors}
      />
      <div className="flex flex-col w-full items-center justify-between rounded bg-formItem1 p-2 shadow-md">
        <Label
          label={text.violenceContent}
          required={true}
          className={"flex  justify-center"}
        />
        <Divider position="center" />
        <div className="w-full  flex cursor-pointer items-center justify-center gap-2 rounded border border-zinc-500 p-1">
          <span
            className=" text-black text-2xs lg:text-xs xl:text-sm"
            onClick={handelContentPdf}
          >
            محتوای متنی
          </span>
          <span>
            <BsFiletypePdf className="text-base md:text-lg" />
          </span>
        </div>
      </div>
      <div className="col-span-full">
        {pointDomestic > 4 && pointDomestic <= 10 ? (
          <ResultBox
            title={"هشدار"}
            content={text.result6MentalHealt}
            alert={true}
          />
        ) : null}

        {pointDomestic <= 4 ? (
          <ResultBox title={"تبریک"} content={text.result7MentalHealt} />
        ) : null}

        {pointDomestic > 10 ? (
          <ResultBox
            title={"هشدار"}
            content={text.result8MentalHealt}
            alert={true}
          />
        ) : null}
      </div>

      <Modal
        isOpen={pdfContent}
        containerClassName="h-full w-full"
        onClose={() => setPdfContent(false)}
      >
        <section className="mb-6 mt-4 h-full bg-slate-700 text-white">
          <iframe
            src={fileURL + "/LFFO/?fid=11930&0.646200249523935"}
            type="application/pdf"
            width="100%"
            height="100%"
          ></iframe>
        </section>
      </Modal>
    </FieldSet>
  );
}
