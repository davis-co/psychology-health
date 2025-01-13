import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Page, Button, RadioOptions } from "react-elements-davis";
import { successMessage } from "@/constants/form";
import { EQ_KEYS } from "@/constants/keys";
import { request } from "@/services";
import { answerOptions, EQuestions } from "./data";
import usePagination from "@/hooks/usePagination";
import useDevice from "@/hooks/useDevice";
import { useNavigate } from "react-router-dom";

const EQ = () => {
  const [user, setUser] = useState(null);
  const [currentList, PagesButtons] = usePagination(EQuestions, 45);
  const [device] = useDevice();
  const navigate = useNavigate();
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
    // 202 GET
    await request({ jobId: 203, dataInfo: data })
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
      EQ_KEYS.forEach((key) => {
        setValue(key, user[key]);
      });
    }
  }, [user]);

  return (
    <Page navigate={navigate} back>
      <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
        <div className="grid-3">
          {currentList.map((o) => (
            <RadioOptions
              key={o.label}
              divider={"center"}
              required
              label={o.label}
              active={watch(o.qKey)}
              questionKey={o.qKey}
              options={answerOptions}
              register={register}
              radioClassName=" !min-w-[48%] md:!min-w-[30%] lg:!min-w-[48%] xl:!min-w-[30%] !gap-0"
              errors={errors}
              labelMore={window.innerWidth < 1368}
            />
          ))}
        </div>
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

export default EQ;
