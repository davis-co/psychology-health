import { useEffect, useState } from "react";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import { Button, Modal } from "react-elements-davis";
import { MH_JobId_Get, MH_JobId_Post } from "@/constants/jobId";
import { KEYS } from "@/constants/keys";
import DomesticViolence from "./domesticViolence";
import { text } from "./i18n";
import K6Test from "./k6";
import TextGuide from "./TextGuide";
import useQuestions from "../useQuestions";
import { questions } from "./data";
import Form from "@/layouts/Form";

export default function MentalHealth() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Form
        formKeys={KEYS}
        JID={{
          ID: MH_JobId_Get,
          submit: MH_JobId_Post,
        }}
        title="سلامت روان"
      >
        <Body />
      </Form>

      <Modal isOpen={openModal} onClose={() => setOpenModal(null)}>
        <TextGuide text={text.alertSuicidalThoughts} />
      </Modal>
    </>
  );
}

const Body = () => {
  const { formState, watch, setValue, register } = useFormContext();

  useEffect(() => {
    register("10437", { required: true });
    register("10438");
    register("10441");
    register("12504");
    register("10440");
  }, [register]);

  useEffect(() => {
    if (!watch("10437")?.includes("10652")) {
      setValue("10438", "");
    }
    if (
      !watch("10437")?.includes("1514109071882") &&
      !watch("10437")?.includes("1514109106067")
    ) {
      setValue("10441", "");
    }
  }, [watch("10437"), setValue]);

  //showing result2MentalHealth and result1MentalHealth
  useEffect(() => {
    let arg1;
    if (watch("10437")) {
      arg1 = [
        "10652",
        "10653",
        "1514109185115",
        "1513768760443",
        "1514108884563",
        "1514190240786",
      ].some((val) => watch("10437").includes(val));
    }

    let arg2;
    if (watch("10437")) {
      arg2 =
        watch("10437").includes("1514109071882") &&
        watch("10437").includes("1514109106067");
    }

    let arg3 = watch("10435") < 10 && watch("10435") >= 0;

    let arg4 = watch("10435") >= 10;

    //result1MentalHealth
    arg1 && arg2 && arg3 ? setValue("11846", true) : setValue("11846", false);
    //result2MentalHealth
    arg1 && arg2 && arg4 ? setValue("11887", true) : setValue("11887", false);
  }, [watch("10437"), watch("10435")]);

  //showing result3MentalHealth
  useEffect(() => {
    let arg1;
    if (watch("10437")?.length) {
      arg1 = [
        "1514109071882",
        "1514108884563",
        "1514109106067",
        "1514109185115",
        "1513768760443",
        "1514190240786",
      ].some((val) => watch("10437")?.includes(val));
    }
    let arg2 =
      watch("11892") == "10362" &&
      watch("10441") == "10362" &&
      watch("10440") == "10362";

    //result1MentalHealth
    arg1 && arg2 ? setValue("11888", true) : setValue("11888", false);
  }, [watch("10437"), watch("11892"), watch("10441"), watch("10440")]);

  return (
    <div className={"grid-1"} id="formContainer">
      <p className={"guide-description"}>{text.description}</p>

      <Questions />
      <K6Test />
      <DomesticViolence />

      <div className="flex justify-center mt-6">
        <Button
          variant="outlined"
          type="submit"
          className="submit"
          loading={formState.isSubmitting}
          title="ذخیره اطلاعات"
        />
      </div>
    </div>
  );
};

const Questions = () => {
  const [getQuestion] = useQuestions(questions);
  const { watch } = useFormContext();

  return (
    <>
      <div
        className={classNames(
          "grid-3",
          watch("10437")?.includes("1514109071882") ||
            watch("10437")?.includes("1514109106067") ||
            watch("10437")?.includes("10652")
            ? "bg-formItem2 rounded p-1 md:animate-flipBottom"
            : ""
        )}
      >
        {getQuestion("ابتلا به اختلالات روان (با تشخیص پزشک)")}

        {watch("10437")?.includes("10652")
          ? getQuestion("تعیین نوع بیماری روان")
          : null}

        {watch("10437")?.includes("1514109071882") ||
        watch("10437")?.includes("1514109106067") ? (
          <>
            {getQuestion("سابقه اقدام به خودکشی")}
            {getQuestion("دارای سابقه افکار خودکشی")}
          </>
        ) : null}
      </div>

      <div
        className={classNames(
          "grid-3",
          watch("11892") === "10361"
            ? "bg-formItem2 rounded p-1 md:animate-flipBottom"
            : ""
        )}
      >
        {getQuestion("دارای افکار خودکشی در حال حاضر")}

        {watch("11892") === "10361" ? (
          <>{getQuestion("تمایل به صحبت با مشاور سلامت")}</>
        ) : null}
      </div>
    </>
  );
};
