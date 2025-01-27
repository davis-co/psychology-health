import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Page } from "react-elements-davis";
import { successMessage } from "@/constants/form";
import { request } from "@/services";
import { useNavigate } from "react-router-dom";
// import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "@/pages/Loading";
import fetchData from "@/services/fetchData";

const Form = ({ formKeys, JID, children }) => {
  const navigate = useNavigate();
  const [fetchLoading, setFetchLoading] = useState(true);
  const user = localStorage.getItem("userData");

  const methods = useForm({
    defaultValues: {},
    mode: "all",
    // resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, setValue } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    console.log(JID.submit);
    await request({ jobId: JID.submit, dataInfo: data })
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
    fetchData(JID.ID, formKeys, setValue)
      .catch((err) => console.log(err))
      .finally(() => {
        // setValue("4946", "4956");
        setFetchLoading(false);
      });
    if (user) setValue("6483", user["6483"]);
    // setValue("6483", "1735991161416");
  }, []);

  return fetchLoading ? (
    <Loading />
  ) : (
    <Page back navigate={navigate}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
          {children}
        </form>
      </FormProvider>
    </Page>
  );
};

export default Form;
