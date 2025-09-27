import { useEffect, useState } from "react";
import { Button } from "davis-components";
import { baliYaXeirOptions, Required_Error } from "@/constants/form";
import { MCMI3_KEYS } from "@/constants/keys";
import { Mcmi3Questions } from "./data";
import usePagination from "@/hooks/usePagination";
import { useFormContext } from "react-hook-form";
import { MCMI3_JobId_Get, MCMI3_JobId_Post } from "@/constants/jobId";
import Form from "@/layouts/Form";
import { request } from "@/services";
import { FormFields } from "davis-components";

const PAGE_SIZE = 60;

const Mcmi3 = () => {
  return (
    <Form
      formKeys={MCMI3_KEYS}
      JID={{
        ID: MCMI3_JobId_Get,
        submit: MCMI3_JobId_Post,
      }}
      title="MCMI3"
    >
      <Body />
    </Form>
  );
};

const Body = () => {
  const { formState } = useFormContext();
  const [currentList, PagesButtons, currentPage, totalPages] = usePagination(
    Mcmi3Questions,
    PAGE_SIZE
  );
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
  const { setValue, watch } = useFormContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      MCMI3_KEYS.forEach((key) => {
        setValue(key, user[key]);
      });
    }
  }, [user, setValue]);

  return (
    <>
      <div className="grid-3">
        {currentList?.map((o) => (
          <FormFields
            key={o.qKey}
            component={"RadioOptions"}
            questionKey={o.qKey}
            label={o.label}
            divider="center"
            archive={{
              watch: watch("6483"),
              BC: MCMI3_BC,
              jobID: 164,
              request: request,
              renderCell: (val) =>
                baliYaXeirOptions.find((o) => o.value == val)?.label || val,
            }}
            validation={{ required: Required_Error }}
            options={baliYaXeirOptions}
            labelClassName="!text-center"
            optionsContainer="!justify-between"
            radioClassName="xs:!max-w-[64px] md:!max-w-[74px] lg:!max-w-[84px] xl:!max-w-[104px]"
            labelMore={window.innerWidth >= 672}
            BC={MCMI3_BC}
            request={request}
            useFormContext={useFormContext}
          />
        ))}
      </div>
      {PagesButtons}
    </>
  );
};

export default Mcmi3;
