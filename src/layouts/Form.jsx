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
  const { handleSubmit, setValue, register } = methods;

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
    // ensure 6483 is registered first
    register("6483");

    // then try to set its value from localStorage
    try {
      if (user) {
        const parsed = typeof user === "string" ? JSON.parse(user) : user;
        // try common places for the user id value
        const candidates = [
          parsed?.["6483"],
          parsed?.user?.["6483"],
          parsed?.data?.["6483"],
          parsed?.detail?.["6483"],
          parsed?.userId,
          parsed?.UserId,
          parsed?.id,
        ].filter((v) => v !== undefined && v !== null && v !== "");

        const value6483 = candidates.length ? String(candidates[0]) : undefined;
        if (value6483 !== undefined) {
          setValue("6483", value6483);
        }
        // debug once to verify mapping at runtime
        // eslint-disable-next-line no-console
        console.log("[Form] userData 6483 resolved:", { parsed, value6483 });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("[Form] Failed to parse userData for 6483", e);
    }
  }, [register, setValue]);

  useEffect(() => {
    fetchData(JID.ID, formKeys, setValue)
      .then(() => {
        // After fetching data, also set 6483 if it exists in the response
        const responseData = JSON.parse(
          localStorage.getItem("userData") || "{}"
        );
        if (responseData.data && responseData.data["6483"]) {
          setValue("6483", responseData.data["6483"]);
        }
      })
      .finally(() => {
        setFetchLoading(false);
      });
  }, [JID.ID, formKeys, setValue]);

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
