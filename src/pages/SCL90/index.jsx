import { useEffect, useState } from "react";
import { Button, RadioOptions, TextField } from "davis-components";
import { measureOptions, Required_Error } from "@/constants/form";
import { SCL_JobId_Get, SCL_JobId_Post } from "@/constants/jobId";
import { SCL90_KEYS } from "@/constants/keys";
import { questions } from "./data";
import styles from "./styles.module.css";
import { text } from "./text";
import { useFormContext } from "react-hook-form";
import usePagination from "@/hooks/usePagination";
import Form from "@/layouts/Form";

const SCL90 = () => {
  return (
    <Form
      formKeys={SCL90_KEYS}
      JID={{
        ID: SCL_JobId_Get,
        submit: SCL_JobId_Post,
      }}
      title="SCL90"
    >
      <Body />
    </Form>
  );
};

const Body = () => {
  const { formState } = useFormContext();

  return (
    <>
      <p className={"guide-description"}>{text.description}</p>
      <Questions />
      <div className="w-full flex justify-center">
        <Button
          type="submit"
          className={"submit"}
          loading={formState.isSubmitting}
          title={"ذخیره اطلاعات"}
        />
      </div>
    </>
  );
};

const Questions = () => {
  const { formState, watch, register } = useFormContext();
  const [currentList, PagesButtons] = usePagination(questions, 48);

  return (
    <>
      <div className="grid-3">
        {currentList.map((q) =>
          q.isPassword ? (
            <TextField
              type="password"
              key={q.label}
              label={q.label}
              validation={{ required: Required_Error }}
              errors={formState.errors}
              divider={"center"}
              register={register}
              watch={watch}
              questionKey={q.key}
            />
          ) : (
            <RadioOptions
              key={q.label}
              label={q.label}
              options={measureOptions}
              questionKey={q.key}
              active={watch(q.key)}
              register={register}
              validation={{ required: Required_Error }}
              errors={formState.errors}
              containerClassName="col-span-full"
              radioClassName="!min-w-[48%] md:!min-w-[19%] !gap-0"
              labelMore
              divider={"right"}
            />
          )
        )}
      </div>
      {PagesButtons}
    </>
  );
};

export default SCL90;
