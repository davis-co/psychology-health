import { useEffect, useState } from "react";
import { Button } from "react-elements-davis";
import { baliYaXeirOptions, Required_Error } from "@/constants/form";
import { MCMI3_KEYS } from "@/constants/keys";
import { Mcmi3Questions } from "./data";
import usePagination from "@/hooks/usePagination";
import { useFormContext } from "react-hook-form";
import { MCMI3_JobId_Get, MCMI3_JobId_Post } from "@/constants/jobId";
import Form from "@/layouts/Form";

import { request } from "@/services";
import { FormFields } from "react-elements-davis";

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

  return (
    <>
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
  const { setValue } = useFormContext();
  const [currentList, PagesButtons] = usePagination(Mcmi3Questions);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      MCMI3_KEYS.forEach((key) => {
        setValue(key, user[key]);
      });
    }
  }, [user]);

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
            archive={true}
            validation={{ required: Required_Error }}
            options={baliYaXeirOptions}
            labelClassName="!text-center"
            optionsContainer="!justify-between"
            radioClassName="xs:!max-w-[64px] md:!max-w-[74px] lg:!max-w-[84px] xl:!max-w-[104px]"
            labelMore={window.innerWidth >= 672}
            BC={BC}
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
