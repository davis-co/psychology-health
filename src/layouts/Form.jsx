import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Modal, Page } from "davis-components";
import { successMessage } from "@/constants/form";
import { request } from "@/services";
import { useNavigate } from "react-router-dom";
import Loading from "@/pages/Loading";
import fetchData from "@/services/fetchData";
import Approveicon from "@/components/elements/approveIccon/ApproveIcon";


const Form = ({ formKeys, JID, children, onSubmit }) => {
  const navigate = useNavigate();
  const [fetchLoading, setFetchLoading] = useState(true);
  // یک state برای مدیریت وضعیت Modal اضافه کنید
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const user = localStorage.getItem("userData");

  const methods = useForm({
    defaultValues: {},
    mode: "all",
  });
  const { handleSubmit, setValue } = methods;

  const handleFormSubmit = async (data) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      await request({ jobId: JID.submit, dataInfo: data }).then((res) => {
        if (!res.error) {
          // به جای toast.success، Modal را باز کنید
          setIsModalOpen(true); 
        } else {
          toast.error("خطای دریافت اطلاعات");
        }
      });
    }
  };

  useEffect(() => {
    fetchData(JID.ID, formKeys, setValue).finally(() => {
      setFetchLoading(false);
    });
    if (user) setValue("6483", user["6483"]);
  }, []);
  
  // تابعی برای بستن Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return fetchLoading ? (
    <Loading />
  ) : (
    <Page back navigate={navigate}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={"form"}>
          {children}
        </form>
      </FormProvider>

      {/* Modal با طراحی جدید */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col items-center justify-center p-8 rounded-xl  space-y-6 transform transition-all duration-300 scale-95">
          <div className="w-24 h-24 mb-4">
            <Approveicon />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            تکمیل شد!
          </h2>
          <p className="text-gray-600 text-center text-lg max-w-xs leading-relaxed">
            {successMessage}
          </p>
        </div>
      </Modal>
    </Page>
  );
};

export default Form;