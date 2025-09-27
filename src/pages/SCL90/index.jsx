import { Button } from "davis-components";
import { measureOptions, Required_Error } from "@/constants/form";
import { SCL_JobId_Get, SCL_JobId_Post } from "@/constants/jobId";
import { SCL90_KEYS } from "@/constants/keys";
import { questions } from "./data";
import { text } from "./text";
import { useFormContext } from "react-hook-form";
import usePagination from "@/hooks/usePagination";
import Form from "@/layouts/Form";
import { RadioOptions } from "@/components/elements/RadioOptions";
import { TextField } from "@/components/elements/TextField";
import { request } from "@/services";

const TOTAL_PAGES = 3;
const PAGE_SIZE = Math.ceil(questions.length / TOTAL_PAGES);

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
  const [currentList, PagesButtons, currentPage, totalPages] = usePagination(
    questions,
    PAGE_SIZE
  );
  const isLastPage = currentPage === totalPages;

  return (
    <>
      <p className={"guide-description"}>{text.description}</p>
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
  const { formState, watch, register } = useFormContext();

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
              archive={{
                watch: watch("6483"),
                BC: SCL90_BC,
                jobID: 164,
                request: request,
                renderCell: (val) =>
                  measureOptions.find((o) => o.value == val)?.label || val,
              }}
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
              archive={{
                watch: watch("6483"),
                BC: SCL90_BC,
                jobID: 164,
                request: request,
                renderCell: (val) =>
                  measureOptions.find((o) => o.value == val)?.label || val,
              }}
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
