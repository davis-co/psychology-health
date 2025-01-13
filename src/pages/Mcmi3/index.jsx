import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Page, RadioOptions } from "react-elements-davis";
import { successMessage, baliYaXeirOptions } from "@/constants/form";
import { MCMI3_KEYS } from "@/constants/keys";
import { request } from "@/services";
import { Mcmi3Questions } from "./data";
import { useNavigate } from "react-router-dom";
import usePagination from "@/hooks/usePagination";
import useDevice from "@/hooks/useDevice";

const Mcmi3 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [device] = useDevice();

  const [currentList, PagesButtons] = usePagination(Mcmi3Questions);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    // 192 GET
    await request({ jobId: 193, dataInfo: data })
      .then((res) => {
        if (!res.error) {
          toast.success(successMessage);
        } else {
          toast.error("خطای دریافت اطلاعات");
        }
      })
      .catch((ERR) => {
        console.log(ERR);
      });
  };

  useEffect(() => {
    if (user) {
      MCMI3_KEYS.forEach((key) => {
        setValue(key, user[key]);
      });
    }
  }, [user]);

  return (
    <Page navigate={navigate} back>
      <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
        <article className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-[5vw] gap-y-4 lg:gap-y-6">
          {currentList?.map((o) => (
            <RadioOptions
              key={o.label}
              divider="center"
              required
              label={o.label}
              questionKey={o.qKey}
              options={baliYaXeirOptions}
              errors={errors}
              register={register}
              active={watch(o.qKey)}
              archive={o.qKey}
              labelClassName="!text-center"
              optionsContainer="!justify-between"
              radioClassName="xs:!max-w-[64px] md:!max-w-[74px] lg:!max-w-[84px] xl:!max-w-[104px]"
              labelMore={window.innerWidth < 1368}
            />
          ))}
        </article>
        {PagesButtons}
        <div className="w-full flex justify-center">
          <Button
            type="submit"
            className={"submit"}
            loading={isSubmitting}
            title={"ذخیره اطلاعات"}
          />
        </div>
      </form>
    </Page>
  );
};

export default Mcmi3;
