import LastFileSVG from "@/assets/icons/bg/lastUpload.svg";
import { baseURL } from "@/config/config";
import classNames from "classnames";
import { Fragment, useState } from "react";
import { Button, FieldSet, Modal } from "davis-components";

export default function LastUploadedFile({ title, link }) {
  const [activeModal, setActiveModal] = useState(false);

  return (
    <Fragment>
      <FieldSet
        title={title}
        containerClassName={classNames(
          "!h-fit hidden md:!flex bg-formItem2 -mt-2"
        )}
        className={"!p-4"}
        titleClassName={"lg:!mr-4 "}
      >
        <div className="flex flex-col w-full !rounded overflow-hidden group relative">
          {link?.includes(".pdf") ? (
            <iframe
              height={window.innerWidth * 0.5}
              src={`${baseURL.substring(0, baseURL.length - 5)}${link}`}
            ></iframe>
          ) : (
            <img
              src={
                link
                  ? `${baseURL.substring(0, baseURL.length - 5)}${link}`
                  : LastFileSVG
              }
              className={classNames(
                " w-full rounded ",
                link ? "group-hover:blur-sm transition-all cursor-pointer" : ""
              )}
              onClick={() => setActiveModal(true)}
            />
          )}

          {link ? (
            <Button
              title="نمایش"
              className="w-full h-10 absolute bottom-0 left-0 !font-700 !bg-formItem1 !hidden group-hover:!block !border-none !text-black"
              onClick={() => setActiveModal(true)}
            />
          ) : null}
        </div>
      </FieldSet>
      {link ? (
        <Fragment>
          <div className="flex gap-6 items-center md:!hidden">
            <span className="text-2xs font-600">{title}</span>
            <Button
              title={"مشاهده"}
              variant="variant"
              className={
                "!text-black !h-[22px] !w-[80px] !text-2xs !bg-formItem2 border-none !shadow-formItem"
              }
              onClick={() => setActiveModal(true)}
            />
          </div>
        </Fragment>
      ) : null}

      <Modal
        isOpen={activeModal}
        onClose={() => setActiveModal(null)}
        containerClassName="!w-[100%] md:!w-fit"
      >
        <div className="  ">
          <img
            src={
              link
                ? `${baseURL.substring(0, baseURL.length - 5)}${link}`
                : LastFileSVG
            }
          />
        </div>
      </Modal>
    </Fragment>
  );
}
