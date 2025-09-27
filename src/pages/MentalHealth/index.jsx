import { useEffect, useState } from "react";
import classNames from "classnames";
import { useFormContext, useWatch } from "react-hook-form";
import { Button, Modal } from "davis-components";
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
  const { formState, setValue, register, getValues } = useFormContext();

  // subscribe to stable values
  const selected10437 = useWatch({ name: "10437" }) || [];
  const score10435 = useWatch({ name: "10435" });
  const val11892 = useWatch({ name: "11892" });
  const val10441 = useWatch({ name: "10441" });
  const val10440 = useWatch({ name: "10440" });
  const userId6483 = useWatch({ name: "6483" });

  // Debug log to verify userId is being watched
  console.log("userID(6483):", userId6483);
  console.log("All form values:", getValues());

  useEffect(() => {
    register("10437", { required: true });
    register("10438");
    register("10441");
    register("12504");
    register("10440");
    register("6483"); // ensure userId is registered for submission
  }, [register]);

  // clear dependent fields when not needed (guard setValue)
  useEffect(() => {
    if (!selected10437?.includes("10652") && getValues("10438") !== "") {
      setValue("10438", "");
    }
    const needsClearSuicide =
      !selected10437?.includes("1514109071882") &&
      !selected10437?.includes("1514109106067");
    if (needsClearSuicide && getValues("10441") !== "") {
      setValue("10441", "");
    }
  }, [selected10437, setValue, getValues]);

  // result1 / result2
  useEffect(() => {
    const arg1 = [
      "10652",
      "10653",
      "1514109185115",
      "1513768760443",
      "1514108884563",
      "1514190240786",
    ].some((v) => selected10437?.includes(v));
    const arg2 =
      selected10437?.includes("1514109071882") &&
      selected10437?.includes("1514109106067");

    const arg3 = score10435 < 10 && score10435 >= 0;
    const arg4 = score10435 >= 10;

    const new11846 = Boolean(arg1 && arg2 && arg3);
    const new11887 = Boolean(arg1 && arg2 && arg4);

    if (getValues("11846") !== new11846) setValue("11846", new11846);
    if (getValues("11887") !== new11887) setValue("11887", new11887);
  }, [selected10437, score10435, setValue, getValues]);

  // result3
  useEffect(() => {
    const arg1 = [
      "1514109071882",
      "1514108884563",
      "1514109106067",
      "1514109185115",
      "1513768760443",
      "1514190240786",
    ].some((v) => selected10437?.includes(v));
    const arg2 =
      val11892 == "10362" && val10441 == "10362" && val10440 == "10362";

    const new11888 = Boolean(arg1 && arg2);
    if (getValues("11888") !== new11888) setValue("11888", new11888);
  }, [selected10437, val11892, val10441, val10440, setValue, getValues]);

  // enforce "هیچکدام"
  useEffect(() => {
    const hasNone = selected10437.includes("10653");
    if (hasNone && selected10437.length > 1) {
      const onlyNone = ["10653"];
      if (JSON.stringify(selected10437) !== JSON.stringify(onlyNone)) {
        setValue("10437", onlyNone);
      }
      return;
    }
    if (hasNone) {
      const filtered = selected10437.filter((v) => v !== "10653");
      if (filtered.length !== selected10437.length) {
        setValue("10437", filtered);
      }
    }
  }, [selected10437, setValue]);

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
  const selected10437 = watch("10437") || [];

  return (
    <>
      <div
        className={classNames(
          "grid-3",
          (selected10437.includes("1514109071882") ||
            selected10437.includes("1514109106067") ||
            selected10437.includes("10652")) &&
            "bg-formItem2 rounded p-1 md:animate-flipBottom",
          selected10437.includes("10653") && ""
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
