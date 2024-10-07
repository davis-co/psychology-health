import React, {
  useEffect,
  useState,
} from 'react';

import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  Button,
  CheckBox,
  Divider,
  Label,
  Modal,
  TextField,
} from '@/components/elements';
import RadioOptions from '@/components/elements/RadioOptions';
import {
  MH_JobId_Get,
  MH_JobId_Post,
} from '@/constants/jobId';
import { KEYS } from '@/constants/keys';
import fetchData from '@/services/fetchData';
import submitForm from '@/services/submitForm';

import DomesticViolence from './domesticViolence';
import {
  mentalHealthDisOrder,
  text,
  yesNoQuestion,
} from './i18n';
import K6Test from './k6';
import styles from './styles.module.css';
import TextGuide from './TextGuide';

export default function MentalHealth() {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const [pointK6, setPointK6] = useState(0);
  const [pointDomestic, setPointDomestic] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [openModal, setOpernModal] = useState(false);
  useEffect(() => {
    fetchData(MH_JobId_Get, KEYS, setValue)
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    setSubmitLoading(true);
    submitForm(MH_JobId_Post, data, () =>
      fetchData(MH_JobId_Get, KEYS, setValue)
    )
      .then(() => {
        toast.success("اطلاعات با موفقیت ذخیره شد.");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setSubmitLoading(false);
        }, 1001);
      });
  };
  // console.log(watch("10437"))
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        
        <main className={classNames("px-5 py-2",styles.container)} id="formContainer">

        <section className={styles.titleSection}>
          {/* <h5 className={styles.title}>{text.title}</h5> */}
          <p className={styles.description}>{text.description}</p>
        </section>
          <div
           className={classNames(
            styles.gridContainer,
            "pt-0.5 transition-all mb-3",
            watch("10437")?.includes("1514109071882") ||
              watch("10437")?.includes("1514109106067")
              ? "bg-gray-d6 rounded-t px-1 pb-5 mb-0"
                  : ""
                
        )}
          
         >
            <section className={styles.chekboxPart}>
              <div className="flex-auto">
                <Label
                  className={styles.question}
                  label={text.mentalDisorder}
                  required={true}
                  isError={!!errors[10437]}
                />
              </div>

              {mentalHealthDisOrder?.map((o, index) => (

                <div key={o.index} className={classNames(styles.radios, "flex-auto")}>
                  <CheckBox
                    value={o.value}
                    label={o.label}
                    key={o.value}
                    checked={watch("10437")?.includes(o.value)}
                    onChange={(e) => {
                      const values = watch("10437") || [];
                      if (e.target.checked) {
                        setValue("10437", [...values, o.value]);
                      } else {
                        setValue(
                          "10437",
                          values.filter((val) => val !== o.value)
                        );
                      }
                    }}

                  />
                </div>
              ))}
            </section>
            {watch("10437")?.includes("10652") ? (
                  <TextField
                    containerClassName="flex-row items-center rounded bg-white-light p-3"
                    className={"xs:w-[70%] md:w-[85%]"}
                    label={text.typeOfMentalDisease + ":"}
                    placeholder={text.typeOfMentalDisease}
                    isError={!!errors[10438]}
                    {...register("10438", { required: true })}
                    value={watch("10438")}
                    required
                  />
            ) : null}

            {watch("10437")?.includes("1514109071882") ||
              watch("10437")?.includes("1514109106067") ? (
              // console.log(text.historyOfSuicideAttempts),
              
                  <RadioOptions
                    label={text.historyOfSuicideAttempts}
                    options={yesNoQuestion}
                    active={watch("10441")}
                    questionKey={"10441"}
                    register={register}
                    wrap={true}
                    className={styles.questionBox}

                  />
              
            ) : null}
          </div>
          <div
          className={classNames(
            styles.gridContainer,
            "pt-0.5 transition-all mb-3  px-1",
            watch("11892") === "10361" 
              ? "bg-gray-d6 rounded-t pb-5 mb-0"
                  : ""
                
        )}
          >
              <RadioOptions
                label={text.currentlyHavingSuicidalThoughts}
                options={yesNoQuestion}
                active={watch("11892")}
                questionKey={"11892"}
                register={register}
                wrap={true}
              />


            {watch("11892") === "10361" ? (
                <RadioOptions
                  label={text.willingnessToTalkWithHealthConsultant}
                  options={yesNoQuestion}
                  active={watch("12504")}
                  questionKey={"12504"}
                  register={register}
                  wrap={true}
                />
            ) : null}
            {watch("11892") === "10361" ?(
                <RadioOptions
                 label={text.historyOfThinkingSuicideAttempts}
                 options={yesNoQuestion}
                 active={watch("10440")}
                 questionKey={"10440"}
                 register={register}
                 wrap={true}
                
                />
            ): null}
          </div>
          
            
            <Divider className="mx-auto my-3 block w-1/2" />
            <K6Test
              errors={errors}
              watch={watch}
              register={register}
              setValue={setValue}
              pointK6={pointK6}
              setPointK6={setPointK6}
            />

            <DomesticViolence
              errors={errors}
              watch={watch}
              register={register}
              setValue={setValue}
              setPointDomestic={setPointDomestic}
              pointDomestic={pointDomestic}
            />
             <Button
          className={styles.submit}
          title="ذخیره اطلاعات"
          style="outlined"
          type="submit"
          loading={submitLoading}
        />
        </main>
      </form>
      {openModal
        ? (
          <Modal
            onClose={() => {
              setOpernModal(false);
            }}
          >
            <TextGuide text={text.alertSuicidalThoughts} />
          </Modal>
        )
        : null}
    </>

  );
}
