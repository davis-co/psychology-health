import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button, RadioOptions } from "davis-components";
import { EQ_KEYS } from "@/constants/keys";
import { answerOptions, EQuestions } from "./data";
import usePagination from "@/hooks/usePagination";
import { Required_Error } from "@/constants/form";
import { EQ_JobId_Get, EQ_JobId_Post } from "@/constants/jobId";
import Form from "@/layouts/Form";

const TOTAL_PAGES = 3;
const PAGE_SIZE = Math.ceil(EQuestions.length / TOTAL_PAGES);

const EQ = () => {
  return (
    <Form
      formKeys={EQ_KEYS}
      JID={{
        ID: EQ_JobId_Get,
        submit: EQ_JobId_Post,
      }}
      title="EQ"
    >
      <Body />
    </Form>
  );
};

const Body = () => {
  const { formState } = useFormContext();
  const [currentList, PagesButtons, currentPage, totalPages] = usePagination(EQuestions, PAGE_SIZE);
  const isLastPage = currentPage === totalPages;

  return (
    <>
      <Questions currentList={currentList} PagesButtons={PagesButtons} />
      {isLastPage && (
        <div className="w-full flex justify-center mt-10">
          <Button
            type="submit"
            className={"submit"}
            loading={formState.isSubmitting}
            title={"ذخیره اطلاعات"}
          />
        </div>
      )}
    </>
  );
};

const Questions = ({ currentList, PagesButtons }) => {
  const { formState, watch, register, setValue } = useFormContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      EQ_KEYS.forEach((key) => {
        setValue(key, user[key]);
      });
    }
  }, [user, setValue]);

  return (
    <>
      <div className="grid-3">
        {currentList.map((o) => (
          <RadioOptions
            key={o.label}
            divider={"right"}
            validation={{ required: Required_Error }}
            label={o.label}
            active={watch(o.qKey)}
            questionKey={o.qKey}
            options={answerOptions}
            register={register}
            containerClassName="col-span-full"
            radioClassName="!min-w-[48%] md:!min-w-[19%] !gap-0"
            errors={formState.errors}
            labelMore
          />
        ))}
      </div>
      {PagesButtons}
    </>
  );
};

export default EQ;