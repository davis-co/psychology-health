import classNames from "classnames";
import { useState } from "react";
import { Button } from "davis-components";

export default function usePagination(list, counts = 60) {
  const [page, setPage] = useState(1);
  const indexOfLastQuestion = page * counts;
  const indexOfFirstQuestion = indexOfLastQuestion - counts;
  const currentList = list.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(list.length / counts);

  const handleSetPage = (dir) => {
    if (dir == "next") {
      if (page < totalPages) {
        setPage((prev) => prev + 1);
      }
    } else {
      if (page > 1) {
        setPage((prev) => prev - 1);
      }
    }
  };

  const PagesButtons = (
    <div className="flex justify-center items-center gap-4 my-4 bg-white  border border-success self-center rounded p-0.5">
      <Button
        onClick={() => handleSetPage("prev")}
        disabled={page == 1}
        variant={page == 1 ? "disabled" : ""}
        className={classNames(
          page == 1 ? "!bg-[#d2d2d2]" : "!bg-white",
          " !text-black !border-none h-[24px] lg:!h-[33px] lg:!w-[100px] !w-[80px] hover:!shadow !p-0"
        )}
        title="صفحه قبل"
      />
      <span className="text-2xs lg:text-sm">{` ${page} از ${totalPages}`}</span>
      <Button
        onClick={() => handleSetPage("next")}
        disabled={page == totalPages}
        variant={page == totalPages ? "disabled" : ""}
        className={classNames(
          page == totalPages ? "!bg-[#d2d2d2]" : "!bg-white",
          " !text-black !border-none h-[24px] lg:!h-[33px] lg:!w-[100px] !w-[80px] hover:!shadow !p-0"
        )}
        title="صفحه بعد"
      />
    </div>
  );

  return [currentList, PagesButtons, page, totalPages];
}